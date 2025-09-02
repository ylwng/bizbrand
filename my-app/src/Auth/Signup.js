import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const industriesList = [
  "Tech",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Government",
  "Retail",
  "Manufacturing",
  "Energy",
  "Transportation",
  "Telecommunications",
  "Real Estate",
  "Entertainment",
  "Hospitality",
  "Consulting",
  "Non-Profit",
  "Legal",
  "Media",
  "Pharmaceuticals",
  "Insurance",
  "Aerospace",
  "Automotive",
  "Food & Beverage",
  "Logistics",
  "Construction",
  "Agriculture",
  "Biotechnology",
  "Advertising",
  "E-commerce",
  "Sports & Recreation"
];

export default function Signup() {
  const [role, setRole] = useState("");
  const [userInfo, setUserInfo] = useState({ fullName: "", email: "", password: "" });
  const [mentorInfo, setMentorInfo] = useState({
    contact: "",
    aspiringRole: "",
    industries: [],
    persona: "",
    passion: "",
  });
  const [studentInfo, setStudentInfo] = useState({
    contact: "",
    aspiringRole: "",
    industries: [],
    persona: "",
    intent: "",
    linkedinProfile: "",
    resumeFile: null,
    meetupAccount: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => setRole(selectedRole);

  const handleChange = (e, type = "user") => {
    const { name, value, type: inputType, checked, files } = e.target;

    if (inputType === "checkbox") {
      if (type === "mentor") {
        setMentorInfo((prev) => ({
          ...prev,
          industries: checked
            ? [...prev.industries, value]
            : prev.industries.filter((i) => i !== value),
        }));
      } else {
        setStudentInfo((prev) => ({
          ...prev,
          industries: checked
            ? [...prev.industries, value]
            : prev.industries.filter((i) => i !== value),
        }));
      }
    } else if (inputType === "file") {
      setStudentInfo((prev) => ({ ...prev, resumeFile: files[0] }));
    } else {
      if (type === "user") setUserInfo((prev) => ({ ...prev, [name]: value }));
      if (type === "mentor") setMentorInfo((prev) => ({ ...prev, [name]: value }));
      if (type === "student") setStudentInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLinkedInLogin = () => {
    // trigger LinkedIn OAuth flow
    console.log("LinkedIn login triggered");
  };

  const validate = async () => {
    const newErrors = {};
    if (!role) newErrors.role = "Please select a role.";
    if (!userInfo.fullName) newErrors.fullName = "Full name required.";
    if (!userInfo.email) newErrors.email = "Email required.";
    if (!userInfo.password) newErrors.password = "Password required.";

    if (role === "Mentor") {

      if (!mentorInfo.aspiringRole) newErrors.aspiringRole = "Aspiring role required.";
      if (!mentorInfo.industries.length) newErrors.industries = "Select at least one industry.";
      if (!mentorInfo.persona) newErrors.persona = "Select a persona.";
      if (!mentorInfo.passion) newErrors.passion = "Select a passion.";
    }

    if (role === "Student") {
      if (!studentInfo.aspiringRole) newErrors.aspiringRole = "Aspiring role required.";
      if (!studentInfo.industries.length) newErrors.industries = "Select at least one industry.";
      if (!studentInfo.persona) newErrors.persona = "Select a persona.";
      if (!studentInfo.intent) newErrors.intent = "Select an intent.";
      if (!studentInfo.resumeFile) newErrors.resumeFile = "Upload your resume.";
      if (!studentInfo.linkedinProfile) newErrors.linkedinProfile = "Connect LinkedIn profile.";
      if (!studentInfo.meetupAccount) newErrors.meetupAccount = "Meetup account required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(await validate())) return;

    const formData = new FormData();
    formData.append("role", role);
    formData.append("fullName", userInfo.fullName);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);

    if (role === "Mentor") {
      Object.entries(mentorInfo).forEach(([key, value]) => formData.append(key, value));
    }
    if (role === "Student") {
      Object.entries(studentInfo).forEach(([key, value]) => {
        if (key === "resumeFile" && value) {
          formData.append("resume", value);
        } else {
          formData.append(key, value);
        }
      });
    }

    try {
      await axios.post("http://localhost:5000/api/signup", formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  const goToRoleTest = () => navigate("/role-test");

  return (
    <div className="signup-container">
      <h2>Create Account</h2>

      <div className="role-selection">
        <p>Select your role:</p>
        <div className="role-buttons">
          <button type="button" className={role === "Mentor" ? "active" : ""} onClick={() => handleRoleSelect("Mentor")}>Mentor</button>
          <button type="button" className={role === "Student" ? "active" : ""} onClick={() => handleRoleSelect("Student")}>Student</button>
        </div>
        {errors.role && <p className="error">{errors.role}</p>}
      </div>

      <p className="role-test">Not sure which role fits you? <span className="role-test-link" onClick={goToRoleTest}>Take our Q&A test</span></p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={userInfo.fullName} onChange={(e) => handleChange(e, "user")} />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <input type="email" name="email" placeholder="Email" value={userInfo.email} onChange={(e) => handleChange(e, "user")} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" value={userInfo.password} onChange={(e) => handleChange(e, "user")} />
        {errors.password && <p className="error">{errors.password}</p>}

        {/* ===================== Mentor Onboarding ===================== */}
        {role === "Mentor" && (
          <div className="mentor-onboarding">
            <h3>Mentor Onboarding</h3>



            <label>
              What Role are you Aspriring?:
              <input
                type="text"
                name="aspiringRole"
                value={mentorInfo.aspiringRole}
                onChange={(e) => handleChange(e, "mentor")}
              />
            </label>
            {errors.aspiringRole && <p className="error">{errors.aspiringRole}</p>}

            <label>What Industries are you experienced in :</label>
            <div className="checkbox-group">
              {industriesList.map((industry) => (
                <div key={industry} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`mentor-${industry}`}
                    value={industry}
                    checked={mentorInfo.industries.includes(industry)}
                    onChange={(e) => handleChange(e, "mentor")}
                  />
                  <label htmlFor={`mentor-${industry}`}>{industry}</label>
                </div>
              ))}
            </div>
            {errors.industries && <p className="error">{errors.industries}</p>}

            <label>
              Pick a Persona :
              <select
                name="persona"
                value={mentorInfo.persona}
                onChange={(e) => handleChange(e, "mentor")}
              >
                <option value="">Select</option>
                <option value="Recent College Grad">Recent College Grad</option>
                <option value="Rising Star">Rising Star</option>
                <option value="Consistent Contributor">Consistent Contributor</option>
                <option value="Fast Follower">Fast Follower</option>
                <option value="Seasoned Exec">Seasoned Exec</option>
              </select>
            </label>
            {errors.persona && <p className="error">{errors.persona}</p>}

            <label>
              Pick a Passion:
              <select
                type="text"
                name="passion"
                value={mentorInfo.passion}
                onChange={(e) => handleChange(e, "mentor")}
              >
                <option value="">Select</option>
                <option value="Don’t Know Yet – open to change">Don’t Know Yet – open to change</option>
                <option value="Actively Job Hunting">Actively Job Hunting</option>
                <option value="Actively Seeking Promotion">Actively Seeking Promotion</option>
                <option value="New to Job Industry">New to Job Industry</option>
                <option value="Building my Professional Brand">Building my Professional Brand</option>
              </select>
            </label> Integrations

            {errors.passion && <p className="error">{errors.passion}</p>}

            {/* ===================== Integration Buttons ===================== */}
            <div className="integration-row">
              <div
                className="integration-buttons"
                style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
              >
                <button
                  type="button"
                  className="linkedin-btn"
                  onClick={() =>
                    setMentorInfo((prev) => ({ ...prev, linkedinProfile: "connected" }))
                  }
                >
                  {mentorInfo.linkedinProfile ? "LinkedIn Connected" : "Connect LinkedIn"}
                </button>

                <label className={`resume-btn ${mentorInfo.resumeFile ? "has-file" : ""}`}>
                  {mentorInfo.resumeFile ? mentorInfo.resumeFile.name : "Upload Resume"}
                  <input
                    type="file"
                    onChange={(e) =>
                      setMentorInfo((prev) => ({
                        ...prev,
                        resumeFile: e.target.files[0] || null,
                      }))
                    }
                  />
                </label>

                <button
                  type="button"
                  className="meetup-btn"
                  onClick={() =>
                    setMentorInfo((prev) => ({ ...prev, meetupAccount: "connected" }))
                  }
                >
                  {mentorInfo.meetupAccount ? "Meetup Connected" : "Connect Meetup"}
                </button>
              </div>

              <div className="integration-errors">
                {errors.linkedinProfile && <p className="error">{errors.linkedinProfile}</p>}
                {errors.resumeFile && <p className="error">{errors.resumeFile}</p>}
                {errors.meetupAccount && <p className="error">{errors.meetupAccount}</p>}
              </div>
            </div>
          </div>
        )}

      {/* ===================== Student Onboarding ===================== */}
        {role === "Student" && (
          <div className="student-onboarding">
            <h3>Student Onboarding</h3>

        

            <label>
              What role are you aspiring to be?:
              <input
                type="text"
                name="aspiringRole"
                value={studentInfo.aspiringRole}
                onChange={(e) => handleChange(e, "student")}
              />
            </label>
            {errors.aspiringRole && <p className="error">{errors.aspiringRole}</p>}

            <label>What Industries are you interested in?:</label>
            <div className="checkbox-group">
              {industriesList.map((industry) => (
                <div key={industry} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`student-${industry}`}
                    value={industry}
                    checked={studentInfo.industries.includes(industry)}
                    onChange={(e) => handleChange(e, "student")}
                  />
                  <label htmlFor={`student-${industry}`}>{industry}</label>
                </div>
              ))}
            </div>
            {errors.industries && <p className="error">{errors.industries}</p>}

            <label>
              Pick a Persona:
              <select
                name="persona"
                value={studentInfo.persona}
                onChange={(e) => handleChange(e, "student")}
              >
                <option value="">Select</option>
                <option value="Recent College Grad">Recent College Grad</option>
                <option value="Rising Star">Rising Star</option>
                <option value="Consistent Contributor">Consistent Contributor</option>
                <option value="Fast Follower">Fast Follower</option>
                <option value="Seasoned Exec">Seasoned Exec</option>
              </select>
            </label>
            {errors.persona && <p className="error">{errors.persona}</p>}

            <label>
              Pick an Intent:
              <select
                name="intent"
                value={studentInfo.intent}
                onChange={(e) => handleChange(e, "student")}
              >
                <option value="">Select</option>
                <option value="Don't Know Yet ? open to change">Don't Know Yet ? open to change</option>
                <option value="Actively Job Hunting">Actively Job Hunting</option>
                <option value="Actively Seeking Promotion">Actively Seeking Promotion</option>
                <option value="Net to Job Industry">Net to Job Industry</option>
                <option value="Building my Professional Brand">Building my Professional Brand</option>
              </select>
            </label> Integrations
            {errors.intent && <p className="error">{errors.intent}</p>}

            {/* ===================== Integration Buttons ===================== */}
            <div className="integration-row">
              <div
                className="integration-buttons"
                style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
              >
                <button
                  type="button"
                  className="linkedin-btn"
                  onClick={() =>
                    setStudentInfo((prev) => ({ ...prev, linkedinProfile: "connected" }))
                  }
                >
                  {studentInfo.linkedinProfile ? "LinkedIn Connected" : "Connect LinkedIn"}
                </button>

                <label className={`resume-btn ${studentInfo.resumeFile ? "has-file" : ""}`}>
                  {studentInfo.resumeFile ? studentInfo.resumeFile.name : "Upload Resume"}
                  <input
                    type="file"
                    onChange={(e) =>
                      setStudentInfo((prev) => ({
                        ...prev,
                        resumeFile: e.target.files[0] || null,
                      }))
                    }
                  />
                </label>

                <button
                  type="button"
                  className="meetup-btn"
                  onClick={() =>
                    setStudentInfo((prev) => ({ ...prev, meetupAccount: "connected" }))
                  }
                >
                  {studentInfo.meetupAccount ? "Meetup Connected" : "Connect Meetup"}
                </button>
              </div>

              <div className="integration-errors">
                {errors.linkedinProfile && <p className="error">{errors.linkedinProfile}</p>}
                {errors.resumeFile && <p className="error">{errors.resumeFile}</p>}
                {errors.meetupAccount && <p className="error">{errors.meetupAccount}</p>}
              </div>
            </div>
          </div>
        )}


        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
