const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "196807",
  database: "bizbrand",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// Signup endpoint
app.post("/api/signup", upload.single("resume"), async (req, res) => {
  try {
    const { role, fullName, email, password, ...otherInfo } = req.body;

    // Check if email already exists
    const [existingUsers] = await db.promise().query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0)
      return res.status(400).json({ error: "Email already in use." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table
    const [userResult] = await db
      .promise()
      .query(
        "INSERT INTO users (full_name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())",
        [fullName, email, hashedPassword, role]
      );

    const userId = userResult.insertId;
    const resumeUrl = req.file ? req.file.filename : null;

    if (role === "Student") {
      await db
        .promise()
        .query(
          `INSERT INTO mentees
           (user_id, aspiring_role, industries, persona, intent, linkedin_profile, resume_url, meetup_account)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            otherInfo.aspiringRole || "",
            JSON.stringify(otherInfo.industries || []),
            otherInfo.persona || "",
            otherInfo.intent || "",
            otherInfo.linkedinProfile || null,
            resumeUrl,
            otherInfo.meetupAccount || null,
          ]
        );
    } else if (role === "Mentor") {
      await db
        .promise()
        .query(
          `INSERT INTO mentors
           (user_id, aspiring_role, industries, persona, passion, linkedin_profile, resume_url, meetup_account)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            otherInfo.aspiringRole || "",
            JSON.stringify(otherInfo.industries || []),
            otherInfo.persona || "",
            otherInfo.passion || "",
            otherInfo.linkedinProfile || null,
            resumeUrl,
            otherInfo.meetupAccount || null,
          ]
        );
    }

    res.json({ success: true, userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
