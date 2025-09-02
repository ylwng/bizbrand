// src/Coaches.js
import { useState } from "react";
import "./css/Coaches.css";

export default function Coaches() {
  // Sample coach data
  const [coaches] = useState([
    {
      id: 1,
      name: "Alicia Moniz",
      persona: "Seasoned Exec",
      industry: "Tech & Data",
      bio: "Expert in scaling startups and mentoring young professionals.",
      image: "/Alicia_pfp.jpeg",
    },
    {
      id: 2,
      name: "Ling Wang",
      persona: "Rising Star",
      industry: "Computer Science",
      bio: "Passionate about career development and leadership training.",
      image: "/ling_pfp.jpeg",
    },
    {
      id: 3,
      name: "David Lee",
      persona: "Fast Follower",
      industry: "Finance",
      bio: "Helps mentees navigate career transitions and growth strategies.",
      image: "/.webp",
    },
  ]);

  return (
    <div className="coaches-container">
      <h2>Meet Our Coaches</h2>
      <div className="coaches-list">
        {coaches.map((coach) => (
          <div key={coach.id} className="coach-card">
            <img src={coach.image} alt={coach.name} />
            <h3>{coach.name}</h3>
            <p><strong>Persona:</strong> {coach.persona}</p>
            <p><strong>Industry:</strong> {coach.industry}</p>
            <p>{coach.bio}</p>
            <button className="request-btn">Request Coaching</button>
          </div>
        ))}
      </div>
    </div>
  );
}
