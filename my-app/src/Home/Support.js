import { useState } from "react";
import "./css/Support.css"; // make sure this path matches your project structure

// 🔹 Support Page
function Support() {
  const [showFAQ, setShowFAQ] = useState(true); // example useState if you want to toggle FAQ

  return (
    <section className="support-section" id="support">
      <h2>Support</h2>
      <p>
        Welcome to the MyBizBrand Support Center! We're here to help you make the most of your AI-powered mentoring experience.
      </p>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li>
          <strong>How do I connect with a mentor?</strong><br />
          Visit your dashboard, choose your preferred mentor, and send a connection request.
        </li>
        <li>
          <strong>How do I track my action plan?</strong><br />
          Use the Action Plan Tracker to set goals, tasks, and reminders for your career growth.
        </li>
        <li>
          <strong>Can I update my LinkedIn or resume?</strong><br />
          Absolutely! Go to your profile to upload a new resume or reconnect your LinkedIn account anytime.
        </li>
        <li>
          <strong>How do I join mentoring circles?</strong><br />
          Navigate to the Mentoring Circles section to explore groups based on interests and industry focus.
        </li>
      </ul>

      <h3>Contact Support</h3>
      <p>If you need additional assistance, you can reach our support team here:</p>
      <ul>
        <li>Email: <a href="mailto:solutions@energyaisolutions.com">solutions@energyaisolutions.com</a></li>
        <li>Phone: +1 (555) 123-4567</li>
        <li>Live Chat: Available at the bottom-right of your dashboard</li>
      </ul>

      <h3>Tips & Resources</h3>
      <p>
        Check out our blog and tutorials for tips on resume building, networking, and getting the most out of your mentoring experience.
      </p>
    </section>
  );
}

export default Support;
