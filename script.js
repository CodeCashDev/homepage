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
  heroSub:"CodeTas is a development partner for web services, mobile apps, business systems, and AI tools — from planning and design through development and operation. We're happy to talk even before requirements are finalized.",heroCta1:"Talk to us",heroCta2:"See what we do",
  term1:"Strategy & scoping",term2:"UI/UX design",term3:"Build & verify",term4:"Operating & growing…",
  buildTitle:"From code to something real.",buildStep1:"Coding",buildStep2:"Test",buildStep3:"Build",buildStep4:"Release",buildStep5:"App ready",testRunning:"Checking quality",testPassed:"TESTS PASSED",testTime:"Run time",buildOptimizing:"Optimizing",buildReady:"Production bundle ready",releaseTitle:"Released to the world.",releaseLive:"Production is live",buildScrollHint:"Scroll to move development forward ↓",appNav:"Today　 Projects　 Reports",appCta:"+ New task",appListTitle:"Today’s tasks",appTask1:"Review homepage design",appTask2:"Implement login flow",appTask3:"Write release notes",appStatTitle:"Progress today",appStatDone:"18/22 tasks done",appSync:"synced",
  servicesTitle:"Planning to operation, in one continuous line.",servicesSub:"We combine the expertise your business phase requires.",
  svc1Desc:"From internal systems to SaaS and e-commerce — usable, scalable web products. We handle MVP development for new services, feature additions and improvements for existing services, technology selection, and cloud architecture.",svc1I1:"Frontend & backend",svc1I2:"Cloud infrastructure & API design",svc1I3:"Performance optimization",
  svc2Title:"Mobile App Development",svc2Desc:"iOS and Android. Comfortable app experiences that fit into daily life. From new app development to feature additions and renewals.",svc2I1:"iOS & Android apps",svc2I2:"Cross-platform",svc2I3:"Store submission & release support",
  svc3Title:"Desktop App & AI Tool Development",svc3Desc:"macOS apps and AI-powered tools, built with know-how from our own products. We provide end-to-end support including AI integration, external API integration, and post-launch operations.",svc3I1:"macOS desktop apps",svc3I2:"AI integration, text & voice input",svc3I3:"API integrations such as Obsidian and Notion",aiPrompt:"Summarize the API design we just agreed on",exportTo:"Export to",saved:"Saved to local history",
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
