"use client";
import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  CheckCheck,
  Disc3,
  Heart,
  Music2,
  Play,
  Plus,
  Send,
  Sparkles,
  Users,
  Volume2,
} from "lucide-react";
import { CTA } from "./shell";

const campaignImages = [
  ["/images/campaigns/camp1-clean.png", "Give Me the Spins campaign before and after"],
  ["/images/campaigns/camp2-clean.png", "Everything Brand New campaign before and after"],
  ["/images/campaigns/camp7-clean.png", "This Place campaign before and after"],
  ["/images/campaigns/camp8-clean.png", "Bubblin campaign before and after"],
  ["/images/campaigns/camp9-clean.png", "Still Standin campaign before and after"],
  ["/images/campaigns/camp11-clean.png", "God's Got Your Back campaign before and after"],
] as const;

const counts = [12, 27, 46, 73, 108, 154, 200];
function useCounter(values: number[]) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(values.length - 1);
      return;
    }
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % values.length),
      1600,
    );
    return () => clearInterval(timer);
  }, [values]);
  return values[index];
}
function Cover({ small = false }: { small?: boolean }) {
  return (
    <div className={`cover ${small ? "small" : ""}`}>
      <span />
      <Disc3 />
      <b>
        YOUR
        <br />
        SONG
      </b>
    </div>
  );
}
function Post({ variant = 0 }: { variant?: number }) {
  return (
    <div className={`post post-${variant}`}>
      <div className="post-profile">
        <span className="avatar">{["m", "j", "a", "s"][variant % 4]}</span>
        <span>
          @
          {
            ["mood.archive", "just.vibing", "afterhours", "sound.diary"][
              variant % 4
            ]
          }
        </span>
        <span>•••</span>
      </div>
      <div className="post-art">
        <div className="art-orbit" />
        <span className="art-caption">
          {
            [
              "on repeat.",
              "FEEL\nSOMETHING",
              "late night\nkind of sound.",
              "a little louder.",
            ][variant % 4]
          }
        </span>
        <Play className="post-play" size={20} fill="currentColor" />
        <Heart className="post-heart" size={19} />
      </div>
      <div className="post-sound">
        <Music2 size={12} /> Your music <Disc3 size={15} />
      </div>
    </div>
  );
}
function HeroVisual() {
  const count = useCounter(counts);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="hero-visual"
      ref={ref}
      onPointerMove={(e) => {
        if (
          e.pointerType !== "mouse" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty(
          "--mx",
          `${(e.clientX - r.left - r.width / 2) / 35}px`,
        );
        ref.current?.style.setProperty(
          "--my",
          `${(e.clientY - r.top - r.height / 2) / 35}px`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--mx", "0px");
        ref.current?.style.setProperty("--my", "0px");
      }}
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="floating-post p-one">
        <Post variant={0} />
      </div>
      <div className="floating-post p-two">
        <Post variant={1} />
      </div>
      <div className="floating-post p-three">
        <Post variant={2} />
      </div>
      <div className="sound-card">
        <div className="sound-card-top">
          <Cover />
          <div>
            <span className="eyebrow">IT STARTS WITH YOUR MUSIC</span>
            <h3>YOUR MUSIC</h3>
            <p>Independent artist</p>
            <span className="sound-count">
              <Music2 size={14} />
              <b>{count}</b> videos
            </span>
          </div>
          <span className="sound-icon">
            <AudioLines />
          </span>
        </div>
        <div className="waveform">
          {Array.from({ length: 44 }, (_, i) => (
            <i
              key={i}
              style={
                {
                  "--h": `${12 + ((i * 17) % 31)}px`,
                  "--delay": `${i * 0.06}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="sound-card-bottom">
          <span>
            <span className="status-dot" /> More posts using your sound
          </span>
          <ArrowUpRight size={16} />
        </div>
      </div>
      <span className="floating-tag">
        <CheckCheck size={15} /> Real accounts. Real posts.
      </span>
    </div>
  );
}
function RevealSetup() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
function Visual({ type }: { type: string }) {
  return (
    <div
      className={`feature-visual ${type}`}
      aria-label="Illustration of campaign posting"
    >
      {type === "distribute" ? (
        <>
          <div className="mini-song">
            <Cover small />
            <span>
              YOUR MUSIC<small>One sound. More posts.</small>
            </span>
            <Music2 />
          </div>
          <div className="branch-lines" />
          <div className="mini-posts">
            {[0, 1, 2].map((i) => (
              <Post key={i} variant={i} />
            ))}
          </div>
        </>
      ) : type === "simple" ? (
        <>
          <div className="old-work">
            <span>Find accounts</span>
            <span>Create posts</span>
            <span>Keep track</span>
          </div>
          <ArrowDown className="muted" />
          <div className="workflow">
            <span className="workflow-icon">
              <Music2 />
            </span>
            <span>Your music</span>
            <ArrowRight />
            <b>LOUDR ↗</b>
            <Check className="lime" />
          </div>
          <span className="visual-note">
            You make the music. We handle the posting.
          </span>
        </>
      ) : type === "audience" ? (
        <>
          <div className="audience-orbit">
            <div className="audience-center">
              <Music2 size={35} />
            </div>
            <div className="orbit-track" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6].map((artist, i) => (
                <span
                  key={artist}
                  className="listener orbit-avatar"
                  style={{
                    "--avatar-angle": `${i * 60}deg`,
                    "--avatar-counter-angle": `${i * -60}deg`,
                  } as CSSProperties}
                >
                  <span className="listener-face">
                    <img
                      src={`/images/artists/artist-0${artist}.webp`}
                      alt=""
                      width="320"
                      height="320"
                    />
                  </span>
                </span>
              ))}
            </div>
          </div>
          <span className="visual-note">
            More opportunities to be discovered.
          </span>
        </>
      ) : type === "profiles" ? (
        <div className="profile-posts">
          <Post variant={3} />
          <Post variant={1} />
        </div>
      ) : (
        <div className="check-list">
          <div className="check-heading">
            <CheckCheck size={22} />
            <span>Every post. Checked.</span>
          </div>
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              className="check-row"
              key={n}
              style={{ "--delay": `${n * 0.3}s` } as CSSProperties}
            >
              <span>
                <Music2 size={15} />
                Post 0{n}
              </span>
              <span className="checkmark">
                <Check size={14} /> Sound verified
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const features = [
  [
    "Loudr helps artists reach more audience on TikTok.",
    "We increase the number of posts using your music, giving more people opportunities to discover your sound.",
    "distribute",
  ],
  [
    "TikTok music promotion made easy",
    "No searching for accounts, manually posting dozens of videos or trying to create activity around your sound by yourself. Send us your music and we’ll handle the posting.",
    "simple",
  ],
  [
    "Empowering independent artists to get heard",
    "We’re making large-scale TikTok music promotion accessible to artists who want more people discovering their music.",
    "audience",
  ],
  [
    "Posts from different TikTok accounts",
    "Your music is used in posts published from multiple real TikTok profiles. All campaign posting is human-powered.",
    "profiles",
  ],
  [
    "Quality control",
    "Our team checks the campaign to make sure the agreed posts are published using your sound.",
    "quality",
  ],
];
const steps = [
  [
    "Provide the link to the sound you wish to promote.",
    "All we need to begin is the TikTok link to your music.",
  ],
  ["Tell us how many posts you want.", "Choose the size of your campaign."],
  [
    "Provide any instructions for the posts.",
    "Tell us anything important you’d like us to know about your music or campaign.",
  ],
  [
    "We create and publish the posts.",
    "We use different videos and images with your sound and publish them across multiple TikTok accounts.",
  ],
  [
    "More videos appear under your sound.",
    "As the campaign is delivered, the number of TikTok videos using your music increases.",
  ],
];
const deliveryCounts = [23, 58, 106, 147, 200];
function StartSteps() {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(200);
  const [brief, setBrief] = useState("Open creative");
  const [sound, setSound] = useState("");
  const count = useCounter(deliveryCounts);
  const valid = /^(https?:\/\/)?([a-z0-9-]+\.)?tiktok\.com\/.+/i.test(sound);
  return (
    <div className="start-grid">
      <div className="step-list">
        {steps.map(([title, body], i) => (
          <button
            className={`step ${i === active ? "active" : ""}`}
            key={title}
            onClick={() => setActive(i)}
            aria-expanded={i === active}
            aria-controls="step-visual"
          >
            <span className="step-number">0{i + 1}</span>
            <span>
              <h3>{title}</h3>
              <p>{body}</p>
            </span>
            <ArrowUpRight size={20} />
          </button>
        ))}
      </div>
      <div className="step-visual" id="step-visual">
        <div className="step-visual-top">
          <span>LET’S GET YOUR MUSIC OUT THERE</span>
          <span>0{active + 1} / 05</span>
        </div>
        <div className="step-demo" key={active}>
          {active === 0 ? (
            <>
              <div className="large-music">
                <Music2 size={42} />
              </div>
              <h3>
                Your next campaign
                <br />
                starts with a sound.
              </h3>
              <label htmlFor="demo-sound">Paste your TikTok sound link</label>
              <div className="demo-input">
                <input
                  id="demo-sound"
                  value={sound}
                  onChange={(e) => setSound(e.target.value)}
                  placeholder="tiktok.com/music/your-song..."
                />
                <Music2 size={18} />
              </div>
              <span className="demo-status">
                {valid ? (
                  <>
                    <Check size={16} /> TikTok link ready
                  </>
                ) : (
                  "Try your sound link above"
                )}
              </span>
            </>
          ) : active === 1 ? (
            <>
              <h3>How loud are we going?</h3>
              <p>Choose your campaign size.</p>
              <div className="size-options">
                {[50, 200, 500].map((n) => (
                  <button
                    key={n}
                    aria-pressed={size === n}
                    className={size === n ? "selected" : ""}
                    onClick={() => setSize(n)}
                  >
                    <AudioLines />
                    <b>{n}</b>
                    <span>posts</span>
                  </button>
                ))}
              </div>
              <CTA />
            </>
          ) : active === 2 ? (
            <>
              <Sparkles className="lime" size={35} />
              <h3>
                Your music.
                <br />
                Your creative direction.
              </h3>
              <div className="briefs">
                {[
                  "Open creative",
                  "Lip sync",
                  "Text on screen",
                  "Transition",
                  "Use provided video",
                  "Custom instructions",
                ].map((b) => (
                  <button
                    key={b}
                    className={brief === b ? "selected" : ""}
                    aria-pressed={brief === b}
                    onClick={() => setBrief(b)}
                  >
                    {brief === b && <Check size={14} />} {b}
                  </button>
                ))}
              </div>
            </>
          ) : active === 3 ? (
            <>
              <div className="publishing-posts">
                <Post />
                <Post variant={2} />
              </div>
              <span className="demo-status">
                <CheckCheck size={16} /> Different posts. The same sound.
              </span>
            </>
          ) : (
            <>
              <Cover />
              <span className="eyebrow">VIDEOS USING THIS SOUND</span>
              <strong className="big-count">{count}</strong>
              <div className="mini-progress">
                <span style={{ width: `${count / 2}%` }} />
              </div>
              <span className="demo-status">
                More posts. More opportunities.
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
const faqs = [
  [
    "When will my campaign start?",
    "Your campaign will begin after we review your music link and campaign requirements. We’ll confirm your expected start time before the campaign begins.",
  ],
  [
    "How long does a campaign take?",
    "Campaign duration depends on the number of posts and any specific campaign requirements. We’ll give you an estimated delivery period before starting.",
  ],
  [
    "What do I need to start?",
    "Your TikTok sound link, the number of posts you want and any instructions you want us to follow.",
  ],
  [
    "Are these real TikTok accounts?",
    "Yes. Campaign posts are published from real TikTok accounts and the process is human-powered.",
  ],
  [
    "Do you use bots?",
    "No. We do not use bots or automated applications to artificially create campaign posts.",
  ],
  [
    "What type of content will be posted?",
    "We can use different videos and images with your music. If you have specific content instructions, send them when starting your campaign.",
  ],
  [
    "Do you guarantee views or engagement?",
    "No. Because TikTok determines how content is distributed, we cannot guarantee a minimum number of views, likes or engagements. What we deliver is the agreed number of campaign posts using your sound.",
  ],
  [
    "Do you guarantee streams?",
    "No. We don’t guarantee streams or specific conversions. The goal of the campaign is to create more usage and exposure around your sound, giving more potential listeners opportunities to discover your music.",
  ],
  [
    "Can this help more people discover my music?",
    "That’s the goal. Increasing the number of posts using your sound creates more opportunities for TikTok users to come across your music. It may also lead some users to find your music on Spotify or other platforms.",
  ],
  ["What genres do you accept?", "All genres."],
  [
    "Can I provide my own instructions?",
    "Yes. Send your requirements with your campaign and we’ll tell you what’s possible.",
  ],
  [
    "I still have questions.",
    "Contact us through the Loudr contact page and we’ll be happy to help.",
  ],
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq section container" aria-labelledby="faq-title">
      <div>
        <span className="eyebrow">A FEW THINGS TO KNOW</span>
        <h2 id="faq-title">
          FAQ<span className="lime">.</span>
        </h2>
        <p>
          Good questions.
          <br />
          Straightforward answers.
        </p>
      </div>
      <div className="faq-items">
        {faqs.map(([question, answer], i) => (
          <div
            className={`faq-item ${open === i ? "expanded" : ""}`}
            key={question}
          >
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {question}
                <Plus size={20} />
              </button>
            </h3>
            <div className="faq-answer" id={`answer-${i}`} inert={open !== i}>
              <div>
                <p>
                  {answer}
                  {i === 11 && (
                    <>
                      {" "}
                      <a href="/contact">Contact us ↗</a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Testimonials() {
  const reviews = [
    {
      name: "Elena",
      rating: 5,
      text: "Professional in details.. Listen to your request in details and do the job correctly. Recommend him for your job requests.",
    },
    {
      name: "Jordan",
      rating: 5,
      text: "I appreciate all the support you've offered my brand - it doesn't go unnoticed. Just wanted to thank you for your ongoing support.",
    },
    {
      name: "Marcus",
      rating: 5,
      text: "Thanks. Now i just have to wait to see for the views to pickup and that the exposure effect takes place.",
    },
    {
      name: "Sofia",
      rating: 5,
      text: "Great service! Quick communication, the work was completed quickly, and questions were asked with solutions provided. Fast delivery. Absolutely no complaints...",
    },
    {
      name: "Adrian",
      rating: 5,
      text: "its good for just getting videos on your page if your lazy like me! guy is very polite and nice and he gets the job done!",
    },
    {
      name: "Naomi",
      rating: 4,
      text: "Keep doing good work, we are in with a few orders and had no issues. Keep up the good work, thank you.",
    },
    {
      name: "Theo",
      rating: 5,
      text: "Perfect delivery! The team worked incredibly hard and fulfilled the entire order and then some.",
    },
    {
      name: "Camille",
      rating: 5,
      text: "Thanks for always giving me the best results. Work in synchronisation with the song. I highly recommend this service.",
    },
  ];
  return (
    <section className="testimonials section">
      <div className="container center">
        <span className="eyebrow">THE ARTISTS COME FIRST</span>
        <h2>What artists are saying</h2>
      </div>
      {[0, 1].map((row) => (
        <div className={`testimonial-lane lane-${row}`} key={row}>
          <div className="testimonial-track">
            {[0, 1, 2, 3].map((copy) => (
              <div
                className="testimonial-group"
                key={copy}
                aria-hidden={copy > 0}
              >
                {reviews.slice(row * 4, row * 4 + 4).map((review) => (
                  <article className="testimonial" key={review.name}>
                    <div className="review-top">
                      <span className="review-avatar">
                        <Users size={19} />
                      </span>
                      <div>
                        <b>{review.name}</b>
                      </div>
                      <span className="quote-mark">“</span>
                    </div>
                    <span
                      className="stars"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                    <p>“{review.text}”</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
function ProofCards() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      frame = 0;
      const node = section.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const view = innerHeight;
      const smooth = (value: number) => {
        const x = Math.max(0, Math.min(1, value));
        return x * x * (3 - 2 * x);
      };
      const open = reduced.matches
        ? 1
        : smooth((view * 0.62 - rect.top) / (view * 0.62));
      const compact = innerWidth <= 760;
      const desktopX = [150, 50, -50, -150];
      const mobileX = [50, -50, 50, -50];
      const mobileY = [50, 50, -50, -50];
      const rotations = [-5, -2, 2, 5];
      const scale = 0.78 + 0.22 * open;
      node.style.setProperty("--card-scale", String(scale));
      [0, 1, 2, 3].forEach((index) => {
        const x = (compact ? mobileX[index] : desktopX[index]) * (1 - open);
        const y = (compact ? mobileY[index] : rotations[index]) * (1 - open);
        node.style.setProperty(`--card-x-${index + 1}`, `${x}%`);
        node.style.setProperty(`--card-y-${index + 1}`, `${y}${compact ? "%" : "px"}`);
        node.style.setProperty(
          `--card-rotate-${index + 1}`,
          `${rotations[index] * (1 - open)}deg`,
        );
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  const cards = [
    [
      "100K+",
      "TikTok posts",
      <Play key="posts" fill="currentColor" />,
      "posts",
    ],
    ["1.2K+", "Songs promoted", <Disc3 key="songs" />, "songs"],
    ["700+", "Campaigns", <AudioLines key="campaigns" />, "campaigns"],
    ["350+", "Artists", <Users key="artists" />, "artists"],
  ];
  return (
    <section id="proof" className="proof-motion" ref={section}>
      <div className="proof-sticky container">
        <div className="section-heading">
          <h2>
            Here’s what we’ve
            <br />
            done so far<span className="lime">.</span>
          </h2>
          <span className="eyebrow muted">
            OUR STORY IS JUST GETTING STARTED
          </span>
        </div>
        <div className="proof-cards">
          {cards.map(([number, label, icon, tone], i) => (
            <article
              className={`proof-card proof-${tone}`}
              key={String(label)}
              style={{ "--card-layer": 4 - i } as CSSProperties}
            >
              <div className="proof-card-top">
                <span>0{i + 1}</span>
                <span className="proof-card-icon">{icon}</span>
              </div>
              <div className="proof-card-value">
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
              <span className="proof-card-mark" aria-hidden="true">
                {i === 0 ? "↗" : i === 1 ? "◉" : i === 2 ? "≋" : "✳"}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const updateGalleryEdges = () => {
    const node = track.current;
    if (!node) return;
    const first = node.firstElementChild?.getBoundingClientRect();
    const last = node.lastElementChild?.getBoundingClientRect();
    const viewport = node.getBoundingClientRect();
    setEdges({
      atStart: !first || first.left >= viewport.left - 4,
      atEnd: !last || last.right <= viewport.right + 4,
    });
  };
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const observer = new ResizeObserver(updateGalleryEdges);
    observer.observe(node);
    Array.from(node.children).forEach((child) => observer.observe(child));
    updateGalleryEdges();
    return () => observer.disconnect();
  }, []);
  const move = (direction: number) => {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.82, behavior: "smooth" });
  };
  return (
    <section className="campaign-showcase section" aria-labelledby="campaign-heading">
      <div className="container campaign-showcase-head reveal">
        <h2 id="campaign-heading">
          Music we’ve helped get <span className="lime">heard.</span>
        </h2>
      </div>
      <div className="campaign-gallery">
        <div className="campaign-track" ref={track} onScroll={updateGalleryEdges}>
          {campaignImages.map(([src, alt]) => (
            <figure className="campaign-slide" key={src}>
              <img src={src} alt={alt} loading="lazy" />
            </figure>
          ))}
        </div>
        {!edges.atStart && (
          <button
            className="campaign-nav campaign-prev"
            type="button"
            onClick={() => move(-1)}
            aria-label="View previous campaigns"
          >
            <ArrowLeft />
          </button>
        )}
        {!edges.atEnd && (
          <button
            className="campaign-nav campaign-next"
            type="button"
            onClick={() => move(1)}
            aria-label="See more campaigns"
          >
            <ArrowRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="main">
      <RevealSetup />
      <section className="hero container">
        <div className="hero-copy">
          <h1>
            Loudr makes reaching more listeners on{" "}
            <span className="lime">TikTok easy.</span>
          </h1>
          <p>
            Get your music used in more TikTok posts and put your sound in front
            of more potential listeners.
          </p>
          <CTA />
        </div>
        <HeroVisual />
        <a className="scroll-cue" href="#proof">
          <ArrowDown size={15} />
          <span>
            IT STARTS TO GET <span className="lime">LOUDR</span> FROM HERE
          </span>
        </a>
      </section>
      <ProofCards />
      <section className="section container" id="how-it-works">
        <div className="section-intro reveal">
          <span className="eyebrow">MORE WAYS TO GET HEARD</span>
          <h2>
            How it works<span className="lime">.</span>
          </h2>
        </div>
        <div className="feature-list">
          {features.map(([title, body, type], i) => (
            <article key={title} className={`feature reveal feature-${i}`}>
              <div className="feature-copy">
                <span className="index-label">0{i + 1} / THE LOUDR WAY</span>
                <h3>{title}</h3>
                <p>{body}</p>
                {i === 0 && (
                  <a className="text-link" href="/contact">
                    Get your music out there <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
              <Visual type={type} />
            </article>
          ))}
        </div>
      </section>
      <div className="benefit-marquee">
        <div className="benefit-track">
          {[0, 1, 2, 3, 4].map((copy) => (
            <div key={copy} aria-hidden={copy > 0}>
              {[
                "REAL ACCOUNTS",
                "REAL POSTS",
                "HUMAN-POWERED",
                "ALL GENRES",
                "TIKTOK MUSIC PROMOTION",
                "MORE MUSIC DISCOVERY",
              ].map((t) => (
                <span key={t}>
                  {t}
                  <i>✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className="section container" id="how-to-start">
        <div className="section-intro reveal">
          <span className="eyebrow">YOUR MUSIC, OUT IN THE WORLD</span>
          <h2>
            How to start<span className="lime">.</span>
          </h2>
        </div>
        <StartSteps />
      </section>
      <CampaignShowcase />
      <Testimonials />
      <FAQ />
      <section className="final-cta container reveal">
        <span className="eyebrow">YOUR NEXT LISTENER IS OUT THERE</span>
        <h2>
          Ready to reach
          <br />
          more listeners<span className="lime">?</span>
        </h2>
        <p>
          Get more TikTok posts using your music and give more people a chance
          to discover your sound.
        </p>
        <CTA />
        <span className="cta-star" aria-hidden="true">
          ✳
        </span>
      </section>
    </main>
  );
}
