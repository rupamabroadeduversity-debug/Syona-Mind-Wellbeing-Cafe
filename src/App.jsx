import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CalendarDays, Coffee, HeartHandshake, Mail, MapPin, Menu, Music, Paintbrush, Phone, Quote, Sparkles, Star, Users, X } from 'lucide-react'
import './App.css'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

/* ─── Data ─────────────────────────────────────────────────── */
const NAV = ['Experiences','Menu','Kids','Corporate','Contact']

const REEL = [
  { src:'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80', label:'Tote Bag Painting' },
  { src:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', label:'Bake With Your Partner' },
  { src:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80', label:'Mocktail Workshop' },
  { src:'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', label:'Mini Clay Planters' },
]

const EXPERIENCES = [
  { title:'Paint Your Tote Bag',    tag:'Art Date',       price:'₹450+', age:'All ages',  img:'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80' },
  { title:'Bento Cake Workshop',    tag:'Food Workshop',  price:'₹799+', age:'All ages',  img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { title:'Mini Clay Planters',     tag:'Slow Craft',     price:'₹599+', age:'Age 8+',    img:'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80' },
  { title:'Resin Art Date',         tag:'Creative Date',  price:'₹899+', age:'Age 16+',   img:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80' },
  { title:'Mocktail Workshop',      tag:'Beverages',      price:'₹699+', age:'All ages',  img:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80' },
  { title:'Tarot & Energy Healing', tag:'Wellness',       price:'₹599+', age:'Age 16+',   img:'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80' },
]

const GALLERY = [
  { src:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&q=80', label:'Creative Summer Camp' },
  { src:'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700&q=80', label:'Hand-Built Pottery' },
  { src:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80',    label:'Bento Cake Workshop' },
  { src:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80', label:'Board Game Evenings' },
  { src:'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&q=80',    label:'Tote Bag Painting' },
  { src:'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=700&q=80',    label:'Salad Making Workshop' },
]

const MENU_ITEMS = ['Mindful Bowls','Comfort Classics','Salads & Soups','Chinese Corner','Nootropic Coffee','Probiotic Drinks','Smoothies','Artisanal Teas']

const CORPORATE_FEATURES = [
  { icon:<HeartHandshake/>, label:'Wellness-led team engagement' },
  { icon:<Paintbrush/>,     label:'Guided art & craft sessions' },
  { icon:<Music/>,          label:'Music, poetry & game evenings' },
  { icon:<Users/>,          label:'Private group dining & offsites' },
]

const REVIEWS = [
  { text:'A cafe that feels calm the moment you walk in. The food, music, and creative activities make it unlike any regular hangout.', src:'Zomato Review' },
  { text:'Perfect for a slow evening, a creative date, or just some time with yourself.', src:'Public Sentiment' },
  { text:'The workshop was beginner-friendly, warm, and beautifully organized. I left with something I made and a memory I will keep.', src:'BookMyShow Review' },
]

const STATS = [['5.0','Justdial Rating'],['4.1★','Zomato Delivery'],['2025','Founded'],['Women-led','Cafe']]

/* ─── Scroll Reveal Hook ───────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─── Animated Counter ─────────────────────────────────────── */
function Counter({ target }) {
  const [val, setVal] = useState(0)
  const ref = useRef()
  const num = parseFloat(target)
  const isNum = !isNaN(num)
  useEffect(() => {
    if (!isNum) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0; const steps = 50
      const inc = num / steps
      const t = setInterval(() => { start += inc; if (start >= num) { setVal(num); clearInterval(t) } else setVal(+start.toFixed(1)) }, 30)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [num, isNum])
  return <strong ref={ref}>{isNum ? val : target}</strong>
}

/* ─── App ──────────────────────────────────────────────────── */
export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [filter, setFilter] = useState('All')

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tags = ['All', ...new Set(EXPERIENCES.map(e => e.tag))]
  const filtered = filter === 'All' ? EXPERIENCES : EXPERIENCES.filter(e => e.tag === filter)

  return (
    <div className="site">
      {/* ── NAV ── */}
      <nav className={`topbar${scrolled ? ' scrolled' : ''}`} aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Syona Experience">
          <span>Syona</span>
          <small>Mind Wellbeing Cafe</small>
        </a>
        <ul className={`navlinks${navOpen ? ' open' : ''}`} role="list">
          {NAV.map(n => (
            <li key={n}><a href={`#${n.toLowerCase()}`} onClick={() => setNavOpen(false)}>{n}</a></li>
          ))}
          <li className="nav-social">
            <a href="https://www.instagram.com/syonaexp/" target="_blank" rel="noopener"><InstagramIcon/></a>
          </li>
        </ul>
        <div className="nav-right">
          <a className="nav-cta" href="https://wa.me/918100570018" target="_blank" rel="noopener">WhatsApp Us</a>
          <button className="hamburger" aria-label="Toggle menu" onClick={() => setNavOpen(v => !v)}>
            {navOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
        {navOpen && <div className="nav-backdrop" onClick={() => setNavOpen(false)}/>}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-video-wrap">
          <img
            className="hero-video"
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=85"
            alt="Syona Experience cafe ambience"
            style={{objectFit:'cover',width:'100%',height:'100%',position:'absolute',inset:0}}
          />
          <div className="hero-overlay"/>
        </div>
        <div className="hero-inner section-wrap">
          <div className="hero-content">
            <p className="eyebrow golden">Kolkata · Ho Chi Minh Sarani</p>
            <h1>Kolkata's<br/><em>Mind Wellbeing</em><br/>Cafe</h1>
            <p className="hero-sub">Food, art, music, workshops, and quiet corners designed to help you slow down and reconnect.</p>
            <div className="hero-actions">
              <a className="btn-primary" href="#experiences">Book an Experience <ArrowRight size={17}/></a>
              <a className="btn-ghost" href="#menu">View Food Menu</a>
            </div>
          </div>
          <div className="hero-reel">
            <div className="reel-label"><span>● Live at Syona</span></div>
            <div className="reel-track">
              {REEL.map((r, i) => (
                <figure key={r.src} className="reel-frame" style={{'--i': i}}>
                  <img src={r.src} alt={r.label} loading="lazy"/>
                  <figcaption>{r.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
        <div className="scroll-hint"><span/></div>
      </section>

      {/* ── TRUST BAND ── */}
      <div className="trust-band">
        {STATS.map(([v, l]) => (
          <div className="trust-item" key={l}>
            <Counter target={v}/>
            <span>{l}</span>
          </div>
        ))}
        <div className="trust-note">
          <Sparkles size={16}/>
          Women-led cafe · mental wellness · food · art · community
        </div>
      </div>

      {/* ── INTRO ── */}
      <section className="intro section-wrap">
        <div className="intro-kicker reveal"><Sparkles size={17}/> More than a cafe</div>
        <div className="intro-grid">
          <h2 className="reveal reveal-delay-1">A calm city pause where people eat, create, and connect.</h2>
          <div className="intro-right reveal reveal-delay-2">
            <p>Syona Experience brings together mindful cafe dining, beginner-friendly creative workshops, cultural evenings, kids programs, and warm community-led hospitality in central Kolkata.</p>
            <p className="intro-quote"><em>"Most cafes are fast-paced. Syona is a pause."</em></p>
          </div>
        </div>
        <div className="pathways">
          {[
            { icon:<Coffee size={28}/>, title:'Eat', copy:'Salads, soups, sandwiches, comfort classics, coffee, smoothies and more.' },
            { icon:<Paintbrush size={28}/>, title:'Create', copy:'Art dates, crafts, baking, candle making, clay, and painting workshops.' },
            { icon:<Users size={28}/>, title:'Connect', copy:'Open mics, music nights, poetry, meetups, wellness circles, and game evenings.' },
          ].map(p => (
            <article className="pathway-card reveal" key={p.title}>
              <div className="pathway-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section id="experiences" className="experiences">
        <div className="section-wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Featured experiences</p>
              <h2>This week at Syona</h2>
            </div>
            <a className="text-link" href="https://syonaexperience.com/activities/" target="_blank" rel="noopener">See all <ArrowRight size={16}/></a>
          </div>
          <div className="filter-bar reveal reveal-delay-1">
            {tags.map(t => (
              <button key={t} className={`filter-chip${filter === t ? ' active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
            ))}
          </div>
          <div className="exp-grid">
            {filtered.map((e, i) => (
              <article className={`exp-card reveal reveal-delay-${(i % 3) + 1}`} key={e.title}>
                <div className="exp-img-wrap">
                  <img src={e.img} alt={e.title} loading="lazy"/>
                  <span className="exp-tag">{e.tag}</span>
                </div>
                <div className="exp-body">
                  <h3>{e.title}</h3>
                  <div className="exp-meta">
                    <span><CalendarDays size={14}/> {e.age}</span>
                    <span><Star size={14}/> {e.price}</span>
                  </div>
                  <a className="exp-cta" href="https://in.bookmyshow.com/" target="_blank" rel="noopener">Book on BookMyShow <ArrowRight size={14}/></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="menu-section">
        <div className="section-wrap menu-grid">
          <div className="menu-copy reveal">
            <p className="eyebrow">Mindful morsels</p>
            <h2>Comfort food with a slower rhythm.</h2>
            <p>A cafe menu that balances familiar cravings with wellness cues — nourishing bowls, comfort plates, Chinese corner, artisanal coffee, and functional drinks.</p>
            <div className="menu-chips">
              {MENU_ITEMS.map(m => <span className="menu-chip" key={m}><Star size={13}/> {m}</span>)}
            </div>
            <div className="btn-row">
              <a className="btn-primary dark" href="https://syonaexperience.com/menu/" target="_blank" rel="noopener">View Full Menu <ArrowRight size={17}/></a>
              <a className="btn-ghost dark" href="https://www.swiggy.com/" target="_blank" rel="noopener">Order Online</a>
            </div>
          </div>
          <div className="menu-photos reveal reveal-delay-2">
            <img className="menu-img-1" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" alt="Comfort classics"/>
            <img className="menu-img-2" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" alt="Beverages"/>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery-section section-wrap">
        <div className="section-head reveal">
          <div><p className="eyebrow">Our space &amp; events</p><h2>Real Syona, real moments.</h2></div>
        </div>
        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <figure className={`gallery-item reveal reveal-delay-${(i % 4) + 1}`} key={g.src}>
              <img src={g.src} alt={g.label} loading="lazy"/>
              <figcaption>{g.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── KIDS ── */}
      <section id="kids" className="kids-section">
        <div className="section-wrap kids-grid">
          <div className="kids-visual reveal">
            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&q=80" alt="Creative summer camp"/>
            <div className="kids-badge"><CalendarDays size={16}/> 11 May – 5 June 2026</div>
          </div>
          <div className="kids-copy reveal reveal-delay-2">
            <p className="eyebrow">Kids programs</p>
            <h2>Creative summer camp for confidence, expression &amp; life skills.</h2>
            <p>A four-week program for children aged 5–14 with art, storytelling, rhythm, mindfulness, problem-solving, sustainability, money basics, and daily take-home creations.</p>
            <div className="info-pills">
              <span><CalendarDays size={15}/> Mon–Fri, 11 AM–2 PM</span>
              <span><Users size={15}/> Ages 5–14</span>
              <span><Star size={15}/> ₹1,199 onward</span>
            </div>
            <a className="btn-primary" href="https://in.bookmyshow.com/events/creative-summer-camp-for-kid/ET00498688" target="_blank" rel="noopener">Enroll Now <ArrowRight size={17}/></a>
          </div>
        </div>
      </section>

      {/* ── CORPORATE ── */}
      <section id="corporate" className="corporate-section">
        <div className="section-wrap corporate-inner">
          <div className="corporate-copy reveal">
            <p className="eyebrow light">Corporate &amp; group bookings</p>
            <h2 className="light-h2">Team sessions that feel human.</h2>
            <p>Plan intimate creative workshops, mindful offsites, employee engagement sessions, and private group experiences inside a calm cafe setting.</p>
            <a className="btn-primary marigold" href="mailto:contact@syonaexperience.com">Plan a Group Session <Mail size={17}/></a>
          </div>
          <div className="corporate-features">
            {CORPORATE_FEATURES.map((f, i) => (
              <div className={`corp-feat reveal reveal-delay-${i + 1}`} key={f.label}>
                <span className="corp-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="impact-section section-wrap">
        <div className="impact-inner reveal">
          <div className="impact-badge"><HeartHandshake size={20}/> Social Impact</div>
          <h2>A women-led cafe with purpose at the core.</h2>
          <p>Syona Experience was founded with a mission to provide dignified employment and training to women from marginalized backgrounds. Kolkata's first entirely women-run cafe, as reported by The Avenue Mail, is where social impact, mental wellness, and hospitality meet.</p>
          <a className="btn-outline-ivory" href="https://avenuemail.in/kolkatas-first-women-run-cafe-opens-in-the-city/" target="_blank" rel="noopener">Read the story <ArrowRight size={16}/></a>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="reviews-section section-wrap">
        <div className="section-head reveal">
          <div><p className="eyebrow">What guests say</p><h2>Voices from the community.</h2></div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <article className={`review-card reveal reveal-delay-${i + 1}`} key={r.src}>
              <Quote size={30} className="quote-icon"/>
              <p>{r.text}</p>
              <span>{r.src}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section section-wrap">
        <div className="contact-grid">
          <div className="contact-copy reveal">
            <p className="eyebrow">Find us</p>
            <h2>8, Ho Chi Minh Sarani,<br/>Kolkata 700071</h2>
            <p>Near Park Street / Camac Street area · 1st Floor, Harrington Mansion</p>
            <div className="contact-links">
              <a href="tel:+918100620018"><Phone size={17}/> +91 8100 620018</a>
              <a href="mailto:contact@syonaexperience.com"><Mail size={17}/> contact@syonaexperience.com</a>
              <a href="https://www.google.com/maps/search/?api=1&query=Syona+Experience+8+Ho+Chi+Minh+Sarani+Kolkata" target="_blank" rel="noopener"><MapPin size={17}/> Get Directions</a>
            </div>
          </div>
          <div className="map-wrap reveal reveal-delay-2">
            <iframe
              title="Syona Experience location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.3264!2d88.352!3d22.542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSG8gQ2hpIE1pbmggU2FyYW5pLCBLb2xrYXRh!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="300" style={{border:0}} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="section-wrap footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Syona</span>
            <small>Mind Wellbeing Cafe</small>
            <p>Crafting Calm. Curating Culture.</p>
          </div>
          <div className="footer-links">
            <h4>Explore</h4>
            <a href="#experiences">Experiences</a>
            <a href="#menu">Food Menu</a>
            <a href="#kids">Kids Programs</a>
            <a href="#corporate">Corporate</a>
          </div>
          <div className="footer-links">
            <h4>Connect</h4>
            <a href="https://www.instagram.com/syonaexp/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.facebook.com/syonaexp/" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.linkedin.com/showcase/syonaexp/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://wa.me/918100570018" target="_blank" rel="noopener">WhatsApp</a>
          </div>
          <div className="footer-contact">
            <h4>Visit</h4>
            <p>8, Ho Chi Minh Sarani<br/>Kolkata 700071</p>
            <a href="tel:+918100620018">+91 8100 620018</a>
            <a href="mailto:contact@syonaexperience.com">contact@syonaexperience.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Syona Experience Pvt. Ltd. All rights reserved.</span>
          <a href="https://syonaexperience.com" target="_blank" rel="noopener">syonaexperience.com</a>
        </div>
      </footer>

      {/* ── STICKY CTA ── */}
      <a className="sticky-wa" href="https://wa.me/918100570018" target="_blank" rel="noopener" aria-label="WhatsApp us">
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span>Chat with us</span>
      </a>
    </div>
  )
}
