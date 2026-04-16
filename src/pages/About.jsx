import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/about.css";

const teamMembers = [
  {
    id: 1,
    name: "Mohammed Al-Hassan",
    role: "Geschäftsführer",
    desc: "Über 10 Jahre Erfahrung im Reinigungsservice.",
    emoji: "👨‍💼",
  },
  {
    id: 2,
    name: "Sarah Müller",
    role: "Teamleiterin",
    desc: "Expertin für Haushalts- und Büroreinigung.",
    emoji: "👩‍💼",
  },
  {
    id: 3,
    name: "Thomas Weber",
    role: "Kundenbetreuung",
    desc: "Immer für Ihre Fragen und Wünsche erreichbar.",
    emoji: "👨‍🔧",
  },
];

const ourValues = [
  {
    id: 1,
    icon: "✨",
    title: "Qualität",
    desc: "Wir liefern höchste Reinigungsqualität bei jedem Auftrag.",
  },
  {
    id: 2,
    icon: "🤝",
    title: "Vertrauen",
    desc: "Unsere Kunden können sich zu 100% auf uns verlassen.",
  },
  {
    id: 3,
    icon: "🌱",
    title: "Umweltschutz",
    desc: "Wir verwenden nur umweltfreundliche Reinigungsmittel.",
  },
  {
    id: 4,
    icon: "⏱️",
    title: "Pünktlichkeit",
    desc: "Wir halten unsere Termine zuverlässig ein.",
  },
];

const whyChooseUs = [
  { id: 1, number: "10+", label: "Jahre Erfahrung" },
  { id: 2, number: "500+", label: "Zufriedene Kunden" },
  { id: 3, number: "24/7", label: "Kundenservice" },
  { id: 4, number: "100%", label: "Zufriedenheitsgarantie" },
];

const About = () => {
  return (
    <div className="about-page">
      <h1>Über uns</h1>

      {/* HERO */}
      <section className="about-hero">
        <p>
          Ihr zuverlässiger Partner für professionelle Reinigungsdienste in
          Essen
        </p>
        <NavLink to="/contact" className="btn-yellow">
          Kontaktieren Sie uns
        </NavLink>
      </section>

      {/* STORY */}
      <section className="about-story">
        <h2>Unsere Geschichte</h2>
        <div className="about-story-container">
          <div className="about-card about-story-text">
            <p>
              Willkommen bei <strong>Clean Service Essen</strong> – Ihrem
              vertrauenswürdigen Partner für professionelle
              Reinigungsdienstleistungen im Herzen des Ruhrgebiets.
            </p>
            <p>
              Seit über 10 Jahren bieten wir erstklassige Reinigungsleistungen
              für Privathaushalte, Büros und Gewerberäume an.
            </p>
            <p>
              Mit modernster Ausrüstung und umweltfreundlichen Reinigungsmitteln
              garantieren wir ein Ergebnis, das Sie begeistern wird.
            </p>
          </div>
          <div className="about-card about-story-image">
            <span>🏢</span>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <h2>Unsere Werte</h2>
        <p className="section-subtitle">
          Worauf wir uns bei jedem Auftrag verlassen
        </p>
        <div className="values-grid">
          {ourValues.map((v) => (
            <article key={v.id} className="about-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="about-why-us">
        <h2>Warum Clean Service Essen?</h2>
        <p className="section-subtitle">Zahlen, die für sich sprechen</p>
        <div className="why-us-grid">
          {whyChooseUs.map((item) => (
            <div key={item.id} className="about-card">
              <h3 className="why-us-number">{item.number}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <h2>Unser Team</h2>
        <p className="section-subtitle">
          Lernen Sie die Menschen hinter Clean Service Essen kennen
        </p>
        <div className="team-grid">
          {teamMembers.map((m) => (
            <article key={m.id} className="about-card team-card">
              <div className="team-avatar">{m.emoji}</div>
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta about-card">
        <h2>Bereit für ein sauberes Zuhause?</h2>
        <p>Kontaktieren Sie uns noch heute für ein unverbindliches Angebot.</p>
        <div className="about-cta-buttons">
          <NavLink to="/services" className="btn-yellow">
            Unsere Services
          </NavLink>
          <NavLink to="/contact" className="btn-outline">
            Kontakt aufnehmen
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default About;
