import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const C = {
  green:  "#2d7a2d",
  lime:   "#7ec820",
  yellow: "#f5c400",
  cream:  "#fffbe8",
  dark:   "#1a2e0a",
  white:  "#ffffff",
};

const NAV_H = 64; // navbar height in px

/* ─────────────────────────────────────────────
   PROFESSIONAL SVG ICONS
───────────────────────────────────────────── */
const Icon = ({ name, size = 24, color = "currentColor", strokeWidth = 1.6 }) => {
  const s = { width: size, height: size, display: "block" };
  const p = { fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    // Navbar
    home:       <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></>,
    info:       <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill={color}/></>,
    grid:       <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    star:       <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    mail:       <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></>,
    // Services
    juice:      <><path d="M8 2h8l1 5H7L8 2z"/><path d="M7 7c0 8 2 13 5 13s5-5 5-13"/><line x1="5" y1="11" x2="19" y2="11"/></>,
    soda:       <><path d="M6 2h12v4l1 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 6V2z"/><line x1="6" y1="8" x2="18" y2="8"/><path d="M9 12h.01M12 12h.01M15 12h.01"/></>,
    bakery:     <><path d="M12 2C8 2 5 5 5 8c0 2.5 1.5 4.5 3.5 5.5V18h7v-4.5C17.5 12.5 19 10.5 19 8c0-3-3-6-7-6z"/><line x1="8.5" y1="18" x2="15.5" y2="18"/><line x1="9" y1="21" x2="15" y2="21"/></>,
    fastfood:   <><path d="M3 11h18M3 11C3 7 6 4 12 4s9 3 9 7"/><path d="M5 11v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="4" x2="12" y2="2"/></>,
    hotel:      <><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>,
    wholesale:  <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    // Features
    price:      <><circle cx="12" cy="12" r="10"/><path d="M9.5 9.5h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H14"/><line x1="12" y1="7" x2="12" y2="9.5"/><line x1="12" y1="15.5" x2="12" y2="17"/></>,
    quality:    <><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></>,
    store:      <><path d="M3 9l1-5h16l1 5"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><rect x="9" y="14" width="6" height="6" rx="0.5"/></>,
    location:   <><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></>,
    // Contact
    phone:      <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></>,
    mobile:     <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
    envelope:   <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></>,
    mappin:     <><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></>,
    globe:      <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12 15.3 15.3 0 0 1 12 2z"/></>,
    send:       <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check:      <><polyline points="20 6 9 17 4 12"/></>,
    menu:       <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    close:      <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevron:    <><polyline points="6 9 12 15 18 9"/></>,
    leaf:       <><path d="M2 22c1-4 4-7 7-8.5C14 12 20 8 20 2c-4 4-8 5-12 7-2.5 1.5-4.5 4-6 6.5z"/><path d="M6 18c1-3 3-5 6-6"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" style={s} {...p}>
      {paths[name] || null}
    </svg>
  );
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
  { icon: "juice",    title: "Juice Company Supplies",  desc: "Fresh fruit ingredients and packaging supplies for juice businesses." },
  { icon: "soda",     title: "Soda Company Supplies",   desc: "Soda syrups, bulk concentrates, and equipment essentials." },
  { icon: "bakery",   title: "Bakery Items",            desc: "Flours, flavors, baking essentials, and finishing ingredients." },
  { icon: "fastfood", title: "Fast Food Supplies",      desc: "Everything fast food outlets need to keep operations running." },
  { icon: "hotel",    title: "Hotel Supplies",          desc: "Bulk provisions and daily-use items tailored for hotels." },
  { icon: "wholesale",title: "Retail & Wholesale",      desc: "Serving both individual customers and bulk business buyers." },
];

const FEATURES = [
  { icon: "price",    title: "Lowest Prices",       desc: "We keep prices unbeatable so your business saves more every day." },
  { icon: "quality",  title: "Top Quality",          desc: "Every product meets high standards — freshness and quality, always." },
  { icon: "store",    title: "All Under One Roof",   desc: "No need to visit multiple shops — everything in one place." },
  { icon: "location", title: "Central Location",     desc: "Periyakadai Street, Trichy — easy to reach from all areas." },
];

const MARQUEE = [
  "Fresh Juice Company","Soda Company","Bakery Items",
  "Fast Food Supplies","Hotel Essentials","Best Prices in Trichy","Top Quality Guaranteed",
];

const FRUIT_POS = [
  { top:"8%",  left:"5%",  d:"0s"   },{ top:"20%",left:"88%",d:"1.2s" },
  { top:"60%", left:"3%",  d:"2.4s" },{ top:"75%",left:"80%",d:"0.8s" },
  { top:"40%", left:"92%", d:"3s"   },{ top:"85%",left:"20%",d:"1.8s" },
  { top:"5%",  left:"55%", d:"2s"   },{ top:"50%",left:"10%",d:"0.4s" },
];
const FRUIT_ICONS = ["leaf","leaf","quality","location","globe","price","quality","leaf"];

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'Nunito',sans-serif; background:${C.cream}; color:${C.dark}; overflow-x:hidden; }
  a { text-decoration:none; }
  section, [id] { scroll-margin-top:${NAV_H}px; }

  @keyframes floatDot {
    0%,100% { transform:translateY(0) scale(1); opacity:.18; }
    50%      { transform:translateY(-22px) scale(1.1); opacity:.28; }
  }
  @keyframes fadeDown {
    from { opacity:0; transform:translateY(-24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes marqueeScroll {
    from { transform:translateX(0); }
    to   { transform:translateX(-50%); }
  }
  @keyframes bounceArrow {
    0%,100% { transform:translateX(-50%) translateY(0); }
    50%     { transform:translateX(-50%) translateY(8px); }
  }
  @keyframes toastIn  { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
  @keyframes toastOut { from{opacity:1;transform:translateY(0)}    to{opacity:0;transform:translateY(60px)} }

  .a1-float  { animation:floatDot 7s ease-in-out infinite; }
  .a1-fade   { animation:fadeDown .85s ease both; }
  .a1-mq     { animation:marqueeScroll 22s linear infinite; }
  .a1-bounce { animation:bounceArrow 2s infinite; }

  .a1-card { transition:border-color .25s,transform .25s,box-shadow .25s; cursor:default; }
  .a1-card:hover {
    border-color:${C.lime} !important;
    transform:translateY(-7px) !important;
    box-shadow:0 20px 44px rgba(45,122,45,.14) !important;
  }
  .a1-feat:hover { background:rgba(255,255,255,.15) !important; }
  .a1-btn { transition:transform .2s,box-shadow .2s; }
  .a1-btn:hover { transform:translateY(-3px) !important; box-shadow:0 12px 32px rgba(0,0,0,.22) !important; }
  .a1-submit:hover { background:${C.lime} !important; transform:translateY(-2px); }
  .a1-input:focus { border-color:${C.lime} !important; outline:none; }
  .a1-navlink { transition:color .2s; background:none; border:none; cursor:pointer; font-family:'Nunito',sans-serif; }
  .a1-navlink:hover { color:${C.yellow} !important; }

  @media(max-width:900px){
    .a1-2col { grid-template-columns:1fr !important; gap:36px !important; }
    .a1-3col { grid-template-columns:1fr 1fr !important; }
    .a1-4col { grid-template-columns:1fr 1fr !important; }
  }
  @media(max-width:560px){
    .a1-navlinks { display:none !important; }
    .a1-3col,.a1-4col { grid-template-columns:1fr !important; }
    .a1-hero-btns { flex-direction:column !important; align-items:center !important; }
  }
`;

/* ─────────────────────────────────────────────
   SCROLL HELPER
───────────────────────────────────────────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_H, behavior: "smooth" });
}

/* ─────────────────────────────────────────────
   SHARED ATOMS
───────────────────────────────────────────── */
const Tag = ({ children, onDark }) => (
  <span style={{
    display:"inline-block",
    background: onDark ? C.yellow : C.lime,
    color: C.dark, fontSize:10, fontWeight:800,
    letterSpacing:3, textTransform:"uppercase",
    padding:"5px 14px", borderRadius:4, marginBottom:14,
  }}>{children}</span>
);

const H2 = ({ children, light }) => (
  <h2 style={{
    fontFamily:"'Playfair Display',serif",
    fontSize:"clamp(26px,5vw,42px)", fontWeight:900,
    color: light ? C.white : C.dark, lineHeight:1.15, marginBottom:14,
  }}>{children}</h2>
);

const PrimaryBtn = ({ href, onClick, children }) => (
  <a href={href || "#"} onClick={onClick} className="a1-btn" style={{
    display:"inline-flex", alignItems:"center", gap:8,
    padding:"13px 30px", borderRadius:50, fontWeight:700, fontSize:15,
    background:C.yellow, color:C.dark,
    boxShadow:"0 6px 24px rgba(245,196,0,.42)",
  }}>{children}</a>
);

const OutlineBtn = ({ href, children }) => (
  <a href={href || "#"} className="a1-btn" style={{
    display:"inline-flex", alignItems:"center", gap:8,
    padding:"13px 30px", borderRadius:50, fontWeight:700, fontSize:15,
    background:"transparent", color:C.white,
    border:"2px solid rgba(255,255,255,.45)",
  }}>{children}</a>
);

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const NAV_LINKS = [
  { id:"about",    label:"About",    icon:"info"  },
  { id:"services", label:"Services", icon:"grid"  },
  { id:"why-us",   label:"Why Us",   icon:"star"  },
  { id:"contact",  label:"Contact",  icon:"mail"  },
];

function Navbar({ active }) {
  const [mopen, setMopen] = useState(false);
  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:`0 32px`, height:NAV_H,
        background:"rgba(20,42,8,.92)", backdropFilter:"blur(14px)",
        borderBottom:"1px solid rgba(255,255,255,.07)",
      }}>
        {/* Brand */}
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ display:"flex", alignItems:"center", justifyContent:"center",
            width:36, height:36, background:C.yellow, borderRadius:8 }}>
            <Icon name="leaf" size={20} color={C.dark} strokeWidth={2} />
          </span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color:C.white }}>
            <span style={{ color:C.yellow }}>A1</span> Essence Martt
          </span>
        </button>

        {/* Desktop links */}
        <div className="a1-navlinks" style={{ display:"flex", gap:4 }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="a1-navlink"
              style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"8px 14px", borderRadius:8,
                color: active === l.id ? C.yellow : "rgba(255,255,255,.72)",
                fontSize:14, fontWeight:600,
                background: active === l.id ? "rgba(245,196,0,.1)" : "transparent",
              }}>
              <Icon name={l.icon} size={15} color={active === l.id ? C.yellow : "rgba(255,255,255,.6)"} strokeWidth={1.8} />
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMopen(o => !o)}
          style={{ display:"none", background:"none", border:"none", cursor:"pointer", color:C.white }}
          className="a1-hamburger">
          <Icon name={mopen ? "close" : "menu"} size={24} color={C.white} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mopen && (
        <div style={{
          position:"fixed", top:NAV_H, left:0, right:0, zIndex:190,
          background:"rgba(20,42,8,.97)", borderBottom:`2px solid ${C.lime}`,
          display:"flex", flexDirection:"column",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => { scrollTo(l.id); setMopen(false); }}
              style={{
                display:"flex", alignItems:"center", gap:12, padding:"16px 28px",
                background:"none", border:"none", cursor:"pointer",
                color: active === l.id ? C.yellow : "rgba(255,255,255,.8)",
                fontSize:16, fontWeight:600, fontFamily:"'Nunito',sans-serif",
                borderBottom:"1px solid rgba(255,255,255,.06)",
              }}>
              <Icon name={l.icon} size={18} color={active === l.id ? C.yellow : "rgba(255,255,255,.6)"} />
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`.a1-hamburger{display:none!important} @media(max-width:560px){.a1-hamburger{display:flex!important}}`}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{
      background:"linear-gradient(140deg,#0f3300 0%,#1e5c1e 40%,#4a9400 100%)",
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      textAlign:"center", padding:`${NAV_H + 40}px 24px 80px`,
      position:"relative", overflow:"hidden",
    }}>
      {/* Radial glow */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 70% 50% at 50% 65%,rgba(126,200,32,.18) 0%,transparent 70%)" }} />

      {/* Floating icon orbs */}
      {FRUIT_POS.map((p, i) => (
        <div key={i} className="a1-float" style={{
          position:"absolute", pointerEvents:"none",
          top:p.top, left:p.left, animationDelay:p.d,
          width:44, height:44, borderRadius:"50%",
          background:"rgba(126,200,32,.13)",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <Icon name={FRUIT_ICONS[i]} size={22} color="rgba(255,255,255,.55)" strokeWidth={1.4} />
        </div>
      ))}

      <span className="a1-fade" style={{ animationDelay:"0s",
        display:"inline-flex", alignItems:"center", gap:6,
        background:C.yellow, color:C.dark, fontSize:11, fontWeight:800,
        letterSpacing:2, textTransform:"uppercase",
        padding:"6px 16px", borderRadius:50, marginBottom:24 }}>
        <Icon name="mappin" size={13} color={C.dark} strokeWidth={2.2} /> Trichy, Tamil Nadu
      </span>

      <h1 className="a1-fade" style={{ animationDelay:"0.1s",
        fontFamily:"'Playfair Display',serif",
        fontSize:"clamp(50px,11vw,104px)", fontWeight:900,
        color:C.white, lineHeight:1, letterSpacing:-3 }}>
        <span style={{ color:C.yellow, textShadow:"0 0 50px rgba(245,196,0,.45)" }}>A1</span> Essence
      </h1>

      <div className="a1-fade" style={{ animationDelay:"0.18s",
        fontSize:"clamp(18px,4vw,30px)", color:C.lime, fontWeight:700,
        marginTop:4, letterSpacing:6, textTransform:"uppercase" }}>Martt</div>

      <p className="a1-fade" style={{ animationDelay:"0.28s",
        marginTop:20, fontSize:"clamp(14px,2vw,18px)",
        color:"rgba(255,255,255,.78)", maxWidth:540, lineHeight:1.8 }}>
        Fresh juices · Bakery delights · Hotel &amp; restaurant supplies —
        all at the lowest prices, quality guaranteed.
      </p>

      <div className="a1-fade a1-hero-btns" style={{ animationDelay:"0.38s",
        marginTop:38, display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
        <PrimaryBtn onClick={(e)=>{ e.preventDefault(); scrollTo("contact"); }}>
          <Icon name="phone" size={17} color={C.dark} strokeWidth={2} /> Call Us Now
        </PrimaryBtn>
        <OutlineBtn href="#" onClick={(e)=>{ e.preventDefault(); scrollTo("services"); }}>
          <Icon name="grid" size={17} color={C.white} strokeWidth={2} /> Our Services
        </OutlineBtn>
      </div>

      <div className="a1-bounce" style={{
        position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
        color:"rgba(255,255,255,.3)", display:"flex", flexDirection:"column", alignItems:"center", gap:2,
      }}>
        <Icon name="chevron" size={22} color="rgba(255,255,255,.3)" strokeWidth={2} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div style={{ background:C.yellow, padding:"11px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div className="a1-mq" style={{ display:"inline-flex", alignItems:"center" }}>
        {items.map((item, i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:8,
            fontWeight:700, fontSize:13, color:C.dark, padding:"0 24px", letterSpacing:.5 }}>
            <Icon name="leaf" size={14} color={C.green} strokeWidth={2} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ background:C.white, padding:"80px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="a1-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <Tag>Who We Are</Tag>
            <H2>Trichy's Trusted Wholesale &amp; Retail Martt</H2>
            <p style={{ fontSize:16, lineHeight:1.9, color:"#4a4a4a", marginBottom:16 }}>
              A1 Essence Martt has been serving juice companies, soda companies, bakeries, fast food outlets, and hotels across Tiruchirappalli with all essential supplies — at the most competitive prices in town.
            </p>
            <p style={{ fontSize:16, lineHeight:1.9, color:"#4a4a4a", marginBottom:28 }}>
              Located in the heart of Periyakadai Street, we combine quality products with reliable service — making us the go-to partner for businesses and households across Trichy.
            </p>
            <a href="tel:+919842566001" className="a1-btn" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"13px 30px", borderRadius:50, fontWeight:700, fontSize:15,
              background:C.yellow, color:C.dark, boxShadow:"0 6px 24px rgba(245,196,0,.38)",
            }}>
              <Icon name="mobile" size={17} color={C.dark} strokeWidth={2} /> 98425 66001
            </a>
          </div>
          <div style={{
            background:`linear-gradient(135deg,${C.green},${C.lime})`,
            borderRadius:28, padding:"52px 40px", textAlign:"center",
            color:"white", position:"relative", overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", width:220, height:220,
              background:"rgba(255,255,255,.07)", borderRadius:"50%", top:-70, right:-70,
            }}/>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
              <div style={{ width:72, height:72, background:"rgba(255,255,255,.18)",
                borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name="store" size={36} color="white" strokeWidth={1.4} />
              </div>
            </div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, marginBottom:10 }}>
              Serving Trichy Since Day One
            </h3>
            <p style={{ fontSize:14, opacity:.85, lineHeight:1.75 }}>
              One-stop shop for all your juice, bakery, soda, fast food, and hotel supply needs — fresh, affordable, and always available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{ background:C.cream, padding:"80px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Tag>What We Offer</Tag>
        <H2>Everything Your Business Needs</H2>
        <div className="a1-3col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginTop:28 }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="a1-card" style={{
              background:C.white, borderRadius:20, padding:"32px 26px",
              textAlign:"center", border:"2px solid transparent",
            }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
                <div style={{ width:60, height:60, borderRadius:16,
                  background:`linear-gradient(135deg,${C.green}22,${C.lime}33)`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name={s.icon} size={28} color={C.green} strokeWidth={1.5} />
                </div>
              </div>
              <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8, color:C.green }}>{s.title}</h3>
              <p style={{ fontSize:13.5, color:"#666", lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
function Features() {
  return (
    <section id="why-us" style={{ background:C.green, padding:"80px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Tag onDark>Why Choose Us</Tag>
        <H2 light>The A1 Advantage</H2>
        <div className="a1-4col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, marginTop:28 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="a1-feat" style={{
              background:"rgba(255,255,255,.09)", borderRadius:18, padding:"28px 22px",
              border:"1px solid rgba(255,255,255,.12)", transition:"background .2s",
            }}>
              <div style={{ width:52, height:52, borderRadius:14,
                background:"rgba(255,255,255,.15)", display:"flex",
                alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                <Icon name={f.icon} size={26} color="white" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize:16, fontWeight:700, color:"white", marginBottom:8 }}>{f.title}</h3>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.7)", lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
const INFO_ROWS = [
  { icon:"phone",    label:"Phone",   content: <a href="tel:04312710081"             style={{color:C.green}}>0431-2710081</a> },
  { icon:"mobile",   label:"Mobile",  content: <a href="tel:+919842566001"           style={{color:C.green}}>98425 66001</a> },
  { icon:"envelope", label:"Email",   content: <a href="mailto:a1essencemartt@gmail.com" style={{color:C.green}}>a1essencemartt@gmail.com</a> },
  { icon:"mappin",   label:"Address", content: <span>51, Pondukadai Santhu, Guruviyan Kulatheru,<br/>Andal Mettal Opposite, Periyakadai Street,<br/>Tiruchirappalli – 8</span> },
  { icon:"globe",    label:"Website", content: <a href="http://www.a1essencemartt.webs.com" target="_blank" rel="noreferrer" style={{color:C.green}}>www.a1essencemartt.webs.com</a> },
];

function Contact({ showToast }) {
  const [form, setForm] = useState({ name:"", phone:"", need:"", msg:"" });
  const change = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) { alert("Please enter your name and phone number."); return; }
    showToast();
    setForm({ name:"", phone:"", need:"", msg:"" });
  };
  const inp = {
    width:"100%", padding:"12px 16px", border:`2px solid #dde8d0`,
    borderRadius:10, fontFamily:"'Nunito',sans-serif", fontSize:15,
    background:"white", transition:"border-color .2s",
  };
  const lbl = { display:"block", fontSize:11, fontWeight:800, marginBottom:6,
    color:"#888", textTransform:"uppercase", letterSpacing:.8 };

  return (
    <section id="contact" style={{ background:C.white, padding:"80px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Tag>Reach Us</Tag>
        <H2>Let's Connect</H2>
        <div className="a1-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start", marginTop:28 }}>

          {/* Info */}
          <div>
            <p style={{ fontSize:15, color:"#555", lineHeight:1.85, marginBottom:28 }}>
              Visit us, call us, or send us a message — we're always happy to help you find exactly what you need.
            </p>
            {INFO_ROWS.map((r, i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:20 }}>
                <div style={{
                  width:46, height:46, background:`${C.lime}22`,
                  border:`1.5px solid ${C.lime}55`,
                  borderRadius:12, display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0,
                }}>
                  <Icon name={r.icon} size={20} color={C.green} strokeWidth={1.7} />
                </div>
                <div>
                  <strong style={{ display:"block", fontSize:11, textTransform:"uppercase",
                    letterSpacing:1, color:"#aaa", marginBottom:2 }}>{r.label}</strong>
                  <span style={{ fontSize:14.5, fontWeight:600, color:C.dark }}>{r.content}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background:C.cream, borderRadius:24, padding:"40px 32px",
            border:`1px solid ${C.lime}44` }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, marginBottom:24 }}>
              Send a Message
            </h3>
            {[
              { name:"name",  label:"Your Name",   placeholder:"e.g. Ravi Kumar",  type:"text" },
              { name:"phone", label:"Phone Number", placeholder:"e.g. 98765 43210", type:"tel"  },
            ].map(f => (
              <div key={f.name} style={{ marginBottom:18 }}>
                <label style={lbl}>{f.label}</label>
                <input className="a1-input" name={f.name} value={form[f.name]}
                  onChange={change} placeholder={f.placeholder} type={f.type} style={inp} />
              </div>
            ))}
            <div style={{ marginBottom:18 }}>
              <label style={lbl}>I Need</label>
              <select className="a1-input" name="need" value={form.need} onChange={change} style={inp}>
                <option value="">Select a category</option>
                {["Juice Company Supplies","Soda Company Supplies","Bakery Items",
                  "Fast Food Supplies","Hotel Supplies","Other"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:22 }}>
              <label style={lbl}>Message</label>
              <textarea className="a1-input" name="msg" value={form.msg} onChange={change}
                placeholder="Tell us what you're looking for..."
                style={{ ...inp, height:100, resize:"none" }} />
            </div>
            <button onClick={submit} className="a1-submit" style={{
              width:"100%", background:C.green, color:"white",
              fontSize:15, padding:14, borderRadius:50,
              fontFamily:"'Nunito',sans-serif", cursor:"pointer",
              fontWeight:700, border:"none", transition:"background .2s,transform .2s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              <Icon name="send" size={17} color="white" strokeWidth={2} />
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:C.dark, color:"rgba(255,255,255,.65)",
      textAlign:"center", padding:"44px 24px", fontSize:14, lineHeight:2 }}>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:10, marginBottom:8 }}>
        <div style={{ width:36, height:36, background:C.yellow, borderRadius:8,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name="leaf" size={18} color={C.dark} strokeWidth={2.2} />
        </div>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:26,
          color:C.yellow, fontWeight:900 }}>A1 Essence Martt</span>
      </div>
      51, Pondukadai Santhu, Periyakadai Street, Trichy – 8<br />
      <a href="tel:+919842566001" style={{ color:C.lime }}>98425 66001</a>
      &nbsp;·&nbsp;
      <a href="mailto:a1essencemartt@gmail.com" style={{ color:C.lime }}>a1essencemartt@gmail.com</a>
      <br /><br />
      <span style={{ opacity:.35, fontSize:11, letterSpacing:1 }}>© 2025 A1 ESSENCE MARTT — ALL RIGHTS RESERVED</span>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({ visible }) {
  return (
    <div style={{
      position:"fixed", bottom:32, right:32, zIndex:999,
      background:C.green, color:"white",
      padding:"14px 22px", borderRadius:14,
      fontWeight:700, fontSize:14,
      display:"flex", alignItems:"center", gap:10,
      boxShadow:"0 8px 28px rgba(0,0,0,.22)",
      animation:`${visible?"toastIn":"toastOut"} .4s ease forwards`,
      pointerEvents: visible ? "auto" : "none",
    }}>
      <Icon name="check" size={18} color="white" strokeWidth={2.5} />
      Enquiry sent! We'll contact you soon.
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [toast, setToast]   = useState(false);
  const [active, setActive] = useState("hero");

  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 3600); };

  useEffect(() => {
    const ids = ["hero","about","services","why-us","contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin:`-${NAV_H}px 0px -40% 0px`, threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Navbar active={active} />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Features />
      <Contact showToast={showToast} />
      <Footer />
      <Toast visible={toast} />
    </>
  );
}