/**
 * <landscape-projects-page> — the full /landscape-design-projects landing page.
 *
 * SPEC-002. Same route as the commercial snow page (SPEC-001): one custom
 * element on an otherwise blank Wix page, with every section built here.
 *
 * HOW IT IS PLACED
 *   Wix Editor > Add Elements > Embed Code > Custom Element
 *     Tag name:   landscape-projects-page
 *     Server URL: https://nick-baughman.github.io/earthscapes-assets/landscapeProjectsPage.js
 *   One element on an otherwise blank page. Stretch it full width.
 *
 * LIGHT DOM, NAMESPACED `elp-`
 *   Same reasoning as the snow page: the copy stays out from behind a shadow
 *   boundary. The prefix differs from the snow page's `esn-` so the two pages
 *   can change independently and never share a rule by accident.
 *
 * COPY
 *   Source of truth is .ai/content/landscape-design-projects-page.md. Project
 *   stories are drafted from the photographs and are NOT confirmed until Mike
 *   signs them off there (`confirmed: false` below). Process claims trace to
 *   data/earthscapes-facts.md.
 *
 * REVIEWS
 *   Live from Google via backend/googleReviews.web.js. Page code sets the
 *   `reviews` attribute to the JSON result (or `{"error":true}`); this element
 *   only renders. With no data the section shrinks to the Google link. It never
 *   shows placeholder reviews.
 */

// Everything below sits in one block so its top-level names stay private.
// Classic scripts share one global scope: commercialSnowPage.js declares its
// own `CDN`, and loading both on one page threw "Identifier 'CDN' has already
// been declared" (reproduced 2026-09-28).
{
/* ------------------------------------------------------------------ *
 * Where media is served from. GitHub Pages, like the snow page: a media
 * swap is a push plus a `?v=` bump, with no Wix publish.
 * The `asset-base` attribute overrides it for local preview only.
 * ------------------------------------------------------------------ */
const CDN = 'https://nick-baughman.github.io/earthscapes-assets';
const V = 'v=2';

const CTA_URL = 'https://www.earthscapesnj.com/consultation';
const DESIGN_URL = 'https://www.earthscapesnj.com/landscape-design';
const PHONE_HREF = 'tel:7324448575';
const PHONE_TEXT = '732-444-8575';

/**
 * Nick's Google Business Profile share link (Mike, 2026-09-28). Resolves to the
 * same listing (knowledge-graph id /g/11y4qlt3f_) as the Maps link on
 * /landscape-design. Until the Places key exists this is the whole reviews
 * section; once it does, it is the "Read all" link under the live reviews.
 */
const GOOGLE_LISTING = 'https://share.google/XOthyNAkdBhlarA97';

/* ------------------------------------------------------------------ *
 * Design tokens. Change branding here and nowhere else.
 * ------------------------------------------------------------------ */
const TOKENS = `
  --elp-ink:         #15201A;
  --elp-ink-soft:    #4A5A50;
  --elp-ink-mute:    #75857B;
  --elp-ground:      #FBFAF7;
  --elp-ground-alt:  #F1EEE7;
  --elp-card:        #FFFFFF;
  --elp-deep:        #101A14;
  --elp-line:        #E2DDD2;
  --elp-accent:      #1F5A3A;
  --elp-accent-ink:  #FFFFFF;
  --elp-star:        #E0A526;
  --elp-radius:      18px;
  --elp-radius-sm:   10px;
  --elp-shadow:      0 1px 2px rgba(16,26,20,.06), 0 8px 28px rgba(16,26,20,.08);
  --elp-measure:     60ch;
  --elp-display:     "Fraunces", Georgia, "Times New Roman", serif;
  --elp-body:        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap';

/* ------------------------------------------------------------------ *
 * Content
 * ------------------------------------------------------------------ */

const HERO = {
    img: 'img/projects/hero/hero',
    alt: 'The full backyard at dusk: lit tiered retaining walls, a boulder waterfall and slide, a freeform pool and a raised stone spa beside a paver patio',
};

/**
 * The projects, in carousel order. The waterfall pool leads: it is Nick's
 * most recent build and the one he is proudest of (Mike, 2026-09-28).
 * Houses 1 and 3 arrive later.
 *
 * `story` supports one markup: [text](/path) for an inline link to a service
 * page. Everything else is escaped.
 *
 * `photos` are [file number, alt, orientation]. Files live at
 * img/projects/<slug>/<nn>-800.webp and -1600.webp. Names are neutral on
 * purpose: the photographer's originals carried street addresses.
 */
const PROJECTS = [
    {
        slug: 'waterfall-pool',
        confirmed: false,
        title: 'Freeform pool with boulder waterfall and spa',
        story: 'Tiered [retaining walls](/retaining-walls) turn a sloped yard into usable levels. A boulder waterfall and a slide feed a freeform pool, with a raised spa spilling over into it. Natural stone steps and a flagstone path tie the pool deck to a fire pit patio off the back of the house.',
        photos: [
            [1, 'Freeform pool with a boulder waterfall, slide and raised spa below tiered retaining walls', 'l'],
            [2, 'Raised stone spa spilling into the pool, with the waterfall and slide behind', 'l'],
            [3, 'The full backyard at dusk, with lit retaining walls, pool, spa and lounge chairs', 'l'],
            [4, 'Dining set on the paver patio overlooking the pool and waterfall at dusk', 'l'],
            [5, 'Boulder waterfall and natural stone steps leading down to the pool', 'l'],
            [6, 'Wood-burning fire pit on a stone patio, with the lit house behind at dusk', 'p'],
            [7, 'Water cascading over boulders into the pool', 'p'],
            [8, 'Close view of the boulder waterfall with the slide above', 'p'],
            [9, 'Natural stone steps set between boulders and plantings', 'p'],
            [10, 'Thick natural stone steps with a path light beside them', 'p'],
        ],
    },
    {
        slug: 'pool-fire-circle',
        confirmed: false,
        title: 'Pool terrace and fire circle',
        story: 'A rectangular pool set into a large-format [paver](/pavers) deck, with three sheer descents spilling from a raised seat wall. One step down, a herringbone fire circle is framed by natural stone outcroppings and hydrangeas. [Lighting](/landscape-lighting) in the walls and plantings carries both spaces into the evening.',
        photos: [
            [1, 'Rectangular pool at dusk with three sheer descent water features and lights along the seat wall', 'l'],
            [2, 'Aerial view of the pool, paver patio and round fire circle behind the house', 'l'],
            [3, 'Pool deck of large-format pavers beside a raised stone wall and clipped hedges', 'l'],
            [4, 'Lit fire pit on a round patio edged with natural stone and blue hydrangeas', 'l'],
            [5, 'Herringbone fire circle framed by stone outcroppings, with the pool deck beyond', 'l'],
            [6, 'The pool lit blue at night, with lights along the wall and garden beds', 'l'],
        ],
    },
    {
        slug: 'kitchen-pavilion',
        confirmed: false,
        title: 'Outdoor kitchen, covered bar and fire lounge',
        story: 'An open-beam pavilion strung with lights covers a dining table and a stone-faced bar. Beside it, a built-in grill, refrigerator and storage sit in a lit stone wall, and a linear fire table anchors the lounge. The freeform pool beyond is set in a wide [paver](/pavers) deck.',
        photos: [
            [1, 'Dining table under an open-beam pavilion strung with lights', 'l'],
            [2, 'Stone-faced outdoor bar with four stools under the pavilion', 'l'],
            [3, 'Freeform pool and lounge chairs on a paver deck at dusk', 'l'],
            [4, 'Linear fire table between two white outdoor sofas on a herringbone paver patio', 'l'],
            [5, 'Built-in stainless grill, refrigerator and storage in a stone wall with cap lights', 'l'],
            [6, 'Fire bowls on stone pillars along a seat wall and paver walkway', 'l'],
        ],
    },
];

/** Full-bleed band between the projects and the reviews. No type over it. */
const BAND = { slug: 'kitchen-pavilion', n: 3, alt: 'Freeform pool and lounge chairs on a paver deck at dusk, with a gazebo and tall trees behind' };

/**
 * The process, cut down from /landscape-design (live-site, 2026-09-27).
 * "3D video rendering" and "in-house" are live-site claims awaiting Nick's
 * confirmation. See data/earthscapes-facts.md.
 */
const STEPS = [
    ['Design consultation', 'One of our designers walks the property with you and talks through what you want.'],
    ['Render and revise', 'You get a 3D video rendering, and we revise it with you until the plan is right.'],
    ['Installation estimate', 'Once the plan is final, you get a full, detailed proposal for the build.'],
    ['Build and transform', 'Our own team builds it, from the first cut to the final walkthrough.'],
];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function esc(s) {
    return String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** Escape, then turn [text](/path) into a link to that site page. Only
 *  site-relative paths are accepted, so this can never emit an outside link. */
function storyHtml(s) {
    return esc(s).replace(/\[([^\]]+)\]\((\/[a-z0-9-]+)\)/g,
        (_, text, path) => `<a class="elp-inline" href="https://www.earthscapesnj.com${path}">${text}</a>`);
}

/** Only https URLs from outside data (Google) reach an href or src. */
function safeUrl(u) {
    return typeof u === 'string' && /^https:\/\//.test(u) ? u : '';
}

const nn = (n) => String(n).padStart(2, '0');

function stars(rating) {
    const full = Math.round(Number(rating) || 0);
    return `<span class="elp-stars" role="img" aria-label="${full} out of 5 stars">${
        [1, 2, 3, 4, 5].map((i) => `<svg viewBox="0 0 20 20" aria-hidden="true" class="${i <= full ? 'on' : ''}"><path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>`).join('')
    }</span>`;
}

const ICON = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h2.6l1.4 4.2-2 1.4a12 12 0 0 0 6.3 6.3l1.4-2 4.2 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/></svg>',
};

/**
 * Conversion tracking. The live site already runs GA4 and GTM in the main
 * window, so events go straight to them. GA4 sends with sendBeacon, which
 * survives the navigation to /consultation; nothing here delays the click.
 */
function track(event, params) {
    try {
        if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
        if (typeof window.gtag === 'function') window.gtag('event', event, { ...params, transport_type: 'beacon' });
    } catch (e) {
        // Tracking must never break a link.
    }
}

/* ------------------------------------------------------------------ *
 * Styles
 * ------------------------------------------------------------------ */
const STYLES = `
.elp-root,.elp-portal{${TOKENS}}
.elp-root{font-family:var(--elp-body);color:var(--elp-ink);background:var(--elp-ground);
  line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased;overflow:hidden;}
.elp-root *,.elp-root *::before,.elp-root *::after,.elp-portal *,.elp-portal *::before,.elp-portal *::after{box-sizing:border-box;}
.elp-root h1,.elp-root h2,.elp-root h3{font-family:var(--elp-display);font-weight:600;line-height:1.1;margin:0;text-wrap:balance;letter-spacing:-.015em;}
.elp-root p{margin:0;}
.elp-root a{color:inherit;}
.elp-in{max-width:1240px;margin:0 auto;padding:0 24px;}
.elp-sec{padding:80px 0;}
.elp-alt{background:var(--elp-ground-alt);}
.elp-eyebrow{font-size:.78rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--elp-accent);}
.elp-h2{font-size:clamp(1.8rem,3.6vw,2.7rem);margin-top:10px;}
.elp-sub{color:var(--elp-ink-soft);margin-top:12px;max-width:var(--elp-measure);font-size:1.05rem;}
.elp-inline{color:var(--elp-accent)!important;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}

.elp-btn{font-family:var(--elp-body);font-weight:650;font-size:1rem;padding:15px 26px;border-radius:999px;
  border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;
  gap:8px;min-height:48px;transition:transform .15s ease,background .15s ease;}
.elp-btn:active{transform:scale(.98);}
.elp-btn-1{background:var(--elp-accent);color:var(--elp-accent-ink)!important;}
.elp-btn-1:hover{background:#18492F;}
.elp-btn-2{background:rgba(255,255,255,.14);color:#fff!important;border-color:rgba(255,255,255,.45);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);}
.elp-btn-3{background:transparent;color:var(--elp-ink)!important;border-color:var(--elp-line);}
.elp-cta{display:flex;gap:12px;flex-wrap:wrap;}
.elp-root :focus-visible,.elp-portal :focus-visible{outline:3px solid #7FB897;outline-offset:2px;}

/* Hero */
.elp-hero{position:relative;min-height:min(88svh,860px);display:flex;align-items:flex-end;color:#fff;background:var(--elp-deep);}
.elp-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% 55%;}
.elp-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,16,12,.18) 0%,rgba(10,16,12,0) 28%,rgba(10,16,12,.5) 55%,rgba(10,16,12,.82) 100%);}
/* Desktop: the waterfall, slide and spa sit center-right in the hero photo, so the
   scrim only darkens the left, where the text sits over the pavers and loungers. */
/* Phones: a tall crop puts the waterfall and spa in the lower half, exactly
   where overlaid text would sit. So the photo stands alone on top and fades
   into a dark panel that carries the headline, like an app's hero card. */
@media(max-width:899px){
  .elp-hero{display:block;min-height:0;}
  .elp-hero img{position:relative;display:block;height:min(58svh,560px);object-position:62% 50%;}
  .elp-hero::after{bottom:auto;height:min(58svh,560px);
    background:linear-gradient(180deg,rgba(10,16,12,.12) 0%,rgba(10,16,12,0) 68%,rgba(16,26,20,1) 100%);}
  .elp-root .elp-hero .elp-in{padding-top:0;margin-top:-44px;}
}
/* Desktop: the box takes the photo's own 3:2 shape so nothing is cropped
   (the old 88svh/860px cap cut the tiered walls off on wide screens). It only
   crops again past 100svh, on very wide monitors. The text is centred
   vertically so the buttons stay above the fold under Wix's header. */
@media(min-width:900px){.elp-hero{min-height:0;width:100%;aspect-ratio:2500/1677;max-height:100svh;align-items:center;}
  .elp-root .elp-hero .elp-in{padding-top:48px;padding-bottom:48px;}
  .elp-hero img{object-position:50% 55%;}
  .elp-hero::after{background:linear-gradient(90deg,rgba(10,16,12,.78) 0%,rgba(10,16,12,.5) 32%,rgba(10,16,12,0) 58%),linear-gradient(180deg,rgba(10,16,12,.2) 0%,rgba(10,16,12,0) 30%,rgba(10,16,12,0) 70%,rgba(10,16,12,.35) 100%);}}
.elp-hero .elp-in{position:relative;z-index:1;width:100%;padding-bottom:64px;padding-top:120px;}
.elp-hero .elp-eyebrow{color:#CFE5D6;}
.elp-h1{font-size:clamp(2.4rem,6.4vw,4.6rem);max-width:14ch;margin-top:12px!important;}
.elp-hero .elp-lead{font-size:clamp(1.05rem,1.6vw,1.25rem);max-width:42ch;margin-top:18px;color:#E9F0EB;}
.elp-hero .elp-cta{margin-top:30px;}

/* Projects carousel */
.elp-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;}
.elp-nav{display:flex;align-items:center;gap:10px;}
.elp-count{font-variant-numeric:tabular-nums;font-weight:650;color:var(--elp-ink-soft);min-width:4ch;text-align:center;}
.elp-arrow{width:46px;height:46px;border-radius:50%;border:1px solid var(--elp-line);background:var(--elp-card);cursor:pointer;
  display:inline-flex;align-items:center;justify-content:center;color:var(--elp-ink);}
.elp-arrow svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.elp-arrow:disabled{opacity:.35;cursor:default;}
.elp-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding:0 24px;padding:36px 24px 12px;
  scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;}
.elp-track::-webkit-scrollbar{display:none;}
.elp-track::after{content:"";flex:0 0 4px;}
.elp-wide{max-width:1240px;margin:0 auto;}
.elp-card{flex:0 0 calc(100% - 36px);scroll-snap-align:start;background:var(--elp-card);border-radius:var(--elp-radius);
  box-shadow:var(--elp-shadow);overflow:hidden;display:flex;flex-direction:column;}
.elp-media{position:relative;background:#0c120e;aspect-ratio:9/16;max-height:70svh;width:100%;}
.elp-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.elp-vbtn{position:absolute;right:12px;bottom:12px;width:40px;height:40px;border-radius:50%;border:none;cursor:pointer;
  background:rgba(0,0,0,.55);color:#fff;display:inline-flex;align-items:center;justify-content:center;}
.elp-vbtn svg{width:18px;height:18px;fill:currentColor;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;}
.elp-num{position:absolute;left:14px;top:14px;font-size:.74rem;font-weight:700;letter-spacing:.1em;color:#fff;
  background:rgba(0,0,0,.5);padding:6px 10px;border-radius:999px;}
.elp-body{padding:22px 22px 24px;display:flex;flex-direction:column;gap:14px;flex:1;}
.elp-card h3{font-size:1.45rem;}
.elp-story{color:var(--elp-ink-soft);font-size:.98rem;}
.elp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:4px;}
.elp-thumb{position:relative;aspect-ratio:1;border:none;padding:0;cursor:zoom-in;border-radius:var(--elp-radius-sm);overflow:hidden;background:var(--elp-ground-alt);}
.elp-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s ease;}
.elp-thumb:hover img{transform:scale(1.04);}
.elp-more{position:absolute;inset:0;background:rgba(16,26,20,.55);color:#fff;font-weight:700;font-size:1.05rem;display:flex;align-items:center;justify-content:center;}
.elp-card-cta{margin-top:auto;padding-top:6px;font-weight:650;color:var(--elp-accent)!important;text-decoration:none;display:inline-flex;gap:6px;align-items:center;}
.elp-card-cta::after{content:"\\2192";}
.elp-dots{display:flex;justify-content:center;gap:8px;padding:14px 0 0;}
.elp-dots button{width:8px;height:8px;border-radius:999px;border:none;padding:0;background:var(--elp-line);cursor:pointer;transition:width .25s ease,background .25s ease;}
.elp-dots button[aria-current="true"]{width:24px;background:var(--elp-accent);}

/* Band */
.elp-band{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;}

/* Reviews */
.elp-summary{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px;color:var(--elp-ink-soft);}
.elp-summary strong{font-family:var(--elp-display);font-size:2rem;color:var(--elp-ink);font-weight:600;line-height:1;}
.elp-stars{display:inline-flex;gap:2px;vertical-align:middle;}
.elp-stars svg{width:18px;height:18px;fill:var(--elp-line);}
.elp-stars svg.on{fill:var(--elp-star);}
.elp-rtrack{padding-top:28px;}
.elp-review{flex:0 0 calc(100% - 36px);scroll-snap-align:start;background:var(--elp-card);border-radius:var(--elp-radius);
  box-shadow:var(--elp-shadow);padding:24px;display:flex;flex-direction:column;gap:14px;}
.elp-who{display:flex;align-items:center;gap:12px;}
.elp-who img,.elp-avatar{width:42px;height:42px;border-radius:50%;flex:none;object-fit:cover;background:var(--elp-ground-alt);}
.elp-avatar{display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--elp-accent);}
.elp-who a{font-weight:650;text-decoration:none;}
.elp-when{font-size:.84rem;color:var(--elp-ink-mute);}
.elp-rtext{color:var(--elp-ink-soft);font-size:.97rem;display:-webkit-box;-webkit-line-clamp:7;-webkit-box-orient:vertical;overflow:hidden;white-space:pre-line;}
.elp-review.open .elp-rtext{-webkit-line-clamp:unset;display:block;}
.elp-rmore{align-self:flex-start;border:none;background:none;padding:0;font:inherit;font-weight:650;color:var(--elp-accent);cursor:pointer;}
.elp-attr{font-size:.82rem;color:var(--elp-ink-mute);margin-top:18px;}
.elp-glink{display:inline-flex;margin-top:22px;}
.elp-skel{flex:0 0 calc(100% - 36px);height:230px;border-radius:var(--elp-radius);background:linear-gradient(90deg,#ece8df 0%,#f6f3ee 50%,#ece8df 100%);background-size:200% 100%;animation:elp-sh 1.4s linear infinite;}
@keyframes elp-sh{to{background-position:-200% 0;}}

/* Process */
.elp-steps{list-style:none;padding:0;margin:36px 0 0;display:grid;gap:14px;grid-template-columns:1fr;}
.elp-step{background:var(--elp-card);border:1px solid var(--elp-line);border-radius:var(--elp-radius);padding:22px;}
.elp-step span{font-family:var(--elp-display);font-size:1.6rem;color:var(--elp-accent);line-height:1;}
.elp-step h3{font-size:1.15rem;margin-top:12px!important;}
.elp-step p{color:var(--elp-ink-soft);font-size:.95rem;margin-top:6px;}
.elp-plink{display:inline-block;margin-top:24px;font-weight:650;color:var(--elp-accent)!important;}

/* Close */
.elp-close{background:var(--elp-deep);color:#EAF1EC;text-align:center;}
.elp-close h2{color:#fff;}
.elp-close .elp-sub{color:#B9C9BF;margin-left:auto;margin-right:auto;}
.elp-close .elp-cta{justify-content:center;margin-top:30px;}
.elp-area{margin-top:28px;font-size:.85rem;letter-spacing:.08em;text-transform:uppercase;color:#8FA597;}

/* Sticky mobile bar and photo viewer live on <body>, outside Wix's containers.
   68px right padding keeps both clear of the site's UserWay accessibility button,
   which floats bottom-right above everything (measured 44x44 at right 21px). */
.elp-bar{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;padding:10px 68px calc(10px + env(safe-area-inset-bottom,0px)) 14px;
  background:rgba(251,250,247,.94);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid #E2DDD2;
  display:flex;gap:10px;transform:translateY(110%);transition:transform .25s ease;font-family:var(--elp-body);}
.elp-bar.show{transform:none;}
.elp-bar .elp-btn{flex:1;padding:13px 12px;white-space:nowrap;font-size:.95rem;}
.elp-bar .elp-bar-call{flex:0 0 48px;width:48px;padding:0;color:var(--elp-accent)!important;}
@media(min-width:900px){.elp-bar{display:none;}}

.elp-viewer{position:fixed;inset:0;z-index:2147483600;background:#080C0A;display:flex;flex-direction:column;font-family:var(--elp-body);color:#fff;}
.elp-viewer[hidden]{display:none;}
.elp-vtop{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:calc(12px + env(safe-area-inset-top,0px)) 16px 12px;}
.elp-vtitle{display:flex;align-items:baseline;min-width:0;font-size:.95rem;}
.elp-vname{font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;}
.elp-vcount{font-variant-numeric:tabular-nums;color:#B9C9BF;font-size:.9rem;margin-left:8px;flex:none;}
.elp-vclose,.elp-vprev,.elp-vnext{width:46px;height:46px;border-radius:50%;border:none;background:rgba(255,255,255,.12);color:#fff;cursor:pointer;
  display:inline-flex;align-items:center;justify-content:center;flex:none;}
.elp-portal svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.elp-vtrack{flex:1;display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior:contain;}
.elp-vtrack::-webkit-scrollbar{display:none;}
.elp-slide{flex:0 0 100%;scroll-snap-align:center;display:flex;align-items:center;justify-content:center;padding:0 0 calc(12px + env(safe-area-inset-bottom,0px));}
.elp-slide img{max-width:100%;max-height:100%;object-fit:contain;display:block;}
.elp-vprev,.elp-vnext{position:absolute;top:50%;transform:translateY(-50%);display:none;}
.elp-vprev{left:18px;}.elp-vnext{right:18px;}
.elp-alt-text{text-align:center;color:#B9C9BF;font-size:.88rem;padding:0 68px calc(16px + env(safe-area-inset-bottom,0px));min-height:3em;}
@media(min-width:900px){.elp-vprev,.elp-vnext{display:inline-flex;}.elp-slide{padding:0 90px 12px;}}

@media(min-width:640px){
  .elp-card{flex:0 0 min(640px,calc(100% - 80px));flex-direction:row;min-height:520px;}
  .elp-media{flex:0 0 46%;aspect-ratio:auto;max-height:none;min-height:520px;}
  .elp-review,.elp-skel{flex:0 0 min(420px,calc(100% - 80px));}
  .elp-steps{grid-template-columns:repeat(2,1fr);}
  .elp-band{aspect-ratio:21/9;}
}
@media(min-width:1024px){
  .elp-track{padding-left:max(24px,calc((100% - 1192px)/2));padding-right:max(24px,calc((100% - 1192px)/2));
    scroll-padding:0 max(24px,calc((100% - 1192px)/2));}
  .elp-card{flex:0 0 calc((min(100vw,1240px) - 48px - 20px)/2);}
  .elp-review,.elp-skel{flex:0 0 calc((min(100vw,1240px) - 48px - 40px)/3);}
  .elp-steps{grid-template-columns:repeat(4,1fr);}
  .elp-sec{padding:104px 0;}
}
@media(max-width:639px){
  .elp-sec{padding:60px 0;}
  .elp-in{padding:0 20px;}
  .elp-track{padding-left:20px;padding-right:20px;scroll-padding:0 20px;gap:14px;}
  .elp-hero .elp-in{padding-bottom:40px;}
  .elp-hero .elp-btn{flex:1 1 auto;}
  .elp-nav{display:none;}
}
@media(prefers-reduced-motion:reduce){.elp-root *,.elp-portal *{transition:none!important;animation:none!important;}}
`;

/* ------------------------------------------------------------------ *
 * Markup
 * ------------------------------------------------------------------ */

function template(base) {
    const src = (path, w) => `${base}/${path}-${w}.webp?${V}`;
    const photo = (p, n, w) => src(`img/projects/${p.slug}/${nn(n)}`, w);

    const cards = PROJECTS.map((p, i) => {
        const shown = p.photos.slice(0, 6);
        const extra = p.photos.length - shown.length;
        return `<article class="elp-card" data-i="${i}" aria-roledescription="slide" aria-label="Project ${i + 1} of ${PROJECTS.length}: ${esc(p.title)}">
      <div class="elp-media">
        <video muted playsinline loop preload="${i === 0 ? 'metadata' : 'none'}"
          poster="${base}/video/projects/${p.slug}-poster.webp?${V}"
          src="${base}/video/projects/${p.slug}.mp4?${V}"
          aria-label="Highlight video: ${esc(p.title)}"></video>
        <span class="elp-num">PROJECT ${nn(i + 1)}</span>
        <button class="elp-vbtn" type="button" aria-label="Pause video">${ICON.pause}</button>
      </div>
      <div class="elp-body">
        <h3>${esc(p.title)}</h3>
        <p class="elp-story">${storyHtml(p.story)}</p>
        <div class="elp-grid">${shown.map(([n, alt], k) => `<button class="elp-thumb" type="button" data-p="${i}" data-k="${k}" aria-label="Open photo ${k + 1} of ${p.photos.length}: ${esc(alt)}">
          <img src="${photo(p, n, 800)}" alt="${esc(alt)}" loading="lazy" decoding="async" width="400" height="400">
          ${k === shown.length - 1 && extra > 0 ? `<span class="elp-more" aria-hidden="true">+${extra}</span>` : ''}</button>`).join('')}</div>
        <a class="elp-card-cta" href="${CTA_URL}" data-cta="card-${p.slug}">Plan a project like this</a>
      </div>
    </article>`;
    }).join('');

    return `
<div class="elp-root">

  <section class="elp-hero">
    <img src="${src(HERO.img, 1200)}" srcset="${src(HERO.img, 1200)} 1200w, ${src(HERO.img, 2400)} 2400w" sizes="100vw"
      alt="${esc(HERO.alt)}" fetchpriority="high" decoding="async">
    <div class="elp-in">
      <p class="elp-eyebrow">Monmouth &amp; Ocean counties, NJ</p>
      <h1 class="elp-h1">Recent landscape design projects</h1>
      <p class="elp-lead">Pools, patios, outdoor kitchens and fire features. Each one designed in 3D with the homeowner, then built by our own team.</p>
      <div class="elp-cta">
        <a class="elp-btn elp-btn-1" href="${CTA_URL}" data-cta="hero">Book a design consultation</a>
        <a class="elp-btn elp-btn-2" href="${PHONE_HREF}" data-tel="hero">Call ${PHONE_TEXT}</a>
      </div>
    </div>
  </section>

  <section class="elp-sec" aria-labelledby="elp-projects-h">
    <div class="elp-in elp-head">
      <div>
        <p class="elp-eyebrow">The work</p>
        <h2 class="elp-h2" id="elp-projects-h">Swipe through the projects</h2>
        <p class="elp-sub">Tap any photo to see it full screen.</p>
      </div>
      <div class="elp-nav">
        <button class="elp-arrow" type="button" data-dir="-1" aria-label="Previous project">${ICON.prev}</button>
        <span class="elp-count" aria-live="polite">1 / ${PROJECTS.length}</span>
        <button class="elp-arrow" type="button" data-dir="1" aria-label="Next project">${ICON.next}</button>
      </div>
    </div>
    <div class="elp-track elp-ptrack" role="region" aria-roledescription="carousel" aria-label="Projects" tabindex="0">${cards}</div>
    <div class="elp-dots">${PROJECTS.map((p, i) => `<button type="button" data-i="${i}" aria-label="Go to project ${i + 1}" aria-current="${i === 0}"></button>`).join('')}</div>
  </section>

  <img class="elp-band" src="${photo(BAND, BAND.n, 1600)}" alt="${esc(BAND.alt)}" loading="lazy" decoding="async">

  <section class="elp-sec elp-alt elp-reviews" aria-labelledby="elp-reviews-h">
    <div class="elp-in">
      <p class="elp-eyebrow">Reviews</p>
      <h2 class="elp-h2" id="elp-reviews-h">What homeowners say on Google</h2>
      <div class="elp-summary" hidden></div>
    </div>
    <div class="elp-track elp-rtrack" aria-label="Google reviews" role="region">
      <div class="elp-skel"></div><div class="elp-skel"></div><div class="elp-skel"></div>
    </div>
    <div class="elp-in">
      <p class="elp-attr" hidden>Reviews from Google Maps</p>
      <a class="elp-btn elp-btn-3 elp-glink" href="${GOOGLE_LISTING}" target="_blank" rel="noopener">Read all our Google reviews</a>
    </div>
  </section>

  <section class="elp-sec" aria-labelledby="elp-process-h">
    <div class="elp-in">
      <p class="elp-eyebrow">How it works</p>
      <h2 class="elp-h2" id="elp-process-h">From first walkthrough to finished yard</h2>
      <ol class="elp-steps">${STEPS.map(([h, p], i) => `<li class="elp-step"><span>${nn(i + 1)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
      <a class="elp-plink" href="${DESIGN_URL}">See our full design process</a>
    </div>
  </section>

  <section class="elp-sec elp-close">
    <div class="elp-in">
      <h2 class="elp-h2">Start with a design consultation</h2>
      <p class="elp-sub">Walk your property with one of our designers and talk through what you want. The consultation is free. If you move forward, the design fee is set during that visit, based on the project scope and the size of the property.</p>
      <div class="elp-cta">
        <a class="elp-btn elp-btn-1" href="${CTA_URL}" data-cta="close">Book a design consultation</a>
        <a class="elp-btn elp-btn-2" href="${PHONE_HREF}" data-tel="close">Call ${PHONE_TEXT}</a>
      </div>
      <p class="elp-area">Serving Monmouth and Ocean counties, NJ</p>
    </div>
  </section>

</div>`;
}

function reviewsHtml(data) {
    return data.reviews.map((r) => {
        const photo = safeUrl(r.photo);
        const who = safeUrl(r.authorUrl);
        const name = esc(r.author || 'Google user');
        return `<article class="elp-review">
      <div class="elp-who">
        ${photo ? `<img src="${photo}" alt="" loading="lazy" referrerpolicy="no-referrer" width="42" height="42">` : `<span class="elp-avatar" aria-hidden="true">${esc((r.author || 'G').charAt(0))}</span>`}
        <div>${who ? `<a href="${who}" target="_blank" rel="noopener">${name}</a>` : `<strong>${name}</strong>`}
          <div class="elp-when">${esc(r.when || '')}</div></div>
      </div>
      ${stars(r.rating)}
      <p class="elp-rtext">${esc(r.text)}</p>
      <button class="elp-rmore" type="button" hidden>Read more</button>
    </article>`;
    }).join('');
}

/* ------------------------------------------------------------------ *
 * Element
 * ------------------------------------------------------------------ */
class LandscapeProjectsPage extends HTMLElement {
    static get observedAttributes() { return ['reviews']; }

    connectedCallback() {
        if (this._mounted) return;   // Wix may re-attach on resize; render once.
        this._mounted = true;

        this._base = (this.getAttribute('asset-base') || CDN).replace(/\/$/, '');
        this._loadFont();
        this.innerHTML = `<style>${STYLES}</style>${template(this._base)}`;
        this._root = this.querySelector('.elp-root');

        this._mountPortal();
        this._wireTracking();
        this._wireCarousel();
        this._wireVideos();
        this._wireViewer();
        this._wireStickyBar();

        this._renderReviews(this.getAttribute('reviews'));
        // Page code sets `reviews` within a second or two. If it never does
        // (API down, key missing, element previewed on its own), fall back to
        // the link rather than leaving skeletons up.
        this._reviewTimer = setTimeout(() => { if (!this._reviewsDone) this._renderReviews('{"error":true}'); }, 8000);

        this._fitToViewport();
        this._watchViewport();
    }

    disconnectedCallback() {
        if (this._onResize) window.removeEventListener('resize', this._onResize);
        if (this._onKey) document.removeEventListener('keydown', this._onKey);
        [this._ro, this._vio, this._pio, this._bio].forEach((o) => o && o.disconnect());
        clearTimeout(this._reviewTimer);
        if (this._portal) this._portal.remove();
        this._mounted = false;
    }

    attributeChangedCallback(name, _old, value) {
        if (name === 'reviews' && this._root) this._renderReviews(value);
    }

    _loadFont() {
        if (document.querySelector('link[data-elp-font]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = FONT_HREF;
        link.dataset.elpFont = '';
        document.head.appendChild(link);
    }

    /* ---------------- Tracking ---------------- */

    _wireTracking() {
        const handler = (e) => {
            const a = e.target.closest('a[data-cta],a[data-tel]');
            if (!a) return;
            if (a.dataset.cta) track('consultation_cta_click', { cta_position: a.dataset.cta, page_path: '/landscape-design-projects' });
            else track('phone_click', { cta_position: a.dataset.tel, page_path: '/landscape-design-projects' });
        };
        this._root.addEventListener('click', handler);
        this._handler = handler;
    }

    /* ---------------- Carousel ---------------- */

    _wireCarousel() {
        const track = this.querySelector('.elp-ptrack');
        const cards = [...track.querySelectorAll('.elp-card')];
        const count = this.querySelector('.elp-count');
        const dots = [...this.querySelectorAll('.elp-dots button')];
        const [prev, next] = this.querySelectorAll('.elp-arrow');
        this._track = track;

        const go = (i) => {
            const card = cards[Math.max(0, Math.min(cards.length - 1, i))];
            track.scrollTo({ left: card.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).scrollPaddingLeft || 0), behavior: 'smooth' });
        };
        const current = () => {
            const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft || 0);
            let best = 0; let dist = Infinity;
            cards.forEach((c, i) => {
                const d = Math.abs(c.offsetLeft - track.offsetLeft - pad - track.scrollLeft);
                if (d < dist) { dist = d; best = i; }
            });
            return best;
        };
        const update = () => {
            const i = current();
            count.textContent = `${i + 1} / ${cards.length}`;
            dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
            const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
            prev.disabled = track.scrollLeft < 4;
            next.disabled = atEnd;
        };

        prev.addEventListener('click', () => go(current() - 1));
        next.addEventListener('click', () => go(current() + 1));
        dots.forEach((d) => d.addEventListener('click', () => go(Number(d.dataset.i))));
        track.addEventListener('keydown', (e) => {
            if (e.target !== track) return;
            if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
        });
        let raf = null;
        track.addEventListener('scroll', () => {
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        }, { passive: true });
        update();
    }

    /* ---------------- Videos ---------------- */

    /**
     * Play a highlight only while most of it is on screen, pause it otherwise.
     * One video decoding at a time keeps phones cool and the page smooth.
     * Reduced-motion visitors get the poster and a play button, never autoplay.
     */
    _wireVideos() {
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const setBtn = (btn, playing) => {
            btn.innerHTML = playing ? ICON.pause : ICON.play;
            btn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
        };

        this.querySelectorAll('.elp-media').forEach((m) => {
            const v = m.querySelector('video');
            const btn = m.querySelector('.elp-vbtn');
            v.muted = true;
            setBtn(btn, false);
            btn.addEventListener('click', () => {
                if (v.paused) { v._userPaused = false; v.play().catch(() => {}); } else { v._userPaused = true; v.pause(); }
            });
            v.addEventListener('play', () => setBtn(btn, true));
            v.addEventListener('pause', () => setBtn(btn, false));
        });

        if (reduce || typeof IntersectionObserver === 'undefined') return;

        this._vio = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                const v = en.target;
                if (en.intersectionRatio >= 0.6) {
                    if (!v._userPaused) v.play().catch(() => {});
                } else if (!v.paused) {
                    v.pause();
                }
            });
        }, { threshold: [0, 0.6, 1] });
        this.querySelectorAll('.elp-media video').forEach((v) => this._vio.observe(v));
    }

    /** The observer only fires on change, so after the viewer closes, restart
     *  whichever highlight is still on screen. */
    _resumeVisible() {
        if (!this._vio) return;
        const vh = window.innerHeight; const vw = document.documentElement.clientWidth;
        this.querySelectorAll('.elp-media video').forEach((v) => {
            const r = v.getBoundingClientRect();
            const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
            const h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
            if (r.width && r.height && (w * h) / (r.width * r.height) >= 0.6 && !v._userPaused) v.play().catch(() => {});
        });
    }

    /* ---------------- Portal: sticky bar + viewer ---------------- */

    /**
     * Anything `position: fixed` goes on <body>. Wix wraps a custom element in
     * containers that can carry transforms, and a transformed ancestor turns
     * `fixed` into `absolute`. The element's <style> is light DOM, so the
     * rules still apply out there.
     */
    _mountPortal() {
        const portal = document.createElement('div');
        portal.className = 'elp-portal';
        portal.innerHTML = `
      <div class="elp-bar" aria-hidden="true">
        <a class="elp-btn elp-btn-1" href="${CTA_URL}" data-cta="sticky" tabindex="-1">Book a consultation</a>
        <a class="elp-btn elp-btn-3 elp-bar-call" href="${PHONE_HREF}" data-tel="sticky" aria-label="Call ${PHONE_TEXT}" tabindex="-1">${ICON.phone}</a>
      </div>
      <div class="elp-viewer" role="dialog" aria-modal="true" aria-label="Project photos" hidden>
        <div class="elp-vtop"><div class="elp-vtitle"><span class="elp-vname"></span><span class="elp-vcount"></span></div>
          <button class="elp-vclose" type="button" aria-label="Close photos">${ICON.close}</button></div>
        <div class="elp-vtrack"></div>
        <p class="elp-alt-text"></p>
        <button class="elp-vprev" type="button" aria-label="Previous photo">${ICON.prev}</button>
        <button class="elp-vnext" type="button" aria-label="Next photo">${ICON.next}</button>
      </div>`;
        document.body.appendChild(portal);
        this._portal = portal;
        portal.addEventListener('click', (e) => this._handler && this._handler(e));
    }

    _wireStickyBar() {
        const bar = this._portal.querySelector('.elp-bar');
        const hero = this.querySelector('.elp-hero');
        const close = this.querySelector('.elp-close');
        if (typeof IntersectionObserver === 'undefined') return;

        const state = { hero: true, close: false };
        const apply = () => {
            const show = !state.hero && !state.close;
            bar.classList.toggle('show', show);
            bar.setAttribute('aria-hidden', String(!show));
            bar.querySelectorAll('a').forEach((a) => a.setAttribute('tabindex', show ? '0' : '-1'));
        };
        this._bio = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.target === hero) state.hero = en.isIntersecting;
                if (en.target === close) state.close = en.isIntersecting;
            });
            apply();
        });
        this._bio.observe(hero);
        this._bio.observe(close);
    }

    _wireViewer() {
        const viewer = this._portal.querySelector('.elp-viewer');
        const vtrack = viewer.querySelector('.elp-vtrack');
        const name = viewer.querySelector('.elp-vname');
        const vcount = viewer.querySelector('.elp-vcount');
        const altText = viewer.querySelector('.elp-alt-text');
        let project = null; let opener = null; let saved = null;

        const index = () => Math.round(vtrack.scrollLeft / Math.max(1, vtrack.clientWidth));
        const sync = () => {
            if (!project) return;
            const i = index();
            vcount.textContent = ` ${i + 1} / ${project.photos.length}`;
            altText.textContent = project.photos[i] ? project.photos[i][1] : '';
        };
        const goTo = (i, smooth) => {
            const n = Math.max(0, Math.min(project.photos.length - 1, i));
            vtrack.scrollTo({ left: n * vtrack.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
        };

        const open = (p, k, btn) => {
            project = PROJECTS[p];
            opener = btn;
            name.textContent = project.title;
            vtrack.innerHTML = project.photos.map(([n, alt]) => {
                const s = (w) => `${this._base}/img/projects/${project.slug}/${nn(n)}-${w}.webp?${V}`;
                return `<div class="elp-slide"><img src="${s(1600)}" srcset="${s(800)} 800w, ${s(1600)} 1600w" sizes="100vw" alt="${esc(alt)}" decoding="async"></div>`;
            }).join('');
            this.querySelectorAll('.elp-media video').forEach((v) => v.pause());
            viewer.hidden = false;
            saved = scrollState();
            requestAnimationFrame(() => {
                goTo(k, false);
                sync();
                // preventScroll: focusing must never move the page underneath.
                viewer.querySelector('.elp-vclose').focus({ preventScroll: true });
            });
        };
        const shut = () => {
            if (viewer.hidden) return;
            viewer.hidden = true;
            vtrack.innerHTML = '';
            if (opener) opener.focus({ preventScroll: true });
            restoreScroll(saved);
            project = null;
            this._resumeVisible();
        };

        /*
         * Scroll lock WITHOUT touching `overflow`. On Wix the scrolling box is
         * <body>, not the viewport: setting overflow:hidden on <html> stops
         * body's overflow propagating to the viewport, body becomes its own
         * scroller, and the page snaps to the top (measured on the live snow
         * page: scrollTop 1024 -> 0). So the page is left alone, vertical
         * gestures over the viewer are swallowed, and the position is put back
         * on close in case anything moved it.
         */
        const scrollers = () => [document.scrollingElement, document.body, document.documentElement].filter(Boolean);
        const scrollState = () => scrollers().map((el) => [el, el.scrollTop]);
        const restoreScroll = (state) => (state || []).forEach(([el, top]) => { if (el.scrollTop !== top) el.scrollTop = top; });

        viewer.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.preventDefault();
        }, { passive: false });
        let touch = null;
        viewer.addEventListener('touchstart', (e) => { touch = e.touches[0]; }, { passive: true });
        viewer.addEventListener('touchmove', (e) => {
            if (!touch) return;
            const t = e.touches[0];
            if (Math.abs(t.clientY - touch.clientY) > Math.abs(t.clientX - touch.clientX)) e.preventDefault();
        }, { passive: false });

        this.querySelector('.elp-ptrack').addEventListener('click', (e) => {
            const t = e.target.closest('.elp-thumb');
            if (t) open(Number(t.dataset.p), Number(t.dataset.k), t);
        });
        viewer.querySelector('.elp-vclose').addEventListener('click', shut);
        viewer.querySelector('.elp-vprev').addEventListener('click', () => goTo(index() - 1, true));
        viewer.querySelector('.elp-vnext').addEventListener('click', () => goTo(index() + 1, true));
        vtrack.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });

        this._onKey = (e) => {
            if (viewer.hidden) return;
            if (e.key === 'Escape') { e.preventDefault(); shut(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index() + 1, true); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index() - 1, true); }
            if (e.key === 'Tab') {
                // Keep focus inside the dialog.
                const f = [...viewer.querySelectorAll('button')].filter((b) => b.offsetParent !== null);
                const first = f[0]; const last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', this._onKey);
    }

    /* ---------------- Reviews ---------------- */

    _renderReviews(raw) {
        if (!raw || !this._root) return;
        let data;
        try { data = JSON.parse(raw); } catch (e) { data = { error: true }; }

        const track = this.querySelector('.elp-rtrack');
        const summary = this.querySelector('.elp-summary');
        const attr = this.querySelector('.elp-attr');
        this._reviewsDone = true;
        clearTimeout(this._reviewTimer);

        const ok = data && !data.error && Array.isArray(data.reviews) && data.reviews.length > 0;
        if (!ok) {
            // Failure mode (SPEC-002): the link only. No skeletons, no stand-ins.
            track.remove();
            summary.hidden = true;
            attr.hidden = true;
            this._fitToViewport();
            return;
        }

        if (data.rating) {
            summary.innerHTML = `<strong>${esc(Number(data.rating).toFixed(1))}</strong>${stars(data.rating)}<span>${
                data.count ? `${esc(Number(data.count).toLocaleString('en-US'))} Google reviews` : 'on Google'}</span>`;
            summary.hidden = false;
        }
        track.innerHTML = reviewsHtml(data);
        attr.hidden = false;

        // Offer "Read more" only where the clamp actually cut text off.
        requestAnimationFrame(() => {
            track.querySelectorAll('.elp-review').forEach((card) => {
                const text = card.querySelector('.elp-rtext');
                const more = card.querySelector('.elp-rmore');
                if (text.scrollHeight > text.clientHeight + 2) {
                    more.hidden = false;
                    more.addEventListener('click', () => {
                        const open = card.classList.toggle('open');
                        more.textContent = open ? 'Show less' : 'Read more';
                        this._fitToViewport();
                    });
                }
            });
            this._fitToViewport();
        });
    }

    /* ---------------- Wix host fitting ----------------
     * Same three corrections as the snow page, for the same measured reasons
     * (see commercialSnowPage.js for the full notes): pull the content to the
     * real viewport width, close the gap Wix leaves above the element, and make
     * the host exactly as tall as the content. Copied rather than imported
     * because a custom element ships as one self-contained file.
     */

    _fitToViewport() {
        const root = this._root;
        if (!root) return;

        root.style.marginLeft = '0px';
        root.style.width = 'auto';
        root.style.marginTop = '0px';

        const hostLeft = this.getBoundingClientRect().left;
        const viewport = document.documentElement.clientWidth;

        if (Math.abs(hostLeft) > 1 || Math.abs(this.getBoundingClientRect().width - viewport) > 1) {
            root.style.marginLeft = `${-hostLeft}px`;
            root.style.width = `${viewport}px`;
        }

        this._closeTopGap(root);
        this._syncHeight(root);
    }

    _closeTopGap(root) {
        const section = this.closest('section');
        if (!section) return;
        const gap = Math.round(this.getBoundingClientRect().top - section.getBoundingClientRect().top);
        if (gap > 0 && gap <= 80) root.style.marginTop = `${-gap}px`;
    }

    _syncHeight(root) {
        const contentHeight = Math.ceil(root.getBoundingClientRect().height);
        if (!contentHeight) return;

        const set = (el) => {
            if (!el) return;
            if (Math.abs(el.getBoundingClientRect().height - contentHeight) > 2) {
                el.style.setProperty('height', `${contentHeight}px`, 'important');
                el.style.setProperty('min-height', '0', 'important');
            }
        };

        set(this);
        let node = this.parentElement;
        for (let depth = 0; node && depth < 4; depth += 1) {
            if (node.getBoundingClientRect().height > contentHeight + 2) set(node);
            if (node.tagName === 'SECTION') break;
            node = node.parentElement;
        }
    }

    _watchViewport() {
        let frame = null;
        this._onResize = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => this._fitToViewport());
        };
        window.addEventListener('resize', this._onResize);
        if (typeof ResizeObserver !== 'undefined') {
            this._ro = new ResizeObserver(this._onResize);
            this._ro.observe(this);
        }
    }
}

if (!customElements.get('landscape-projects-page')) {
    customElements.define('landscape-projects-page', LandscapeProjectsPage);
}
}
