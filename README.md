# earthscapes-assets

Static front-end assets for **earthscapesnj.com**, served to the Wix site over a
CDN so page changes do not require a Wix publish.

## Why this repo exists

The commercial snow & ice landing page is a Wix Custom Element. When its script
lives inside the Wix site as a Velo file, every edit needs a full `wix publish`
and site rebuild — minutes per change. Pointing the element at a CDN URL instead
turns that into a push.

## Files

| File | Used by |
|---|---|
| `commercialSnowPage.js` | `<commercial-snow-page>` on `/commercial-snow-and-ice-removal` |

## The Server URL

Set in the Wix Editor on the Custom Element, under **Choose Source → Server URL**:

```
https://nick-baughman.github.io/earthscapes-assets/commercialSnowPage.js
```

## Deploying a change

```sh
git add -A && git commit -m "..." && git push
```

That is the whole deploy. GitHub Pages publishes within about a minute and no
Wix publish is involved.

### Why Pages and not jsDelivr

This repo was briefly served over jsDelivr. Do not go back to it. jsDelivr
caches a branch URL with `s-maxage=43200` (12 hours) and caches the
branch-to-commit resolution separately — its purge endpoint returned
`"status": "finished"` while the edge kept serving a stale file for minutes
afterwards. Only a commit-SHA-pinned URL updated immediately, and that URL
changes on every deploy, which defeats the purpose.

## Rules

- **Public repo. No secrets, ever.** Anything here is world-readable.
- This is client-facing code on a live business site. It is served directly to
  visitors with no build step, so what is committed here is what runs.
- Source of truth for the element is the EarthScapes site repo at
  `src/public/custom-elements/`. Changes flow from there to here, not the
  reverse.

## Images

`img/` holds the page photography. **Real photographs, all public domain**,
sourced from Wikimedia Commons and verified license-by-license.

Public domain specifically, not CC-BY. A client's commercial site should not
carry an attribution obligation buried in an image credit that nobody will
remember to honour in three years.

| File | Placement | Source (all public domain) |
|---|---|---|
| `img/hero-lot.jpg` | Hero background | Winter Storm Juno 150127-F-UT482-065, cropped to remove aircraft on the left edge |
| `img/snow-blower.jpg` | Documentation section | Winter storm 160120-Z-PM441-066 |
| `img/loader-lot.jpg` | Band below services | Naval Station Great Lakes snow removal 140129-N-DA320-047 |

These replaced AI-generated placeholders, which read as synthetic. EarthScapes'
own Wix Media Manager was checked first and holds no winter imagery at all —
29 images, all landscaping.

**Alt text describes the scene and does not claim the work as EarthScapes'
own.** It is not their work. When Nick supplies real property photos, drop them
in with the same filenames and bump the `?v=` in `commercialSnowPage.js`. A real
photo of a real Monmouth or Ocean County lot beats all of these, because this
buyer is specifically trying to work out whether the contractor is real.
