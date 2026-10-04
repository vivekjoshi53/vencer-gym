import React, { useEffect, useRef, useState } from "react";
import heroVideo from "../15079739_1920_1080_30fps.mp4";
import contactVideo from "../15905003_1920_1080_25fps.mp4";

const phoneNumber = "919767765759";
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  "Hi Vencer Fitness Club! I'd like to know more about joining.",
)}`;
const address =
  "Bhumkar Das Gugre Rd, behind Yug Honda, near Laxmi Chowk Road, Phase 1, Rajiv Gandhi Infotech Park, Hinjawadi, Maharashtra 411057";
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  address,
)}`;
const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  "Vencer Fitness Club, Hinjawadi, Maharashtra 411057",
)}&output=embed`;
const galleryFilters = ["ALL", "TRAINING", "THE SPACE", "THE PEOPLE"];
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
    alt: "Strength and cardio equipment in a gym",
    category: "THE SPACE",
    title: "ROOM TO MOVE",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85",
    alt: "Athlete working through a strength session",
    category: "TRAINING",
    title: "PUT IN THE WORK",
  },
  {
    src: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=85",
    alt: "Weights ready for a gym workout",
    category: "THE SPACE",
    title: "BUILT FOR THE BASICS",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
    alt: "Person lifting weights during training",
    category: "TRAINING",
    title: "ONE MORE REP",
  },
  {
    src: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=85",
    alt: "Athlete focused on a workout",
    category: "THE PEOPLE",
    title: "SHOW UP FOR YOU",
  },
  {
    src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=85",
    alt: "Trainer supporting a gym workout",
    category: "THE PEOPLE",
    title: "BETTER, TOGETHER",
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-icon--diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.75 10h12.5M10.5 4.25 16.25 10l-5.75 5.75" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.1 11.7a8.1 8.1 0 0 1-12 7.1L4 20l1.2-4a8.1 8.1 0 1 1 14.9-4.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.4c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.6 1 1.3 1.7 2.3 2.2.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.6.8c.3.2.4.3.4.5 0 .5-.3 1-.7 1.3-.5.4-1.1.6-1.8.5-1-.1-2.3-.6-3.7-1.8-1.1-.9-1.8-2-2.2-2.9-.4-.9-.4-1.7 0-2.4.3-.4.7-.7 1.1-.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeImage, setActiveImage] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const contactVideoRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const visibleImages = galleryImages
    .map((image, index) => ({ ...image, index }))
    .filter((image) => activeFilter === "ALL" || image.category === activeFilter);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeader = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(window.scrollY > 24);
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const video = contactVideoRef.current;
    if (!video) return undefined;

    video.playbackRate = 1.5;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !prefersReducedMotion) {
        video.play().catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Could not play the contact background video.", error);
          }
        });
      } else {
        video.pause();
      }
    }, { threshold: 0.15 });

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeImage === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") {
        setActiveImage((current) => (current + 1) % galleryImages.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((current) => (current - 1 + galleryImages.length) % galleryImages.length);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("lightbox-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [activeImage]);

  const closeMenu = () => setMenuOpen(false);
  const changeLightboxImage = (direction) => {
    setActiveImage((current) => (current + direction + galleryImages.length) % galleryImages.length);
  };

  const handleGalleryTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX);
  };

  const handleGalleryTouchEnd = (event) => {
    if (touchStartX === null) return;
    const difference = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(difference) > 55) changeLightboxImage(difference < 0 ? 1 : -1);
    setTouchStartX(null);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const message = formData.get("message").trim();
    const whatsappMessage = [
      "Hi Vencer Fitness Club!",
      `My name is ${name}.`,
      phone ? `You can reach me at ${phone}.` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <header className={isScrolled ? "site-header site-header--scrolled" : "site-header"}>
        <span className="scroll-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        </span>
        <a className="wordmark" href="#home" aria-label="Vencer Fitness Club home" onClick={closeMenu}>
          <span className="wordmark__mark">V.</span>
          <span className="wordmark__text">
            VENCER <span>FITNESS CLUB</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "main-nav main-nav--open" : "main-nav"} aria-label="Main navigation">
          <a className={activeSection === "about" ? "is-active" : ""} aria-current={activeSection === "about" ? "location" : undefined} href="#about" onClick={closeMenu}>THE CLUB</a>
          <a className={activeSection === "training" ? "is-active" : ""} aria-current={activeSection === "training" ? "location" : undefined} href="#training" onClick={closeMenu}>TRAINING</a>
          <a className={activeSection === "membership" ? "is-active" : ""} aria-current={activeSection === "membership" ? "location" : undefined} href="#membership" onClick={closeMenu}>MEMBERSHIP</a>
          <a className={activeSection === "gallery" ? "is-active" : ""} aria-current={activeSection === "gallery" ? "location" : undefined} href="#gallery" onClick={closeMenu}>GALLERY</a>
          <a className={activeSection === "reviews" ? "is-active" : ""} aria-current={activeSection === "reviews" ? "location" : undefined} href="#reviews" onClick={closeMenu}>REVIEWS</a>
          <a className={activeSection === "contact" ? "is-active" : ""} aria-current={activeSection === "contact" ? "location" : undefined} href="#contact" onClick={closeMenu}>CONTACT</a>
          <a className={activeSection === "visit" ? "is-active" : ""} aria-current={activeSection === "visit" ? "location" : undefined} href="#visit" onClick={closeMenu}>FIND US</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            LET&apos;S TALK <ArrowIcon diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__image" role="img" aria-label="Athlete training in a gym" />
          <video
            className="hero__video"
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=85"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero__overlay" />
          <div className="hero__grain" />
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow"><span /> HINJAWADI, PUNE · EST. FOR YOU</p>
            <h1>FIND YOUR<br /><span>STRONGER.</span></h1>
            <p className="hero__copy">
              Good people. Solid training. A little more in the tank than you thought.
            </p>
            <div className="hero__actions">
              <a className="button button--light" href="#contact">
                COME TRAIN WITH US <ArrowIcon />
              </a>
              <a className="hero__text-link" href="#about">GET TO KNOW US <span>↓</span></a>
            </div>
          </div>
          <div className="hero__bottom">
            <span>MOVE WITH INTENT.</span>
            <span>SHOW UP. GET STRONGER.</span>
            <span className="hero__scroll">SCROLL TO EXPLORE ↓</span>
          </div>
          <div className="hero__index">01 <i /> 06</div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="intro__label reveal" data-reveal>
            <span className="section-number">01 / THE CLUB</span>
            <span className="red-line" />
            <span className="eyebrow">MORE THAN A WORKOUT</span>
          </div>
          <div className="intro__main reveal" data-reveal>
            <h2>A GOOD GYM<br />CHANGES YOUR<br /><em>WHOLE DAY.</em></h2>
            <div className="intro__aside">
              <p>
                The first rep is the hardest. The people around you make the next one easier.
                At Vencer, you&apos;ll find the kit, the coaching, and the kind of atmosphere
                that keeps you coming back.
              </p>
              <a className="text-link" href="#contact">
                YOUR FIRST STEP STARTS HERE <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="stats reveal" data-reveal>
            <div className="stat"><strong>4.7<span>/5</span></strong><small>MEMBER RATING</small></div>
            <div className="stat"><strong>367<span>+</span></strong><small>GOOGLE REVIEWS</small></div>
            <div className="stats__note">A LOCAL FAVOURITE.<br />A PLACE TO GET BETTER.</div>
          </div>
        </section>

        <section className="training" id="training">
          <div className="training__photo" role="img" aria-label="Strength training equipment" />
          <div className="training__content reveal" data-reveal>
            <span className="section-number">02 / YOUR TRAINING</span>
            <h2>BUILT AROUND<br /><em>YOUR GOALS.</em></h2>
            <p>
              Whether you&apos;re finding your feet or chasing a new personal best,
              there&apos;s room to make it your own.
            </p>
            <ul className="training-list">
              <li><span>01</span> Modern training equipment <b>↗</b></li>
              <li><span>02</span> Supportive, knowledgeable trainers <b>↗</b></li>
              <li><span>03</span> Structured workout plans <b>↗</b></li>
              <li><span>04</span> Personalised diet guidance <b>↗</b></li>
            </ul>
            <a className="button button--dark" href="#contact">
              ASK ABOUT MEMBERSHIP <ArrowIcon />
            </a>
          </div>
          <div className="training__vertical">TRAIN FOR YOURSELF — AND ONLY YOURSELF.</div>
        </section>

        <section className="membership section-pad" id="membership">
          <div className="membership__heading reveal" data-reveal>
            <div>
              <span className="section-number">03 / DEMO MEMBERSHIPS</span>
              <h2>YOUR GOALS.<br /><em>YOUR WAY IN.</em></h2>
            </div>
            <p>
              Pick a sample duration to explore. These demo prices are illustrative only;
              contact Vencer to confirm real plans, pricing, and availability.
            </p>
          </div>
          <div className="membership__grid">
            <article className="plan-card reveal" data-reveal>
              <div className="plan-card__top"><span>01</span><span className="plan-card__icon">↗</span></div>
              <p className="plan-card__eyebrow">A FLEXIBLE START</p>
              <h3>MONTHLY</h3>
              <p className="plan-card__price">₹999 <span>/ 1 month</span></p>
              <p className="plan-card__copy">A short-term sample plan to try the gym and get into a training rhythm.</p>
              <ul>
                <li>Gym access for one month</li>
                <li>Modern training equipment</li>
                <li>Ask about trainer guidance</li>
              </ul>
              <a className="plan-card__link" href="#contact">
                ASK ABOUT THIS PLAN <ArrowIcon />
              </a>
            </article>
            <article className="plan-card plan-card--featured reveal" data-reveal>
              <div className="plan-card__top"><span>02</span><span className="plan-card__tag">SAMPLE POPULAR PLAN</span></div>
              <p className="plan-card__eyebrow">BUILD A STEADY ROUTINE</p>
              <h3>QUARTERLY</h3>
              <p className="plan-card__price">₹2,699 <span>/ 3 months</span></p>
              <p className="plan-card__copy">A sample three-month option for finding consistency and building momentum.</p>
              <ul>
                <li>Gym access for three months</li>
                <li>Supportive training environment</li>
                <li>Ask about workout-plan guidance</li>
              </ul>
              <a className="plan-card__link" href="#contact">
                ASK ABOUT THIS PLAN <ArrowIcon />
              </a>
            </article>
            <article className="plan-card reveal" data-reveal>
              <div className="plan-card__top"><span>03</span><span className="plan-card__icon">✳</span></div>
              <p className="plan-card__eyebrow">MAKE IT A LONG-TERM HABIT</p>
              <h3>ANNUAL</h3>
              <p className="plan-card__price">₹8,999 <span>/ 12 months</span></p>
              <p className="plan-card__copy">A sample long-term option for making training part of your everyday life.</p>
              <ul>
                <li>Gym access for twelve months</li>
                <li>Modern training equipment</li>
                <li>Ask about diet-plan guidance</li>
              </ul>
              <a className="plan-card__link" href="#contact">
                ASK ABOUT THIS PLAN <ArrowIcon />
              </a>
            </article>
          </div>
          <div className="membership__foot reveal" data-reveal>
            <span>DEMO PRICES ONLY — EXAMPLE VALUES, NOT CONFIRMED BY VENCER. PLEASE VERIFY BEFORE PUBLISHING.</span>
            <a href="tel:+919767765759">CALL +91 97677 65759</a>
          </div>
        </section>

        <section className="gallery section-pad" id="gallery">
          <div className="gallery__heading reveal" data-reveal>
            <div>
              <span className="section-number">04 / A CLOSER LOOK</span>
              <h2>THE WORK.<br /><em>THE GOOD STUFF.</em></h2>
            </div>
            <p>A little look at the energy, effort, and everyday moments that make training feel good.</p>
          </div>
          <div className="gallery__toolbar reveal" data-reveal>
            <div className="gallery__filters" aria-label="Filter gallery photos">
              {galleryFilters.map((filter) => (
                <button
                  className={activeFilter === filter ? "gallery__filter gallery__filter--active" : "gallery__filter"}
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <span>{String(visibleImages.length).padStart(2, "0")} MOMENTS</span>
          </div>
          <div className="gallery__grid">
            {visibleImages.map((image, index) => (
              <button
                className={`gallery-card gallery-card--${index + 1}`}
                key={image.src}
                type="button"
                onClick={() => setActiveImage(image.index)}
                aria-label={`View photo: ${image.title}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span className="gallery-card__shade" />
                <span className="gallery-card__meta">
                  <span><small>{image.category}</small>{image.title}</span>
                  <span className="gallery-card__open" aria-hidden="true">↗</span>
                </span>
              </button>
            ))}
          </div>
          <p className="gallery__note">A FEEL FOR THE PLACE. COME BY AND SEE IT FOR YOURSELF.</p>
        </section>

        <section className="quote section-pad" id="reviews">
          <div className="quote__top reveal" data-reveal>
            <span className="section-number">05 / THE GOOD WORD</span>
            <div className="rating">
              <span className="rating__stars" aria-label="5 out of 5 stars">★★★★★</span>
              <span>4.7 · 367 GOOGLE REVIEWS</span>
            </div>
          </div>
          <blockquote className="reveal" data-reveal>
            “The gym feels like a second home — positive energy, supportive environment, and great facilities.”
          </blockquote>
          <div className="quote__byline reveal" data-reveal>
            <span className="quote__dash" />
            <span>DHANANJAY KOTHEKAR</span>
            <span>VENCER MEMBER</span>
          </div>
          <a className="text-link quote__link" href={mapLink} target="_blank" rel="noreferrer">
            READ WHAT MEMBERS ARE SAYING <ArrowIcon diagonal />
          </a>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="faq__intro reveal" data-reveal>
            <span className="section-number">A FEW GOOD QUESTIONS</span>
            <h2>NEW HERE?<br /><em>WE GOT YOU.</em></h2>
            <a className="text-link" href="#contact">
              ASK US ANYTHING <ArrowIcon />
            </a>
          </div>
          <div className="faq__items reveal" data-reveal>
            <details>
              <summary>Is Vencer beginner-friendly?<span>+</span></summary>
              <p>Absolutely. The trainers are there to help you find your feet, learn the equipment, and build a routine that works for you.</p>
            </details>
            <details>
              <summary>Can I get help with a workout plan?<span>+</span></summary>
              <p>Yes. The club offers structured workout plans and trainer guidance. Message the team to talk through what you&apos;re looking for.</p>
            </details>
            <details>
              <summary>Where is the club, and how do I reach you?<span>+</span></summary>
              <p>We&apos;re near Laxmi Chowk in Hinjawadi. Use the map below for directions, or message us on WhatsApp before you visit.</p>
            </details>
            <details>
              <summary>How do I ask about membership?<span>+</span></summary>
              <p>Send us a WhatsApp message or call +91 97677 65759. We&apos;ll help with current plans and membership details.</p>
            </details>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <video
            ref={contactVideoRef}
            className="contact__video"
            muted
            loop
            playsInline
            preload="none"
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85"
            aria-hidden="true"
          >
            <source src={contactVideo} type="video/mp4" />
          </video>
          <div className="contact__overlay" />
          <div className="contact__intro reveal" data-reveal>
            <span className="section-number">GOT A QUESTION?</span>
            <h2>LET&apos;S<br /><em>TALK.</em></h2>
            <p>Leave us a note and we&apos;ll open WhatsApp with your message ready to send.</p>
          </div>
          <form className="contact-form reveal" data-reveal onSubmit={handleContactSubmit}>
            <label>
              YOUR NAME
              <input name="name" type="text" autoComplete="name" placeholder="What should we call you?" required />
            </label>
            <label>
              PHONE NUMBER <span>(OPTIONAL)</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="+91" />
            </label>
            <label>
              YOUR MESSAGE
              <textarea name="message" rows="3" placeholder="Tell us what you'd like to know…" required />
            </label>
            <div className="contact-form__footer">
              <p><WhatsAppIcon /> Opens WhatsApp so you can review and send.</p>
              <button className="button button--dark" type="submit">
                SEND VIA WHATSAPP <ArrowIcon />
              </button>
            </div>
          </form>
        </section>

        <section className="visit" id="visit">
          <div className="visit__content reveal" data-reveal>
            <span className="section-number">06 / COME ON IN</span>
            <h2>YOUR NEW<br /><em>FAVOURITE</em><br />HOUR.</h2>
            <p className="visit__address">{address}</p>
            <a className="visit__phone" href="tel:+919767765759">+91 97677 65759</a>
            <div className="visit__actions">
              <a className="button button--light" href={whatsappLink} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> MESSAGE US <ArrowIcon />
              </a>
              <a className="visit__directions" href={mapLink} target="_blank" rel="noreferrer">
                GET DIRECTIONS <ArrowIcon diagonal />
              </a>
            </div>
          </div>
          <div className="map-frame">
            <iframe
              title="Map showing Vencer Fitness Club in Hinjawadi, Maharashtra"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="map-pin" href={mapLink} target="_blank" rel="noreferrer">
              <span className="map-pin__dot" />
              <span>VENCER FITNESS CLUB<small>HINJAWADI, PUNE</small></span>
              <ArrowIcon diagonal />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#home">
          <span className="wordmark__mark">V.</span>
          <span className="wordmark__text">VENCER <span>FITNESS CLUB</span></span>
        </a>
        <p>SHOW UP FOR YOU.</p>
        <span>© {new Date().getFullYear()} VENCER FITNESS CLUB · HINJAWADI, PUNE</span>
        <a className="footer-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat with Vencer Fitness Club on WhatsApp">
          <WhatsAppIcon />
        </a>
      </footer>
      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat with Vencer Fitness Club on WhatsApp">
        <WhatsAppIcon /><span>CHAT WITH US</span>
      </a>
      <button
        className={isScrolled ? "back-to-top back-to-top--visible" : "back-to-top"}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        tabIndex={isScrolled ? 0 : -1}
      >
        ↑
      </button>
      {activeImage !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gym photo gallery"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <button className="lightbox__close" type="button" aria-label="Close gallery" onClick={() => setActiveImage(null)}>×</button>
          <button
            className="lightbox__arrow lightbox__arrow--prev"
            type="button"
            aria-label="Previous image"
            onClick={() => changeLightboxImage(-1)}
          >←</button>
          <figure
            className="lightbox__figure"
            onTouchStart={handleGalleryTouchStart}
            onTouchEnd={handleGalleryTouchEnd}
          >
            <img src={galleryImages[activeImage].src} alt={galleryImages[activeImage].alt} />
            <figcaption><span>{galleryImages[activeImage].category}</span>{galleryImages[activeImage].title}</figcaption>
          </figure>
          <button
            className="lightbox__arrow lightbox__arrow--next"
            type="button"
            aria-label="Next image"
            onClick={() => changeLightboxImage(1)}
          >→</button>
          <span className="lightbox__count">{String(activeImage + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}</span>
        </div>
      )}
    </>
  );
}

export default App;
