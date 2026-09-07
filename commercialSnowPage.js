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
 * Form constants and validation.
 *
 * Deliberately inlined rather than imported from public/commercialSnowLead.js.
 * A custom element is loaded by Wix as a standalone browser script, not
 * through Velo's module resolver, so a `public/...` import can fail at load
 * and take the whole page down with it. A silent blank page is a far worse
 * outcome than this duplication.
 *
 * The duplication is bounded and intentional: the server re-validates every
 * lead independently in backend/commercialLeads.web.js, because these are two
 * different trust domains. Client validation is a courtesy to the visitor;
 * the backend's is the gate. Neither is authoritative for the other.
 * ------------------------------------------------------------------ */

const PROPERTY_TYPES = [
    { value: 'retail', label: 'Retail or shopping center' },
    { value: 'office', label: 'Office park or corporate campus' },
    { value: 'industrial', label: 'Industrial or warehouse' },
    { value: 'hoa', label: 'HOA or residential community' },
    { value: 'medical', label: 'Medical or professional building' },
    { value: 'municipal', label: 'Municipal or institutional' },
    { value: 'other', label: 'Something else' },
];

const CONTRACTOR_STATUS = [
    { value: 'have_contract', label: 'We have a contractor and are comparing' },
    { value: 'no_contract', label: 'We do not have a contractor for this season' },
    { value: 'self_perform', label: 'We handle it in-house today' },
    { value: 'rfp', label: 'We are running an RFP or scope of work' },
];

const CONVERSION_EVENTS = {
    ASSESSMENT_REQUESTED: 'assessment_requested',
    SCOPE_SUBMITTED: 'scope_of_work_submitted',
    PHONE_CLICKED: 'phone_click',
};

function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

function isPortfolioLead(lead) {
    if (!lead) return false;
    if (lead.contractorStatus === 'rfp') return true;
    return (Number(lead.buildingCount) || 0) > 1 || (Number(lead.siteCount) || 0) > 1;
}

function normalizeLead(raw = {}) {
    const text = (v) => (typeof v === 'string' ? v.trim() : v ?? null);
    const count = (v) => {
        const n = Number(v);
        return Number.isFinite(n) && n > 0 ? n : null;
    };
    const lead = {
        companyName: text(raw.companyName),
        contactName: text(raw.contactName),
        email: text(raw.email) ? String(raw.email).trim().toLowerCase() : null,
        phone: text(raw.phone),
        propertyAddress: text(raw.propertyAddress),
        propertyType: text(raw.propertyType),
        squareFootage: count(raw.squareFootage),
        parkingCount: count(raw.parkingCount),
        buildingCount: count(raw.buildingCount),
        siteCount: count(raw.siteCount),
        contractorStatus: text(raw.contractorStatus),
        notes: text(raw.notes),
        submittedAt: new Date().toISOString(),
    };
    lead.isPortfolio = isPortfolioLead(lead);
    return lead;
}

function validateLead(lead = {}) {
    const errors = {};
    if (!lead.companyName || !String(lead.companyName).trim()) {
        errors.companyName = 'Company or property name is required.';
    }
    if (!isValidEmail(lead.email)) errors.email = 'Enter a valid email address.';
    if (!isValidPhone(lead.phone)) errors.phone = 'Enter a phone number we can reach you on.';
    if (!lead.propertyType || !PROPERTY_TYPES.some((t) => t.value === lead.propertyType)) {
        errors.propertyType = 'Select a property type.';
    }
    if (!lead.propertyAddress || !String(lead.propertyAddress).trim()) {
        errors.propertyAddress = 'Property address is required so we can confirm coverage.';
    }
    return { valid: Object.keys(errors).length === 0, errors };
}

function buildConversionPayload(lead) {
    return {
        event: lead.isPortfolio
            ? CONVERSION_EVENTS.SCOPE_SUBMITTED
            : CONVERSION_EVENTS.ASSESSMENT_REQUESTED,
        property_type: lead.propertyType,
        contractor_status: lead.contractorStatus,
        is_portfolio: lead.isPortfolio,
        building_count: lead.buildingCount,
        site_count: lead.siteCount,
    };
}

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

const TRUST = [
    'Fully licensed and insured',
    '24/7 storm monitoring',
    'Time-stamped photo documentation',
    'Storm totals on every invoice',
    'Large parking lots to small sidewalks',
];

const PROPERTIES = [
    ['Retail and shopping centers', 'Storefront access and customer parking cleared before open of business, with entryways and walkways treated separately from drive lanes.'],
    ['Office parks and campuses', 'Multi-building coordination with prioritized access routes, so main entrances and ADA spaces clear first.'],
    ['Industrial and warehouse', 'Loading dock access, truck court clearing, and turning radius maintained for freight that cannot wait out a storm.'],
    ['HOAs and communities', 'Roadways, common areas, and shared parking on a schedule your board can hand to residents.'],
    ['Medical and professional', 'Priority-tier service for properties where patients and staff cannot be turned away.'],
    ['Municipal and institutional', 'Contract snow services for facilities with fixed operating obligations.'],
];

const PORTFOLIO = [
    ['One standard across every site', 'Each property gets its own site plan with its own priority zones, stacking areas, and trigger terms. The service standard stays the same across the portfolio.'],
    ['Reporting that rolls up', 'Every site produces the same time-stamped record in the same format. Review one property or the whole portfolio without reconciling three reporting styles.'],
    ['Insurance handled once', 'Certificates naming each property as additional insured, issued per site, coordinated through one point of contact instead of one thread per building.'],
    ['One point of contact', 'One person who knows your portfolio, not a dispatch queue that treats every call as a new customer.'],
    ['Working from a scope of work?', 'Send it. We will price against your scope and tell you plainly where we can meet it, where we would propose something different, and why.'],
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
    ['Service and documentation', 'Every visit is logged. Detailed reports and time-stamped photos from site inspections, and the storm total on your invoice. You get the record whether or not you ever need it.'],
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

const options = (list, placeholder) => [
    `<option value="">${esc(placeholder)}</option>`,
    ...list.map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`),
].join('');

/* ------------------------------------------------------------------ *
 * Styles
 * ------------------------------------------------------------------ */
const STYLES = `
.esn-root{${TOKENS}
  font-family:var(--esn-body);color:var(--esn-ink);background:var(--esn-ground);
  line-height:1.6;font-size:17px;-webkit-font-smoothing:antialiased;}
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

.esn-hero{padding:88px 24px 64px;border-bottom:1px solid var(--esn-line);}
.esn-hero .esn-lead{max-width:36ch;font-size:1.3rem;}
.esn-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px;}
.esn-btn{font-family:var(--esn-display);font-weight:600;font-size:1rem;padding:14px 26px;
  border-radius:var(--esn-radius);border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-block;}
.esn-btn-1{background:var(--esn-accent);color:var(--esn-accent-ink);}
.esn-btn-2{background:transparent;color:var(--esn-ink);border-color:var(--esn-line);}
.esn-deep .esn-btn-2{color:#fff;border-color:var(--esn-line-deep);}
.esn-btn:hover{opacity:.9;}

.esn-trust{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;
  border-top:1px solid var(--esn-line);border-bottom:1px solid var(--esn-line);background:var(--esn-ground-alt);}
.esn-trust li{flex:1 1 200px;padding:16px 20px;font-size:.87rem;font-weight:600;color:var(--esn-ink-soft);
  border-right:1px solid var(--esn-line);display:flex;align-items:center;gap:9px;font-family:var(--esn-display);}
.esn-trust li:last-child{border-right:none;}
.esn-trust li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--esn-accent);flex:none;}

.esn-grid{display:grid;gap:1px;background:var(--esn-line);border:1px solid var(--esn-line);
  border-radius:var(--esn-radius);overflow:hidden;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-top:8px;}
.esn-cell{background:var(--esn-ground);padding:24px;}
.esn-cell p{font-size:.92rem;color:var(--esn-ink-soft);}

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

.esn-form{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));margin-top:28px;}
.esn-field{display:flex;flex-direction:column;gap:6px;}
.esn-field.esn-wide{grid-column:1/-1;}
.esn-field label{font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--esn-ink-mute);font-family:var(--esn-display);}
.esn-field input,.esn-field select,.esn-field textarea{
  font:inherit;font-size:.95rem;padding:11px 13px;border:1px solid var(--esn-line);
  border-radius:var(--esn-radius);background:var(--esn-ground);color:var(--esn-ink);width:100%;}
.esn-field textarea{min-height:92px;resize:vertical;}
.esn-field input:focus-visible,.esn-field select:focus-visible,.esn-field textarea:focus-visible{
  outline:2px solid var(--esn-accent);outline-offset:1px;}
.esn-field.esn-bad input,.esn-field.esn-bad select{border-color:#B4332A;}
.esn-err{color:#B4332A;font-size:.85rem;margin-top:14px;min-height:1.2em;}
.esn-ok{background:var(--esn-ground-alt);border-left:3px solid var(--esn-accent);padding:22px;border-radius:0 var(--esn-radius) var(--esn-radius) 0;}
.esn-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;}

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
    <div class="esn-in">
      <h1 class="esn-h1">Commercial Snow &amp; Ice Management for New Jersey Properties</h1>
      <p class="esn-lead">When the storm hits, your lot needs to be open and your liability needs to be documented. We handle both.</p>
      <div class="esn-cta">
        <a class="esn-btn esn-btn-1" href="#esn-assessment">Request a Site Assessment</a>
        <a class="esn-btn esn-btn-2" href="#esn-portfolio">Send Us Your Scope of Work</a>
      </div>
    </div>
  </section>

  <ul class="esn-trust">${TRUST.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">A missed push is more than an inconvenience</h2>
    <p class="esn-lead">By the time your tenants arrive, the decision has already been made for you. Either the lot was cleared overnight or it was not.</p>
    <p class="esn-p">For commercial properties, the cost of a bad snow contractor is not measured in snow. It is measured in the tenant who could not open, the customer who went elsewhere, and the claim filed six months later by someone who slipped in a lot with no record of when it was last treated.</p>
    <p class="esn-p">We built our commercial program around the three things property managers actually need. Crews that move on the forecast instead of on your phone call. Ice management that prevents the refreeze nobody plans for. A paper trail that holds up when someone files.</p>
  </div></section>

  <section class="esn-sec esn-deep"><div class="esn-in">
    <h2 class="esn-h2">The documentation matters as much as the plowing</h2>
    <p class="esn-lead" style="color:#C9D7DF">Slip-and-fall claims are usually filed long after the storm, and they turn on one question. Can you show what was done, and when?</p>
    <p class="esn-p">Most snow contracts leave you answering that with a memory and an invoice. Ours do not. Site inspections produce detailed reports and time-stamped photos, and every invoice carries the storm total. The record is built as the season runs, not reconstructed after a letter arrives.</p>
    <p class="esn-p">EarthScapes is fully licensed and insured. Certificates naming your property as additional insured are provided at contract signing.</p>
  </div></section>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">Properties we service</h2>
    <div class="esn-grid">${PROPERTIES.map(([h, p]) => `<div class="esn-cell"><h3 class="esn-h3">${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div></section>

  <section class="esn-sec esn-alt" id="esn-portfolio"><div class="esn-in">
    <h2 class="esn-h2">Managing more than one property?</h2>
    <p class="esn-lead">Portfolio work is a different problem from single-site work. The plowing is the easy part. The hard part is knowing that site nine got the same service as site one, and being able to prove it without calling three people.</p>
    <div style="margin-top:26px">${pairRows(PORTFOLIO.map(([h, p]) => [h, p]), 'esn-row')}</div>
    <div class="esn-cta"><a class="esn-btn esn-btn-1" href="#esn-assessment">Send Us Your Scope of Work</a></div>
  </div></section>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">What is included</h2>
    <div>${pairRows(SERVICES, 'esn-row')}</div>
  </div></section>

  <section class="esn-sec esn-alt"><div class="esn-in">
    <h2 class="esn-h2">How the season runs</h2>
    <ol class="esn-steps">${SEASON.map(([h, p], i) => `<li class="esn-step"><span class="esn-num">0${i + 1}</span><div><h3 class="esn-h3">${esc(h)}</h3><p>${esc(p)}</p></div></li>`).join('')}</ol>
  </div></section>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">Contract structures</h2>
    <div>${pairRows(CONTRACTS, 'esn-row')}</div>
    <p class="esn-p" style="margin-top:22px">We will tell you which one fits your property and your budget cycle rather than pushing whichever is better for us. For most multi-tenant commercial sites, seasonal wins on the budgeting alone.</p>
  </div></section>

  <section class="esn-sec esn-alt"><div class="esn-in">
    <h2 class="esn-h2">Where we work</h2>
    <p class="esn-lead">EarthScapes provides commercial snow and ice management across New Jersey. Commercial snow coverage is tighter than our landscaping radius, because response time is the constraint that matters in a storm.</p>
    <p class="esn-p">Not sure whether your property is in range? Ask. If we cannot service your property well, we will say so.</p>
  </div></section>

  <section class="esn-sec"><div class="esn-in">
    <h2 class="esn-h2">Common questions</h2>
    <div class="esn-faq">${FAQS.map(([q, a]) => `<details><summary>${esc(q)}</summary><p class="esn-a">${esc(a)}</p></details>`).join('')}</div>
  </div></section>

  <section class="esn-sec esn-alt" id="esn-assessment"><div class="esn-in">
    <h2 class="esn-h2">Get your property assessed before the season fills</h2>
    <p class="esn-lead">We take a limited number of commercial contracts so that every property gets serviced properly in a real storm. Site assessments are free, and the plan you get is yours whether or not you sign with us.</p>

    <form class="esn-form" id="esn-form" novalidate>
      <div class="esn-hp" aria-hidden="true"><label>Do not fill<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

      <div class="esn-field" data-f="companyName"><label for="esn-company">Company or property name</label><input id="esn-company" name="companyName" type="text" autocomplete="organization" required></div>
      <div class="esn-field" data-f="contactName"><label for="esn-contact">Your name</label><input id="esn-contact" name="contactName" type="text" autocomplete="name"></div>
      <div class="esn-field" data-f="email"><label for="esn-email">Email</label><input id="esn-email" name="email" type="email" autocomplete="email" required></div>
      <div class="esn-field" data-f="phone"><label for="esn-phone">Phone</label><input id="esn-phone" name="phone" type="tel" autocomplete="tel" required></div>
      <div class="esn-field esn-wide" data-f="propertyAddress"><label for="esn-address">Property address</label><input id="esn-address" name="propertyAddress" type="text" autocomplete="street-address" required></div>
      <div class="esn-field" data-f="propertyType"><label for="esn-type">Property type</label><select id="esn-type" name="propertyType" required>${options(PROPERTY_TYPES, 'Select one')}</select></div>
      <div class="esn-field" data-f="contractorStatus"><label for="esn-status">Current snow contractor</label><select id="esn-status" name="contractorStatus">${options(CONTRACTOR_STATUS, 'Select one')}</select></div>
      <div class="esn-field"><label for="esn-sqft">Approx. square footage</label><input id="esn-sqft" name="squareFootage" type="number" min="0" inputmode="numeric"></div>
      <div class="esn-field"><label for="esn-parking">Parking spaces</label><input id="esn-parking" name="parkingCount" type="number" min="0" inputmode="numeric"></div>
      <div class="esn-field"><label for="esn-buildings">Number of buildings</label><input id="esn-buildings" name="buildingCount" type="number" min="0" inputmode="numeric"></div>
      <div class="esn-field"><label for="esn-sites">Number of sites</label><input id="esn-sites" name="siteCount" type="number" min="0" inputmode="numeric"></div>
      <div class="esn-field esn-wide"><label for="esn-notes">Anything we should know, or paste your scope of work</label><textarea id="esn-notes" name="notes"></textarea></div>

      <div class="esn-wide">
        <button class="esn-btn esn-btn-1" type="submit" id="esn-submit">Request a Site Assessment</button>
        <p class="esn-err" id="esn-error" role="alert" aria-live="polite"></p>
      </div>
    </form>

    <div class="esn-ok esn-wide" id="esn-success" hidden>
      <h3 class="esn-h3">Request received</h3>
      <p>We will be in touch to schedule the walk-through. If a storm is already in the forecast, call us rather than waiting on email.</p>
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
        this._wireForm();
    }

    _wireForm() {
        const form = this.querySelector('#esn-form');
        const errorEl = this.querySelector('#esn-error');
        const successEl = this.querySelector('#esn-success');
        const submitBtn = this.querySelector('#esn-submit');
        if (!form) return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Honeypot: a bot fills every field it finds.
            if (form.elements.website && form.elements.website.value) return;

            const raw = Object.fromEntries(new FormData(form).entries());
            const lead = normalizeLead(raw);
            const { valid, errors } = validateLead(lead);

            this.querySelectorAll('.esn-field').forEach((f) => f.classList.remove('esn-bad'));

            if (!valid) {
                const [firstField] = Object.keys(errors);
                const el = this.querySelector(`.esn-field[data-f="${firstField}"]`);
                if (el) {
                    el.classList.add('esn-bad');
                    const input = el.querySelector('input,select,textarea');
                    if (input) input.focus();
                }
                errorEl.textContent = errors[firstField];
                return;
            }

            errorEl.textContent = '';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                await this._submit(lead);
                form.hidden = true;
                successEl.hidden = false;
                successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (err) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Request a Site Assessment';
                errorEl.textContent = 'Something went wrong sending that. Please call us instead so this does not sit unanswered.';
                // eslint-disable-next-line no-console
                console.error('[commercial-snow-page] lead submit failed', err);
            }
        });
    }

    /**
     * Hand the lead to the page for delivery, and fire the conversion event.
     *
     * The element does not talk to a backend itself: a custom element cannot
     * import Velo backend modules. Page code listens for `esn-lead` and calls
     * the backend web method, which is where server-side delivery belongs.
     */
    async _submit(lead) {
        const payload = buildConversionPayload(lead);

        if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push(payload);
        }

        const detail = { lead, conversion: payload };
        let settled;
        const delivered = new Promise((resolve, reject) => { settled = { resolve, reject }; });
        detail.resolve = settled.resolve;
        detail.reject = settled.reject;

        this.dispatchEvent(new CustomEvent('esn-lead', { detail, bubbles: true, composed: true }));

        // If no page-code listener claimed it, don't hang the visitor.
        const timeout = new Promise((resolve) => setTimeout(() => resolve('unclaimed'), 6000));
        return Promise.race([delivered, timeout]);
    }
}

if (!customElements.get('commercial-snow-page')) {
    customElements.define('commercial-snow-page', CommercialSnowPage);
}
