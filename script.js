const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "メニューを開く" : "メニューを閉じる");
  mobileNav?.classList.toggle("is-open", !open);
});

mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
}));

const translations = {
  navServices:"Services",navWorks:"Works",navProcess:"Process",navContact:"Contact",
  heroT1:"A development partner that ",heroT2:"moves your business forward",heroT3:".",
  heroSub:"We support web services, business systems, and AI tools from requirements and design through development and operation. You can talk to us before the scope or budget is finalized.",heroCta1:"Talk to us",heroCta2:"See what we do",
  term1:"Strategy & scoping",term2:"UI/UX design",term3:"Build & verify",term4:"Operating & growing…",
  buildTitle:"From code to something real.",appNav:"Today　 Projects　 Reports",appCta:"+ New task",appListTitle:"Today’s tasks",appTask1:"Review homepage design",appTask2:"Implement login flow",appTask3:"Write release notes",appStatTitle:"Progress today",appStatDone:"18/22 tasks done",appSync:"synced",
  servicesTitle:"Planning to operation, in one continuous line.",servicesSub:"We combine the expertise your business phase requires.",
  projectFitTitle:"Projects we are best at",projectFitSub:"From shaping the first concept to continuously improving the product.",projectFitCta:"Talk to us before your requirements are finalized",fit1:"New web services and MVP development",fit2:"Features and improvements for existing services",fit3:"Business system design and development",fit4:"AI features and external API integrations",fit5:"Technology selection, cloud architecture, and post-launch operations",
  svc1Title:"Web App Development",svc1Desc:"From internal systems to SaaS and e-commerce — usable, scalable web products.",svc1I1:"Frontend & backend",svc1I2:"Cloud infrastructure & API design",svc1I3:"Performance optimization",
  svc2Title:"Mobile App Development",svc2Desc:"iOS and Android. Comfortable app experiences that fit into daily life.",svc2I1:"iOS & Android apps",svc2I2:"Cross-platform",svc2I3:"Store submission & release support",
  svc3Title:"Desktop App & AI Tool Development",svc3Desc:"macOS apps and AI-powered tools, built with know-how from our own products.",svc3I1:"macOS desktop apps",svc3I2:"AI integration, text & voice input",svc3I3:"API integrations such as Obsidian and Notion",aiPrompt:"Summarize the API design we just agreed on",exportTo:"Export to",saved:"Saved to local history",
  worksTitle:"Our work",worksSub:"A selection of products we have built and operate.",worksHint:"Click a window to bring it to the front",work1Title:"BebiReci",work1Desc:"A recipe-sharing app for babies and toddlers, searchable by ingredient, age, and excluded foods.",work2Title:"4komanikki",work2Desc:"A diary app that gently turns your written memories into four-panel comics with AI.",work3Title:"HeyLog — our own product",work3Desc:"A macOS app for asking AI by text or voice and saving answers to your favorite apps.",visitSite:"Visit website",
  processTitle:"Build small. Ship early.",processSub:"One team stays with you from scoping through post-launch.",step1Title:"Discovery",step1Desc:"We listen to your goals and challenges, then propose a practical plan.",step2Title:"Design & proposal",step2Desc:"We organize requirements and choose technology for long-term operation.",step3Title:"Build & verify",step3Desc:"We implement and review in short, transparent cycles.",step4Title:"Release",step4Desc:"We support production rollout and stable operation.",step5Title:"Operate & improve",step5Desc:"We keep improving your product after launch.",
  faqTitle:"Frequently asked questions",faq1Q:"Can I talk to you while my idea is still early?",faq1A:"Absolutely. We can start by organizing the problem together, so just tell us where things stand.",faq2Q:"How is the cost determined?",faq2A:"After clarifying requirements, we estimate based on scope. Starting with a small plan is also possible.",faq3Q:"How long does development take?",faq3A:"It depends on scope, but an MVP typically takes two to three months.",faqMore:"For any other questions",
  contactTitle:"It starts with a conversation.",contactSub:"An early-stage idea is welcome. We will help you clarify the problem.",contactCta:"Email us",contactNote:"We usually reply within two business days",newMessage:"New message",mailSubject:"Project inquiry",mailBody:"Hello. I would like to discuss a new product with you. Could we schedule a conversation?",send:"Send"
};

const japanese = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { japanese[el.dataset.i18n] = el.innerHTML; });

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = lang === "en" ? translations[el.dataset.i18n] : japanese[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.querySelectorAll("[data-lang]").forEach((button) => button.classList.toggle("is-active", button.dataset.lang === lang));
  localStorage.setItem("codetas-lang", lang);
}

document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => {
  setLanguage(button.dataset.lang);
  updateScroll();
}));
setLanguage(localStorage.getItem("codetas-lang") === "en" ? "en" : "ja");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const build = document.querySelector("[data-build]");
const buildBar = document.querySelector("[data-build-bar]");
const buildPercent = document.querySelector("[data-build-percent]");
const buildStatus = document.querySelector("[data-build-status]");
const codeLayer = document.querySelector(".code-layer");
const appPreview = document.querySelector(".app-preview");
const liveBadge = document.querySelector("[data-live]");
let buildProgress = 0;

const statusJa = ["コンパイル中…", "UIを構築中…", "機能を実装中…", "デプロイ完了 — 本番稼働中"];
const statusEn = ["Compiling…", "Building UI…", "Shipping features…", "Deployed — running in production"];

function updateScroll() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
  if (!build) return;
  const rect = build.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  buildProgress = Math.max(0, Math.min(1, -rect.top / total));
  const percent = Math.round(buildProgress * 100);
  buildBar.style.width = `${percent}%`;
  buildPercent.textContent = `${percent}%`;
  const statuses = document.documentElement.lang === "en" ? statusEn : statusJa;
  const stage = buildProgress < .25 ? 0 : buildProgress < .5 ? 1 : buildProgress < .78 ? 2 : 3;
  buildStatus.textContent = statuses[stage];
  const previewProgress = Math.max(0, Math.min(1, (buildProgress - .32) / .42));
  codeLayer.style.opacity = String(1 - previewProgress);
  codeLayer.style.transform = `translateY(${-10 * previewProgress}px)`;
  appPreview.style.opacity = String(previewProgress);
  appPreview.style.transform = `translateY(${14 * (1 - previewProgress)}px) scale(${.97 + .03 * previewProgress})`;
  liveBadge.style.display = buildProgress > .76 ? "block" : "none";
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateScroll(); ticking = false; });
}, { passive:true });
updateScroll();

document.querySelectorAll(".work-window").forEach((windowEl) => {
  const front = () => {
    document.querySelectorAll(".work-window").forEach((item) => item.classList.remove("is-front"));
    windowEl.classList.add("is-front");
  };
  windowEl.addEventListener("click", front);
  windowEl.addEventListener("focus", front);
});

document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });
const clock = document.querySelector("[data-clock]");
if (clock) clock.textContent = new Intl.DateTimeFormat("ja-JP", { timeZone:"Asia/Tokyo", hour:"2-digit", minute:"2-digit", hour12:false }).format(new Date());
