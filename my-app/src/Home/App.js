import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./css/App.css";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import ActionPlan from "./ActionPlan";
import Coaches from "./Coaches";
import Support from "./Support";
// 🔹 Navbar with logo
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/BizBrand Icon.jpg" alt="BizBrand Logo" className="logo-img" />
          <span className="logo-text">My BizBrand</span>
        </Link>
      </div>

      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="/ActionPlan">Action Plan</a></li>
        <li><a href="/coaches">Coaches</a></li>
        <li><a href="/support">Support</a></li>
      </ul>

      <div className="auth-buttons">
        <Link to="/login"><button className="login-btn">Login</button></Link>
        <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
        <button className="contact-btn">
          <a href="mailto:solutions@energyaisolutions.com" style={{ color: "black", textDecoration: "none" }}>
            Contact Us
          </a>
        </button>
      </div>
    </nav>
  );
}

// 🔹 Hero Section
function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="tagline">AI-Powered Mentoring</p>
        <h1>Personalized Coaching for Career Growth</h1>
        <p>
          MyBizBrand Coaching helps mentees achieve their goals with AI-powered action plans, 
          personalized AI coaches, and expert mentorship circles designed for real-world career success.
        </p>
        <Link to="/signup"><button className="learn-btn">Get Started</button></Link>
      </div>
      <div className="hero-image">
        <img
          src="/Homepage-Business.webp" // replace with your hero image
          alt="AI Coaching Illustration"
        />
      </div>
    </section>
  );
}

// 🔹 About Section
function About() {
  return (
    <section id="about" className="about-section">
      <h2>About MyBizBrand Coaching</h2>
      <p>
        MyBizBrand Coaching empowers mentees with AI-powered coaching, structured action plans, 
        and mentorship circles. Our platform helps users achieve career growth, build skills, 
        and connect with expert coaches tailored to their unique needs.
      </p>
    </section>
  );
}

// 🔹 Carousel Item
function CarouselItem({ title, description, img }) {
  return (
    <div className="carousel-item">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// 🔹 Carousel Component
function Carousel() {
  const items = [
    {
      title: "Personalized AI Coach",
      description: "Choose your AI persona, communication style, and engagement frequency.",
      img: "/carousel-ai-coach.webp",
    },
    {
      title: "Action Plan Tracker",
      description: "Set goals, tasks, reminders, and track your 30-60-90 day plan.",
      img: "/carousel-action-plan.webp",
    },
    {
      title: "Resume & LinkedIn Optimization",
      description: "Import your resume and get AI recommendations for career growth.",
      img: "/carousel-resume.webp",
    },
    {
      title: "Mentoring Circles",
      description: "Join targeted mentoring groups: Female/WIT, Minority, ESL, Consulting.",
      img: "/carousel-circles.webp",
    },
    {
      title: "Coach Engagement",
      description: "Request coaching, view coach profiles, and get personalized feedback.",
      img: "/carousel-coach-engagement.webp",
    },
  ];

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);

  return (
    <section id="features" className="carousel-section">
      <h2 className="services-header">Our Services</h2>
      <div className="carousel">
        <button className="carousel-btn" onClick={prev}>◀</button>
        <CarouselItem {...items[index]} />
        <button className="carousel-btn" onClick={next}>▶</button>
      </div>
    </section>
  );
}



// 🔹 Call To Action
function CallToAction() {
  return (
    <section className="cta-section" id="plans">
      <h2>Start Your Personalized Coaching Today</h2>
      <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
    </section>
  );
}

// 🔹 Footer Contact Info
function Footer() {
  return (
    <footer className="footer">
      <p>
        Contact us at:{" "}
        <a href="mailto:solutions@energyaisolutions.com">
          solutions@energyaisolutions.com
        </a>
      </p>
      <p>© {new Date().getFullYear()} My BizBrand. All rights reserved.</p>
    </footer>
  );
}

// 🔹 Home Page
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Carousel />
      <CallToAction />
      <Footer />
    </>
  );
}

// 🔹 App
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/actionplan" element={<ActionPlan />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/support" element={<Support />} />

      </Routes>
    </div>
  );
}

export default App;
