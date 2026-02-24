import { useState, useEffect, useRef } from "react";

const ARTICLES_KEY = "inkwell:articles:v3";

const G = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap');`;

const ANIM = `
@keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes slideRight { from { width:0; } to { width:100%; } }
@keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
.fade-up { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
.fade-up-2 { animation: fadeUp 0.7s 0.12s cubic-bezier(.22,1,.36,1) both; }
.fade-up-3 { animation: fadeUp 0.7s 0.24s cubic-bezier(.22,1,.36,1) both; }
.fade-up-4 { animation: fadeUp 0.7s 0.36s cubic-bezier(.22,1,.36,1) both; }
.fade-up-5 { animation: fadeUp 0.7s 0.48s cubic-bezier(.22,1,.36,1) both; }
.fade-in { animation: fadeIn 0.5s ease both; }
`;

const T = {
  light: {
    bg: "#FDFCF9",
    bgAlt: "#F7F5F0",
    surface: "#FFFFFF",
    surfaceAlt: "#F2EFE9",
    border: "#E5E0D8",
    borderLight: "#EDE9E2",
    text: "#1C1917",
    textSub: "#44403C",
    textMuted: "#78716C",
    textLight: "#A8A29E",
    accent: "#2563EB",
    accentWarm: "#C2410C",
    accentGold: "#B45309",
    nav: "rgba(253,252,249,0.94)",
    heroGrad: "linear-gradient(135deg, #FDFCF9 0%, #F0EBE0 50%, #E8DFD0 100%)",
    cardHover: "#FAF8F4",
    tag: "#EDE9E2",
    tagText: "#57534E",
    shadow: "0 1px 4px rgba(0,0,0,0.06)",
    shadowMd: "0 4px 16px rgba(0,0,0,0.08)",
    shadowLg: "0 12px 48px rgba(0,0,0,0.10)",
    shimmer: "linear-gradient(90deg, #F7F5F0 0%, #FDFCF9 50%, #F7F5F0 100%)",
  },
  dark: {
    bg: "#0C0B09",
    bgAlt: "#141210",
    surface: "#181614",
    surfaceAlt: "#201E1B",
    border: "#2A2724",
    borderLight: "#242120",
    text: "#F5F3EE",
    textSub: "#C8C3BB",
    textMuted: "#8A8480",
    textLight: "#5C5852",
    accent: "#60A5FA",
    accentWarm: "#F97316",
    accentGold: "#FBBF24",
    nav: "rgba(12,11,9,0.95)",
    heroGrad: "linear-gradient(135deg, #0C0B09 0%, #1A1612 50%, #1F1A13 100%)",
    cardHover: "#1C1A17",
    tag: "#242120",
    tagText: "#8A8480",
    shadow: "0 1px 4px rgba(0,0,0,0.3)",
    shadowMd: "0 4px 16px rgba(0,0,0,0.4)",
    shadowLg: "0 12px 48px rgba(0,0,0,0.5)",
    shimmer: "linear-gradient(90deg, #141210 0%, #1C1A17 50%, #141210 100%)",
  },
};

const seedArticles = [
  {
    id: "s1",
    title: "The Art of Deep Work: Reclaiming Focus in a Distracted World",
    subtitle: "How the most productive minds of our era protect their attention — and what we can learn from their methods.",
    content: `In 1985, the mathematician Andrew Wiles withdrew from the academic world. Not because he had failed, but because he was about to attempt something so audacious that he couldn't afford to be interrupted. For seven years, he worked in secret on Fermat's Last Theorem — a problem unsolved for 358 years.

He succeeded.

What Wiles understood intuitively, and what cognitive scientists have since confirmed, is that certain kinds of thinking require more than intelligence. They require an environment — internal and external — that permits sustained, uninterrupted engagement. They require what Cal Newport would later call *deep work*.

## The Attention Economy's Hidden Cost

We live in an era explicitly designed to fragment our attention. The average knowledge worker, studies show, switches tasks every three minutes. Email, messaging applications, social feeds — all optimized not for our productivity, but for our engagement.

The cost is invisible and cumulative. Every interruption doesn't just cost the time of the interruption itself. It costs the recovery time: the ten to twenty minutes required to return to the same cognitive depth. Multiply that across a typical workday and the arithmetic is sobering.

## Reclaiming the Deep Hours

The strategies vary, but the pattern among prolific thinkers is consistent. Haruki Murakami wakes at four in the morning and writes for five or six hours before the world has a chance to claim him. Charles Darwin took long solitary walks — no companions, no conversation, only the steady rhythm of footsteps and thought.

The common element isn't the specific practice. It's the intention behind it: a deliberate protection of cognitive resources for the work that matters most.

This is not about becoming a hermit. It is about recognizing that attention is a finite resource, that its allocation is a choice, and that the work we most want to produce will only emerge if we create the conditions for it.

## A Practical Architecture

Begin with the question: what is the work that only I can do?

Not the urgent work. Not the responsive work. The work that, if done well, would make everything else less necessary.

Protect time for that work first. Schedule it before you open your email. Treat it with the seriousness you would treat a meeting with the most important person in your professional life.

Because, in a real sense, that is precisely what it is.`,
    author: "Eleanor Marsh",
    authorInitial: "E",
    category: "Productivity",
    date: "Feb 22, 2026",
    readTime: "6 min",
    tags: ["focus", "productivity", "deep work"],
    likes: 3240,
    views: 48200,
    featured: true,
  },
  {
    id: "s2",
    title: "Why Curiosity is the Most Underrated Professional Skill",
    subtitle: "Organizations invest heavily in expertise. The evidence suggests they may be optimizing for the wrong thing.",
    content: `Ask most hiring managers what they look for and you'll hear a familiar litany: experience, domain knowledge, demonstrated results. These are sensible criteria. They are also, according to a growing body of research, incomplete.

The trait that most reliably predicts both individual performance and organizational adaptability turns out to be something far harder to measure on a résumé: intellectual curiosity.

## What the Research Shows

A 2020 meta-analysis of 200 studies found that curiosity predicted academic performance nearly as well as intelligence. More significantly, it predicted performance on novel tasks — the kind that require adapting rather than applying — more reliably than expertise alone.

The mechanism is not mysterious. Curious people ask better questions. They seek disconfirming evidence. They are less attached to their existing mental models and therefore more capable of updating them. In environments where yesterday's solutions don't solve today's problems, this is an enormous advantage.

## The Expert Trap

Expertise, paradoxically, can become a liability. The neurological phenomenon of functional fixedness — the tendency to see tools only in terms of their familiar uses — is more pronounced in experts than in novices. The person who knows the most about how something has always been done is often the last to see how it might be done differently.

This is not an argument against expertise. Deep knowledge matters. But it matters most when combined with the willingness to question its own foundations.

## Cultivating the Habit

Curiosity is not purely innate. It can be cultivated, and its cultivation is straightforward if not easy.

Ask one more question than you think you need to. Spend time with people whose domains are adjacent to yours but not identical. Read outside your field. Approach expertise not as a destination but as a current position from which further exploration is always possible.

The most interesting thinkers I have known share a quality that initially seems like a personality trait but turns out to be a practice: they are genuinely, visibly delighted by things they don't yet understand.

That delight is the engine of everything.`,
    author: "Dr. Nadia Osei",
    authorInitial: "N",
    category: "Leadership",
    date: "Feb 21, 2026",
    readTime: "5 min",
    tags: ["curiosity", "leadership", "learning"],
    likes: 1870,
    views: 29400,
    featured: false,
  },
  {
    id: "s3",
    title: "Notes from the Field: What Six Months in Southeast Asia Taught Me About Simplicity",
    subtitle: "A travel journal that became something else entirely.",
    content: `I left with two bags and came back with one. Not because I lost luggage, but because somewhere between Chiang Mai and Hội An, I stopped needing the weight.

This is the kind of observation that sounds like a metaphor but is also just literally true.

## The First Weeks

The first weeks in Thailand were an education in discomfort. Not dramatic discomfort — I was never in danger, never truly cold or hungry. But the texture of daily life was unfamiliar in ways that accumulated: the bureaucracy of transportation, the adjustment to heat, the challenge of communicating across a language barrier without the shorthand I didn't know I relied upon.

What I noticed, about three weeks in, was that I had stopped checking certain things. My home country's news cycle had become genuinely unimportant to me — not because I had decided it was, but because I simply had less cognitive bandwidth for it, and it turned out that its absence made no meaningful difference to my days.

## What Simplicity Actually Means

We use simplicity as a shorthand for minimalism — fewer possessions, cleaner spaces. But the simplicity I found in Southeast Asia was different. It was about the narrowing of the decision space.

When your options for dinner are the three restaurants visible from your guesthouse, you eat dinner without the low-grade anxiety of infinite choice. When your accommodation decision is binary — this one or the next town — you make it quickly and move on. The absence of optionality, which I had always associated with constraint, turned out to feel like liberation.

## Coming Back

The return home was the harder journey. I remember standing in a grocery store, confronted with forty-seven varieties of breakfast cereal, and feeling a fatigue so disproportionate to the decision that it seemed almost comical.

I kept one bag in active rotation for months. I still plan travel differently now — fewer days in each place, more walking, less itinerary.

The things I came back to feeling most grateful for were not the things I had expected. Not comfort, not familiarity, not speed. What I had missed, I found, was conversation. Long, unhurried, curious conversation.

Everything else, it turned out, had been fine without me.`,
    author: "Lucas Ferreira",
    authorInitial: "L",
    category: "Travel",
    date: "Feb 19, 2026",
    readTime: "7 min",
    tags: ["travel", "simplicity", "reflection"],
    likes: 2105,
    views: 31600,
    featured: false,
  },
];

function estimateReadTime(content) {
  return `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min`;
}
function generateId() {
  return `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

// ── Landing Page ───────────────────────────────────────────────────────────────
function Landing({ t, dm, setDm, onEnter }) {
  const [hovered, setHovered] = useState(null);

  const features = [
    { icon: "✦", title: "Write Without Limits", desc: "A distraction-free editor built for long-form thinking. Format with Markdown, structure with headings, and publish in minutes." },
    { icon: "◈", title: "AI Writing Companion", desc: "Stuck on a paragraph? Your built-in Claude assistant helps you brainstorm, refine, and elevate your writing in real time." },
    { icon: "◉", title: "Live for Everyone", desc: "Every story you publish is immediately visible to all readers — no algorithms, no gatekeeping. Your words, the world." },
    { icon: "⬡", title: "Light & Dark Mode", desc: "Read and write in your preferred environment. Inkwell adapts to your eyes, whether it's 7am sunlight or midnight focus." },
    { icon: "◇", title: "Beautiful Typography", desc: "Every article renders in editorial-grade typography — the same care a print magazine gives to layout, applied to the web." },
    { icon: "✧", title: "Discover Ideas", desc: "Browse by category, tag, or trending topic. Surface the essays, findings, and stories that expand how you think." },
  ];

  const stats = [
    { num: "10K+", label: "Stories Published" },
    { num: "48K+", label: "Monthly Readers" },
    { num: "3.2M", label: "Words Written" },
    { num: "190+", label: "Countries" },
  ];

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: t.bg, minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: t.nav, backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${t.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 3rem", height: "64px"
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: "700", color: t.accent, letterSpacing: "-0.02em" }}>
          Inkwell
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button onClick={() => setDm(!dm)} style={{
            width: "38px", height: "38px", borderRadius: "50%", border: `1px solid ${t.border}`,
            background: t.surfaceAlt, color: t.text, cursor: "pointer", fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>{dm ? "☀️" : "🌙"}</button>
          <button onClick={onEnter} style={{
            padding: "0.5rem 1.5rem", background: "transparent", border: `1px solid ${t.border}`,
            borderRadius: "8px", color: t.textMuted, fontFamily: "'Lato', sans-serif",
            fontWeight: "700", fontSize: "0.875rem", cursor: "pointer", letterSpacing: "0.04em"
          }}>Sign In</button>
          <button onClick={onEnter} style={{
            padding: "0.5rem 1.5rem", background: t.accent, border: "none",
            borderRadius: "8px", color: "#fff", fontFamily: "'Lato', sans-serif",
            fontWeight: "700", fontSize: "0.875rem", cursor: "pointer", letterSpacing: "0.04em"
          }}>Start Writing</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", background: t.heroGrad,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8rem 2rem 5rem", position: "relative", overflow: "hidden"
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "15%", right: "8%",
          width: "360px", height: "360px", borderRadius: "50%",
          background: `radial-gradient(circle, ${t.accent}0A 0%, transparent 70%)`,
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "5%",
          width: "280px", height: "280px", borderRadius: "50%",
          background: `radial-gradient(circle, ${t.accentGold}0D 0%, transparent 70%)`,
          pointerEvents: "none"
        }} />

        {/* Floating decorative dots */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${20 + i * 12}%`, left: `${5 + i * 15}%`,
            width: "5px", height: "5px", borderRadius: "50%",
            background: t.border, opacity: 0.6,
            animation: `float ${3 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`
          }} />
        ))}

        <div style={{ maxWidth: "860px", width: "100%", textAlign: "center" }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: `${t.accent}12`, border: `1px solid ${t.accent}30`,
            borderRadius: "100px", padding: "0.4rem 1rem",
            marginBottom: "2rem"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: t.accent, display: "inline-block" }} />
            <span style={{ color: t.accent, fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              The Platform for Thoughtful Writing
            </span>
          </div>

          <h1 className="fade-up-2" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: "700", color: t.text,
            lineHeight: "1.1", letterSpacing: "-0.03em",
            marginBottom: "1.5rem"
          }}>
            Where Ideas Find<br />
            <em style={{ color: t.accentWarm, fontStyle: "italic" }}>Their Voice</em>
          </h1>

          <p className="fade-up-3" style={{
            fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", color: t.textMuted,
            lineHeight: "1.75", maxWidth: "620px", margin: "0 auto 3rem",
            fontWeight: "300"
          }}>
            Inkwell is an open platform for writers, researchers, and thinkers.
            Publish essays, share discoveries, document journeys — and reach readers
            who care about ideas as much as you do.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={onEnter}
              style={{
                padding: "1rem 2.5rem", background: t.accent, color: "#fff",
                border: "none", borderRadius: "10px", cursor: "pointer",
                fontFamily: "'Lato', sans-serif", fontWeight: "700",
                fontSize: "1rem", letterSpacing: "0.02em",
                boxShadow: `0 4px 20px ${t.accent}40`,
                transition: "all 0.2s"
              }}
              onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 28px ${t.accent}50`; }}
              onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 20px ${t.accent}40`; }}
            >
              Start Writing Free →
            </button>
            <button
              onClick={onEnter}
              style={{
                padding: "1rem 2.5rem", background: "transparent",
                color: t.textSub, border: `1.5px solid ${t.border}`,
                borderRadius: "10px", cursor: "pointer",
                fontFamily: "'Lato', sans-serif", fontWeight: "700",
                fontSize: "1rem", letterSpacing: "0.02em",
                transition: "all 0.2s"
              }}
              onMouseOver={e => { e.target.style.borderColor = t.accent; e.target.style.color = t.accent; }}
              onMouseOut={e => { e.target.style.borderColor = t.border; e.target.style.color = t.textSub; }}
            >
              Explore Stories
            </button>
          </div>

          {/* Stats bar */}
          <div className="fade-up-5" style={{
            display: "flex", gap: "0", justifyContent: "center",
            marginTop: "5rem", flexWrap: "wrap"
          }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                padding: "1.25rem 2.5rem",
                borderLeft: i > 0 ? `1px solid ${t.border}` : "none",
                textAlign: "center"
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem", fontWeight: "700", color: t.text,
                  letterSpacing: "-0.02em"
                }}>{s.num}</div>
                <div style={{ color: t.textLight, fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: "700", marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / PURPOSE */}
      <section style={{ padding: "7rem 2rem", background: t.bg }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            <div>
              <div style={{
                display: "inline-block", background: `${t.accentGold}15`,
                border: `1px solid ${t.accentGold}30`,
                borderRadius: "6px", padding: "0.3rem 0.75rem",
                color: t.accentGold, fontSize: "0.75rem", fontWeight: "700",
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem"
              }}>Our Purpose</div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700", color: t.text,
                lineHeight: "1.2", letterSpacing: "-0.02em",
                marginBottom: "1.5rem"
              }}>
                Built for people who think in paragraphs
              </h2>

              <p style={{
                color: t.textMuted, fontSize: "1.05rem", lineHeight: "1.8",
                marginBottom: "1.25rem", fontWeight: "300"
              }}>
                The internet has abundant places for quick takes. Inkwell exists for everything else — the long essay that wrestles with a difficult idea, the research note that deserves a wider audience, the personal narrative that connects people across different lives.
              </p>

              <p style={{
                color: t.textMuted, fontSize: "1.05rem", lineHeight: "1.8",
                marginBottom: "2rem", fontWeight: "300"
              }}>
                We believe the written word — careful, considered, revised — is one of the most powerful tools for understanding the world and our place in it. Inkwell is the infrastructure for that work.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {["Free to publish and read, always", "No algorithm deciding who sees your work", "AI assistance to help you write better", "A community of readers who value depth"].map(f => (
                  <div key={f} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: `${t.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: t.accent, fontSize: "0.65rem" }}>✓</span>
                    </div>
                    <span style={{ color: t.textSub, fontSize: "0.95rem", fontWeight: "400" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual panel */}
            <div style={{ position: "relative" }}>
              <div style={{
                background: t.surface, borderRadius: "16px",
                border: `1px solid ${t.border}`, padding: "2rem",
                boxShadow: t.shadowLg, position: "relative", zIndex: 1
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
                    <div key={c} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c }} />
                  ))}
                  <span style={{ color: t.textLight, fontSize: "0.75rem", marginLeft: "0.5rem", fontFamily: "monospace" }}>essay.md</span>
                </div>

                {[
                  { w: "90%", h: "10px", o: 1 },
                  { w: "70%", h: "8px", o: 0.6 },
                  { w: "0", h: "12px", o: 0 },
                  { w: "100%", h: "7px", o: 0.4 },
                  { w: "85%", h: "7px", o: 0.4 },
                  { w: "60%", h: "7px", o: 0.4 },
                  { w: "0", h: "10px", o: 0 },
                  { w: "50%", h: "9px", o: 0.7 },
                  { w: "100%", h: "7px", o: 0.35 },
                  { w: "90%", h: "7px", o: 0.35 },
                  { w: "75%", h: "7px", o: 0.35 },
                ].map((l, i) => (
                  <div key={i} style={{
                    width: l.w, height: l.h, marginBottom: "0.5rem",
                    background: l.o > 0 ? `${t.text}` : "transparent",
                    opacity: l.o, borderRadius: "4px",
                    ...(i === 0 ? { background: t.text } : {})
                  }} />
                ))}

                <div style={{
                  marginTop: "1.5rem", display: "flex", justifyContent: "flex-end"
                }}>
                  <div style={{
                    padding: "0.5rem 1.25rem", background: t.accent,
                    borderRadius: "6px", color: "#fff",
                    fontSize: "0.8rem", fontWeight: "700"
                  }}>Publish →</div>
                </div>
              </div>

              <div style={{
                position: "absolute", top: "1.5rem", right: "-1.5rem",
                background: t.surface, borderRadius: "12px",
                border: `1px solid ${t.border}`, padding: "1rem 1.25rem",
                boxShadow: t.shadowMd, zIndex: 2,
                minWidth: "160px"
              }}>
                <div style={{ fontSize: "0.7rem", color: t.textLight, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: "700", marginBottom: "0.5rem" }}>Live Readers</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: "700", color: t.text }}>2,841</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.25rem" }}>
                  <span style={{ color: "#22C55E", fontSize: "0.75rem" }}>↑ 12%</span>
                  <span style={{ color: t.textLight, fontSize: "0.75rem" }}>this week</span>
                </div>
              </div>

              <div style={{
                position: "absolute", bottom: "1rem", left: "-1.5rem",
                background: `${t.accentGold}15`, border: `1px solid ${t.accentGold}30`,
                borderRadius: "10px", padding: "0.875rem 1.25rem",
                zIndex: 2
              }}>
                <div style={{ fontSize: "0.7rem", color: t.accentGold, fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Top Category</div>
                <div style={{ color: t.textSub, fontSize: "0.9rem", fontWeight: "700" }}>🧠 Science & Research</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "7rem 2rem", background: t.bgAlt }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{
              display: "inline-block", background: `${t.accent}12`,
              border: `1px solid ${t.accent}25`, borderRadius: "6px",
              padding: "0.3rem 0.75rem", color: t.accent,
              fontSize: "0.75rem", fontWeight: "700",
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem"
            }}>Platform Features</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: "700", color: t.text,
              letterSpacing: "-0.02em", marginBottom: "1rem"
            }}>Everything a serious writer needs</h2>
            <p style={{ color: t.textMuted, fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7", fontWeight: "300" }}>
              Designed around the craft of writing, not the mechanics of growth hacking.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                onMouseOver={() => setHovered(i)}
                onMouseOut={() => setHovered(null)}
                style={{
                  background: hovered === i ? t.surface : t.bg,
                  border: `1px solid ${hovered === i ? t.accent + "30" : t.border}`,
                  borderRadius: "14px", padding: "2rem",
                  transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
                  transform: hovered === i ? "translateY(-4px)" : "none",
                  boxShadow: hovered === i ? t.shadowMd : t.shadow,
                  cursor: "default"
                }}
              >
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  background: `${t.accent}12`, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "1.25rem", marginBottom: "1.25rem",
                  color: t.accent
                }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "1.15rem",
                  fontWeight: "700", color: t.text, marginBottom: "0.625rem"
                }}>{f.title}</h3>
                <p style={{ color: t.textMuted, fontSize: "0.9rem", lineHeight: "1.65", fontWeight: "300" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "7rem 2rem", background: t.bg }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "700", color: t.text,
            letterSpacing: "-0.02em", marginBottom: "1rem"
          }}>Explore every domain of thought</h2>
          <p style={{ color: t.textMuted, fontSize: "1rem", marginBottom: "3rem", fontWeight: "300" }}>
            From first-person narratives to peer-level research notes.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {[
              ["🧠", "Science & Research"],
              ["✍️", "Essays & Opinion"],
              ["🌍", "Travel & Culture"],
              ["💼", "Business & Career"],
              ["🎨", "Arts & Creativity"],
              ["🏥", "Health & Wellness"],
              ["📚", "Books & Literature"],
              ["💻", "Technology"],
              ["🌿", "Environment"],
              ["🧭", "Personal Growth"],
              ["🔬", "Academic Findings"],
              ["🗣️", "Society & Politics"],
            ].map(([icon, label]) => (
              <button
                key={label}
                onClick={onEnter}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  background: t.surfaceAlt, border: `1px solid ${t.border}`,
                  borderRadius: "100px", cursor: "pointer",
                  color: t.textSub, fontSize: "0.9rem", fontWeight: "400",
                  fontFamily: "'Lato', sans-serif",
                  transition: "all 0.2s"
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; e.currentTarget.style.background = `${t.accent}08`; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSub; e.currentTarget.style.background = t.surfaceAlt; }}
              >
                <span>{icon}</span><span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "7rem 2rem",
        background: `linear-gradient(135deg, ${t.accent} 0%, #1D4ED8 100%)`,
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-50%", right: "-10%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", pointerEvents: "none"
        }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: "700", color: "#FFFFFF",
            lineHeight: "1.15", letterSpacing: "-0.02em",
            marginBottom: "1.25rem"
          }}>
            Your ideas deserve<br /><em>a permanent home.</em>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.8)", fontSize: "1.1rem",
            lineHeight: "1.75", marginBottom: "2.5rem", fontWeight: "300"
          }}>
            Join thousands of writers who have found their audience on Inkwell.
            Start writing today — no account required to publish your first story.
          </p>
          <button
            onClick={onEnter}
            style={{
              padding: "1.1rem 3rem", background: "#FFFFFF",
              color: t.accent, border: "none", borderRadius: "10px",
              cursor: "pointer", fontFamily: "'Lato', sans-serif",
              fontWeight: "700", fontSize: "1.05rem", letterSpacing: "0.02em",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "all 0.2s"
            }}
            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)"; }}
            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)"; }}
          >
            Begin Writing →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: t.bg, borderTop: `1px solid ${t.border}`,
        padding: "3rem 2rem", textAlign: "center"
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: "700", color: t.accent, marginBottom: "0.75rem" }}>Inkwell</div>
        <p style={{ color: t.textLight, fontSize: "0.85rem", fontFamily: "'Lato', sans-serif", marginBottom: "1rem" }}>
          A platform for thoughtful writing. Free, open, and reader-first.
        </p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {["About", "Privacy", "Terms", "Contact", "RSS"].map(l => (
            <span key={l} style={{ color: t.textLight, fontSize: "0.85rem", cursor: "pointer", fontFamily: "'Lato', sans-serif" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ── Navbar (app) ───────────────────────────────────────────────────────────────
function Navbar({ t, dm, setDm, view, setView, setEditingArticle, onLogoClick }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: t.nav, backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${t.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2rem", height: "60px", fontFamily: "'Lato', sans-serif"
    }}>
      <div onClick={onLogoClick} style={{
        fontFamily: "'Playfair Display', serif", fontSize: "1.4rem",
        fontWeight: "700", color: t.accent, cursor: "pointer", letterSpacing: "-0.02em"
      }}>Inkwell</div>

      <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
        {[["home", "Stories"], ["write", "Write"]].map(([v, label]) => (
          <button key={v} onClick={() => { if (v === "write") setEditingArticle(null); setView(v); }}
            style={{
              padding: "0.4rem 0.875rem", borderRadius: "7px",
              border: view === v ? `1px solid ${t.border}` : "1px solid transparent",
              background: view === v ? t.surfaceAlt : "transparent",
              color: view === v ? t.text : t.textMuted,
              fontFamily: "'Lato', sans-serif", fontWeight: "700",
              fontSize: "0.875rem", cursor: "pointer", letterSpacing: "0.02em"
            }}>{label}</button>
        ))}
        <button onClick={() => setDm(!dm)} style={{
          marginLeft: "0.375rem", width: "36px", height: "36px", borderRadius: "50%",
          border: `1px solid ${t.border}`, background: t.surfaceAlt,
          color: t.text, cursor: "pointer", fontSize: "1rem",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>{dm ? "☀️" : "🌙"}</button>
      </div>
    </nav>
  );
}

// ── Article Card ───────────────────────────────────────────────────────────────
function ArticleCard({ article, t, onClick }) {
  const [liked, setLiked] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <article
      onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)}
      style={{
        padding: "2rem 0", borderBottom: `1px solid ${t.borderLight}`,
        transition: "background 0.2s"
      }}
    >
      <div style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}>
        <div style={{ flex: 1, cursor: "pointer" }} onClick={onClick}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${t.accent}, #6366F1)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "0.8rem", fontWeight: "700",
              fontFamily: "'Playfair Display', serif", flexShrink: 0
            }}>{article.authorInitial}</div>
            <span style={{ color: t.textSub, fontSize: "0.875rem", fontWeight: "700" }}>{article.author}</span>
            <span style={{ color: t.textLight, fontSize: "0.8rem" }}>·</span>
            <span style={{ color: t.textLight, fontSize: "0.8rem" }}>{article.date}</span>
            {article.category && (
              <>
                <span style={{ color: t.textLight, fontSize: "0.8rem" }}>·</span>
                <span style={{ color: t.accent, fontSize: "0.8rem", fontWeight: "700" }}>{article.category}</span>
              </>
            )}
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem", fontWeight: "700",
            color: hov ? t.accent : t.text,
            margin: "0 0 0.5rem",
            lineHeight: "1.35", letterSpacing: "-0.01em",
            transition: "color 0.2s"
          }}>{article.title}</h2>

          {article.subtitle && (
            <p style={{
              color: t.textMuted, fontSize: "0.925rem",
              fontFamily: "'Lato', sans-serif", lineHeight: "1.55",
              margin: "0 0 1rem", fontWeight: "300",
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden"
            }}>{article.subtitle}</p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
            {article.tags?.slice(0, 3).map(tag => (
              <span key={tag} style={{
                background: t.tag, color: t.tagText,
                padding: "0.2rem 0.625rem", borderRadius: "100px",
                fontSize: "0.775rem", fontFamily: "'Lato', sans-serif", fontWeight: "700"
              }}>{tag}</span>
            ))}
            <span style={{ color: t.textLight, fontSize: "0.775rem", marginLeft: "auto" }}>
              {article.readTime} read
            </span>
          </div>
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: "1.5rem",
        marginTop: "1rem"
      }}>
        <button onClick={e => { e.stopPropagation(); setLiked(!liked); }} style={{
          background: "none", border: "none", cursor: "pointer",
          color: liked ? t.accentWarm : t.textLight,
          fontSize: "0.85rem", fontFamily: "'Lato', sans-serif",
          display: "flex", alignItems: "center", gap: "0.3rem", padding: 0
        }}>
          <span>{liked ? "♥" : "♡"}</span>
          <span>{(article.likes || 0) + (liked ? 1 : 0)}</span>
        </button>
        <span style={{ color: t.textLight, fontSize: "0.85rem" }}>
          👁 {(article.views || 0).toLocaleString()}
        </span>
        <button onClick={onClick} style={{
          marginLeft: "auto", background: "none", border: "none",
          cursor: "pointer", color: t.accent,
          fontSize: "0.85rem", fontFamily: "'Lato', sans-serif",
          fontWeight: "700", display: "flex", alignItems: "center", gap: "0.3rem"
        }}>Read article →</button>
      </div>
    </article>
  );
}

// ── Article View ───────────────────────────────────────────────────────────────
function ArticleView({ article, t, onBack }) {
  const [liked, setLiked] = useState(false);

  const render = (content) => content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) return (
      <h2 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: "700", color: t.text, margin: "2.75rem 0 1rem", letterSpacing: "-0.01em" }}>{block.slice(3)}</h2>
    );
    if (block.startsWith("# ")) return (
      <h1 key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: "700", color: t.text, margin: "2.75rem 0 1rem" }}>{block.slice(2)}</h1>
    );
    const parts = block.split(/(\*[^*]+\*)/g).map((p, j) =>
      p.startsWith("*") && p.endsWith("*") ? <em key={j} style={{ fontStyle: "italic" }}>{p.slice(1, -1)}</em> : p
    );
    return (
      <p key={i} style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.1rem", lineHeight: "1.9", color: t.textSub, margin: "0 0 1.625rem", fontWeight: "300" }}>{parts}</p>
    );
  });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", cursor: "pointer",
        color: t.textMuted, fontFamily: "'Lato', sans-serif",
        fontSize: "0.875rem", padding: "0 0 2.5rem",
        display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "700"
      }}>← All Stories</button>

      {article.category && (
        <div style={{
          display: "inline-block", background: `${t.accent}12`,
          border: `1px solid ${t.accent}25`, borderRadius: "6px",
          padding: "0.3rem 0.75rem", color: t.accent,
          fontSize: "0.75rem", fontWeight: "700",
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem"
        }}>{article.category}</div>
      )}

      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.9rem, 5vw, 2.75rem)",
        fontWeight: "700", color: t.text,
        margin: "0 0 1.1rem", lineHeight: "1.2", letterSpacing: "-0.025em"
      }}>{article.title}</h1>

      {article.subtitle && (
        <p style={{
          fontFamily: "'Lato', sans-serif", fontSize: "1.2rem",
          color: t.textMuted, margin: "0 0 2rem",
          lineHeight: "1.55", fontWeight: "300", fontStyle: "italic"
        }}>{article.subtitle}</p>
      )}

      <div style={{
        display: "flex", alignItems: "center", gap: "0.875rem",
        padding: "1.375rem 0", borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`, marginBottom: "3rem"
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: `linear-gradient(135deg, ${t.accent}, #6366F1)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: "700", fontFamily: "'Playfair Display', serif", fontSize: "1.1rem"
        }}>{article.authorInitial}</div>
        <div>
          <div style={{ color: t.text, fontWeight: "700", fontSize: "0.975rem" }}>{article.author}</div>
          <div style={{ color: t.textLight, fontSize: "0.85rem" }}>{article.date} · {article.readTime} read</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => setLiked(!liked)} style={{
            background: liked ? `${t.accentWarm}12` : "none",
            border: `1px solid ${liked ? t.accentWarm : t.border}`,
            borderRadius: "8px", padding: "0.4rem 0.875rem",
            cursor: "pointer", color: liked ? t.accentWarm : t.textMuted,
            fontFamily: "'Lato', sans-serif", fontSize: "0.85rem",
            display: "flex", gap: "0.3rem", alignItems: "center"
          }}>
            <span>{liked ? "♥" : "♡"}</span>
            <span>{(article.likes || 0) + (liked ? 1 : 0)}</span>
          </button>
        </div>
      </div>

      <div>{render(article.content)}</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: `1px solid ${t.border}` }}>
        {article.tags?.map(tag => (
          <span key={tag} style={{ background: t.tag, color: t.tagText, padding: "0.3rem 0.75rem", borderRadius: "100px", fontSize: "0.8rem" }}>{tag}</span>
        ))}
      </div>

      <div style={{ marginTop: "3.5rem", background: t.surfaceAlt, borderRadius: "14px", padding: "2.5rem", textAlign: "center", border: `1px solid ${t.border}` }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: "700", color: t.text, marginBottom: "0.75rem" }}>
          Have something to say?
        </div>
        <p style={{ color: t.textMuted, fontSize: "0.925rem", marginBottom: "1.5rem", fontWeight: "300" }}>
          Publish your own essay, research, or story on Inkwell — free, forever.
        </p>
        <button onClick={onBack} style={{
          padding: "0.7rem 1.75rem", background: t.accent, color: "#fff",
          border: "none", borderRadius: "8px", cursor: "pointer",
          fontFamily: "'Lato', sans-serif", fontWeight: "700", fontSize: "0.9rem"
        }}>Start Writing →</button>
      </div>
    </div>
  );
}

// ── Write View ─────────────────────────────────────────────────────────────────
function WriteView({ t, onPublish, editingArticle }) {
  const [title, setTitle] = useState(editingArticle?.title || "");
  const [subtitle, setSubtitle] = useState(editingArticle?.subtitle || "");
  const [content, setContent] = useState(editingArticle?.content || "");
  const [tags, setTags] = useState(editingArticle?.tags?.join(", ") || "");
  const [author, setAuthor] = useState(editingArticle?.author || "");
  const [category, setCategory] = useState(editingArticle?.category || "");
  const [publishing, setPublishing] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cats = ["Essays & Opinion", "Science & Research", "Travel & Culture", "Business & Career", "Arts & Creativity", "Health & Wellness", "Technology", "Personal Growth", "Academic Findings", "Society & Politics"];

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a thoughtful writing coach for an editorial platform. Help the writer improve their work. Be specific, constructive, and literary.\n\nTitle: ${title}\nContent so far:\n${content}\n\nWriter's request: ${aiPrompt}\n\nProvide clear, useful writing guidance.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "No suggestion available.";
      setContent(prev => prev + "\n\n---\n✦ AI Suggestion\n" + text + "\n---");
      setAiPrompt(""); setShowAI(false);
    } catch { setError("AI assistant temporarily unavailable."); }
    setAiLoading(false);
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) { setError("Please add a title and content."); return; }
    setPublishing(true); setError("");
    const article = {
      id: editingArticle?.id || generateId(),
      title: title.trim(), subtitle: subtitle.trim(), content: content.trim(),
      author: author.trim() || "Anonymous",
      authorInitial: (author.trim() || "A")[0].toUpperCase(),
      category: category || "Essays & Opinion",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: estimateReadTime(content),
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      likes: 0, views: Math.floor(Math.random() * 200) + 20,
    };
    try {
      let existing = [];
      try { const s = await window.storage.get(ARTICLES_KEY, true); if (s?.value) existing = JSON.parse(s.value); } catch {}
      const updated = [article, ...existing.filter(a => a.id !== article.id)];
      await window.storage.set(ARTICLES_KEY, JSON.stringify(updated), true);
      setSuccess("Published successfully!"); onPublish(article);
    } catch { setError("Failed to publish. Please try again."); }
    setPublishing(false);
  };

  const fieldStyle = (large) => ({
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1px solid ${t.border}`, outline: "none",
    color: t.text, fontFamily: large ? "'Playfair Display', serif" : "'Lato', sans-serif",
    fontSize: large ? "2rem" : "0.975rem", fontWeight: large ? "700" : "400",
    padding: "0.875rem 0", marginBottom: "1.5rem",
    resize: "none", boxSizing: "border-box",
    lineHeight: large ? "1.2" : "1.6"
  });

  return (
    <div style={{ maxWidth: "740px", margin: "0 auto", padding: "3rem 1.5rem 5rem", fontFamily: "'Lato', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: "700", color: t.text, marginBottom: "0.5rem" }}>
          {editingArticle ? "Edit your story" : "Write your story"}
        </h1>
        <p style={{ color: t.textMuted, fontSize: "0.9rem", fontWeight: "300" }}>
          Share your ideas with the world. Clear, thoughtful writing finds its readers.
        </p>
      </div>

      {/* Tip */}
      <div style={{
        background: `${t.accent}08`, border: `1px solid ${t.accent}20`,
        borderRadius: "8px", padding: "0.75rem 1.125rem",
        marginBottom: "2rem", fontSize: "0.8rem",
        color: t.textMuted, display: "flex", gap: "0.5rem", alignItems: "center"
      }}>
        <span>✦</span>
        <span>Use <code style={{ background: t.surfaceAlt, padding: "0 4px", borderRadius: "3px", color: t.accent }}>## Heading</code> for sections and <code style={{ background: t.surfaceAlt, padding: "0 4px", borderRadius: "3px", color: t.accent }}>*italic text*</code> for emphasis</span>
      </div>

      {/* Author */}
      <input placeholder="Your name or pen name" value={author} onChange={e => setAuthor(e.target.value)} style={{ ...fieldStyle(false), color: t.textMuted }} />

      {/* Category */}
      <select value={category} onChange={e => setCategory(e.target.value)} style={{
        ...fieldStyle(false), appearance: "none", cursor: "pointer",
        color: category ? t.text : t.textLight
      }}>
        <option value="" disabled>Select a category...</option>
        {cats.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Title */}
      <input placeholder="Title of your story" value={title} onChange={e => setTitle(e.target.value)} style={fieldStyle(true)} />

      {/* Subtitle */}
      <input placeholder="Add a subtitle or brief description (optional)" value={subtitle} onChange={e => setSubtitle(e.target.value)} style={{ ...fieldStyle(false), fontStyle: "italic", color: t.textMuted }} />

      {/* Content */}
      <textarea placeholder="Write your story here. New paragraphs are separated by a blank line.&#10;&#10;Use ## for headings, *text* for italics." value={content} onChange={e => setContent(e.target.value)} rows={22}
        style={{ ...fieldStyle(false), lineHeight: "1.85", borderBottom: `1px solid ${t.border}` }} />

      {/* Tags */}
      <input placeholder="Tags: productivity, research, travel (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} style={{ ...fieldStyle(false), fontSize: "0.875rem", color: t.textMuted }} />

      {/* Error / Success */}
      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#DC2626", fontSize: "0.875rem" }}>
          {error}
        </div>
      )}

      {/* AI Assist */}
      <div style={{ marginBottom: "2rem" }}>
        <button onClick={() => setShowAI(!showAI)} style={{
          background: showAI ? t.surfaceAlt : "none",
          border: `1px solid ${t.border}`, borderRadius: "8px",
          padding: "0.5rem 1rem", cursor: "pointer", color: t.textMuted,
          fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: "700",
          display: "flex", alignItems: "center", gap: "0.5rem"
        }}>
          ✦ AI Writing Coach {showAI ? "▲" : "▼"}
        </button>

        {showAI && (
          <div style={{ marginTop: "0.75rem", background: t.surfaceAlt, borderRadius: "10px", padding: "1.25rem", border: `1px solid ${t.border}` }}>
            <p style={{ color: t.textMuted, fontSize: "0.825rem", marginBottom: "0.875rem", fontWeight: "300" }}>
              Ask for feedback, continuation ideas, structural advice, or help with phrasing.
            </p>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              <input
                placeholder="e.g. How can I make my introduction stronger?"
                value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAI()}
                style={{
                  flex: 1, padding: "0.65rem 1rem",
                  background: t.surface, border: `1px solid ${t.border}`,
                  borderRadius: "7px", color: t.text,
                  fontFamily: "'Lato', sans-serif", fontSize: "0.875rem", outline: "none"
                }}
              />
              <button onClick={handleAI} disabled={aiLoading} style={{
                padding: "0.65rem 1.25rem", background: t.accent, color: "#fff",
                border: "none", borderRadius: "7px", cursor: "pointer",
                fontFamily: "'Lato', sans-serif", fontWeight: "700",
                fontSize: "0.875rem", opacity: aiLoading ? 0.7 : 1
              }}>{aiLoading ? "..." : "Ask"}</button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: t.textLight, fontSize: "0.8rem" }}>
          {wordCount.toLocaleString()} words · ~{estimateReadTime(content)} read
        </div>
        <button onClick={handlePublish} disabled={publishing} style={{
          padding: "0.875rem 2.5rem", background: t.accent, color: "#fff",
          border: "none", borderRadius: "9px", cursor: "pointer",
          fontFamily: "'Lato', sans-serif", fontWeight: "700",
          fontSize: "1rem", opacity: publishing ? 0.75 : 1,
          letterSpacing: "0.02em",
          boxShadow: `0 4px 16px ${t.accent}30`,
          transition: "all 0.2s"
        }}
          onMouseOver={e => { if (!publishing) { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = `0 6px 20px ${t.accent}40`; } }}
          onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 16px ${t.accent}30`; }}
        >
          {publishing ? "Publishing..." : (editingArticle ? "Update Story" : "Publish Story")}
        </button>
      </div>
    </div>
  );
}

// ── Home ───────────────────────────────────────────────────────────────────────
function HomePage({ t, articles, setView, setSelectedArticle }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tags = ["All", "Essays & Opinion", "Science & Research", "Technology", "Travel & Culture", "Personal Growth", "Health & Wellness"];

  const filtered = articles.filter(a => {
    const matchTag = activeTag === "All" || a.category === activeTag || a.tags?.includes(activeTag.toLowerCase());
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.author?.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.id !== featured?.id);

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>

      {/* Search + filter bar */}
      <div style={{ padding: "2rem 0 0", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "220px", maxWidth: "340px" }}>
          <span style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: t.textLight, fontSize: "0.9rem" }}>🔍</span>
          <input
            placeholder="Search stories..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "0.6rem 0.875rem 0.6rem 2.25rem",
              background: t.surfaceAlt, border: `1px solid ${t.border}`,
              borderRadius: "8px", color: t.text,
              fontFamily: "'Lato', sans-serif", fontSize: "0.875rem",
              outline: "none", boxSizing: "border-box"
            }}
          />
        </div>
      </div>

      {/* Tag filter */}
      <div style={{ display: "flex", gap: "0.5rem", padding: "1.25rem 0 0", overflowX: "auto", scrollbarWidth: "none" }}>
        {tags.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)} style={{
            padding: "0.4rem 1rem", borderRadius: "100px",
            border: activeTag === tag ? `1.5px solid ${t.accent}` : `1px solid ${t.border}`,
            background: activeTag === tag ? `${t.accent}10` : "transparent",
            color: activeTag === tag ? t.accent : t.textMuted,
            fontFamily: "'Lato', sans-serif", fontWeight: "700",
            fontSize: "0.8rem", cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.15s"
          }}>{tag}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr min(300px, 28%)", gap: "4rem" }}>
        <main style={{ paddingTop: "2rem" }}>

          {/* Featured article hero */}
          {featured && (
            <div
              onClick={() => { setSelectedArticle(featured); setView("article"); }}
              style={{
                background: t.surface, borderRadius: "16px",
                border: `1px solid ${t.border}`, padding: "2.25rem",
                marginBottom: "0.5rem", cursor: "pointer",
                boxShadow: t.shadow, transition: "all 0.25s",
                position: "relative", overflow: "hidden"
              }}
              onMouseOver={e => { e.currentTarget.style.boxShadow = t.shadowMd; e.currentTarget.style.borderColor = `${t.accent}30`; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = t.shadow; e.currentTarget.style.borderColor = t.border; }}
            >
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: "200px", height: "200px",
                background: `radial-gradient(circle, ${t.accent}08 0%, transparent 70%)`,
                pointerEvents: "none"
              }} />
              <div style={{
                display: "inline-block", background: `${t.accentGold}15`,
                border: `1px solid ${t.accentGold}30`,
                borderRadius: "5px", padding: "0.2rem 0.625rem",
                color: t.accentGold, fontSize: "0.7rem", fontWeight: "700",
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem"
              }}>✦ Featured</div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.65rem", fontWeight: "700",
                color: t.text, margin: "0 0 0.75rem",
                lineHeight: "1.25", letterSpacing: "-0.015em"
              }}>{featured.title}</h2>

              <p style={{
                color: t.textMuted, fontSize: "1rem", lineHeight: "1.6",
                margin: "0 0 1.25rem", fontWeight: "300",
                display: "-webkit-box", WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical", overflow: "hidden"
              }}>{featured.subtitle}</p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.accent}, #6366F1)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "0.75rem", fontWeight: "700"
                }}>{featured.authorInitial}</div>
                <span style={{ color: t.textSub, fontSize: "0.875rem", fontWeight: "700" }}>{featured.author}</span>
                <span style={{ color: t.textLight, fontSize: "0.8rem" }}>· {featured.readTime} read</span>
              </div>
            </div>
          )}

          {rest.length > 0 && rest.map(a => (
            <ArticleCard key={a.id} article={a} t={t}
              onClick={() => { setSelectedArticle(a); setView("article"); }} />
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: "5rem 0", textAlign: "center", color: t.textMuted }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✦</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", marginBottom: "0.5rem", color: t.text }}>No stories found</p>
              <p style={{ fontSize: "0.9rem", fontWeight: "300" }}>Be the first to write one.</p>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside style={{ paddingTop: "2rem" }}>
          <div style={{ position: "sticky", top: "76px" }}>

            <div style={{ background: t.surfaceAlt, borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem", border: `1px solid ${t.border}` }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: "700", color: t.text, marginBottom: "0.75rem" }}>What is Inkwell?</h3>
              <p style={{ color: t.textMuted, fontSize: "0.875rem", lineHeight: "1.65", fontWeight: "300", marginBottom: "1rem" }}>
                An open platform for writers, researchers, and thinkers. Publish essays, 
                share findings, document journeys — and reach readers who care about ideas.
              </p>
              <button style={{
                width: "100%", padding: "0.625rem", background: t.accent, color: "#fff",
                border: "none", borderRadius: "7px", cursor: "pointer",
                fontFamily: "'Lato', sans-serif", fontWeight: "700", fontSize: "0.875rem"
              }}>Start Writing →</button>
            </div>

            <div style={{ background: t.surfaceAlt, borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem", border: `1px solid ${t.border}` }}>
              <h3 style={{ fontSize: "0.75rem", fontWeight: "700", color: t.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>Writing Principles</h3>
              {["Be clear and specific", "Cite your sources", "Respect others' perspectives", "Revise before publishing", "Write for your reader"].map(p => (
                <div key={p} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem", fontSize: "0.85rem", color: t.textMuted, alignItems: "flex-start" }}>
                  <span style={{ color: t.accent, flexShrink: 0 }}>→</span>
                  <span style={{ fontWeight: "300" }}>{p}</span>
                </div>
              ))}
            </div>

            <div style={{ background: t.surfaceAlt, borderRadius: "12px", padding: "1.5rem", border: `1px solid ${t.border}` }}>
              <h3 style={{ fontSize: "0.75rem", fontWeight: "700", color: t.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>Trending Topics</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["deep work", "AI & society", "field research", "travel essays", "productivity", "mental health", "book reviews", "tech ethics"].map(tag => (
                  <span key={tag} style={{ background: t.tag, color: t.tagText, padding: "0.25rem 0.625rem", borderRadius: "100px", fontSize: "0.775rem", cursor: "pointer" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [dm, setDm] = useState(false);
  const [page, setPage] = useState("landing"); // landing | home | article | write
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const t = T[dm ? "dark" : "light"];

  useEffect(() => {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) setDm(true);
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const stored = await window.storage.get(ARTICLES_KEY, true);
      if (stored?.value) {
        setArticles(JSON.parse(stored.value));
      } else {
        await window.storage.set(ARTICLES_KEY, JSON.stringify(seedArticles), true);
        setArticles(seedArticles);
      }
    } catch { setArticles(seedArticles); }
    setLoaded(true);
  };

  const handlePublish = (article) => {
    setArticles(prev => [article, ...prev.filter(a => a.id !== article.id)]);
    setSelected(article);
    setPage("article");
  };

  if (!loaded && page !== "landing") return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{G}{ANIM}</style>
      <div style={{ color: t.textMuted, fontFamily: "'Lato', sans-serif" }}>Loading…</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: t.bg, transition: "background 0.3s, color 0.3s" }}>
      <style>{G}{ANIM}{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        input, textarea, select { font-family: 'Lato', sans-serif; }
        input::placeholder, textarea::placeholder { color: ${t.textLight}; }
        select option { background: ${t.surface}; color: ${t.text}; }
        textarea { display: block; width: 100%; }
        aside { display: block; }
        @media (max-width: 780px) { aside { display: none !important; } }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
      `}</style>

      {page === "landing" ? (
        <Landing t={t} dm={dm} setDm={setDm} onEnter={() => { setPage("home"); if (!loaded) loadArticles(); }} />
      ) : (
        <>
          <Navbar
            t={t} dm={dm} setDm={setDm}
            view={page} setView={setPage}
            setEditingArticle={setEditingArticle}
            onLogoClick={() => setPage("landing")}
          />

          {page === "home" && (
            <HomePage t={t} articles={articles} setView={setPage} setSelectedArticle={setSelected} />
          )}
          {page === "article" && selected && (
            <ArticleView article={selected} t={t} onBack={() => setPage("home")} />
          )}
          {page === "write" && (
            <WriteView t={t} onPublish={handlePublish} editingArticle={editingArticle} />
          )}

          <footer style={{
            borderTop: `1px solid ${t.border}`, padding: "2rem 1.5rem",
            textAlign: "center", fontFamily: "'Lato', sans-serif",
            color: t.textLight, fontSize: "0.8rem", marginTop: "3rem"
          }}>
            <span style={{ fontFamily: "'Playfair Display', serif", color: t.textMuted, fontWeight: "700" }}>Inkwell</span>
            {" · "}A platform for thoughtful writing{" · "}
            <span style={{ color: t.accent }}>Free, open, and reader-first.</span>
          </footer>
        </>
      )}
    </div>
  );
}
