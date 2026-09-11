/**
 * <commercial-snow-page> — the full /commercial-snow-and-ice-removal landing page.
 *
 * SPEC-001. Mike chose the custom-element route (2026-09-07) so the page is
 * built in code rather than assembled in the Wix Editor.
 *
 * HOW IT IS PLACED
 *   Wix Editor > Add Elements > Embed Code > Custom Element
 *     Tag name:  commercial-snow-page
 *     Source:    this file, from the site's Public files
 *   One element on an otherwise blank page. Stretch it full width.
 *
 * WHY LIGHT DOM, NOT SHADOW DOM
 *   Shadow DOM would give free style isolation, but it puts the page's entire
 *   body copy behind a shadow boundary. Client-side rendering is already the
 *   SEO cost of this approach; a shadow boundary compounds it. So this renders
 *   into the light DOM and every class is namespaced `esn-` instead, which
 *   keeps Wix's own stylesheet from colliding with it.
 *
 * BRANDING
 *   Every colour and font is a CSS custom property in TOKENS below. That is the
 *   one place to change the look. Nothing downstream hardcodes a colour.
 *
 * COPY
 *   Source of truth is .ai/content/commercial-snow-ice-page.md. Text here must
 *   stay in sync with it, and with the FAQPage schema in the SEO panel.
 *   Unverified claims are absent by design, not softened. See
 *   data/earthscapes-facts.md.
 */

/* ------------------------------------------------------------------ *
 * Design tokens. Change branding here and nowhere else.
 * ------------------------------------------------------------------ */
const TOKENS = `
  --esn-ink:        #10181D;
  --esn-ink-soft:   #475A66;
  --esn-ink-mute:   #6F8390;
  --esn-ground:     #FFFFFF;
  --esn-ground-alt: #F1F5F7;
  --esn-ground-deep:#0F1A20;
  --esn-line:       #D8E1E7;
  --esn-line-deep:  #2A3A44;
  --esn-accent:     #1F6F4A;
  --esn-accent-ink: #FFFFFF;
  --esn-beacon:     #C87A16;
  --esn-radius:     4px;
  --esn-measure:    64ch;
  --esn-display:    "Archivo", "Helvetica Neue", Arial, sans-serif;
  --esn-body:       -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

/* ------------------------------------------------------------------ *
 * Content. Kept as data so the markup builder stays declarative and
 * a copy change never means touching layout code.
 * ------------------------------------------------------------------ */

/**
 * Imagery.
 *
 * Real photographs, all **public domain**, sourced from Wikimedia Commons.
 * Public domain specifically, not CC-BY: a client's commercial site should not
 * carry an attribution obligation that nobody will remember to honour in three
 * years.
 *
 *   hero-lot.jpg     Winter Storm Juno 150127-F-UT482-065 (cropped to drop
 *                    aircraft on the left edge)
 *                    commons.wikimedia.org/wiki/File:Winter_Storm_Juno_150127-F-UT482-065.jpg
 *   snow-blower.jpg  Winter storm 160120-Z-PM441-066
 *                    commons.wikimedia.org/wiki/File:Winter_storm_160120-Z-PM441-066.jpg
 *   loader-lot.jpg   Naval Station Great Lakes snow removal 140129-N-DA320-047
 *                    commons.wikimedia.org/wiki/File:Naval_Station_Great_Lakes_snow_removal_140129-N-DA320-047.jpg
 *
 * These replaced AI-generated placeholders. Alt text describes the scene and
 * does not claim the work as EarthScapes' own — it is not. Swap for Nick's real
 * property photos when they arrive and bump the `?v=` below; a real photo of a
 * real Monmouth or Ocean County lot beats any of this, because the buyer is
 * specifically working out whether this contractor is real.
 *
 * Served from GitHub Pages, NOT jsDelivr. jsDelivr caches a branch URL for up
 * to 12 hours and its purge endpoint did not reliably clear the branch-to-commit
 * resolution, so an updated file kept serving stale. Pages honours normal cache
 * headers and goes live within a minute of a push.
 */
const CDN = 'https://nick-baughman.github.io/earthscapes-assets/img';

/**
 * Every CTA points at the site's existing consultation page.
 *
 * Mike, 2026-09-07: that is the flow EarthScapes actually works, so the page
 * hands off rather than running a second, competing intake.
 */
const CTA_URL = 'https://www.earthscapesnj.com/consultation';

const IMAGES = {
    hero: {
        src: `${CDN}/hero-lot.jpg?v=2`,
        alt: 'A compact loader clearing snow from the parking area of a commercial office building during a storm',
    },
    plow: {
        src: `${CDN}/snow-blower.jpg?v=2`,
        alt: 'A skid steer with a snow blower attachment clearing accumulation alongside a commercial building',
    },
    entrance: {
        src: `${CDN}/loader-lot.jpg?v=2`,
        alt: 'A wheel loader with a pusher box clearing snow on a commercial property access road',
    },
};

const TRUST = [
    'Fully licensed and insured',
    '24/7 storm monitoring',
    'Time-stamped photo documentation',
    'Storm totals on every invoice',
    'Large parking lots to small sidewalks',
];

/**
 * Property-type icons.
 *
 * Inline SVG rather than an icon font or a sprite: this element ships as one
 * file with no build step and no second request, and `currentColor` means each
 * icon inherits the accent without a second copy per theme.
 *
 * All drawn on a 24x24 box with the same 1.6 stroke so they read as one set.
 */
const ICONS = {
    retail: '<path d="M3 9.5 4.6 4h14.8L21 9.5M3 9.5h18M3 9.5v10.5h18V9.5M3 9.5a2.4 2.4 0 0 0 4.5 0 2.4 2.4 0 0 0 4.5 0 2.4 2.4 0 0 0 4.5 0 2.4 2.4 0 0 0 4.5 0M9.5 20V14h5v6"/>',
    office: '<path d="M4 21V4.5A1.5 1.5 0 0 1 5.5 3h8A1.5 1.5 0 0 1 15 4.5V21M15 21V10h4.5A1.5 1.5 0 0 1 21 11.5V21M2.5 21h19M7 7h2M10.5 7h1M7 11h2M10.5 11h1M7 15h2M10.5 15h1M18 14h1M18 17.5h1"/>',
    industrial: '<path d="M2.5 21V11l6 3.5V11l6 3.5V7l7 4v10M2.5 21h19M6 21v-3.5h3V21M13 21v-3.5h3V21"/>',
    hoa: '<path d="M2.5 11 8 6.5 13.5 11M4 10v11h8V10M13.5 21h7V13l-3.5-3-3.5 3M16 21v-4h2.5v4M6.5 14h3v3h-3z"/>',
    medical: '<path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5V21M2.5 21h19M12 7.5v6M9 10.5h6M8 21v-4h8v4"/>',
    municipal: '<path d="M12 3 2.5 8.5h19L12 3ZM4.5 11v7M9 11v7M15 11v7M19.5 11v7M2.5 18h19M2 21h20"/>',
};

/** [icon key, heading, body] */
const PROPERTIES = [
    ['retail', 'Retail and shopping centers', 'Storefront access and customer parking cleared before open of business, with entryways and walkways treated separately from drive lanes.'],
    ['office', 'Office parks and campuses', 'Multi-building coordination with prioritized access routes, so main entrances and ADA spaces clear first.'],
    ['industrial', 'Industrial and warehouse', 'Loading dock access, truck court clearing, and turning radius maintained for freight that cannot wait out a storm.'],
    ['hoa', 'HOAs and communities', 'Roadways, common areas, and shared parking on a schedule your board can hand to residents.'],
    ['medical', 'Medical and professional', 'Priority-tier service for properties where patients and staff cannot be turned away.'],
    ['municipal', 'Municipal and institutional', 'Contract snow services for facilities with fixed operating obligations.'],
];

const SERVICES = [
    ['Snow plowing and clearing', 'Drive lanes, parking areas, and access routes cleared to pavement. Service triggers at the accumulation depth set in your contract, along with the application terms for the season.'],
    ['Ice management', 'De-icing during and after events to manage the refreeze cycle that follows most storms.'],
    ['Sidewalk and entryway clearing', 'Walkways, building entrances, ADA-accessible routes, and stair access, handled as a distinct scope rather than an afterthought to the plowing. Properties range from large parking lots to small sidewalks.'],
    ['Snow relocation and stacking', 'Managed stacking to designated areas that preserve your parking count and sightlines.'],
    ['Storm monitoring', 'We watch the forecast so you are not the one calling. Monitoring runs 24/7 through the season with weather service updates, and crews move on your contract terms.'],
    ['Equipment matched to the site', 'Equipment is assigned to what the property actually needs rather than what happens to be on the truck.'],
    ['Post-storm cleanup', 'Return visits for melt-and-refreeze cycles, cleanup after plow banks settle, and lot detail once the event closes out.'],
];

const SEASON = [
    ['Site assessment', 'We walk your property before the season and map it. Priority zones, stacking areas, drainage, obstacles, ADA routes, and anything that needs flagging before it is buried under snow.'],
    ['Your site plan', 'You get a site-specific plan documenting trigger terms, service sequence, materials, and contacts. Everyone knows what happens before the first flake falls.'],
    ['Storm monitoring and dispatch', 'We track incoming systems through the season. Crews move on your contract terms, not on your phone call.'],
    ['Service and documentation', 'Site inspections produce detailed reports and time-stamped photos, and every invoice carries the storm total. You get the record whether or not you ever need it.'],
    ['Season close-out', 'Post-season walkthrough for any turf, curb, or hardscape damage, plus planning for next year.'],
];

const CONTRACTS = [
    ['Seasonal', 'A fixed price for the season, with minimum and maximum inches and applications written into the contract. Predictable for budgeting, and it moves weather risk off your budget and onto ours. Most common for properties that need budget certainty.'],
    ['Per-event', 'Billed by storm, based on accumulation. Lower commitment in a light winter, higher exposure in a heavy one.'],
    ['Time and materials', 'Billed by hours and materials applied. Typically used for irregular properties or supplemental work outside a primary contract.'],
];

/**
 * Must stay word-for-word identical to the FAQPage JSON-LD in the SEO panel.
 * Schema that does not match rendered text is a violation, and worse than none.
 */
const FAQS = [
    ['When should we lock in a commercial snow contract?', 'Late summer through October. Capacity fills before the season starts, and properties that wait until the first forecast are usually choosing from whoever is left.'],
    ['What is the trigger depth?', 'It is set in your contract, along with minimum and maximum inches and applications for the season. Properties with heavier foot traffic or medical use often run a lower trigger than a standard lot.'],
    ['How do you decide when to deploy?', 'Storm monitoring runs 24/7 through the season with weather service updates. Crews move on your contract terms rather than waiting for a call from you.'],
    ['Do you handle sidewalks and entrances?', 'Yes, as a scope separate from plowing. Walkways, entrances, ADA routes, and stairs are cleared and treated.'],
    ['What happens if snow stacks fill our parking?', 'Stacking areas are designated during the site assessment to protect your parking count and sightlines.'],
    ['Are you insured?', 'EarthScapes is fully licensed and insured. Certificates naming your property as additional insured are provided at signing.'],
    ['Can you service multiple properties under one contract?', 'Yes. Each site gets its own plan and its own documentation, coordinated through one point of contact, with reporting in a consistent format across the portfolio.'],
    ['We have a scope of work already. Can you price against it?', 'Send it over. We will price against your scope and tell you where we can meet it and where we would propose something different.'],
];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** Escape text bound for innerHTML. All copy above is ours, but the habit
 *  matters: the moment one string comes from a CMS this is what saves us. */
function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const pairRows = (pairs, cls) => pairs
    .map(([h, p]) => `<div class="${cls}"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`)
    .join('');

/* ------------------------------------------------------------------ *
 * Styles
 * ------------------------------------------------------------------ */
const STYLES = `
.esn-root{${TOKENS}
  font-family:var(--esn-body);color:var(--esn-ink);background:var(--esn-ground);
  line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased;}
.esn-root{box-sizing:border-box;}
.esn-root *,.esn-root *::before,.esn-root *::after{box-sizing:border-box;}
.esn-root h1,.esn-root h2,.esn-root h3{font-family:var(--esn-display);line-height:1.12;margin:0;text-wrap:balance;font-weight:700;}
.esn-root p{margin:0;max-width:var(--esn-measure);}
.esn-sec{padding:72px 24px;}
.esn-in{max-width:1080px;margin:0 auto;}
.esn-alt{background:var(--esn-ground-alt);}
.esn-deep{background:var(--esn-ground-deep);color:#E6EDF1;}
.esn-deep h2,.esn-deep h3{color:#fff;}
.esn-deep p{color:#B6C6D0;}
.esn-deep .esn-row{border-color:var(--esn-line-deep);}

.esn-h1{font-size:clamp(2rem,5vw,3.4rem);letter-spacing:-.025em;max-width:18ch;}
.esn-h2{font-size:clamp(1.6rem,3.2vw,2.4rem);letter-spacing:-.02em;margin-bottom:22px;}
.esn-h3{font-size:1.05rem;margin-bottom:6px;}
.esn-lead{font-size:1.2rem;color:var(--esn-ink-soft);margin-top:18px;}
.esn-p{color:var(--esn-ink-soft);margin-top:14px;}

/* Hero sits on a photograph, so it carries its own light-on-dark palette
   rather than inheriting the page's dark-on-light one. */
.esn-hero{position:relative;padding:120px 24px 104px;overflow:hidden;background:var(--esn-ground-deep);}
.esn-hero-bg{position:absolute;inset:0;background-size:cover;background-position:center 62%;}
/* Scrim, not a flat tint: the text side needs contrast, the right side can
   keep the photograph legible. Without this the white type sits on snow. */
.esn-hero-scrim{position:absolute;inset:0;
  background:linear-gradient(100deg,rgba(9,16,20,.92) 0%,rgba(9,16,20,.82) 38%,rgba(9,16,20,.45) 72%,rgba(9,16,20,.3) 100%);}
.esn-hero .esn-in{position:relative;}
.esn-hero h1{color:#fff;}
.esn-hero .esn-lead{max-width:36ch;font-size:1.3rem;color:#D3E0E7;}
.esn-hero .esn-btn-2{color:#fff;border-color:rgba(255,255,255,.42);}
.esn-hero .esn-btn-2:hover{background:rgba(255,255,255,.08);}

/* Full-bleed photograph band. Height is capped in vh so it never eats the
   screen on a phone, and the aspect ratio floor stops it collapsing to a
   letterbox slit on very wide viewports. */
.esn-band{position:relative;height:clamp(220px,38vh,420px);background-size:cover;background-position:center 38%;}

/* The deep section keeps its dark ground and takes the photograph underneath
   at low opacity, so the type contrast is unchanged from the no-image build. */
.esn-deep{position:relative;overflow:hidden;}
.esn-deep-bg{position:absolute;inset:0;background-size:cover;background-position:center 45%;opacity:.42;}
.esn-deep-scrim{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,26,32,.95) 0%,rgba(15,26,32,.88) 46%,rgba(15,26,32,.55) 100%);}
.esn-deep .esn-in{position:relative;}
.esn-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px;}
.esn-btn{font-family:var(--esn-display);font-weight:600;font-size:1rem;padding:14px 26px;
  border-radius:var(--esn-radius);border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-block;}
.esn-btn-1{background:var(--esn-accent);color:var(--esn-accent-ink);}
.esn-btn-2{background:transparent;color:var(--esn-ink);border-color:var(--esn-line);}
.esn-deep .esn-btn-2{color:#fff;border-color:var(--esn-line-deep);}
.esn-btn:hover{opacity:.9;}

.esn-trust{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;
  border-top:1px solid var(--esn-line);border-bottom:1px solid var(--esn-line);background:var(--esn-ground-alt);}
.esn-trust li{flex:1 1 210px;min-width:0;padding:16px 20px;font-size:.87rem;font-weight:600;color:var(--esn-ink-soft);
  border-right:1px solid var(--esn-line);display:flex;align-items:center;gap:9px;font-family:var(--esn-display);}
.esn-trust li:last-child{border-right:none;}
.esn-trust li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--esn-accent);flex:none;}

.esn-grid{display:grid;gap:1px;background:var(--esn-line);border:1px solid var(--esn-line);
  border-radius:var(--esn-radius);overflow:hidden;margin-top:8px;
  /* Explicit counts, not auto-fit. There are exactly 6 cards, and auto-fit
     resolved to 4 columns at desktop width, stranding two dead cells that
     showed the grid's own background. Every count below divides 6 evenly. */
  grid-template-columns:repeat(3,1fr);}
@media(max-width:900px){.esn-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.esn-grid{grid-template-columns:1fr;}}
.esn-cell{background:var(--esn-ground);padding:24px;}
.esn-cell p{font-size:.92rem;color:var(--esn-ink-soft);}

/* Property cards: icon above heading, so the six read as a set at a glance
   rather than as six paragraphs. */
.esn-ico{display:block;width:26px;height:26px;color:var(--esn-accent);margin-bottom:12px;}
.esn-ico svg{width:100%;height:100%;display:block;}

/* Services and contracts: two columns instead of full-width rows. Full-width
   rows left a wide ragged gutter on the right, because the copy is much
   shorter than the measure. Two columns fill the space and the last row of an
   odd count sits left-aligned rather than stranded. */
.esn-svc{display:grid;grid-template-columns:repeat(2,1fr);gap:2px 40px;}
.esn-svc-item{padding:20px 0;border-bottom:1px solid var(--esn-line);}
.esn-svc-item p{font-size:.95rem;color:var(--esn-ink-soft);}
@media(max-width:760px){.esn-svc{grid-template-columns:1fr;gap:0;}}

/* Closing CTA gets the deep ground so the page ends on a clear call rather
   than trailing off into another pale band. */
.esn-close{background:var(--esn-ground-deep);}
.esn-close h2{color:#fff;}
.esn-close .esn-lead{color:#B6C6D0;}
.esn-close .esn-btn-2{color:#fff;border-color:var(--esn-line-deep);}

.esn-row{padding:22px 0;border-bottom:1px solid var(--esn-line);}
.esn-row:last-child{border-bottom:none;}
.esn-row p{font-size:.95rem;color:var(--esn-ink-soft);}

.esn-steps{list-style:none;padding:0;margin:0;}
.esn-step{display:grid;grid-template-columns:52px minmax(0,1fr);gap:18px;padding:20px 0;border-bottom:1px solid var(--esn-line);}
.esn-step:last-child{border-bottom:none;}
.esn-num{font-family:var(--esn-display);font-weight:700;color:var(--esn-accent);font-size:1.1rem;padding-top:2px;}
.esn-step p{font-size:.95rem;color:var(--esn-ink-soft);}

.esn-faq details{border-bottom:1px solid var(--esn-line);}
.esn-faq summary{font-family:var(--esn-display);font-weight:600;font-size:1.02rem;padding:18px 0;cursor:pointer;list-style:none;
  display:flex;justify-content:space-between;gap:16px;align-items:baseline;}
.esn-faq summary::-webkit-details-marker{display:none;}
.esn-faq summary::after{content:"+";color:var(--esn-accent);font-size:1.3rem;line-height:1;flex:none;}
.esn-faq details[open] summary::after{content:"\\2013";}
.esn-faq .esn-a{padding:0 0 20px;font-size:.95rem;color:var(--esn-ink-soft);}


@media(max-width:640px){
  .esn-sec{padding:52px 20px;}
  .esn-hero{padding:60px 20px 48px;}
  .esn-trust li{flex:1 1 100%;border-right:none;border-bottom:1px solid var(--esn-line);}
  .esn-trust li:last-child{border-bottom:none;}
}
@media(prefers-reduced-motion:reduce){.esn-root *{transition:none!important;animation:none!important;}}
`;

/* ------------------------------------------------------------------ *
 * Markup
 * ------------------------------------------------------------------ */
function template() {
    return `
<style>${STYLES}</style>
<div class="esn-root">

  <section class="esn-hero">
    <div class="esn-hero-bg" style="background-image:url('${IMAGES.hero.src}')" role="img" aria-label="${esc(IMAGES.hero.alt)}"></div>
    <div class="esn-hero-scrim"></div>
    <div class="esn-in">
      <h1 class="esn-h1">Commercial Snow &amp; Ice Management for New Jersey Properties</h1>
      <p class="esn-lead">When the storm hits, your lot needs to be open and your liability needs to be documented. We handle both.</p>
      <!-- One CTA only. Both hero buttons went to the same URL, so the second
           was a choice that wasn't a choice: it split attention and asked the
           visitor to categorise themselves before they had read anything. -->
      <div class="esn-cta">
        <a class="esn-btn esn-btn-1" href="${CTA_URL}">Request a Site Assessment</a>
      </div>
    </div>
  </section>

  <ul class="esn-trust">${TRUST.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">Properties we service</h2>
    <div class="esn-grid">${PROPERTIES.map(([icon, h, p]) => `<div class="esn-cell">
      <span class="esn-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</svg></span>
      <h3 class="esn-h3">${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div></section>

  <section class="esn-sec esn-alt"><div class="esn-in">
    <h2 class="esn-h2">What is included</h2>
    <div class="esn-svc">${SERVICES.map(([h, p]) => `<div class="esn-svc-item"><h3 class="esn-h3">${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div></section>

  <section class="esn-sec esn-deep">
    <div class="esn-deep-bg" style="background-image:url('${IMAGES.plow.src}')" role="img" aria-label="${esc(IMAGES.plow.alt)}"></div>
    <div class="esn-deep-scrim"></div>
    <div class="esn-in">
    <h2 class="esn-h2">The documentation matters as much as the plowing</h2>
    <p class="esn-lead" style="color:#C9D7DF">Slip-and-fall claims are usually filed long after the storm, and they turn on one question. Can you show what was done, and when?</p>
    <p class="esn-p">Site inspections produce detailed reports and time-stamped photos, and every invoice carries the storm total. The record is built as the season runs, not reconstructed after a letter arrives.</p>
    <p class="esn-p">EarthScapes is fully licensed and insured. Certificates naming your property as additional insured are provided at contract signing.</p>
  </div></section>

  <div class="esn-band" style="background-image:url('${IMAGES.entrance.src}')" role="img" aria-label="${esc(IMAGES.entrance.alt)}"></div>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">How the season runs</h2>
    <ol class="esn-steps">${SEASON.map(([h, p], i) => `<li class="esn-step"><span class="esn-num">0${i + 1}</span><div><h3 class="esn-h3">${esc(h)}</h3><p>${esc(p)}</p></div></li>`).join('')}</ol>
  </div></section>

  <section class="esn-sec esn-alt"><div class="esn-in">
    <h2 class="esn-h2">Contract structures</h2>
    <div class="esn-svc">${CONTRACTS.map(([h, p]) => `<div class="esn-svc-item"><h3 class="esn-h3">${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
    <p class="esn-p" style="margin-top:26px">We will tell you which one fits your property and your budget cycle rather than pushing whichever is better for us. For most multi-tenant commercial sites, seasonal wins on the budgeting alone.</p>
  </div></section>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">Where we work</h2>
    <p class="esn-lead">EarthScapes provides commercial snow and ice management across Monmouth and Ocean counties, New Jersey.</p>
    <p class="esn-p">Not sure whether your property is in range? Ask. If we cannot service your property well, we will say so.</p>
  </div></section>

  <section class="esn-sec esn-alt"><div class="esn-in">
    <h2 class="esn-h2">Common questions</h2>
    <div class="esn-faq">${FAQS.map(([q, a]) => `<details><summary>${esc(q)}</summary><p class="esn-a">${esc(a)}</p></details>`).join('')}</div>
  </div></section>

  <section class="esn-sec esn-close"><div class="esn-in">
    <h2 class="esn-h2">Get your property assessed before the season fills</h2>
    <p class="esn-lead">We take a limited number of commercial contracts so that every property gets serviced properly in a real storm. Site assessments are free, and the plan you get is yours whether or not you sign with us.</p>
    <div class="esn-cta">
      <a class="esn-btn esn-btn-1" href="${CTA_URL}">Request a Site Assessment</a>
      <a class="esn-btn esn-btn-2" href="tel:7324448575">Call 732-444-8575</a>
    </div>
  </div></section>

</div>`;
}

/* ------------------------------------------------------------------ *
 * Element
 * ------------------------------------------------------------------ */
class CommercialSnowPage extends HTMLElement {
    connectedCallback() {
        if (this._mounted) return;   // Wix may re-attach on resize; render once.
        this._mounted = true;
        this.innerHTML = template();
        this._fitToViewport();
        this._watchViewport();
    }

    disconnectedCallback() {
        if (this._onResize) window.removeEventListener('resize', this._onResize);
        if (this._ro) this._ro.disconnect();
    }

    /**
     * Break the content out to the real viewport width.
     *
     * Wix places a custom element inside a fixed-width container, so on a wide
     * monitor the page sits in a column with dead margins and on a narrow one
     * it gets clipped. Stretching the element in the Editor only ever picks one
     * width; it cannot track the viewport.
     *
     * So measure where the host actually sits and pull the content back to
     * x=0, then set the width to the viewport. This works regardless of how the
     * container is sized or aligned, which matters because we do not control
     * Wix's layout.
     *
     * `clientWidth` rather than `100vw` deliberately: `100vw` includes the
     * scrollbar and would cause a horizontal scroll on every desktop browser
     * that reserves gutter space.
     */
    _fitToViewport() {
        const root = this.querySelector('.esn-root');
        if (!root) return;

        // Reset before measuring, otherwise each resize compounds the offset
        // of the last one and the page walks off screen.
        root.style.marginLeft = '0px';
        root.style.width = 'auto';

        const hostLeft = this.getBoundingClientRect().left;
        const viewport = document.documentElement.clientWidth;

        // Only rewrite the horizontal fit when it actually moved. Height is
        // synced unconditionally below: an early return here previously
        // skipped it whenever the host already spanned the viewport, which is
        // the common case, so the height never got corrected at all.
        if (Math.abs(hostLeft) > 1 || Math.abs(this.getBoundingClientRect().width - viewport) > 1) {
            root.style.marginLeft = `${-hostLeft}px`;
            root.style.width = `${viewport}px`;
        }

        this._syncHeight(root);
    }

    /**
     * Make the host as tall as the content.
     *
     * Wix gives a custom element a fixed height set by dragging in the Editor.
     * The content's real height is not that number and changes with viewport
     * width, so the element either leaves dead space above the footer or clips
     * its own end. Neither is fixable by dragging, because there is no single
     * correct value.
     *
     * The ResizeObserver on the host re-enters here when this changes the
     * height. That settles rather than looping: the second pass measures the
     * same content height and the tolerance check below stops it writing again.
     */
    _syncHeight(root) {
        const contentHeight = Math.ceil(root.getBoundingClientRect().height);
        if (!contentHeight) return;

        const set = (el) => {
            if (!el) return;
            if (Math.abs(el.getBoundingClientRect().height - contentHeight) > 2) {
                // `important` because Wix sizes these from a generated
                // stylesheet keyed on the component id, which beats a plain
                // inline height.
                el.style.setProperty('height', `${contentHeight}px`, 'important');
                // min-height has to go too. Wix holds the dragged height there
                // as well, and a min-height floor silently wins over a smaller
                // height — the element kept measuring 7798px with an inline
                // `height: 5324px !important` already applied until this was
                // cleared.
                el.style.setProperty('min-height', '0', 'important');
            }
        };

        set(this);

        // Wix wraps the element in its own sized component div and then a
        // section. Both carry the height dragged in the Editor, so sizing only
        // the element leaves the same dead space one level up. Walk up while
        // the ancestor is still taller than the content, and stop at the
        // section so we never touch page-level layout.
        let node = this.parentElement;
        for (let depth = 0; node && depth < 4; depth += 1) {
            if (node.getBoundingClientRect().height > contentHeight + 2) set(node);
            if (node.tagName === 'SECTION') break;
            node = node.parentElement;
        }
    }

    /** Re-fit on resize and whenever Wix resizes the host itself. */
    _watchViewport() {
        let frame = null;
        this._onResize = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => this._fitToViewport());
        };
        window.addEventListener('resize', this._onResize);

        // Wix reflows its containers after our first paint (fonts, lazy
        // sections), so a one-time fit on connect is not enough.
        if (typeof ResizeObserver !== 'undefined') {
            this._ro = new ResizeObserver(this._onResize);
            this._ro.observe(this);
        }
    }

}

if (!customElements.get('commercial-snow-page')) {
    customElements.define('commercial-snow-page', CommercialSnowPage);
}
