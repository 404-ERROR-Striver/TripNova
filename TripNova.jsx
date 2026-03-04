import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN SYSTEM — Dark SaaS, Indigo/Cyan palette
// ============================================================
const COLORS = {
  bg: "#0A0C14",
  bgCard: "#0F1220",
  bgMuted: "#151929",
  border: "#1E2540",
  primary: "#4F6EF7",    // indigo
  primaryHover: "#6B84F8",
  secondary: "#06B6D4",  // cyan
  accent: "#818CF8",
  text: "#F1F5F9",
  muted: "#64748B",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
};

// ============================================================
// GLOBAL STYLES injected once
// ============================================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: ${COLORS.bg};
    --bg-card: ${COLORS.bgCard};
    --bg-muted: ${COLORS.bgMuted};
    --border: ${COLORS.border};
    --primary: ${COLORS.primary};
    --primary-hover: ${COLORS.primaryHover};
    --secondary: ${COLORS.secondary};
    --accent: ${COLORS.accent};
    --text: ${COLORS.text};
    --muted: ${COLORS.muted};
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1,h2,h3,h4,h5 {
    font-family: 'Syne', sans-serif;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  /* scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  /* utility */
  .glass {
    background: rgba(15,18,32,0.7);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border);
  }

  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    transition: border-color .25s, transform .25s, box-shadow .25s;
  }
  .card:hover {
    border-color: var(--primary);
    transform: translateY(-3px);
    box-shadow: 0 20px 60px rgba(79,110,247,.12);
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 12px 24px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: opacity .2s, transform .2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-primary:hover { opacity: .88; transform: translateY(-1px); }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 11px 24px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: border-color .2s, background .2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-outline:hover { border-color: var(--primary); background: rgba(79,110,247,.08); }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  .badge-live {
    background: rgba(16,185,129,.12);
    color: #10B981;
    border: 1px solid rgba(16,185,129,.3);
  }

  .badge-blue {
    background: rgba(79,110,247,.12);
    color: var(--primary);
    border: 1px solid rgba(79,110,247,.3);
  }

  .input {
    background: var(--bg-muted);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    width: 100%;
    outline: none;
    transition: border-color .2s;
  }
  .input:focus { border-color: var(--primary); }
  .input::placeholder { color: var(--muted); }

  select.input option { background: var(--bg-card); }

  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--primary);
    margin-bottom: 8px;
  }

  /* Animated gradient orb */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    animation: float 8s ease-in-out infinite;
  }
  @keyframes float {
    0%,100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }

  @keyframes fadeUp {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp .6s ease forwards; }

  @keyframes pulse-dot {
    0%,100% { transform: scale(1); opacity:1; }
    50% { transform: scale(1.5); opacity:.6; }
  }

  @keyframes confettiFall {
    0%   { transform: translateY(-10px) rotate(0deg); opacity:1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity:0; }
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 1s linear infinite; }

  /* Navbar */
  nav.topnav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    gap: 32px;
    background: rgba(10,12,20,.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  /* Grid helpers */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }

  @media(max-width:900px) {
    .grid-3, .grid-4 { grid-template-columns: 1fr 1fr; }
    .grid-2 { grid-template-columns: 1fr; }
  }
  @media(max-width:600px) {
    .grid-3,.grid-4,.grid-2 { grid-template-columns: 1fr; }
    nav.topnav { padding: 0 20px; }
  }
`;

// ============================================================
// INJECT STYLES
// ============================================================
function StyleInjector() {
  useEffect(() => {
    const id = "tripnova-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = globalStyles;
      document.head.appendChild(el);
    }
  }, []);
  return null;
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ page, setPage, user, setUser }) {
  const links = ["Home", "Dashboard", "AI Trip", "Map", "Profile"];
  return (
    <nav className="topnav">
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }} onClick={() => setPage("home")}>
        <div style={{
          width:32, height:32, borderRadius:8,
          background:"linear-gradient(135deg,#4F6EF7,#06B6D4)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:14, fontWeight:800, fontFamily:"Syne,sans-serif"
        }}>T</div>
        <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:18, letterSpacing:"-.02em" }}>
          TRIP<span style={{ color: COLORS.secondary }}>NOVA</span>
          <span style={{ color: COLORS.primary }}>.</span>
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display:"flex", gap:4, flex:1, justifyContent:"center" }}>
        {links.map(l => (
          <button key={l}
            onClick={() => setPage(l.toLowerCase().replace(" ",""))}
            style={{
              background: page === l.toLowerCase().replace(" ","") ? "rgba(79,110,247,.15)" : "transparent",
              border: page === l.toLowerCase().replace(" ","") ? "1px solid rgba(79,110,247,.4)" : "1px solid transparent",
              color: page === l.toLowerCase().replace(" ","") ? COLORS.primary : COLORS.muted,
              borderRadius:8, padding:"6px 14px", cursor:"pointer",
              fontFamily:"DM Sans,sans-serif", fontSize:13, fontWeight:500,
              transition:"all .2s"
            }}
          >{l}</button>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        {user ? (
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img src={user.avatar} alt="" style={{ width:34, height:34, borderRadius:"50%", border:"2px solid "+COLORS.primary }} />
            <span style={{ fontSize:13, color: COLORS.text }}>{user.name}</span>
          </div>
        ) : (
          <>
            <button className="btn-outline" style={{ padding:"8px 16px", fontSize:13 }} onClick={() => setPage("auth")}>Sign In</button>
            <button className="btn-primary" style={{ padding:"8px 16px", fontSize:13 }} onClick={() => setPage("auth")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ============================================================
// LANDING PAGE
// ============================================================
function LandingPage({ setPage }) {
  const destinations = [
    { name:"Santorini, Greece", img:"🏛️", tag:"Beach & Culture", rating:4.9, price:"$1,299" },
    { name:"Kyoto, Japan", img:"⛩️", tag:"Heritage & Nature", rating:4.8, price:"$1,599" },
    { name:"Patagonia, Chile", img:"🏔️", tag:"Adventure", rating:4.7, price:"$2,199" },
    { name:"Marrakech, Morocco", img:"🕌", tag:"Exotic & Vibrant", rating:4.6, price:"$899" },
    { name:"Bali, Indonesia", img:"🌺", tag:"Wellness & Spa", rating:4.9, price:"$1,099" },
    { name:"New York, USA", img:"🗽", tag:"City & Arts", rating:4.7, price:"$1,399" },
  ];

  const reviews = [
    { name:"Arjun Sharma", loc:"Mumbai", text:"TripNova's AI planned our entire Bali trip in 30 seconds. The itinerary was incredibly detailed!", stars:5 },
    { name:"Priya Nair", loc:"Bangalore", text:"Saved hours of research. The map feature with custom markers is a game changer.", stars:5 },
    { name:"Rohan Verma", loc:"Delhi", text:"Stripe checkout worked flawlessly. Booked everything in one place. 10/10.", stars:5 },
  ];

  const stats = [
    { val:"50K+", label:"Trips Planned" },
    { val:"120+", label:"Destinations" },
    { val:"4.9★", label:"Avg Rating" },
    { val:"2 Min", label:"AI Generation" },
  ];

  return (
    <div style={{ paddingTop:64 }}>
      {/* HERO */}
      <section style={{ position:"relative", minHeight:"88vh", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", overflow:"hidden", padding:"80px 40px" }}>
        {/* Orbs */}
        <div className="orb" style={{ width:500, height:500, background:"rgba(79,110,247,.2)", top:"-100px", left:"-100px" }} />
        <div className="orb" style={{ width:400, height:400, background:"rgba(6,182,212,.15)", bottom:"-80px", right:"-80px", animationDelay:"3s" }} />
        {/* grid bg */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(79,110,247,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,110,247,.04) 1px, transparent 1px)`, backgroundSize:"50px 50px" }} />

        <div className="fade-up" style={{ position:"relative", maxWidth:760 }}>
          <div className="badge badge-live" style={{ marginBottom:20 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"pulse-dot 1.5s infinite", display:"inline-block" }} />
            AI PLANNING ACTIVE
          </div>
          <h1 style={{ fontSize:"clamp(42px,7vw,82px)", fontWeight:800, marginBottom:20, lineHeight:1.05 }}>
            TRIP<span style={{ color: COLORS.secondary }}>NOVA</span><span style={{ color: COLORS.primary }}>.</span>
            <br />
            <span style={{ fontWeight:300, color: COLORS.muted, fontSize:"55%" }}>Intelligent Travel Planning</span>
          </h1>
          <p style={{ fontSize:17, color: COLORS.muted, maxWidth:520, margin:"0 auto 36px", lineHeight:1.7 }}>
            AI-generated itineraries, real-time maps, seamless bookings — your dream trip in under 2 minutes.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-primary" style={{ fontSize:15, padding:"14px 30px" }} onClick={() => setPage("aitrip")}>
              ✦ Generate My Trip
            </button>
            <button className="btn-outline" style={{ fontSize:15, padding:"14px 30px" }} onClick={() => setPage("map")}>
              🗺 Explore Map
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ background: COLORS.bgMuted, borderTop:"1px solid "+COLORS.border, borderBottom:"1px solid "+COLORS.border, padding:"28px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, textAlign:"center" }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily:"Syne,sans-serif", fontSize:32, fontWeight:800, color: COLORS.primary }}>{s.val}</div>
              <div style={{ fontSize:12, color: COLORS.muted, letterSpacing:".08em", textTransform:"uppercase", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DESTINATIONS */}
      <section style={{ padding:"80px 40px", maxWidth:1200, margin:"0 auto" }}>
        <p className="section-label">Featured Destinations</p>
        <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", marginBottom:36 }}>Where will you go next?</h2>
        <div className="grid-3">
          {destinations.map(d => (
            <div key={d.name} className="card" style={{ padding:0, overflow:"hidden", cursor:"pointer" }} onClick={() => setPage("tripdetails")}>
              <div style={{
                height:160, background:`linear-gradient(135deg, rgba(79,110,247,.2), rgba(6,182,212,.2))`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:64,
                borderBottom:"1px solid "+COLORS.border
              }}>{d.img}</div>
              <div style={{ padding:"18px 20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <h3 style={{ fontSize:15, fontWeight:700 }}>{d.name}</h3>
                  <span style={{ color: COLORS.warning, fontSize:12, fontWeight:600 }}>★ {d.rating}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span className="badge badge-blue" style={{ fontSize:10 }}>{d.tag}</span>
                  <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, color: COLORS.primary, fontSize:15 }}>from {d.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: COLORS.bgMuted, padding:"80px 40px", borderTop:"1px solid "+COLORS.border }}>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
          <p className="section-label">How It Works</p>
          <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", marginBottom:48 }}>From idea to itinerary in 3 steps</h2>
          <div className="grid-3">
            {[
              { n:"01", icon:"🧠", title:"Describe Your Trip", desc:"Tell our AI your destination, dates, budget, and travel style." },
              { n:"02", icon:"⚡", title:"AI Generates Plan", desc:"Get a full day-by-day itinerary, hotel picks, and activity suggestions instantly." },
              { n:"03", icon:"💳", title:"Book & Go", desc:"Confirm your booking via Stripe and receive everything in your dashboard." },
            ].map(s => (
              <div key={s.n} className="card" style={{ padding:"32px 24px", textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
                <div style={{ fontFamily:"Syne,sans-serif", fontSize:11, color: COLORS.primary, letterSpacing:".1em", marginBottom:8 }}>STEP {s.n}</div>
                <h3 style={{ fontSize:18, marginBottom:12 }}>{s.title}</h3>
                <p style={{ color: COLORS.muted, fontSize:13, lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding:"80px 40px", maxWidth:1100, margin:"0 auto" }}>
        <p className="section-label">Testimonials</p>
        <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", marginBottom:36 }}>Loved by travelers</h2>
        <div className="grid-3">
          {reviews.map(r => (
            <div key={r.name} className="card" style={{ padding:"28px 24px" }}>
              <div style={{ color: COLORS.warning, fontSize:14, marginBottom:14 }}>{"★".repeat(r.stars)}</div>
              <p style={{ color: COLORS.muted, fontSize:13, lineHeight:1.8, marginBottom:18 }}>"{r.text}"</p>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,"+COLORS.primary+","+COLORS.secondary+")", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700 }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:13 }}>{r.name}</div>
                  <div style={{ color: COLORS.muted, fontSize:11 }}>{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.bgMuted, borderTop:"1px solid "+COLORS.border, padding:"40px", textAlign:"center" }}>
        <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:20, marginBottom:12 }}>
          TRIP<span style={{ color: COLORS.secondary }}>NOVA</span><span style={{ color: COLORS.primary }}>.</span>
        </div>
        <p style={{ color: COLORS.muted, fontSize:13 }}>© 2025 TripNova Inc. · AI-Powered Travel Planning</p>
        <div style={{ display:"flex", gap:24, justifyContent:"center", marginTop:16 }}>
          {["Privacy","Terms","About","API Docs"].map(l => (
            <span key={l} style={{ color: COLORS.muted, fontSize:12, cursor:"pointer" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// AUTH PAGE
// ============================================================
function AuthPage({ setUser, setPage }) {
  const handleLogin = () => {
    setUser({ name:"Rahul Gupta", email:"rahul@gmail.com", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=rahul" });
    setPage("dashboard");
  };
  return (
    <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <div className="orb" style={{ width:400, height:400, background:"rgba(79,110,247,.2)", top:"10%", left:"10%" }} />
      <div className="orb" style={{ width:300, height:300, background:"rgba(6,182,212,.15)", bottom:"10%", right:"10%", animationDelay:"2s" }} />
      <div className="card fade-up" style={{ width:"100%", maxWidth:420, padding:"48px 40px", position:"relative", textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:16 }}>✈️</div>
        <h2 style={{ fontSize:28, marginBottom:8 }}>Welcome to TripNova</h2>
        <p style={{ color: COLORS.muted, fontSize:13, marginBottom:36 }}>Sign in to start planning your perfect trip with AI</p>

        <button onClick={handleLogin} style={{
          width:"100%", padding:"14px 20px", borderRadius:10, border:"1px solid "+COLORS.border,
          background: COLORS.bgMuted, color: COLORS.text, cursor:"pointer", display:"flex",
          alignItems:"center", justifyContent:"center", gap:12, fontSize:14, fontWeight:500,
          fontFamily:"DM Sans,sans-serif", transition:"border-color .2s, background .2s", marginBottom:12
        }}
          onMouseOver={e => e.currentTarget.style.borderColor=COLORS.primary}
          onMouseOut={e => e.currentTarget.style.borderColor=COLORS.border}
        >
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>

        <div style={{ position:"relative", margin:"20px 0" }}>
          <div style={{ height:1, background: COLORS.border }} />
          <span style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background: COLORS.bgCard, padding:"0 12px", color: COLORS.muted, fontSize:12 }}>or</span>
        </div>

        <input className="input" placeholder="Email address" style={{ marginBottom:12 }} />
        <input className="input" type="password" placeholder="Password" style={{ marginBottom:20 }} />
        <button className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"14px" }} onClick={handleLogin}>
          Sign In with Email
        </button>

        <p style={{ color: COLORS.muted, fontSize:12, marginTop:20 }}>
          Don't have an account? <span style={{ color: COLORS.primary, cursor:"pointer" }}>Create one free</span>
        </p>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ setPage }) {
  const stats = [
    { icon:"🗺", label:"Total Trips", val:7, color: COLORS.primary },
    { icon:"📅", label:"Upcoming", val:2, color: COLORS.secondary },
    { icon:"⭐", label:"Saved Places", val:34, color: COLORS.warning },
    { icon:"💰", label:"Total Spent", val:"$4,820", color: "#10B981" },
  ];
  const trips = [
    { dest:"Kyoto, Japan", dates:"Mar 15–22", status:"Upcoming", emoji:"⛩️", budget:"$1,800" },
    { dest:"Bali, Indonesia", dates:"Jun 1–10", status:"Planned", emoji:"🌺", budget:"$1,200" },
    { dest:"Paris, France", dates:"Jan 5–12", status:"Completed", emoji:"🗼", budget:"$2,100" },
    { dest:"Istanbul, Turkey", dates:"Nov 20–27", status:"Completed", emoji:"🕌", budget:"$900" },
  ];
  return (
    <div style={{ paddingTop:88, padding:"88px 40px 60px", maxWidth:1200, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:36 }}>
        <div>
          <p className="section-label">Overview</p>
          <h1 style={{ fontSize:32 }}>Your Dashboard</h1>
        </div>
        <button className="btn-primary" onClick={() => setPage("aitrip")}>+ New AI Trip</button>
      </div>

      {/* Stat cards */}
      <div className="grid-4" style={{ marginBottom:36 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding:"24px 20px" }}>
            <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:28, fontWeight:800, color:s.color }}>{s.val}</div>
            <div style={{ color: COLORS.muted, fontSize:12, textTransform:"uppercase", letterSpacing:".06em", marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Trip cards */}
      <h2 style={{ fontSize:20, marginBottom:20 }}>My Trips</h2>
      <div className="grid-2">
        {trips.map(t => (
          <div key={t.dest} className="card" style={{ padding:"22px 24px", cursor:"pointer" }} onClick={() => setPage("tripdetails")}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                <div style={{ width:52, height:52, borderRadius:12, background:"rgba(79,110,247,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, border:"1px solid "+COLORS.border }}>
                  {t.emoji}
                </div>
                <div>
                  <h3 style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>{t.dest}</h3>
                  <p style={{ color: COLORS.muted, fontSize:12 }}>📅 {t.dates}</p>
                </div>
              </div>
              <span className="badge" style={{
                background: t.status==="Upcoming" ? "rgba(79,110,247,.12)" : t.status==="Planned" ? "rgba(6,182,212,.12)" : "rgba(100,116,139,.12)",
                color: t.status==="Upcoming" ? COLORS.primary : t.status==="Planned" ? COLORS.secondary : COLORS.muted,
                border: `1px solid ${t.status==="Upcoming" ? "rgba(79,110,247,.3)" : t.status==="Planned" ? "rgba(6,182,212,.3)" : COLORS.border}`,
                fontSize:10
              }}>{t.status}</span>
            </div>
            <div style={{ marginTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ color: COLORS.muted, fontSize:12 }}>Budget</span>
              <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, color: COLORS.primary }}>{t.budget}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// AI TRIP GENERATOR
// ============================================================
function AITripGenerator({ setPage }) {
  const [step, setStep] = useState("form"); // form | loading | results
  const [form, setForm] = useState({ dest:"", days:"7", budget:"1500", style:"Adventure", travelers:"2" });
  const [itinerary, setItinerary] = useState(null);

  const mockItinerary = {
    dest: form.dest || "Kyoto, Japan",
    days: [
      { day:1, title:"Arrival & Gion District", activities:["Check into Ryokan hotel","Evening walk through Gion","Dinner at traditional kaiseki restaurant","Hanamikoji Street lantern tour"] },
      { day:2, title:"Arashiyama Bamboo Forest", activities:["Bamboo Grove at sunrise","Tenryū-ji Temple gardens","Boat ride on Oi River","Monkey Park Iwatayama"] },
      { day:3, title:"Fushimi Inari & Nishiki Market", activities:["Hike 10,000 torii gates","Street food at Nishiki Market","Pontocho alley dinner","Tea ceremony workshop"] },
    ],
    hotels: ["Ryokan Yoshida Sanso ⭐⭐⭐⭐", "The Ritz-Carlton Kyoto ⭐⭐⭐⭐⭐"],
    tips: ["Book Fushimi Inari early morning to avoid crowds","Get an IC card for seamless train travel","Try matcha experiences in Uji nearby"],
    totalCost: "$" + (form.budget || "1500"),
  };

  const generate = () => {
    setStep("loading");
    setTimeout(() => {
      setItinerary(mockItinerary);
      setStep("results");
    }, 2200);
  };

  if (step === "loading") return (
    <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20 }}>
      <div style={{ width:56, height:56, borderRadius:"50%", border:"3px solid "+COLORS.border, borderTopColor: COLORS.primary }} className="spin" />
      <h3 style={{ fontSize:20 }}>Generating your perfect itinerary…</h3>
      <p style={{ color: COLORS.muted, fontSize:13 }}>Our AI is crafting a personalized day-by-day plan</p>
      <div style={{ display:"flex", gap:8, marginTop:8 }}>
        {["Analyzing destination","Checking seasons","Optimizing budget","Curating activities"].map((t,i) => (
          <span key={t} className="badge badge-blue" style={{ animationDelay:i+"s", fontSize:11 }}>✓ {t}</span>
        ))}
      </div>
    </div>
  );

  if (step === "results" && itinerary) return (
    <div style={{ paddingTop:88, padding:"88px 40px 60px", maxWidth:900, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
        <div>
          <p className="section-label">AI Generated</p>
          <h1 style={{ fontSize:30 }}>Your {itinerary.dest} Itinerary</h1>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-outline" onClick={() => setStep("form")}>← Regenerate</button>
          <button className="btn-primary" onClick={() => setPage("payment")}>Book Now 💳</button>
        </div>
      </div>

      {itinerary.days.map(d => (
        <div key={d.day} className="card" style={{ padding:"24px", marginBottom:16 }}>
          <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:16 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,"+COLORS.primary+","+COLORS.accent+")", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:14 }}>
              D{d.day}
            </div>
            <h3 style={{ fontSize:16, fontWeight:700 }}>{d.title}</h3>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {d.activities.map(a => (
              <span key={a} style={{ background: COLORS.bgMuted, border:"1px solid "+COLORS.border, borderRadius:8, padding:"6px 12px", fontSize:12, color: COLORS.text }}>
                📍 {a}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="grid-2" style={{ marginTop:24 }}>
        <div className="card" style={{ padding:"24px" }}>
          <h3 style={{ fontSize:15, marginBottom:12 }}>🏨 Recommended Hotels</h3>
          {itinerary.hotels.map(h => <p key={h} style={{ fontSize:13, color: COLORS.muted, marginBottom:6 }}>{h}</p>)}
        </div>
        <div className="card" style={{ padding:"24px" }}>
          <h3 style={{ fontSize:15, marginBottom:12 }}>💡 Pro Tips</h3>
          {itinerary.tips.map(t => <p key={t} style={{ fontSize:13, color: COLORS.muted, marginBottom:6 }}>• {t}</p>)}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop:88, padding:"88px 40px 60px", maxWidth:700, margin:"0 auto" }}>
      <p className="section-label">AI Powered</p>
      <h1 style={{ fontSize:32, marginBottom:8 }}>Generate My Trip</h1>
      <p style={{ color: COLORS.muted, marginBottom:36 }}>Fill in your preferences and let our AI craft a perfect itinerary</p>

      <div className="card" style={{ padding:"36px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
          <div>
            <label style={{ display:"block", fontSize:12, color: COLORS.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:".06em" }}>Destination</label>
            <input className="input" placeholder="e.g. Kyoto, Japan" value={form.dest} onChange={e => setForm({...form, dest:e.target.value})} />
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, color: COLORS.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:".06em" }}>Number of Days</label>
            <select className="input" value={form.days} onChange={e => setForm({...form, days:e.target.value})}>
              {[3,5,7,10,14].map(d => <option key={d} value={d}>{d} days</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, color: COLORS.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:".06em" }}>Budget (USD)</label>
            <input className="input" placeholder="e.g. 1500" value={form.budget} onChange={e => setForm({...form, budget:e.target.value})} />
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, color: COLORS.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:".06em" }}>Travelers</label>
            <select className="input" value={form.travelers} onChange={e => setForm({...form, travelers:e.target.value})}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?"person":"people"}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <label style={{ display:"block", fontSize:12, color: COLORS.muted, marginBottom:10, textTransform:"uppercase", letterSpacing:".06em" }}>Travel Style</label>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {["Adventure","Cultural","Relaxation","Foodie","Luxury","Budget"].map(s => (
              <button key={s} onClick={() => setForm({...form, style:s})} style={{
                padding:"8px 16px", borderRadius:8, border:"1px solid "+(form.style===s ? COLORS.primary : COLORS.border),
                background: form.style===s ? "rgba(79,110,247,.15)" : "transparent",
                color: form.style===s ? COLORS.primary : COLORS.muted,
                cursor:"pointer", fontSize:13, fontFamily:"DM Sans,sans-serif", transition:"all .2s"
              }}>{s}</button>
            ))}
          </div>
        </div>

        <button className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"15px", fontSize:15 }} onClick={generate}>
          ✦ Generate AI Itinerary
        </button>
      </div>
    </div>
  );
}

// ============================================================
// TRIP DETAILS PAGE
// ============================================================
function TripDetails({ setPage }) {
  const photos = ["🏯","🎋","⛩️","🌸","🍜","🎎"];
  const itinerary = [
    { time:"08:00", activity:"Bamboo Grove Morning Walk", type:"Sightseeing" },
    { time:"10:30", activity:"Tenryū-ji Temple", type:"Culture" },
    { time:"13:00", activity:"Ramen lunch in Arashiyama", type:"Food" },
    { time:"15:00", activity:"Monkey Park Hike", type:"Adventure" },
    { time:"19:00", activity:"Pontocho Alley Dinner", type:"Food" },
  ];
  return (
    <div style={{ paddingTop:88, padding:"88px 40px 60px", maxWidth:1100, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32, flexWrap:"wrap", gap:16 }}>
        <div>
          <p className="section-label">Trip Details</p>
          <h1 style={{ fontSize:36 }}>Kyoto, Japan 🇯🇵</h1>
          <div style={{ display:"flex", gap:10, marginTop:10, flexWrap:"wrap" }}>
            {["7 Days","Mar 15–22","2 Travelers","$1,800"].map(t => (
              <span key={t} className="badge badge-blue" style={{ fontSize:11 }}>{t}</span>
            ))}
          </div>
        </div>
        <button className="btn-primary" onClick={() => setPage("payment")}>Book This Trip 💳</button>
      </div>

      {/* Photo gallery */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:32 }}>
        {photos.map((p,i) => (
          <div key={i} style={{
            borderRadius:12, border:"1px solid "+COLORS.border,
            height: i===0 ? 160 : 80, gridColumn: i===0 ? "span 2" : "span 1",
            background:"rgba(79,110,247,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize: i===0 ? 48 : 28,
            cursor:"pointer", transition:"transform .2s"
          }} onMouseOver={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>{p}</div>
        ))}
      </div>

      <div className="grid-2">
        {/* Itinerary */}
        <div>
          <h2 style={{ fontSize:20, marginBottom:16 }}>Day 2 — Arashiyama</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {itinerary.map((item,i) => (
              <div key={i} className="card" style={{ padding:"14px 18px", display:"flex", gap:14, alignItems:"center" }}>
                <div style={{ fontFamily:"Syne,sans-serif", fontSize:12, color: COLORS.primary, fontWeight:700, minWidth:44 }}>{item.time}</div>
                <div style={{ flex:1, fontSize:14, fontWeight:500 }}>{item.activity}</div>
                <span className="badge" style={{ background:"rgba(6,182,212,.1)", color:COLORS.secondary, border:"1px solid rgba(6,182,212,.25)", fontSize:10 }}>{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar info */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Weather */}
          <div className="card" style={{ padding:"24px" }}>
            <h3 style={{ fontSize:15, marginBottom:14 }}>🌤 Weather Forecast</h3>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[["Mon","☀️","18°"],["Tue","🌤","16°"],["Wed","🌧","12°"],["Thu","☁️","14°"],["Fri","☀️","19°"]].map(([d,e,t]) => (
                <div key={d} style={{ flex:1, minWidth:52, textAlign:"center", background: COLORS.bgMuted, borderRadius:10, padding:"10px 6px", border:"1px solid "+COLORS.border }}>
                  <div style={{ fontSize:10, color: COLORS.muted, marginBottom:4 }}>{d}</div>
                  <div style={{ fontSize:20 }}>{e}</div>
                  <div style={{ fontSize:12, fontWeight:600, marginTop:4 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="card" style={{ padding:"24px" }}>
            <h3 style={{ fontSize:15, marginBottom:12 }}>Tags</h3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["#Japan","#Temples","#Culture","#Bamboo","#Onsen","#FoodTour","#SpringBlossoms"].map(t => (
                <span key={t} style={{ background: COLORS.bgMuted, border:"1px solid "+COLORS.border, borderRadius:8, padding:"5px 12px", fontSize:12, color: COLORS.muted }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Budget breakdown */}
          <div className="card" style={{ padding:"24px" }}>
            <h3 style={{ fontSize:15, marginBottom:14 }}>💰 Budget Breakdown</h3>
            {[["Flights","$600"],["Hotels","$700"],["Activities","$300"],["Food","$200"]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ color: COLORS.muted, fontSize:13 }}>{k}</span>
                <span style={{ fontWeight:600, fontSize:13 }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop:"1px solid "+COLORS.border, paddingTop:10, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontWeight:700 }}>Total</span>
              <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, color: COLORS.primary, fontSize:16 }}>$1,800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAYMENT PAGE
// ============================================================
function PaymentPage({ setPage }) {
  const [loading, setLoading] = useState(false);
  const pay = () => {
    setLoading(true);
    setTimeout(() => setPage("success"), 2000);
  };
  return (
    <div style={{ paddingTop:88, padding:"88px 40px 60px", maxWidth:900, margin:"0 auto" }}>
      <p className="section-label">Stripe Checkout</p>
      <h1 style={{ fontSize:30, marginBottom:32 }}>Complete Your Booking</h1>
      <div className="grid-2" style={{ gap:32 }}>
        {/* Form */}
        <div className="card" style={{ padding:"32px" }}>
          <h3 style={{ fontSize:16, marginBottom:20 }}>Payment Details</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={{ fontSize:12, color: COLORS.muted, display:"block", marginBottom:6 }}>Cardholder Name</label>
              <input className="input" placeholder="Rahul Gupta" />
            </div>
            <div>
              <label style={{ fontSize:12, color: COLORS.muted, display:"block", marginBottom:6 }}>Card Number</label>
              <input className="input" placeholder="4242 4242 4242 4242" />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={{ fontSize:12, color: COLORS.muted, display:"block", marginBottom:6 }}>Expiry</label>
                <input className="input" placeholder="MM / YY" />
              </div>
              <div>
                <label style={{ fontSize:12, color: COLORS.muted, display:"block", marginBottom:6 }}>CVC</label>
                <input className="input" placeholder="123" />
              </div>
            </div>
            <div style={{ background:"rgba(79,110,247,.06)", border:"1px solid rgba(79,110,247,.2)", borderRadius:10, padding:"10px 14px", display:"flex", gap:8, alignItems:"center" }}>
              <span>🔒</span>
              <span style={{ fontSize:12, color: COLORS.muted }}>Test mode — use card 4242 4242 4242 4242</span>
            </div>
            <button className="btn-primary" style={{ justifyContent:"center", padding:"14px", fontSize:15 }} onClick={pay} disabled={loading}>
              {loading ? <span className="spin" style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block" }} /> : "💳 Pay $1,800"}
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div className="card" style={{ padding:"28px", marginBottom:16 }}>
            <h3 style={{ fontSize:15, marginBottom:16 }}>Order Summary</h3>
            <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:20 }}>
              <span style={{ fontSize:40 }}>⛩️</span>
              <div>
                <div style={{ fontWeight:700, fontSize:14 }}>Kyoto, Japan</div>
                <div style={{ color: COLORS.muted, fontSize:12 }}>Mar 15–22 · 2 Travelers · 7 Days</div>
              </div>
            </div>
            {[["Flight (Round Trip)","$600"],["Hotel (6 nights)","$700"],["Activities Package","$300"],["Food & Dining","$200"]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ color: COLORS.muted, fontSize:13 }}>{k}</span>
                <span style={{ fontSize:13 }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop:"1px solid "+COLORS.border, paddingTop:12, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontWeight:700 }}>Total</span>
              <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, color: COLORS.primary, fontSize:18 }}>$1,800</span>
            </div>
          </div>
          <div className="card" style={{ padding:"18px 20px" }}>
            <p style={{ fontSize:12, color: COLORS.muted }}>🛡 Secured by Stripe · 256-bit SSL encryption · Your payment info is never stored on our servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BOOKING SUCCESS PAGE — with confetti
// ============================================================
function BookingSuccess({ setPage }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = Array.from({length:120}, () => ({
      x: Math.random()*canvas.width,
      y: -20,
      w: Math.random()*12+4, h: Math.random()*6+4,
      color: ["#4F6EF7","#06B6D4","#818CF8","#10B981","#F59E0B"][Math.floor(Math.random()*5)],
      speed: Math.random()*4+2,
      spin: Math.random()*10-5,
      angle: Math.random()*360,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle*Math.PI)/180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
        ctx.restore();
        p.y += p.speed;
        p.angle += p.spin;
        if (p.y > canvas.height) p.y = -20;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ paddingTop:64, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }} />
      <div className="card fade-up" style={{ width:"100%", maxWidth:480, padding:"52px 44px", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:72, marginBottom:16 }}>🎉</div>
        <h1 style={{ fontSize:32, marginBottom:10, color: COLORS.primary }}>Booking Confirmed!</h1>
        <p style={{ color: COLORS.muted, marginBottom:6, fontSize:15 }}>Your Kyoto trip is officially booked.</p>
        <p style={{ color: COLORS.muted, fontSize:13, marginBottom:28 }}>Confirmation #TN-2025-88421 sent to rahul@gmail.com</p>
        <div className="card" style={{ padding:"20px", background: COLORS.bgMuted, marginBottom:24 }}>
          {[["Destination","Kyoto, Japan ⛩️"],["Dates","Mar 15–22, 2025"],["Travelers","2 Passengers"],["Total Paid","$1,800"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:10, fontSize:13 }}>
              <span style={{ color: COLORS.muted }}>{k}</span>
              <span style={{ fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"14px" }} onClick={() => setPage("dashboard")}>
          → Go to Dashboard
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAP PAGE — Leaflet-style placeholder with markers
// ============================================================
function MapPage() {
  const [selected, setSelected] = useState(null);
  const destinations = [
    { name:"Tokyo", x:75, y:42, emoji:"🗼", info:"Capital of Japan · 13.9M visitors/year" },
    { name:"Bali", x:68, y:58, emoji:"🌺", info:"Island paradise · 6.3M visitors/year" },
    { name:"Paris", x:47, y:34, emoji:"🗼", info:"City of Lights · 38M visitors/year" },
    { name:"NYC", x:26, y:36, emoji:"🗽", info:"The Big Apple · 66M visitors/year" },
    { name:"Sydney", x:78, y:70, emoji:"🦘", info:"Harbour City · 8.8M visitors/year" },
    { name:"Cape Town", x:49, y:68, emoji:"🏔", info:"South Africa · 1.7M visitors/year" },
    { name:"Dubai", x:57, y:45, emoji:"🏙", info:"City of Gold · 16.7M visitors/year" },
    { name:"Kyoto", x:74, y:40, emoji:"⛩", info:"Ancient Japan · 20M visitors/year" },
  ];
  return (
    <div style={{ paddingTop:88, padding:"88px 40px 60px", maxWidth:1100, margin:"0 auto" }}>
      <p className="section-label">Interactive</p>
      <h1 style={{ fontSize:32, marginBottom:8 }}>Destination Map</h1>
      <p style={{ color: COLORS.muted, marginBottom:24 }}>Click markers to explore destinations</p>

      {/* World map mockup */}
      <div style={{ position:"relative", background: COLORS.bgCard, border:"1px solid "+COLORS.border, borderRadius:20, overflow:"hidden", aspectRatio:"16/7" }}>
        {/* Grid overlay */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(79,110,247,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(79,110,247,.05) 1px,transparent 1px)`, backgroundSize:"5% 14%" }} />
        {/* Gradient atmosphere */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 50%, rgba(79,110,247,.06) 0%, transparent 70%)" }} />

        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ color:"rgba(100,116,139,.15)", fontFamily:"Syne,sans-serif", fontSize:"clamp(20px,5vw,60px)", fontWeight:800 }}>WORLD MAP</span>
        </div>

        {destinations.map(d => (
          <div key={d.name}
            onClick={() => setSelected(selected?.name===d.name ? null : d)}
            style={{
              position:"absolute",
              left:d.x+"%", top:d.y+"%",
              transform:"translate(-50%,-50%)",
              cursor:"pointer",
              zIndex:2,
            }}>
            <div style={{
              width:38, height:38, borderRadius:"50%",
              background: selected?.name===d.name ? COLORS.primary : "rgba(79,110,247,.2)",
              border:"2px solid "+(selected?.name===d.name ? COLORS.primary : "rgba(79,110,247,.5)"),
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:16, transition:"all .2s",
              boxShadow: selected?.name===d.name ? "0 0 20px rgba(79,110,247,.5)" : "none"
            }}>{d.emoji}</div>
            <div style={{
              position:"absolute", bottom:"-22px", left:"50%", transform:"translateX(-50%)",
              fontSize:"10px", fontWeight:700, color: COLORS.primary, whiteSpace:"nowrap",
              fontFamily:"Syne,sans-serif"
            }}>{d.name}</div>

            {selected?.name===d.name && (
              <div style={{
                position:"absolute", top:"110%", left:"50%", transform:"translateX(-50%)",
                background: COLORS.bgCard, border:"1px solid "+COLORS.primary,
                borderRadius:10, padding:"10px 14px", whiteSpace:"nowrap",
                fontSize:12, color: COLORS.text, zIndex:10,
                boxShadow:"0 10px 40px rgba(0,0,0,.5)"
              }}>
                <div style={{ fontWeight:700, marginBottom:4 }}>{d.emoji} {d.name}</div>
                <div style={{ color: COLORS.muted }}>{d.info}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Destination grid */}
      <h2 style={{ fontSize:20, margin:"36px 0 16px" }}>All Destinations</h2>
      <div className="grid-4">
        {destinations.map(d => (
          <div key={d.name} className="card" style={{ padding:"18px 16px", cursor:"pointer" }} onClick={() => setSelected(d)}>
            <div style={{ fontSize:28, marginBottom:8 }}>{d.emoji}</div>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{d.name}</div>
            <div style={{ color: COLORS.muted, fontSize:11 }}>{d.info.split("·")[1]?.trim()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// USER PROFILE
// ============================================================
function ProfilePage() {
  const savedTrips = ["Bali, Indonesia 🌺","Kyoto, Japan ⛩️","Santorini, Greece 🏛️","Patagonia, Chile 🏔️"];
  const history = [
    { dest:"Paris, France", date:"Jan 2025", spent:"$2,100", emoji:"🗼" },
    { dest:"Istanbul, Turkey", date:"Nov 2024", spent:"$900", emoji:"🕌" },
    { dest:"Maldives", date:"Aug 2024", spent:"$3,200", emoji:"🏝" },
  ];
  return (
    <div style={{ paddingTop:88, padding:"88px 40px 60px", maxWidth:1000, margin:"0 auto" }}>
      {/* Profile header */}
      <div className="card" style={{ padding:"32px", display:"flex", gap:24, alignItems:"center", marginBottom:28 }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,"+COLORS.primary+","+COLORS.secondary+")", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, border:"3px solid "+COLORS.primary }}>
          R
        </div>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:26, marginBottom:4 }}>Rahul Gupta</h1>
          <p style={{ color: COLORS.muted, fontSize:13 }}>rahul@gmail.com · Member since Jan 2024</p>
          <div style={{ display:"flex", gap:10, marginTop:10 }}>
            <span className="badge badge-blue">✈ 7 Trips</span>
            <span className="badge" style={{ background:"rgba(6,182,212,.1)", color:COLORS.secondary, border:"1px solid rgba(6,182,212,.25)" }}>⭐ 34 Saved</span>
          </div>
        </div>
        <button className="btn-outline">Edit Profile</button>
      </div>

      <div className="grid-2">
        {/* Saved trips */}
        <div>
          <h2 style={{ fontSize:18, marginBottom:16 }}>⭐ Saved Destinations</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {savedTrips.map(t => (
              <div key={t} className="card" style={{ padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:14 }}>{t}</span>
                <span style={{ color: COLORS.primary, fontSize:13, cursor:"pointer" }}>View →</span>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <h2 style={{ fontSize:18, marginBottom:16 }}>📋 Trip History</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {history.map(t => (
              <div key={t.dest} className="card" style={{ padding:"16px 18px" }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <span style={{ fontSize:28 }}>{t.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14 }}>{t.dest}</div>
                    <div style={{ color: COLORS.muted, fontSize:12 }}>{t.date}</div>
                  </div>
                  <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, color: COLORS.primary }}>{t.spent}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Account Settings */}
          <h2 style={{ fontSize:18, margin:"24px 0 16px" }}>⚙️ Account Settings</h2>
          <div className="card" style={{ padding:"20px" }}>
            {["Notifications","Currency (USD)","Language (English)","Dark Mode"].map(s => (
              <div key={s} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid "+COLORS.border }}>
                <span style={{ fontSize:13 }}>{s}</span>
                <div style={{ width:40, height:22, borderRadius:999, background:"rgba(79,110,247,.3)", cursor:"pointer", position:"relative" }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background: COLORS.primary, position:"absolute", top:3, right:3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CODE REFERENCE PANEL
// ============================================================
function CodeReference() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("structure");

  const codes = {
    structure: `📁 TripNova/
├── 📁 frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TripCard.jsx
│   │   │   └── MapMarker.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AITripGenerator.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   ├── PaymentPage.jsx
│   │   │   ├── BookingSuccess.jsx
│   │   │   ├── MapPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useTrips.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── 📁 backend/
    ├── models/
    │   ├── User.js
    │   ├── Trip.js
    │   └── Booking.js
    ├── routes/
    │   ├── auth.js
    │   ├── trips.js
    │   ├── ai.js
    │   └── payments.js
    ├── middleware/
    │   └── auth.js
    ├── config/
    │   └── db.js
    ├── .env
    ├── server.js
    └── package.json`,

    backend: `// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/trips',    require('./routes/trips'));
app.use('/api/ai',       require('./routes/ai'));
app.use('/api/payments', require('./routes/payments'));

app.listen(5000, () => console.log('🚀 Server on port 5000'));

// ─────────────────────────────────
// routes/ai.js — OpenAI Integration
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate-itinerary', auth, async (req, res) => {
  const { destination, days, budget, style } = req.body;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{
      role: "user",
      content: \`Create a detailed \${days}-day itinerary for \${destination}.
        Budget: $\${budget} USD. Style: \${style}.
        Return JSON with: days[], hotels[], tips[], totalCost.\`
    }],
    response_format: { type: "json_object" }
  });
  
  res.json(JSON.parse(completion.choices[0].message.content));
});`,

    schemas: `// models/User.js
const userSchema = new Schema({
  googleId:   String,
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  avatar:     String,
  savedTrips: [{ type: ObjectId, ref: 'Trip' }],
  createdAt:  { type: Date, default: Date.now }
});

// models/Trip.js
const tripSchema = new Schema({
  user:        { type: ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  startDate:   Date,
  endDate:     Date,
  days:        Number,
  budget:      Number,
  style:       String,
  itinerary:   [{
    day: Number, title: String,
    activities: [String]
  }],
  hotels:      [String],
  status:      { type: String, enum: ['planned','booked','completed'], default: 'planned' },
  createdAt:   { type: Date, default: Date.now }
});

// models/Booking.js
const bookingSchema = new Schema({
  user:              { type: ObjectId, ref: 'User' },
  trip:              { type: ObjectId, ref: 'Trip' },
  stripePaymentId:   String,
  amount:            Number,
  currency:          { type: String, default: 'usd' },
  status:            { type: String, enum: ['pending','paid','refunded'] },
  confirmedAt:       Date
});`,

    stripe: `// routes/payments.js — Stripe Integration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post('/create-session', auth, async (req, res) => {
  const { tripId, amount } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'TripNova — Kyoto Package' },
        unit_amount: amount * 100, // cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: \`\${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url:  \`\${process.env.FRONTEND_URL}/payment\`,
    metadata: { tripId, userId: req.user.id }
  });
  
  res.json({ url: session.url });
});

// Webhook — confirm payment
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const event = stripe.webhooks.constructEvent(
    req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET
  );
  
  if (event.type === 'checkout.session.completed') {
    const { tripId, userId } = event.data.object.metadata;
    await Booking.create({ trip: tripId, user: userId, status: 'paid' });
    await Trip.findByIdAndUpdate(tripId, { status: 'booked' });
  }
  res.json({ received: true });
});`,

    mapbox: `// MapPage.jsx — Mapbox GL JS
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [139.6917, 35.6895], // Tokyo
      zoom: 4
    });

    const destinations = [
      { name: 'Kyoto', coords: [135.7681, 35.0116], emoji: '⛩' },
      { name: 'Bali',  coords: [115.1889, -8.4095], emoji: '🌺' },
    ];

    destinations.forEach(d => {
      const el = document.createElement('div');
      el.innerHTML = \`<div style="font-size:28px;cursor:pointer;">\${d.emoji}</div>\`;
      
      new mapboxgl.Marker(el)
        .setLngLat(d.coords)
        .setPopup(new mapboxgl.Popup()
          .setHTML(\`<strong>\${d.name}</strong>\`))
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} style={{ width:'100%', height:'100vh' }} />;
}`,

    deploy: `# 🚀 Running Locally
# Backend
cd backend
npm install
cp .env.example .env   # fill in your keys
node server.js         # http://localhost:5000

# Frontend
cd frontend
npm install
npm run dev            # http://localhost:5173

# ──────────────────────────────────
# .env (backend)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tripnova
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_here

# .env (frontend)
VITE_API_URL=http://localhost:5000/api
VITE_MAPBOX_TOKEN=pk.eyJ1...
VITE_STRIPE_PK=pk_test_...

# ──────────────────────────────────
# 🌍 Deployment
# Frontend → Vercel
vercel --prod   # auto-detects Vite

# Backend → Render.com
# Connect GitHub repo → set env vars → deploy

# Database → MongoDB Atlas
# Free M0 tier → whitelist IPs → paste URI`
  };

  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:200 }}>
      <button onClick={() => setOpen(!open)} className="btn-primary" style={{ borderRadius:12, boxShadow:"0 8px 32px rgba(79,110,247,.4)" }}>
        {open ? "✕ Close" : "⌨ Code Reference"}
      </button>
      {open && (
        <div style={{
          position:"absolute", bottom:52, right:0, width:680, maxHeight:520,
          background: COLORS.bgCard, border:"1px solid "+COLORS.border, borderRadius:16,
          overflow:"hidden", boxShadow:"0 30px 80px rgba(0,0,0,.7)"
        }}>
          <div style={{ display:"flex", gap:0, borderBottom:"1px solid "+COLORS.border, overflowX:"auto" }}>
            {Object.keys(codes).map(k => (
              <button key={k} onClick={() => setTab(k)} style={{
                padding:"10px 16px", background: tab===k ? "rgba(79,110,247,.15)" : "transparent",
                border:"none", borderBottom: tab===k ? "2px solid "+COLORS.primary : "2px solid transparent",
                color: tab===k ? COLORS.primary : COLORS.muted, cursor:"pointer",
                fontFamily:"DM Sans,sans-serif", fontSize:12, fontWeight:600, whiteSpace:"nowrap"
              }}>{k}</button>
            ))}
          </div>
          <pre style={{
            padding:"20px", fontSize:11, color:"#a8b4d0", lineHeight:1.7,
            overflowY:"auto", maxHeight:440, margin:0, fontFamily:"'JetBrains Mono', 'Fira Code', monospace",
            tabSize:2
          }}>{codes[tab]}</pre>
        </div>
      )}
    </div>
  );
}

// ============================================================
// APP ROOT — Router
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const pages = {
    home:       <LandingPage setPage={setPage} />,
    auth:       <AuthPage setUser={setUser} setPage={setPage} />,
    dashboard:  <Dashboard setPage={setPage} />,
    aitrip:     <AITripGenerator setPage={setPage} />,
    tripdetails:<TripDetails setPage={setPage} />,
    payment:    <PaymentPage setPage={setPage} />,
    success:    <BookingSuccess setPage={setPage} />,
    map:        <MapPage />,
    profile:    <ProfilePage />,
  };

  return (
    <>
      <StyleInjector />
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />
      {pages[page] || pages.home}
      <CodeReference />
    </>
  );
}
