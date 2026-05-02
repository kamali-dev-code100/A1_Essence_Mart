// ═══════════════════════════════════════════════════════════════
//  A1 Essence Martt — Premium Production-Ready React Website
//  Single-file JSX · CSS-in-JS only · Custom SVG icons
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from "react";

/* ──────────────────────────────────────────────────────────────
   ADMIN-EDITABLE DATA  (change content here without touching UI)
────────────────────────────────────────────────────────────── */
export const SITE_DATA = {
  shop: {
    name:    "A1 Essence Martt",
    tagline: "Trichy's Finest Wholesale & Retail Supplier",
    phone:   "0431-2710081",
    mobile:  "98425 66001",
    wa:      "919842566001",
    email:   "a1essencemartt@gmail.com",
    website: "www.a1essencemartt.webs.com",
    address: "51, Pondukadai Santhu, Guruviyan Kulatheru,\nAndal Mettal Opposite, Periyakadai Street,\nTiruchirappalli – 8",
    mapSrc:  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8!2d78.7047!3d10.7905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzI1LjgiTiA3OMKwNDInMTYuOSJF!5e0!3m2!1sen!2sin!4v1680000000000",
  },
  stats: [
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 500, suffix: "+", label: "Happy Clients"       },
    { value: 6,   suffix: "",  label: "Product Categories"  },
    { value: 100, suffix: "%", label: "Quality Assured"     },
  ],
  services: [
    { icon:"juice",     title:"Juice Essences",      desc:"Premium concentrates, syrups and fresh ingredients for juice businesses.",     color:"#e8f5e9" },
    { icon:"soda",      title:"Soda Supplies",        desc:"Bulk soda syrups, CO2 essentials and carbonation supplies.",                  color:"#e3f2fd" },
    { icon:"bakery",    title:"Bakery Items",          desc:"Flours, flavors, improvers, decorating and baking essentials.",               color:"#fff8e1" },
    { icon:"fastfood",  title:"Fast Food Supplies",   desc:"Everything fast food outlets need — sauces, spices, packaging and more.",     color:"#fce4ec" },
    { icon:"hotel",     title:"Hotel Bulk Items",     desc:"Daily-use provisions, cleaning supplies and kitchen essentials for hotels.",  color:"#f3e5f5" },
    { icon:"wholesale", title:"Retail & Wholesale",   desc:"Flexible quantities for individual buyers and bulk business orders.",          color:"#e0f7fa" },
  ],
  testimonials: [
    { name:"Rajesh Kumar",   role:"Juice Shop Owner",   quote:"A1 Essence Martt has been my go-to supplier for 8 years. Unbeatable prices and always fresh stock.", stars:5 },
    { name:"Meena Lakshmi",  role:"Bakery Owner",       quote:"The bakery ingredients quality is excellent. My customers keep coming back because of the taste!", stars:5 },
    { name:"Suresh Pandian", role:"Hotel Manager",      quote:"They supply all our hotel essentials on time every single time. Highly recommended for bulk orders.", stars:5 },
    { name:"Priya Devi",     role:"Fast Food Outlet",   quote:"Best prices in Trichy! I save at least 20% on supplies compared to other vendors.", stars:5 },
  ],
  clients: ["FreshJuice Co.","Trichy Bakers","Hotel Arun","Soda King","TastyBite","Pearl Hotel","SkyJuice","Priya Bakery"],
  // Animation timing control (ms) — tune for low-end devices
  anim: { fast:200, mid:400, slow:700, stagger:80 },
};

/* ──────────────────────────────────────────────────────────────
   DESIGN TOKENS
────────────────────────────────────────────────────────────── */
const C = {
  green:  "#2d7a2d",
  greenD: "#1a4d1a",
  greenL: "#4a9a4a",
  lime:   "#7ec820",
  limeL:  "#a8e040",
  yellow: "#f5c400",
  yellowD:"#d4a800",
  cream:  "#fffbe8",
  dark:   "#1a2e0a",
  darkM:  "#0d1a05",
  grey:   "#555555",
  lgrey:  "#f0f0e8",
  white:  "#ffffff",
  // Dark mode overrides applied via CSS class
};
const NAV_H = 68;

/* ──────────────────────────────────────────────────────────────
   GLOBAL CSS
────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; font-size:16px; }
  body {
    font-family:'Nunito',sans-serif;
    background:${C.cream};
    color:${C.dark};
    overflow-x:hidden;
    transition:background .3s,color .3s;
  }
  body.dark {
    background:#0f1e07;
    color:#e8f5d0;
  }
  a { text-decoration:none; color:inherit; }
  section,[id] { scroll-margin-top:${NAV_H}px; }
  img { max-width:100%; display:block; }
  button { font-family:'Nunito',sans-serif; }

  /* ── Scroll progress bar ── */
  #scroll-progress {
    position:fixed; top:0; left:0; height:3px; z-index:9999;
    background:linear-gradient(90deg,${C.lime},${C.yellow});
    transition:width .1s linear;
    border-radius:0 2px 2px 0;
  }

  /* ── Preloader ── */
  #preloader {
    position:fixed; inset:0; z-index:9998;
    background:${C.dark};
    display:flex; align-items:center; justify-content:center;
    flex-direction:column; gap:16px;
    transition:opacity .5s, visibility .5s;
  }
  #preloader.hidden { opacity:0; visibility:hidden; pointer-events:none; }
  .pre-logo { animation:preLogoPulse 1s ease-in-out infinite alternate; }
  @keyframes preLogoPulse { from{transform:scale(1)} to{transform:scale(1.08)} }
  .pre-bar {
    width:120px; height:3px; background:rgba(255,255,255,.15); border-radius:2px; overflow:hidden;
  }
  .pre-bar-fill {
    height:100%; background:linear-gradient(90deg,${C.lime},${C.yellow});
    animation:preBarFill 1.4s ease-in-out infinite;
  }
  @keyframes preBarFill {
    0%{width:0%;margin-left:0}
    50%{width:80%;margin-left:0}
    100%{width:0%;margin-left:100%}
  }

  /* ── Keyframes ── */
  @keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes slideLeft{ from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideRight{from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn  { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
  @keyframes floatOrb { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(6deg)} }
  @keyframes mqScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes bounceY  { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(9px)} }
  @keyframes toastIn  { from{opacity:0;transform:translateX(120px)} to{opacity:1;transform:translateX(0)} }
  @keyframes toastOut { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(120px)} }
  @keyframes countUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
  @keyframes waBounce {
    0%,100%{transform:scale(1) translateY(0)}
    25%{transform:scale(1.12) translateY(-4px)}
    75%{transform:scale(.96) translateY(2px)}
  }

  /* ── Reveal animations (added by IntersectionObserver) ── */
  .reveal { opacity:0; transform:translateY(28px); transition:opacity .6s ease,transform .6s ease; }
  .reveal.from-left  { transform:translateX(-36px); }
  .reveal.from-right { transform:translateX(36px); }
  .reveal.scale-in   { transform:scale(.94); }
  .reveal.visible    { opacity:1 !important; transform:none !important; }

  /* ── Cards ── */
  .a1-card {
    transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;
    cursor:default;
  }
  .a1-card:hover {
    transform:translateY(-8px) scale(1.01) !important;
    box-shadow:0 24px 48px rgba(45,122,45,.18) !important;
    border-color:${C.lime} !important;
  }
  .a1-feat { transition:transform .25s,box-shadow .25s,background .25s; }
  .a1-feat:hover { transform:translateY(-5px); box-shadow:0 16px 36px rgba(0,0,0,.18); background:rgba(255,255,255,.18) !important; }

  /* ── Buttons ── */
  .a1-btn { transition:transform .2s,box-shadow .2s,background .2s; }
  .a1-btn:hover { transform:translateY(-3px) !important; box-shadow:0 14px 36px rgba(0,0,0,.24) !important; }
  .a1-btn:active { transform:translateY(0) scale(.97) !important; }
  .a1-submit:hover { background:${C.lime} !important; }
  .a1-outline-btn:hover { background:rgba(255,255,255,.12) !important; }

  /* ── Input focus ── */
  .a1-input:focus { border-color:${C.lime} !important; outline:none; box-shadow:0 0 0 3px ${C.lime}22; }

  /* ── Navbar ── */
  .a1-nav { transition:background .3s,box-shadow .3s,backdrop-filter .3s; }
  .a1-nav.scrolled {
    background:rgba(15,35,5,.82) !important;
    backdrop-filter:blur(20px) !important;
    box-shadow:0 4px 24px rgba(0,0,0,.3) !important;
  }
  .a1-navlink { transition:color .2s; background:none; border:none; cursor:pointer; font-family:'Nunito',sans-serif; }
  .a1-navlink:hover { color:${C.yellow} !important; }

  /* ── WhatsApp button ── */
  .wa-btn { animation:waBounce 3s ease-in-out 4s infinite; }
  .wa-btn:hover { animation:none; transform:scale(1.12) !important; }

  /* ── Sticky call btn (mobile) ── */
  .sticky-call { display:none !important; }
  @media(max-width:640px) { .sticky-call { display:flex !important; } }

  /* ── Marquee ── */
  .a1-mq { animation:mqScroll 24s linear infinite; }
  .a1-mq:hover { animation-play-state:paused; }
  .a1-bounce { animation:bounceY 2s infinite; }
  .a1-orb { animation:floatOrb 7s ease-in-out infinite; }

  /* ── Stat counter ── */
  .stat-visible { animation:countUp .6s ease both; }

  /* ── Client strip ── */
  .client-strip { animation:mqScroll 18s linear infinite; }
  .client-strip:hover { animation-play-state:paused; }

  /* ── Modal ── */
  .modal-overlay {
    position:fixed; inset:0; z-index:800;
    background:rgba(0,0,0,.6); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center;
    padding:20px;
    animation:fadeIn .25s ease;
  }
  .modal-box {
    animation:scaleIn .3s ease;
    max-height:90vh; overflow-y:auto;
  }

  /* ── Dark mode adjustments ── */
  body.dark .a1-card:hover { box-shadow:0 24px 48px rgba(0,0,0,.4) !important; }
  body.dark .a1-input { background:#1e3010 !important; color:#e8f5d0 !important; border-color:#3a5a2a !important; }
  body.dark .a1-input:focus { border-color:${C.lime} !important; }

  /* ── Testimonial auto-scroll ── */
  .testi-track { animation:mqScroll 28s linear infinite; }
  .testi-track:hover { animation-play-state:paused; }

  /* ── Hamburger display ── */
  .a1-hamburger { display:none !important; }
  @media(max-width:640px) {
    .a1-hamburger { display:flex !important; }
    .a1-navlinks  { display:none !important; }
  }

  /* ── Responsive grid classes ── */
  @media(max-width:960px){
    .col-2 { grid-template-columns:1fr !important; gap:32px !important; }
    .col-3 { grid-template-columns:1fr 1fr !important; }
    .col-4 { grid-template-columns:1fr 1fr !important; }
  }
  @media(max-width:560px){
    .col-3,.col-4 { grid-template-columns:1fr !important; }
    .hero-btns    { flex-direction:column !important; align-items:stretch !important; }
    .hero-btns .a1-btn { text-align:center; justify-content:center; }
  }

  /* ── Reduced motion ── */
  @media(prefers-reduced-motion:reduce){
    *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
  }
`;

/* ──────────────────────────────────────────────────────────────
   CUSTOM SVG ICON COMPONENT
────────────────────────────────────────────────────────────── */
const Icon = ({ name, size=24, color="currentColor", sw=1.6 }) => {
  const s = { width:size, height:size, display:"block", flexShrink:0 };
  const p = { fill:"none", stroke:color, strokeWidth:sw, strokeLinecap:"round", strokeLinejoin:"round" };
  const P = {
    info:       <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".6" fill={color}/></>,
    grid:       <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    star:       <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    starFill:   <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} stroke="none"/></>,
    mail:       <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></>,
    juice:      <><path d="M8 2h8l1 5H7z"/><path d="M7 7c0 8 2 13 5 13s5-5 5-13"/><line x1="5" y1="11" x2="19" y2="11"/></>,
    soda:       <><path d="M6 2h12v4l1 14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 6V2z"/><line x1="6" y1="8" x2="18" y2="8"/><circle cx="10" cy="13" r=".8" fill={color}/><circle cx="14" cy="13" r=".8" fill={color}/></>,
    bakery:     <><path d="M12 2C8 2 5 5 5 8c0 2.5 1.5 4.5 3.5 5.5V18h7v-4.5C17.5 12.5 19 10.5 19 8c0-3-3-6-7-6z"/><line x1="8.5" y1="18" x2="15.5" y2="18"/><line x1="9" y1="21" x2="15" y2="21"/></>,
    fastfood:   <><path d="M3 11h18M3 11C3 7 6 4 12 4s9 3 9 7"/><path d="M5 11v2a7 7 0 0 0 14 0v-2"/></>,
    hotel:      <><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>,
    wholesale:  <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    price:      <><circle cx="12" cy="12" r="10"/><path d="M9.5 9.5h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H14"/><line x1="12" y1="7" x2="12" y2="9.5"/><line x1="12" y1="15.5" x2="12" y2="17"/></>,
    quality:    <><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></>,
    store:      <><path d="M3 9l1-5h16l1 5"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><rect x="9" y="14" width="6" height="6" rx=".5"/></>,
    location:   <><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></>,
    phone:      <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></>,
    mobile:     <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
    envelope:   <><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></>,
    mappin:     <><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></>,
    globe:      <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12 15.3 15.3 0 0 1 12 2z"/></>,
    send:       <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check:      <><polyline points="20 6 9 17 4 12"/></>,
    checkCircle:<><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></>,
    menu:       <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    close:      <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevron:    <><polyline points="6 9 12 15 18 9"/></>,
    leaf:       <><path d="M2 22c1-4 4-7 7-8.5C14 12 20 8 20 2c-4 4-8 5-12 7-2.5 1.5-4.5 4-6 6.5z"/><path d="M6 18c1-3 3-5 6-6"/></>,
    arrowR:     <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    sun:        <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
    moon:       <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    whatsapp:   null, // rendered as custom SVG below
    quote:      <><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></>,
    order:      <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></>,
    trophy:     <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
    users:      <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    shield:     <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" style={s} {...p}>
      {P[name] || null}
    </svg>
  );
};

/* WhatsApp icon (custom path) */
const WhatsAppIcon = ({ size=28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.524 5.855L.057 23.215a.75.75 0 0 0 .921.905l5.487-1.44A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.62-.5-5.13-1.38l-.36-.21-3.76.99 1.01-3.67-.23-.37A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fill="white"/>
  </svg>
);

/* ──────────────────────────────────────────────────────────────
   A1 CREATIVE LOGO SVG COMPONENT
────────────────────────────────────────────────────────────── */
const A1Logo = ({ size=38, bg=C.yellow, text=C.dark }) => (
  <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="9" fill={bg}/>
    {/* A letterform */}
    <path d="M7 27 L13.5 10 L20 27" stroke={text} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="9.4" y1="22" x2="17.6" y2="22" stroke={text} strokeWidth="2.3" strokeLinecap="round"/>
    {/* 1 letterform */}
    <line x1="24" y1="27" x2="24" y2="12" stroke={text} strokeWidth="2.6" strokeLinecap="round"/>
    <path d="M21.2 14.8 L24 12" stroke={text} strokeWidth="2.2" strokeLinecap="round"/>
    {/* Leaf accent top-right */}
    <path d="M29 7 C29 7 32.5 6.5 32.5 9.5 C32.5 12.5 29 11.5 29 11.5 C29 11.5 25.5 12.5 25.5 9.5 C25.5 6.5 29 7 29 7Z" fill={text} opacity="0.7"/>
    <line x1="29" y1="11.5" x2="29" y2="14" stroke={text} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ──────────────────────────────────────────────────────────────
   SCROLL HELPER
────────────────────────────────────────────────────────────── */
const goTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_H + 1, behavior:"smooth" });
};

/* ──────────────────────────────────────────────────────────────
   REVEAL HOOK  (IntersectionObserver scroll animations)
────────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add("visible"), Number(delay));
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ──────────────────────────────────────────────────────────────
   ANIMATED COUNTER HOOK
────────────────────────────────────────────────────────────── */
function useCounter(target, duration=1400, started=false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(start);
    }, 16);
    return () => clearInterval(t);
  }, [started, target, duration]);
  return val;
}

/* ──────────────────────────────────────────────────────────────
   FORM VALIDATION HELPER
────────────────────────────────────────────────────────────── */
function validateForm({ name, phone, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!/^\d{10}$/.test(phone.replace(/\s/g,""))) errors.phone = "Enter a valid 10-digit phone number";
  return errors;
}

/* ──────────────────────────────────────────────────────────────
   SHARED ATOMS
────────────────────────────────────────────────────────────── */
const Tag = ({ children, onDark }) => (
  <span style={{
    display:"inline-block",
    background: onDark ? C.yellow : C.lime,
    color:C.dark, fontSize:10, fontWeight:800,
    letterSpacing:3, textTransform:"uppercase",
    padding:"5px 15px", borderRadius:4, marginBottom:14,
  }}>{children}</span>
);

const H2 = ({ children, light, center }) => (
  <h2 style={{
    fontFamily:"'Playfair Display',serif",
    fontSize:"clamp(26px,5vw,42px)", fontWeight:900,
    color: light ? C.white : C.dark, lineHeight:1.15,
    marginBottom:14, textAlign: center ? "center" : "left",
  }}>{children}</h2>
);

const Divider = ({ light }) => (
  <div style={{ width:52, height:4, borderRadius:2,
    background: light ? C.lime : C.green, marginBottom:24 }} />
);

/* ──────────────────────────────────────────────────────────────
   TOAST SYSTEM
────────────────────────────────────────────────────────────── */
function ToastContainer({ toasts }) {
  return (
    <div style={{ position:"fixed", bottom:32, right:24, zIndex:1000,
      display:"flex", flexDirection:"column", gap:10 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type==="success" ? C.green : "#c0392b",
          color:"white", padding:"14px 20px", borderRadius:14,
          fontWeight:700, fontSize:14, minWidth:240,
          display:"flex", alignItems:"center", gap:10,
          boxShadow:"0 8px 28px rgba(0,0,0,.25)",
          animation:`${t.exiting?"toastOut":"toastIn"} .4s ease forwards`,
        }}>
          <Icon name={t.type==="success"?"checkCircle":"close"} size={18} color="white" sw={2.2}/>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PRELOADER
────────────────────────────────────────────────────────────── */
function Preloader({ done }) {
  return (
    <div id="preloader" className={done?"hidden":""}>
      <div className="pre-logo"><A1Logo size={64} bg={C.yellow} text={C.dark}/></div>
      <div style={{fontFamily:"'Playfair Display',serif",color:"white",fontSize:18,fontWeight:700,letterSpacing:2}}>
        A1 Essence Martt
      </div>
      <div className="pre-bar"><div className="pre-bar-fill"/></div>
      <div style={{color:"rgba(255,255,255,.4)",fontSize:11,letterSpacing:2,textTransform:"uppercase"}}>
        Loading…
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
────────────────────────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100 || 0);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div id="scroll-progress" style={{ width:`${pct}%` }}/>;
}

/* ──────────────────────────────────────────────────────────────
   NAVBAR
────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  {id:"about",      label:"About",      icon:"info"   },
  {id:"services",   label:"Services",   icon:"grid"   },
  {id:"stats",      label:"Why Us",     icon:"trophy" },
  {id:"testimonials",label:"Reviews",   icon:"star"   },
  {id:"contact",    label:"Contact",    icon:"mail"   },
];

function Navbar({ active, dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mopen,    setMopen]    = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`a1-nav${scrolled?" scrolled":""}`} style={{
        position:"fixed", top:0, left:0, right:0, zIndex:500,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 32px", height:NAV_H,
        background: scrolled ? undefined : "rgba(15,40,5,.75)",
        backdropFilter: scrolled ? undefined : "blur(8px)",
      }}>
        {/* Brand */}
        <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})}
          style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:11}}>
          <A1Logo size={40} bg={C.yellow} text={C.dark}/>
          <div style={{textAlign:"left"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:C.white,lineHeight:1}}>
              <span style={{color:C.yellow}}>A1</span> Essence Martt
            </div>
            <div style={{fontSize:10,color:C.lime,letterSpacing:1.5,textTransform:"uppercase",fontWeight:700}}>
              Trichy's Best Supplier
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="a1-navlinks" style={{display:"flex",gap:2,alignItems:"center"}}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => goTo(l.id)} className="a1-navlink"
              style={{
                display:"flex", alignItems:"center", gap:6, padding:"8px 13px",
                borderRadius:8, fontSize:13, fontWeight:700,
                color: active===l.id ? C.yellow : "rgba(255,255,255,.78)",
                background: active===l.id ? "rgba(245,196,0,.12)" : "transparent",
                borderBottom: active===l.id ? `2px solid ${C.yellow}` : "2px solid transparent",
              }}>
              <Icon name={l.icon} size={14} color={active===l.id?C.yellow:"rgba(255,255,255,.55)"} sw={2}/>
              {l.label}
            </button>
          ))}

          {/* Dark mode toggle */}
          <button onClick={toggleDark} className="a1-btn" style={{
            width:38, height:38, borderRadius:"50%", border:"none", cursor:"pointer",
            background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center",
            marginLeft:6,
          }}>
            <Icon name={dark?"sun":"moon"} size={17} color={C.yellow} sw={2}/>
          </button>

          {/* Quick Order */}
          <button onClick={() => document.getElementById("quick-order-modal").click()} className="a1-btn"
            style={{
              display:"flex", alignItems:"center", gap:6, padding:"9px 16px",
              borderRadius:50, fontSize:13, fontWeight:800, marginLeft:6,
              background:C.yellow, color:C.dark, border:"none", cursor:"pointer",
              boxShadow:"0 4px 16px rgba(245,196,0,.4)",
            }}>
            <Icon name="order" size={15} color={C.dark} sw={2.2}/>
            Quick Order
          </button>
        </div>

        {/* Mobile hamburger */}
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={toggleDark} className="a1-hamburger a1-btn" style={{
            width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",
            background:"rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            <Icon name={dark?"sun":"moon"} size={16} color={C.yellow} sw={2}/>
          </button>
          <button onClick={() => setMopen(o=>!o)} className="a1-hamburger"
            style={{background:"none",border:"none",cursor:"pointer"}}>
            <Icon name={mopen?"close":"menu"} size={26} color={C.white} sw={2}/>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mopen && (
        <div style={{
          position:"fixed",top:NAV_H,left:0,right:0,zIndex:490,
          background:"rgba(10,28,5,.97)", borderBottom:`2px solid ${C.lime}`,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={()=>{goTo(l.id);setMopen(false);}}
              style={{
                display:"flex",alignItems:"center",gap:12,padding:"15px 28px",width:"100%",
                background:"none",border:"none",cursor:"pointer",
                color:active===l.id?C.yellow:"rgba(255,255,255,.82)",
                fontSize:16,fontWeight:700,fontFamily:"'Nunito',sans-serif",
                borderBottom:"1px solid rgba(255,255,255,.06)",
              }}>
              <Icon name={l.icon} size={18} color={active===l.id?C.yellow:"rgba(255,255,255,.5)"}/>
              {l.label}
            </button>
          ))}
          <button onClick={()=>{document.getElementById("quick-order-modal").click();setMopen(false);}}
            style={{
              display:"flex",alignItems:"center",gap:10,padding:"15px 28px",width:"100%",
              background:C.yellow,border:"none",cursor:"pointer",
              color:C.dark,fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",
            }}>
            <Icon name="order" size={18} color={C.dark} sw={2}/>
            Quick Order
          </button>
        </div>
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   HERO SECTION
────────────────────────────────────────────────────────────── */
const FLOAT_POS = [
  {top:"9%", left:"4%",  d:"0s"  },{top:"18%",left:"86%",d:"1.3s"},
  {top:"62%",left:"2%",  d:"2.5s"},{top:"74%",left:"82%",d:"0.9s"},
  {top:"38%",left:"91%", d:"3.1s"},{top:"84%",left:"18%",d:"1.9s"},
  {top:"6%", left:"52%", d:"2.1s"},{top:"52%",left:"9%", d:"0.5s"},
];
const FLOAT_ICONS = ["leaf","juice","quality","location","globe","price","quality","leaf"];

function Hero({ openOrder }) {
  const { shop } = SITE_DATA;
  return (
    <section id="hero" style={{
      background:"linear-gradient(150deg,#091f02 0%,#163a0a 40%,#2a6010 75%,#3d8a10 100%)",
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      textAlign:"center", padding:`${NAV_H+48}px 24px 90px`,
      position:"relative", overflow:"hidden",
    }}>
      {/* layered background blobs */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",
          background:"rgba(126,200,32,.07)",filter:"blur(80px)",top:"10%",left:"-10%"}}/>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",
          background:"rgba(245,196,0,.06)",filter:"blur(60px)",bottom:"5%",right:"-5%"}}/>
        <div style={{position:"absolute",inset:0,
          background:"radial-gradient(ellipse 65% 55% at 50% 60%,rgba(126,200,32,.14) 0%,transparent 70%)"}}/>
      </div>

      {/* floating orbs */}
      {FLOAT_POS.map((p,i) => (
        <div key={i} className="a1-orb" style={{
          position:"absolute",pointerEvents:"none",
          top:p.top,left:p.left,animationDelay:p.d,
          width:48,height:48,borderRadius:"50%",
          background:"rgba(126,200,32,.12)",
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          <Icon name={FLOAT_ICONS[i]} size={22} color="rgba(255,255,255,.45)" sw={1.4}/>
        </div>
      ))}

      {/* badge */}
      <div className="reveal" style={{animationDelay:"0s"}}>
        <span style={{
          display:"inline-flex",alignItems:"center",gap:6,
          background:C.yellow,color:C.dark,fontSize:11,fontWeight:800,
          letterSpacing:2,textTransform:"uppercase",
          padding:"7px 18px",borderRadius:50,marginBottom:24,
        }}>
          <Icon name="mappin" size={13} color={C.dark} sw={2.4}/> Trichy, Tamil Nadu
        </span>
      </div>

      {/* headline */}
      <h1 className="reveal" data-delay="80" style={{
        fontFamily:"'Playfair Display',serif",
        fontSize:"clamp(48px,10vw,100px)",fontWeight:900,
        color:C.white,lineHeight:1,letterSpacing:-3,
      }}>
        <span style={{color:C.yellow,textShadow:"0 0 60px rgba(245,196,0,.5)"}}>A1</span> Essence
      </h1>
      <div className="reveal" data-delay="140" style={{
        fontSize:"clamp(20px,4vw,32px)",color:C.lime,fontWeight:800,
        marginTop:4,letterSpacing:5,textTransform:"uppercase",
      }}>Martt</div>

      <p className="reveal" data-delay="200" style={{
        marginTop:22,fontSize:"clamp(14px,2vw,18px)",
        color:"rgba(255,255,255,.78)",maxWidth:560,lineHeight:1.82,
      }}>
        Fresh juices · Bakery delights · Hotel &amp; restaurant supplies —
        all at Trichy's lowest prices, quality always guaranteed.
      </p>

      {/* CTA buttons */}
      <div className="reveal hero-btns" data-delay="280" style={{
        marginTop:40,display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center",
      }}>
        <a href={`tel:+91${shop.mobile.replace(/\s/g,"")}`} className="a1-btn" style={{
          display:"inline-flex",alignItems:"center",gap:9,
          padding:"14px 32px",borderRadius:50,fontWeight:800,fontSize:15,
          background:C.yellow,color:C.dark,border:"none",cursor:"pointer",
          fontFamily:"'Nunito',sans-serif",
          boxShadow:"0 8px 28px rgba(245,196,0,.45)",
        }}>
          <Icon name="phone" size={18} color={C.dark} sw={2.2}/> Call Us Now
        </a>
        <button onClick={() => goTo("services")} className="a1-btn a1-outline-btn" style={{
          display:"inline-flex",alignItems:"center",gap:9,
          padding:"14px 32px",borderRadius:50,fontWeight:800,fontSize:15,
          background:"transparent",color:C.white,cursor:"pointer",
          fontFamily:"'Nunito',sans-serif",
          border:"2px solid rgba(255,255,255,.45)",
        }}>
          <Icon name="grid" size={18} color={C.white} sw={2}/> Our Services
        </button>
        <button onClick={openOrder} className="a1-btn" style={{
          display:"inline-flex",alignItems:"center",gap:9,
          padding:"14px 32px",borderRadius:50,fontWeight:800,fontSize:15,
          background:C.green,color:C.white,cursor:"pointer",
          fontFamily:"'Nunito',sans-serif",
          border:"2px solid rgba(255,255,255,.15)",
          boxShadow:"0 8px 28px rgba(45,122,45,.4)",
        }}>
          <Icon name="order" size={18} color={C.white} sw={2}/> Quick Order
        </button>
      </div>

      {/* trust bar */}
      <div className="reveal" data-delay="360" style={{
        marginTop:52,display:"flex",gap:32,flexWrap:"wrap",justifyContent:"center",
      }}>
        {[
          {icon:"shield", text:"Quality Guaranteed"},
          {icon:"users",  text:"500+ Happy Clients"},
          {icon:"trophy", text:"15+ Years Serving Trichy"},
        ].map((t,i) => (
          <div key={i} style={{
            display:"flex",alignItems:"center",gap:8,
            color:"rgba(255,255,255,.7)",fontSize:13,fontWeight:600,
          }}>
            <Icon name={t.icon} size={16} color={C.lime} sw={2}/>
            {t.text}
          </div>
        ))}
      </div>

      <div className="a1-bounce" style={{
        position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",
      }}>
        <Icon name="chevron" size={24} color="rgba(255,255,255,.3)" sw={2.2}/>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   MARQUEE
────────────────────────────────────────────────────────────── */
const MQ_ITEMS = ["Fresh Juice Essences","Soda Supplies","Bakery Items","Fast Food Supplies",
  "Hotel Bulk Items","Retail & Wholesale","Best Prices in Trichy","Quality Guaranteed"];

function Marquee() {
  const items = [...MQ_ITEMS,...MQ_ITEMS];
  return (
    <div style={{background:C.yellow,padding:"11px 0",overflow:"hidden",whiteSpace:"nowrap",position:"relative",zIndex:2}}>
      <div className="a1-mq" style={{display:"inline-flex",alignItems:"center"}}>
        {items.map((item,i) => (
          <span key={i} style={{display:"inline-flex",alignItems:"center",gap:8,
            fontWeight:800,fontSize:13,color:C.dark,padding:"0 26px",letterSpacing:.5}}>
            <Icon name="leaf" size={14} color={C.green} sw={2.2}/>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ABOUT
────────────────────────────────────────────────────────────── */
function About({ dark }) {
  const bg  = dark ? "#0f1e07" : C.white;
  const txt = dark ? "#e8f5d0" : "#4a4a4a";
  return (
    <section id="about" style={{background:bg,padding:"88px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="col-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:68,alignItems:"center"}}>
          <div className="reveal from-left">
            <Tag>Who We Are</Tag>
            <H2>Trichy's Trusted Wholesale &amp; Retail Martt</H2>
            <Divider/>
            <p style={{fontSize:16,lineHeight:1.92,color:txt,marginBottom:16}}>
              A1 Essence Martt has been serving juice companies, soda companies, bakeries, fast food
              outlets, and hotels across Tiruchirappalli with all essential supplies — at the most
              competitive prices in town.
            </p>
            <p style={{fontSize:16,lineHeight:1.92,color:txt,marginBottom:30}}>
              Located in the heart of Periyakadai Street, we combine quality products with reliable
              service — your go-to wholesale partner in Trichy since day one.
            </p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <a href={`tel:+91${SITE_DATA.shop.mobile.replace(/\s/g,"")}`} className="a1-btn" style={{
                display:"inline-flex",alignItems:"center",gap:8,
                padding:"13px 28px",borderRadius:50,fontWeight:800,fontSize:15,
                background:C.yellow,color:C.dark,boxShadow:"0 6px 24px rgba(245,196,0,.38)",
              }}>
                <Icon name="mobile" size={17} color={C.dark} sw={2}/> {SITE_DATA.shop.mobile}
              </a>
              <button onClick={() => goTo("contact")} className="a1-btn a1-outline-btn" style={{
                display:"inline-flex",alignItems:"center",gap:8,
                padding:"13px 28px",borderRadius:50,fontWeight:800,fontSize:15,
                background:"transparent",color:C.green,cursor:"pointer",
                border:`2px solid ${C.green}`,fontFamily:"'Nunito',sans-serif",
              }}>
                <Icon name="mappin" size={17} color={C.green} sw={2}/> Find Us
              </button>
            </div>
          </div>
          <div className="reveal from-right" style={{
            background:`linear-gradient(135deg,${C.greenD},${C.green},${C.lime})`,
            borderRadius:28,padding:"52px 40px",textAlign:"center",
            color:"white",position:"relative",overflow:"hidden",
          }}>
            <div style={{position:"absolute",width:240,height:240,
              background:"rgba(255,255,255,.06)",borderRadius:"50%",top:-80,right:-80}}/>
            <div style={{position:"absolute",width:160,height:160,
              background:"rgba(255,255,255,.04)",borderRadius:"50%",bottom:-40,left:-40}}/>
            <div style={{display:"flex",justifyContent:"center",marginBottom:22}}>
              <div style={{width:76,height:76,background:"rgba(255,255,255,.18)",
                borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name="store" size={38} color="white" sw={1.4}/>
              </div>
            </div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,marginBottom:12}}>
              Serving Trichy Since Day One
            </h3>
            <p style={{fontSize:14.5,opacity:.88,lineHeight:1.78,marginBottom:24}}>
              One-stop shop for all your juice, bakery, soda, fast food, and hotel supply needs —
              fresh, affordable, always available.
            </p>
            <div style={{display:"flex",justifyContent:"center",gap:24}}>
              {[{n:"15+",l:"Years"},{n:"500+",l:"Clients"},{n:"6",l:"Categories"}].map((s,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:900,color:C.yellow}}>{s.n}</div>
                  <div style={{fontSize:11,opacity:.75,textTransform:"uppercase",letterSpacing:1}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SERVICES
────────────────────────────────────────────────────────────── */
function Services({ dark }) {
  const bg = dark ? "#0a1505" : C.cream;
  return (
    <section id="services" style={{background:bg,padding:"88px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:48}}>
          <Tag>What We Offer</Tag>
          <H2 center>Everything Your Business Needs</H2>
          <Divider light={dark}/>
          <p style={{fontSize:16,color:dark?"rgba(232,245,208,.65)":C.grey,maxWidth:520,margin:"0 auto"}}>
            Quality products at unbeatable prices — all categories under one roof in Trichy.
          </p>
        </div>
        <div className="col-3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {SITE_DATA.services.map((s,i) => (
            <div key={i} className="a1-card reveal" data-delay={i*SITE_DATA.anim.stagger} style={{
              background: dark ? "#162609" : C.white,
              borderRadius:22, padding:"34px 26px",
              border:`2px solid ${dark?"#2a4a1a":"transparent"}`,
              display:"flex",flexDirection:"column",alignItems:"flex-start",
            }}>
              <div style={{
                width:62,height:62,borderRadius:18,marginBottom:20,
                background: dark ? `${C.green}30` : s.color,
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>
                <Icon name={s.icon} size={30} color={C.green} sw={1.5}/>
              </div>
              <h3 style={{fontSize:17,fontWeight:800,marginBottom:9,
                color:dark?C.limeL:C.green}}>{s.title}</h3>
              <p style={{fontSize:14,color:dark?"rgba(232,245,208,.65)":C.grey,
                lineHeight:1.68,flexGrow:1}}>{s.desc}</p>
              <div style={{marginTop:16,display:"flex",alignItems:"center",gap:6,
                color:C.green,fontSize:13,fontWeight:700,cursor:"pointer"}}
                onClick={()=>goTo("contact")}>
                Enquire now <Icon name="arrowR" size={14} color={C.green} sw={2.2}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   STATS / WHY US
────────────────────────────────────────────────────────────── */
function StatCard({ value, suffix, label, started, delay, i }) {
  const count = useCounter(value, 1500, started);
  return (
    <div className="a1-feat reveal" data-delay={delay} style={{
      background:"rgba(255,255,255,.08)",borderRadius:20,padding:"32px 22px",
      border:"1px solid rgba(255,255,255,.13)",
      display:"flex",flexDirection:"column",alignItems:"flex-start",
      transition:"background .25s,transform .25s,box-shadow .25s",
    }}>
      <div style={{
        width:54,height:54,borderRadius:14,
        background:"rgba(255,255,255,.15)",
        display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,
      }}>
        <Icon name={["trophy","users","grid","shield"][i]} size={26} color="white" sw={1.6}/>
      </div>
      <div className={started?"stat-visible":""} style={{
        fontFamily:"'Playfair Display',serif",fontSize:42,fontWeight:900,
        color:C.yellow,lineHeight:1,
      }}>{count}{suffix}</div>
      <div style={{fontSize:14,color:"rgba(255,255,255,.72)",marginTop:8,lineHeight:1.5}}>{label}</div>
      <div style={{marginTop:16,width:36,height:3,background:C.lime,borderRadius:2}}/>
    </div>
  );
}

const WHY_FEATURES = [
  {icon:"price",   title:"Lowest Prices",     desc:"Prices that beat every competitor in Trichy — guaranteed."},
  {icon:"quality", title:"Top Quality",        desc:"Only fresh, certified products. Quality is never compromised."},
  {icon:"store",   title:"All Under One Roof", desc:"One visit gets you everything. No more shopping around."},
  {icon:"location",title:"Central Location",   desc:"Heart of Periyakadai Street — easy access from anywhere in Trichy."},
];

function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){ setStarted(true); obs.disconnect(); } }, {threshold:.3});
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} style={{background:C.green,padding:"88px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:48}}>
          <Tag onDark>Why Choose Us</Tag>
          <H2 light center>The A1 Advantage</H2>
          <Divider light/>
        </div>
        {/* Counters */}
        <div className="col-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:22,marginBottom:40}}>
          {SITE_DATA.stats.map((s,i) => (
            <StatCard key={i} {...s} started={started} delay={i*90} i={i}/>
          ))}
        </div>
        {/* Feature rows */}
        <div className="col-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:22}}>
          {WHY_FEATURES.map((f,i) => (
            <div key={i} className="a1-feat reveal" data-delay={i*80} style={{
              background:"rgba(255,255,255,.09)",borderRadius:18,padding:"26px 20px",
              border:"1px solid rgba(255,255,255,.12)",
            }}>
              <div style={{width:50,height:50,borderRadius:12,
                background:"rgba(255,255,255,.14)",display:"flex",
                alignItems:"center",justifyContent:"center",marginBottom:14}}>
                <Icon name={f.icon} size={24} color="white" sw={1.6}/>
              </div>
              <h3 style={{fontSize:15,fontWeight:800,color:"white",marginBottom:8}}>{f.title}</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,.68)",lineHeight:1.68}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   TESTIMONIALS
────────────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div style={{display:"flex",gap:3,marginBottom:12}}>
      {[...Array(5)].map((_,i) => (
        <Icon key={i} name="starFill" size={16} color={C.yellow}/>
      ))}
    </div>
  );
}

function Testimonials({ dark }) {
  const bg = dark ? "#0f1e07" : C.white;
  const doubled = [...SITE_DATA.testimonials,...SITE_DATA.testimonials];
  return (
    <section id="testimonials" style={{background:bg,padding:"88px 0",overflow:"hidden"}}>
      <div style={{maxWidth:1100,margin:"0 auto",paddingBottom:0,padding:"0 24px"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:48}}>
          <Tag>Client Reviews</Tag>
          <H2 center>What Our Clients Say</H2>
          <Divider light={dark}/>
        </div>
      </div>
      {/* Auto-scrolling strip */}
      <div style={{overflow:"hidden",whiteSpace:"nowrap"}}>
        <div className="testi-track" style={{display:"inline-flex",gap:24,padding:"0 12px"}}>
          {doubled.map((t,i) => (
            <div key={i} style={{
              display:"inline-block",whiteSpace:"normal",width:300,
              background: dark?"#162609":C.cream,
              borderRadius:20,padding:"28px 26px",
              border:`1.5px solid ${dark?"#2a4a1a":C.lime+"44"}`,
              verticalAlign:"top",flexShrink:0,
            }}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                <div style={{
                  width:44,height:44,borderRadius:"50%",
                  background:`linear-gradient(135deg,${C.green},${C.lime})`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:18,fontWeight:900,color:"white",flexShrink:0,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{fontWeight:800,fontSize:14,color:dark?C.limeL:C.dark}}>{t.name}</div>
                  <div style={{fontSize:11,color:C.grey,letterSpacing:.5}}>{t.role}</div>
                </div>
              </div>
              <Stars/>
              <div style={{marginBottom:12,color:dark?"rgba(232,245,208,.5)":C.green,opacity:.4}}>
                <Icon name="quote" size={20} color={C.lime} sw={1.4}/>
              </div>
              <p style={{fontSize:13.5,color:dark?"rgba(232,245,208,.75)":C.grey,
                lineHeight:1.72,fontStyle:"italic"}}>{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   CLIENT STRIP
────────────────────────────────────────────────────────────── */
function ClientStrip({ dark }) {
  const bg = dark ? "#0a1505" : C.cream;
  const doubled = [...SITE_DATA.clients,...SITE_DATA.clients];
  return (
    <section style={{background:bg,padding:"44px 0",overflow:"hidden"}}>
      <p style={{textAlign:"center",fontSize:11,fontWeight:800,letterSpacing:3,
        textTransform:"uppercase",color:C.grey,marginBottom:20}}>
        Trusted By Businesses Across Trichy
      </p>
      <div style={{overflow:"hidden"}}>
        <div className="client-strip" style={{display:"inline-flex",gap:0}}>
          {doubled.map((c,i) => (
            <div key={i} style={{
              display:"inline-flex",alignItems:"center",gap:8,
              padding:"10px 28px",
              borderRight:`1px solid ${dark?"#2a4a1a":C.lime+"33"}`,
              fontWeight:800,fontSize:14,color:dark?"rgba(232,245,208,.55)":C.grey,
              whiteSpace:"nowrap",
            }}>
              <div style={{width:8,height:8,borderRadius:"50%",background:C.lime}}/>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   CONTACT
────────────────────────────────────────────────────────────── */
const INFO_ROWS = [
  {icon:"phone",   label:"Phone",   href:"tel:04312710081",                   text:"0431-2710081"},
  {icon:"mobile",  label:"Mobile",  href:"tel:+919842566001",                 text:"98425 66001"},
  {icon:"envelope",label:"Email",   href:"mailto:a1essencemartt@gmail.com",   text:"a1essencemartt@gmail.com"},
  {icon:"mappin",  label:"Address", href:null,                                text:"51, Pondukadai Santhu, Guruviyan Kulatheru,\nAndal Mettal Opposite, Periyakadai Street,\nTiruchirappalli – 8"},
  {icon:"globe",   label:"Website", href:"http://www.a1essencemartt.webs.com",text:"www.a1essencemartt.webs.com",ext:true},
];

function Contact({ dark, addToast }) {
  const bg = dark ? "#0f1e07" : C.white;
  const formBg = dark ? "#162609" : C.cream;
  const [form,   setForm]   = useState({name:"",phone:"",need:"",msg:""});
  const [errors, setErrors] = useState({});
  const [sending,setSending]= useState(false);

  const change = e => {
    setForm(p=>({...p,[e.target.name]:e.target.value}));
    if(errors[e.target.name]) setErrors(p=>({...p,[e.target.name]:""}));
  };

  const submit = () => {
    const errs = validateForm({name:form.name,phone:form.phone,message:form.msg});
    if(Object.keys(errs).length){ setErrors(errs); return; }
    setSending(true);
    setTimeout(()=>{
      setSending(false);
      setForm({name:"",phone:"",need:"",msg:""});
      addToast("Enquiry sent! We'll contact you soon.", "success");
    }, 1200);
  };

  const inp = (hasError) => ({
    width:"100%",padding:"12px 15px",
    border:`2px solid ${hasError?"#e74c3c":dark?"#3a5a2a":"#dde8d0"}`,
    borderRadius:10,fontFamily:"'Nunito',sans-serif",fontSize:15,
    background: dark ? "#1e3010" : "white",
    color: dark ? "#e8f5d0" : C.dark,
    transition:"border-color .2s,box-shadow .2s",
  });
  const lbl = { display:"block",fontSize:10,fontWeight:800,marginBottom:6,
    color:"#888",textTransform:"uppercase",letterSpacing:.9 };
  const errStyle = { fontSize:11,color:"#e74c3c",marginTop:3,fontWeight:600 };

  return (
    <section id="contact" style={{background:bg,padding:"88px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:48}}>
          <Tag>Reach Us</Tag>
          <H2 center>Let's Connect</H2>
          <Divider light={dark}/>
        </div>
        <div className="col-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
          {/* Info */}
          <div className="reveal from-left">
            <p style={{fontSize:15,color:dark?"rgba(232,245,208,.65)":C.grey,lineHeight:1.85,marginBottom:28}}>
              Visit us, call us, or send a message — we're always happy to help.
            </p>
            <div style={{width:"100%",height:1,background:`${C.lime}33`,marginBottom:24}}/>
            {INFO_ROWS.map((r,i) => (
              <div key={i} style={{
                display:"grid",gridTemplateColumns:"46px 1fr",
                gap:"0 16px",alignItems:"flex-start",marginBottom:20,
              }}>
                <div style={{
                  width:46,height:46,borderRadius:12,
                  background:`${C.lime}1a`,border:`1.5px solid ${C.lime}44`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <Icon name={r.icon} size={20} color={C.green} sw={1.8}/>
                </div>
                <div style={{paddingTop:2}}>
                  <span style={{display:"block",fontSize:10,fontWeight:800,
                    textTransform:"uppercase",letterSpacing:1.2,
                    color:"#aaa",marginBottom:3}}>{r.label}</span>
                  {r.href
                    ? <a href={r.href} target={r.ext?"_blank":undefined}
                        rel={r.ext?"noreferrer":undefined}
                        style={{fontSize:14.5,fontWeight:700,color:C.green,wordBreak:"break-word"}}>
                        {r.text}
                      </a>
                    : <span style={{fontSize:14.5,fontWeight:700,
                        color:dark?"#e8f5d0":C.dark,whiteSpace:"pre-line",lineHeight:1.65}}>
                        {r.text}
                      </span>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="reveal from-right" style={{
            background:formBg,borderRadius:24,padding:"36px 32px",
            border:`1px solid ${C.lime}33`,
          }}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,
              color:dark?C.limeL:C.dark,marginBottom:6}}>Send a Message</h3>
            <p style={{fontSize:13,color:"#888",marginBottom:24,lineHeight:1.6}}>
              We'll respond within a few hours.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
              <div>
                <label style={lbl}>Your Name *</label>
                <input className="a1-input" name="name" value={form.name}
                  onChange={change} placeholder="Ravi Kumar" style={inp(!!errors.name)}/>
                {errors.name && <div style={errStyle}>{errors.name}</div>}
              </div>
              <div>
                <label style={lbl}>Phone * (10 digits)</label>
                <input className="a1-input" name="phone" value={form.phone}
                  onChange={change} placeholder="98765 43210" type="tel" style={inp(!!errors.phone)}/>
                {errors.phone && <div style={errStyle}>{errors.phone}</div>}
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <label style={lbl}>I Need</label>
              <select className="a1-input" name="need" value={form.need} onChange={change} style={inp(false)}>
                <option value="">Select a category</option>
                {["Juice Essences","Soda Supplies","Bakery Items",
                  "Fast Food Supplies","Hotel Bulk Items","Other"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{marginBottom:20}}>
              <label style={lbl}>Message</label>
              <textarea className="a1-input" name="msg" value={form.msg} onChange={change}
                placeholder="Tell us what you're looking for..."
                style={{...inp(false),height:96,resize:"none"}}/>
            </div>
            <button onClick={submit} className="a1-submit a1-btn" disabled={sending} style={{
              width:"100%",background:sending?C.greenL:C.green,color:"white",
              fontSize:15,padding:"14px 20px",borderRadius:50,
              fontFamily:"'Nunito',sans-serif",cursor:sending?"not-allowed":"pointer",
              fontWeight:800,border:"none",transition:"background .2s,transform .2s",
              display:"flex",alignItems:"center",justifyContent:"center",gap:8,
            }}>
              {sending
                ? <><div style={{width:18,height:18,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",animation:"spin .8s linear infinite"}}/> Sending…</>
                : <><Icon name="send" size={16} color="white" sw={2}/> Send Enquiry</>
              }
            </button>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="reveal" style={{marginTop:56}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,
            color:dark?C.limeL:C.dark,marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
            <Icon name="mappin" size={22} color={C.green} sw={2}/> Find Us on the Map
          </h3>
          <div style={{borderRadius:20,overflow:"hidden",border:`2px solid ${C.lime}33`,
            boxShadow:"0 8px 32px rgba(0,0,0,.1)"}}>
            <iframe
              title="A1 Essence Martt Location"
              src={SITE_DATA.shop.mapSrc}
              width="100%" height="340" style={{border:0,display:"block"}}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   CTA BANNER (before footer)
────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{
      background:`linear-gradient(120deg,${C.greenD},${C.green})`,
      padding:"60px 24px",textAlign:"center",position:"relative",overflow:"hidden",
    }}>
      <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",
        background:"rgba(245,196,0,.07)",filter:"blur(60px)",top:"-50%",left:"60%"}}/>
      <div className="reveal" style={{position:"relative",zIndex:1}}>
        <p style={{fontSize:12,fontWeight:800,letterSpacing:3,color:C.lime,
          textTransform:"uppercase",marginBottom:12}}>Limited Time</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,38px)",
          fontWeight:900,color:"white",marginBottom:12}}>
          Call Now for Best Wholesale Prices
        </h2>
        <p style={{fontSize:16,color:"rgba(255,255,255,.75)",marginBottom:32,maxWidth:480,margin:"0 auto 32px"}}>
          Get exclusive bulk pricing on all categories. Mention this website for a special discount!
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <a href={`tel:+91${SITE_DATA.shop.mobile.replace(/\s/g,"")}`} className="a1-btn" style={{
            display:"inline-flex",alignItems:"center",gap:9,
            padding:"15px 34px",borderRadius:50,fontWeight:800,fontSize:16,
            background:C.yellow,color:C.dark,
            boxShadow:"0 8px 28px rgba(245,196,0,.4)",
          }}>
            <Icon name="phone" size={18} color={C.dark} sw={2.2}/> Call {SITE_DATA.shop.mobile}
          </a>
          <a href={`https://wa.me/${SITE_DATA.shop.wa}?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20products`}
            target="_blank" rel="noreferrer" className="a1-btn" style={{
              display:"inline-flex",alignItems:"center",gap:9,
              padding:"15px 34px",borderRadius:50,fontWeight:800,fontSize:16,
              background:"#25D366",color:"white",
              boxShadow:"0 8px 28px rgba(37,211,102,.35)",
            }}>
            <WhatsAppIcon size={18}/> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER
────────────────────────────────────────────────────────────── */
function Footer({ dark }) {
  const bg = dark ? "#060e03" : C.dark;
  return (
    <footer style={{background:bg,color:"rgba(255,255,255,.65)",padding:"52px 24px 24px",fontSize:14}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="col-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginBottom:40}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <A1Logo size={42} bg={C.yellow} text={C.dark}/>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:C.yellow,fontWeight:900}}>
                  A1 Essence Martt
                </div>
                <div style={{fontSize:11,color:C.lime,letterSpacing:1.5,textTransform:"uppercase",fontWeight:700}}>
                  Trichy's Best Supplier
                </div>
              </div>
            </div>
            <p style={{fontSize:14,lineHeight:1.8,color:"rgba(255,255,255,.55)",maxWidth:360}}>
              Your one-stop wholesale and retail partner for juice, soda, bakery, fast food and hotel
              supplies in Tiruchirappalli since day one.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            <div>
              <h4 style={{color:C.lime,fontWeight:800,fontSize:12,letterSpacing:2,
                textTransform:"uppercase",marginBottom:12}}>Quick Links</h4>
              {["About","Services","Why Us","Reviews","Contact"].map(l => (
                <button key={l} onClick={()=>goTo(l.toLowerCase().replace(" ","-"))}
                  style={{display:"block",background:"none",border:"none",cursor:"pointer",
                    color:"rgba(255,255,255,.55)",fontSize:14,marginBottom:8,
                    fontFamily:"'Nunito',sans-serif",textAlign:"left",
                    transition:"color .2s"}}
                  onMouseEnter={e=>e.target.style.color=C.lime}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.55)"}>
                  {l}
                </button>
              ))}
            </div>
            <div>
              <h4 style={{color:C.lime,fontWeight:800,fontSize:12,letterSpacing:2,
                textTransform:"uppercase",marginBottom:12}}>Contact</h4>
              <div style={{color:"rgba(255,255,255,.55)",fontSize:13,lineHeight:2}}>
                <a href="tel:+919842566001" style={{color:C.lime,display:"block"}}>98425 66001</a>
                <a href="mailto:a1essencemartt@gmail.com" style={{color:C.lime,display:"block",wordBreak:"break-all"}}>
                  a1essencemartt@gmail.com
                </a>
                <div style={{marginTop:4,whiteSpace:"pre-line",lineHeight:1.7}}>
                  {SITE_DATA.shop.address}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:20,
          display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <span style={{opacity:.35,fontSize:11,letterSpacing:1}}>
            © 2025 A1 ESSENCE MARTT — ALL RIGHTS RESERVED
          </span>
          <span style={{opacity:.35,fontSize:11}}>
            Periyakadai Street, Tiruchirappalli – 8
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
   QUICK ORDER MODAL
────────────────────────────────────────────────────────────── */
function QuickOrderModal({ onClose, addToast, dark }) {
  const [form,   setForm]   = useState({name:"",phone:"",category:"",msg:""});
  const [errors, setErrors] = useState({});
  const [sending,setSending]= useState(false);

  const change = e => {
    setForm(p=>({...p,[e.target.name]:e.target.value}));
    if(errors[e.target.name]) setErrors(p=>({...p,[e.target.name]:""}));
  };
  const submit = () => {
    const errs = validateForm({name:form.name,phone:form.phone,message:form.msg});
    if(Object.keys(errs).length){ setErrors(errs); return; }
    setSending(true);
    setTimeout(()=>{ setSending(false); onClose(); addToast("Order placed! We'll call you shortly.","success"); },1200);
  };

  const inp = (hasErr) => ({
    width:"100%",padding:"11px 14px",
    border:`2px solid ${hasErr?"#e74c3c":dark?"#3a5a2a":"#dde8d0"}`,
    borderRadius:10,fontFamily:"'Nunito',sans-serif",fontSize:15,
    background:dark?"#1e3010":"white",color:dark?"#e8f5d0":C.dark,
    outline:"none",transition:"border-color .2s",
  });
  const lbl = {display:"block",fontSize:10,fontWeight:800,marginBottom:5,color:"#999",
    textTransform:"uppercase",letterSpacing:.9};

  return (
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal-box" style={{
        background:dark?"#162609":C.white,borderRadius:24,padding:"36px 32px",
        width:"100%",maxWidth:480,
        border:`1px solid ${C.lime}44`,
        boxShadow:"0 32px 80px rgba(0,0,0,.35)",
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,
            color:dark?C.limeL:C.dark}}>Quick Order</h3>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}>
            <Icon name="close" size={22} color={C.grey} sw={2}/>
          </button>
        </div>
        <p style={{fontSize:13,color:"#888",marginBottom:24}}>Fill in and we'll call you back!</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
          <div>
            <label style={lbl}>Name *</label>
            <input className="a1-input" name="name" value={form.name} onChange={change}
              placeholder="Your name" style={inp(!!errors.name)}/>
            {errors.name && <div style={{fontSize:11,color:"#e74c3c",marginTop:2,fontWeight:600}}>{errors.name}</div>}
          </div>
          <div>
            <label style={lbl}>Phone * (10 digits)</label>
            <input className="a1-input" name="phone" value={form.phone} onChange={change}
              placeholder="98765 43210" type="tel" style={inp(!!errors.phone)}/>
            {errors.phone && <div style={{fontSize:11,color:"#e74c3c",marginTop:2,fontWeight:600}}>{errors.phone}</div>}
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <label style={lbl}>Product Category</label>
          <select className="a1-input" name="category" value={form.category} onChange={change} style={inp(false)}>
            <option value="">Select category</option>
            {["Juice Essences","Soda Supplies","Bakery Items","Fast Food Supplies","Hotel Bulk Items","Other"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={{marginBottom:22}}>
          <label style={lbl}>Message</label>
          <textarea className="a1-input" name="msg" value={form.msg} onChange={change}
            placeholder="What do you need?"
            style={{...inp(false),height:80,resize:"none"}}/>
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onClose} style={{
            flex:1,padding:"13px",borderRadius:50,border:`2px solid ${C.lime}55`,
            background:"transparent",cursor:"pointer",fontFamily:"'Nunito',sans-serif",
            fontWeight:700,color:dark?C.limeL:C.green,fontSize:14,
          }}>Cancel</button>
          <button onClick={submit} disabled={sending} style={{
            flex:2,padding:"13px",borderRadius:50,border:"none",
            background:sending?C.greenL:C.green,color:"white",
            cursor:sending?"not-allowed":"pointer",fontFamily:"'Nunito',sans-serif",
            fontWeight:800,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
          }}>
            {sending
              ? <><div style={{width:16,height:16,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",animation:"spin .8s linear infinite"}}/> Sending…</>
              : <><Icon name="order" size={16} color="white" sw={2}/> Place Order</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   WHATSAPP FLOATING BUTTON
────────────────────────────────────────────────────────────── */
function WAButton() {
  return (
    <a href={`https://wa.me/${SITE_DATA.shop.wa}?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20products`}
      target="_blank" rel="noreferrer" className="wa-btn"
      style={{
        position:"fixed",bottom:100,left:20,zIndex:600,
        width:56,height:56,borderRadius:"50%",
        background:"#25D366",
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 6px 24px rgba(37,211,102,.5)",
        cursor:"pointer", transition:"transform .2s,box-shadow .2s",
      }}
      title="Chat on WhatsApp">
      <WhatsAppIcon size={30}/>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────
   STICKY MOBILE CALL BUTTON
────────────────────────────────────────────────────────────── */
function StickyCall() {
  return (
    <a href={`tel:+91${SITE_DATA.shop.mobile.replace(/\s/g,"")}`}
      className="sticky-call a1-btn"
      style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:599,
        background:C.yellow,color:C.dark,
        alignItems:"center",justifyContent:"center",gap:10,
        padding:"14px",fontWeight:900,fontSize:16,
        fontFamily:"'Nunito',sans-serif",
        boxShadow:"0 -4px 20px rgba(245,196,0,.4)",
      }}>
      <Icon name="phone" size={20} color={C.dark} sw={2.4}/>
      Call Now — {SITE_DATA.shop.mobile}
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────
   ROOT APP
────────────────────────────────────────────────────────────── */
export default function App() {
  const [loaded,    setLoaded]    = useState(false);
  const [dark,      setDark]      = useState(false);
  const [active,    setActive]    = useState("hero");
  const [toasts,    setToasts]    = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);

  // Preloader
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  // Dark mode class on body
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  // IntersectionObserver for active nav
  useEffect(() => {
    const ids = ["hero","about","services","stats","testimonials","contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); }),
      { rootMargin:`-${NAV_H}px 0px -45% 0px`, threshold:0 }
    );
    ids.forEach(id => { const el=document.getElementById(id); if(el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Reveal animations
  useReveal();

  // Toast system
  const addToast = useCallback((msg, type="success") => {
    const id = Date.now();
    setToasts(p => [...p, {id, msg, type, exiting:false}]);
    setTimeout(() => setToasts(p => p.map(t => t.id===id ? {...t,exiting:true} : t)), 3200);
    setTimeout(() => setToasts(p => p.filter(t => t.id!==id)), 3700);
  }, []);

  // Hidden button for navbar → modal trigger
  const openOrder = () => setOrderOpen(true);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <button id="quick-order-modal" onClick={openOrder} style={{display:"none"}}/>

      <Preloader done={loaded}/>
      <ScrollProgress/>

      <Navbar active={active} dark={dark} toggleDark={() => setDark(d=>!d)}/>
      <Hero openOrder={openOrder}/>
      <Marquee/>
      <About dark={dark}/>
      <Services dark={dark}/>
      <Stats/>
      <Testimonials dark={dark}/>
      <ClientStrip dark={dark}/>
      <Contact dark={dark} addToast={addToast}/>
      <CTABanner/>
      <Footer dark={dark}/>

      <WAButton/>
      <StickyCall/>
      <ToastContainer toasts={toasts}/>

      {orderOpen && (
        <QuickOrderModal
          onClose={() => setOrderOpen(false)}
          addToast={addToast}
          dark={dark}
        />
      )}
    </>
  );
}