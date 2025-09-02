// src/ActionPlan.js
import React from "react";
import "./css/ActionPlan.css";

export default function ActionPlan() {
  // Example placeholder goals/tasks
  const goals = [
    { id: 1, title: "Update Resume", due: "2025-09-10" },
    { id: 2, title: "Set 30-day skill goal", due: "2025-09-15" },
    { id: 3, title: "Schedule coaching session", due: "2025-09-20" },
  ];

  const tasks = [
    { id: 1, task: "Complete onboarding survey" },
    { id: 2, task: "Select AI Coach Persona" },
    { id: 3, task: "Review 30-60-90 Day Action Plan" },
  ];

  return (
    <div className="actionplan-container">
      <header className="actionplan-hero">
        <h1>Your Action Plan</h1>
        <p>
          Track your goals, tasks, and AI recommendations to reach your career milestones.
        </p>
      </header>

      <section className="actionplan-section">
        <h2>Goals</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              <strong>{goal.title}</strong> – due {goal.due}
            </li>
          ))}
        </ul>
      </section>

      <section className="actionplan-section">
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.task}</li>
          ))}
        </ul>
      </section>

      <section className="actionplan-section">
        <h2>AI Recommendations</h2>
        <p>
          Based on your progress, your AI coach suggests completing your resume update and scheduling your next coaching session.
        </p>
      </section>

      <button className="cta-btn">Update Action Plan</button>
    </div>
  );
}
