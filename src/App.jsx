import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

/* ─── Skill Bar ─────────────────────────────────────────────────────────── */
function SkillBar({ name, percentage }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(percentage) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [percentage])

  return (
    <div ref={ref} className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

/* ─── Reveal wrapper ─────────────────────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Project data ───────────────────────────────────────────────────────── */
const PROJECTS = [
  { num: '01', title: 'Django Blog Platform', tags: ['Django', 'Python', 'SQLite3'], desc: 'Full-featured blogging platform with user auth, CRUD posts, comments, and an admin dashboard.', color: 'rgba(0,229,255,0.15)' },
  { num: '02', title: 'REST API Backend', tags: ['Django REST', 'Python', 'SQL'], desc: 'Clean RESTful API with token authentication, serializers, and paginated endpoints.', color: 'rgba(124,58,237,0.18)' },
  { num: '03', title: 'React Frontend App', tags: ['React', 'JavaScript', 'CSS'], desc: 'Dynamic SPA with component-based architecture, state management, and API integration.', color: 'rgba(34,197,94,0.15)' },
  { num: '04', title: 'Inventory Manager', tags: ['Python', 'SQLite3', 'Django'], desc: 'Web-based inventory system with product tracking, stock alerts, and reporting.', color: 'rgba(234,179,8,0.15)' },
  { num: '05', title: 'Full-Stack Task App', tags: ['React', 'Django', 'REST API'], desc: 'Full-stack task manager with React frontend consuming a Django REST API backend.', color: 'rgba(239,68,68,0.15)' },
  { num: '06', title: 'Data Analytics Tool', tags: ['Python', 'SQL', 'Data'], desc: 'Python-powered analytics tool querying SQL databases and generating reports.', color: 'rgba(20,184,166,0.15)' },
]

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  /* Cursor — single rAF loop via refs, never re-created */
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    document.addEventListener('mousemove', onMove)

    let rafId
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.current.x - 6}px, ${mouse.current.y - 6}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      }
      rafId = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    try {
      await emailjs.send(
        'service_tbc0jks',
        'template_z9mxte9',
        { from_name: formData.name, from_email: formData.email, message: formData.message, to_name: 'Siddharth Ghode' },
        'Dp4m2cG-reHmBLOd4'
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const navLinks = ['about', 'projects', 'skills', 'contact']

  return (
    <>
      {/* ── Custom cursor (desktop only) ── */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* ── Navigation ── */}
      <nav>
        <div className="nav-logo">&lt;<span>siddharth</span>/&gt;</div>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l}><a href={`#${l}`}>{l}</a></li>
          ))}
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {navLinks.map(l => (
            <li key={l}>
              <a href={`#${l}`} onClick={() => setMenuOpen(false)}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Hero ── */}
      <section id="hero">
        <div className="hero-tag">Available for work</div>
        <h1 className="hero-name">
          Siddharth<br />
          <span className="outline">Ghode.</span>
        </h1>
        <p className="hero-desc">
          Python &amp; Django developer who loves building clean, reliable web applications —
          from robust backend APIs to sharp React frontends backed by solid SQL databases.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View Projects →</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </div>
        <div className="hero-scroll">Scroll down</div>
        <div className="hero-status">
          <span className="status-dot" />
          Open to opportunities
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <div className="section-inner">
          <div className="section-label" data-num="01">About</div>
          <Reveal><h2 className="section-title">A bit about me.</h2></Reveal>
          <div className="about-grid">
            <Reveal className="about-text" delay={100}>
              <p>Hey! I'm <strong>Siddharth Ghode</strong>, a developer passionate about building clean, efficient web applications with <strong>Python and Django</strong> at the core.</p>
              <p>I specialize in <strong>backend development</strong> — crafting scalable Django apps, RESTful APIs, and working with SQL &amp; SQLite3 databases — while also building interactive frontends with <strong>React</strong>.</p>
              <p>I love turning ideas into well-structured, maintainable code and I'm always looking for new challenges to tackle.</p>
            </Reveal>
            <div className="about-stats">
              {[['Python','Primary Language'],['Django','Main Framework'],['React','Frontend Stack'],['SQL','Database Expertise']].map(([num, label], i) => (
                <Reveal key={num} delay={i * 80}>
                  <div className="stat-card">
                    <div className="stat-num">{num}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects">
        <div className="section-inner">
          <div className="section-label" data-num="02">Projects</div>
          <Reveal><h2 className="section-title">Things I've built.</h2></Reveal>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="project-card">
                  <div className="project-thumb">
                    <div className="project-num">{p.num}</div>
                    <div className="project-glow" style={{ '--glow': p.color }} />
                  </div>
                  <div className="project-body">
                    <div className="project-tags">
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="project-title">{p.title}</div>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-links">
                      <a href="https://github.com/siddharthghode" target="_blank" rel="noreferrer">GitHub ↗</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills">
        <div className="section-inner">
          <div className="section-label" data-num="03">Skills</div>
          <Reveal><h2 className="section-title">My toolkit.</h2></Reveal>
          <div className="skills-container">
            <Reveal delay={0}>
              <div className="skill-group-title">Backend</div>
              <SkillBar name="Python" percentage={90} />
              <SkillBar name="Django" percentage={88} />
              <SkillBar name="Django REST Framework" percentage={82} />
              <SkillBar name="REST APIs" percentage={85} />
            </Reveal>
            <Reveal delay={100}>
              <div className="skill-group-title">Frontend</div>
              <SkillBar name="React" percentage={78} />
              <SkillBar name="JavaScript" percentage={75} />
              <SkillBar name="HTML / CSS" percentage={80} />
            </Reveal>
            <Reveal delay={200}>
              <div className="skill-group-title">Database &amp; Tools</div>
              <SkillBar name="SQL" percentage={85} />
              <SkillBar name="SQLite3" percentage={88} />
              <SkillBar name="Git / GitHub" percentage={85} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="section-inner">
          <div className="section-label" data-num="04">Contact</div>
          <Reveal><h2 className="section-title">Let's work together.</h2></Reveal>
          <div className="contact-inner">
            <Reveal className="contact-text" delay={100}>
              <p>Have a project in mind or just want to say hi? My inbox is always open. I'll get back to you as soon as possible.</p>
              <div className="contact-links">
                <a href="mailto:siddharthghode59911@gmail.com" className="contact-link">
                  <div className="contact-icon">@</div>
                  siddharthghode59911@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/siddharth-ghode-7641a5272" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-icon">in</div>
                  linkedin.com/in/siddharth-ghode
                </a>
                <a href="https://github.com/siddharthghode" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-icon">gh</div>
                  github.com/siddharthghode
                </a>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <form className="contact-form" onSubmit={handleSubmit}>
                {[
                  { label: 'Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
                ].map(f => (
                  <div key={f.name} className="form-group">
                    <label className="form-label">{f.label}</label>
                    <input
                      className="form-input"
                      type={f.type}
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleInput}
                      placeholder={f.placeholder}
                      required
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleInput}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message →'}
                </button>
                {submitStatus === 'success' && <p className="form-success">✓ Message sent successfully!</p>}
                {submitStatus === 'error' && <p className="form-error">✗ Failed to send. Please try again.</p>}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-copy">© 2026 Siddharth Ghode — Designed &amp; Built with care</div>
        <a href="#hero" className="footer-back">↑ Back to top</a>
      </footer>
    </>
  )
}
