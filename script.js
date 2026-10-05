const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

function menuLabel(willBeOpen) {
  const en = document.documentElement.lang === "en";
  if (willBeOpen) return en ? "Close menu" : "メニューを閉じる";
  return en ? "Open menu" : "メニューを開く";
}

function setMenu(open) {
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.setAttribute("aria-label", menuLabel(open));
  mobileNav?.classList.toggle("is-open", open);
}

menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileNav?.classList.contains("is-open")) { setMenu(false); menuButton?.focus(); }
});

const translations = {
  skipLink:"Skip to main content",
  navServices:"Services",navWorks:"Works",navProcess:"Process",navContact:"Contact",
  heroT1:"A development partner that ",heroT2:"moves your business forward",heroT3:".",heroT4:"",
  heroSub:"We support web services, mobile apps, business systems, and AI tools end to end — from planning and design through development and operation. Feel free to reach out before your requirements are finalized.",
  heroCta1:"Talk to us",heroCta2:"See our work",
  heroPoint1:"Early-stage ideas welcome",heroPoint2:"NDA available",heroPoint3:"Reply within 2 business days",
  cap1:"Web apps & SaaS",cap2:"Business systems",cap3:"iOS / Android",cap4:"macOS apps",cap5:"AI & LLM integration",cap6:"Cloud & API design",
  whyTitle:"Development that doesn’t stop at launch.",whySub:"We work backward from your business goals and build what matters, in the right order.",
  why1Title:"One team, from planning to operation",why1Desc:"The same team handles scoping, design, development, and post-launch improvement — so your intent never gets lost in hand-offs.",
  why2Title:"Hands-on skills from our own products",why2Desc:"We plan and run our own web services and macOS app, and bring that practical know-how to every client project.",
  why3Title:"Build small. Ship early.",why3Desc:"We validate ideas with an MVP first, then iterate in short cycles — moving forward without wasted budget.",
  buildTitle:"From code to something real.",buildStep1:"Coding",buildStep2:"Test",buildStep3:"Build",buildStep4:"Release",buildStep5:"App ready",testRunning:"Checking quality",testPassed:"TESTS PASSED",testTime:"Run time",buildOptimizing:"Optimizing",buildReady:"Production bundle ready",releaseTitle:"Released to the world.",releaseLive:"Production is live",buildScrollHint:"Scroll to move development forward ↓",appNav:"Today  Projects  Reports",appCta:"+ New task",appListTitle:"Today’s tasks",appTask1:"Review homepage design",appTask2:"Implement login flow",appTask3:"Write release notes",appStatTitle:"Progress today",appStatDone:"18/22 tasks done",appSync:"synced",
  servicesTitle:"Planning to operation, in one continuous line.",servicesSub:"We combine the expertise your business phase requires.",
  serviceDetail:"Learn more",
  svc1Title:"Web App Development",svc1Desc:"From internal systems to SaaS and e-commerce. MVPs for new services, improvements to existing ones, technology selection, and cloud architecture.",svc1I1:"Frontend & backend",svc1I2:"Cloud & API design",svc1I3:"Performance tuning",
  svc2Title:"Mobile App Development",svc2Desc:"iOS and Android apps that fit naturally into daily life — from new builds to feature additions and renewals.",svc2I1:"iOS & Android",svc2I2:"Cross-platform",svc2I3:"Store submission & release",
  svc3Title:"Desktop App & AI Tool Development",svc3Desc:"macOS apps and AI-powered tools — from integrating AI features and external APIs to post-launch operation.",svc3I1:"macOS apps",svc3I2:"AI & voice input",svc3I3:"Obsidian / Notion API integration",
  aiPrompt:"Summarize the API design we agreed on",
  worksTitle:"Our work",worksSub:"Products we have planned, built, and continue to operate.",
  work1Title:"BebiReci",work1Desc:"A recipe-sharing app for babies and toddlers, searchable by ingredient, age, and excluded foods.",
  work2Title:"4komanikki",work2Desc:"A diary app where AI gently turns your entries into four-panel comics.",
  work3Desc:"A macOS app for asking AI by text or voice and saving answers to apps like Obsidian and Notion.",ownProduct:"OUR PRODUCT",visitSite:"Visit website",
  processTitle:"Build small. Ship early.",processSub:"One team stays with you from scoping through post-launch. Durations are typical estimates.",
  step1Title:"Discovery",step1Desc:"We listen to your goals and challenges, then propose a practical plan.",step1Time:"1–2 weeks",
  step2Title:"Design & proposal",step2Desc:"We prioritize requirements and choose technology built for long-term operation.",step2Time:"2–4 weeks",
  step3Title:"Build & verify",step3Desc:"Short cycles of implementation and review keep everyone aligned.",step3Time:"4–12 weeks",
  step4Title:"Release",step4Desc:"We support production rollout through to stable operation.",step4Time:"1–2 weeks",
  step5Title:"Operate & improve",step5Desc:"We keep improving your product after launch to support its growth.",step5Time:"Ongoing",
  faqTitle:"Frequently asked questions",
  faq1Q:"Can I talk to you while my idea is still early?",faq1A:"Absolutely. We can start by organizing the problem together — just tell us where things stand.",
  faq2Q:"How is the cost determined?",faq2A:"After clarifying requirements, we estimate based on scope. Starting small is also possible.",
  faq3Q:"How long does development take?",faq3A:"It depends on scope, but an MVP typically takes two to three months.",
  faq4Q:"Can you sign an NDA?",faq4A:"Yes, we can sign one from the first conversation, so you can share your ideas and business details with confidence.",
  faq5Q:"Can you handle operation and improvements after launch?",faq5A:"Yes. The team that built your product continues to support maintenance, operation, and new features.",
  contactTitle:"It starts with a conversation.",contactSub:"Early-stage ideas are welcome. We’ll help you clarify the problem.",contactCta:"Email us",
  prepTitle:"Helpful things to include",prepSub:"It’s fine if some of these are still undecided.",
  prep1:"What you want to achieve and current challenges",prep2:"Your expected timeline",prep3:"Rough budget (undecided is OK)",prep4:"Reference services or documents",
  meta1:"Reply within 2 business days",meta2:"NDA available",
  footerDesc:"A development partner for web, mobile, and AI tools — from planning through operation.",footerSvc3:"Desktop & AI Tool Development"
};

const japanese = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { japanese[el.dataset.i18n] = el.innerHTML; });

const mailSubject = { ja:"プロジェクトのご相談", en:"Project inquiry" };

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = lang === "en" ? translations[el.dataset.i18n] : japanese[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-mailto]").forEach((link) => {
    link.href = `mailto:support@codetas.com?subject=${encodeURIComponent(mailSubject[lang])}`;
  });
  menuButton?.setAttribute("aria-label", menuLabel(menuButton.getAttribute("aria-expanded") === "true"));
  try { localStorage.setItem("codetas-lang", lang); } catch {}
}

document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => {
  setLanguage(button.dataset.lang);
  updateScroll();
}));
let savedLang = null;
try { savedLang = localStorage.getItem("codetas-lang"); } catch {}
setLanguage(savedLang === "en" ? "en" : "ja");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const build = document.querySelector("[data-build]");
const buildBar = document.querySelector("[data-build-bar]");
const buildPercent = document.querySelector("[data-build-percent]");
const buildStatus = document.querySelector("[data-build-status]");
const buildPanels = [...document.querySelectorAll("[data-build-panel]")];
const buildSteps = [...document.querySelectorAll("[data-build-step]")];
const codeLines = [...document.querySelectorAll(".code-line")];
const liveBadge = document.querySelector("[data-live]");
const buildTitle = document.querySelector("[data-build-title]");
const buildCount = document.querySelector("[data-build-count]");
const testTotal = document.querySelector("[data-test-total]");
const testPercent = document.querySelector("[data-test-percent]");
const testGauge = document.querySelector("[data-test-gauge]");
const testTime = document.querySelector("[data-test-time]");
const testItems = [...document.querySelectorAll("[data-test-item]")];
const bundleFiles = [...document.querySelectorAll("[data-bundle-file]")];
const bundleCube = document.querySelector("[data-bundle-cube]");
const bundleResult = document.querySelector("[data-bundle-result]");
const releaseOrbit = document.querySelector("[data-release-orbit]");
const releaseNodes = [...document.querySelectorAll("[data-release-node]")];
const releaseLines = [...document.querySelectorAll("[data-release-line]")];
const releaseLive = document.querySelector("[data-release-live]");
let buildProgress = 0;

const buildCopy = {
  ja: [
    ["コードを書いています…", "main.tsx — coding"],
    ["24件のテストを実行しています…", "tests — quality check"],
    ["本番用にビルドしています…", "build — production"],
    ["クラウドへリリースしています…", "deploy — tokyo"],
    ["完成 — アプリが公開されました", "taskflow.app"]
  ],
  en: [
    ["Writing the product…", "main.tsx — coding"],
    ["Running 24 tests…", "tests — quality check"],
    ["Building for production…", "build — production"],
    ["Releasing to the cloud…", "deploy — tokyo"],
    ["Complete — your app is live", "taskflow.app"]
  ]
};

function updateScroll() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
  if (!build) return;
  const rect = build.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  buildProgress = Math.max(0, Math.min(1, -rect.top / total));
  const percent = Math.round(buildProgress * 100);
  buildBar.style.width = `${percent}%`;
  buildPercent.textContent = `${percent}%`;
  const stage = Math.min(4, Math.floor(buildProgress * 5));
  const stageProgress = Math.min(1, Math.max(0, buildProgress * 5 - stage));
  const copy = buildCopy[document.documentElement.lang === "en" ? "en" : "ja"][stage];
  buildStatus.textContent = copy[0];
  buildTitle.textContent = copy[1];
  buildCount.textContent = `${stage + 1} / 5`;
  buildPanels.forEach((panel, index) => panel.classList.toggle("is-current", index === stage));
  buildSteps.forEach((step, index) => {
    step.classList.toggle("is-active", index === stage);
    step.classList.toggle("is-complete", index < stage);
  });

  const codeProgress = Math.min(1, buildProgress / .19);
  const visibleLines = Math.max(1, Math.ceil(codeProgress * codeLines.length));
  codeLines.forEach((line, index) => {
    line.classList.toggle("is-typed", index < visibleLines);
    line.classList.toggle("is-typing", index === visibleLines - 1 && codeProgress < 1);
  });

  const testValue = stage < 1 ? 0 : stage > 1 ? 1 : stageProgress;
  const passedTests = Math.min(24, Math.floor(testValue * 25));
  const testPercentage = Math.round(testValue * 100);
  testTotal.textContent = String(passedTests);
  testPercent.textContent = `${testPercentage}%`;
  testGauge.style.setProperty("--test-progress", `${testPercentage}%`);
  testTime.textContent = `${(testValue * 1.84).toFixed(2)}s`;
  testItems.forEach((item, index) => item.classList.toggle("is-done", testValue >= (index + 1) / testItems.length));

  const bundleValue = stage < 2 ? 0 : stage > 2 ? 1 : stageProgress;
  bundleFiles.forEach((file, index) => {
    const fileProgress = Math.min(1, Math.max(0, (bundleValue - index * .14) / .58));
    file.style.transform = `scaleX(${fileProgress})`;
  });
  const cubeScale = .78 + bundleValue * .22;
  bundleCube.style.transform = `rotate(${20 + bundleValue * 10}deg) skew(-7deg) scale(${cubeScale})`;
  bundleCube.style.opacity = String(.25 + bundleValue * .75);
  bundleResult.style.opacity = String(.2 + Math.max(0, (bundleValue - .72) / .28) * .8);
  bundleResult.style.transform = `translateY(${Math.max(0, 1 - bundleValue) * 5}px)`;

  const releaseValue = stage < 3 ? 0 : stage > 3 ? 1 : stageProgress;
  releaseOrbit.style.transform = `translateY(${-releaseValue * 7}px) rotate(${releaseValue * 360}deg)`;
  releaseOrbit.style.setProperty("--release-counter", `${releaseValue * -360}deg`);
  releaseNodes.forEach((node, index) => node.classList.toggle("is-done", releaseValue >= .08 + index * .34));
  releaseLines.forEach((line, index) => {
    const lineProgress = Math.min(1, Math.max(0, (releaseValue - (.14 + index * .34)) / .2));
    line.style.transform = `scaleX(${lineProgress})`;
  });
  const liveProgress = Math.min(1, Math.max(0, (releaseValue - .76) / .24));
  releaseLive.style.opacity = String(.15 + liveProgress * .85);
  releaseLive.style.transform = `translateY(${(1 - liveProgress) * 5}px)`;
  liveBadge.style.display = stage === 4 ? "block" : "none";
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateScroll(); ticking = false; });
}, { passive:true });
updateScroll();

document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });
