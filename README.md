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
https://cdn.jsdelivr.net/gh/Nick-Baughman/earthscapes-assets@main/commercialSnowPage.js
```

## Deploying a change

```sh
git add -A && git commit -m "..." && git push
curl -s "https://purge.jsdelivr.net/gh/Nick-Baughman/earthscapes-assets@main/commercialSnowPage.js"
```

The purge matters. jsDelivr caches a branch URL for up to 12 hours, so without
it a change can take that long to appear. With it, the next page load is current.

## Rules

- **Public repo. No secrets, ever.** Anything here is world-readable.
- This is client-facing code on a live business site. It is served directly to
  visitors with no build step, so what is committed here is what runs.
- Source of truth for the element is the EarthScapes site repo at
  `src/public/custom-elements/`. Changes flow from there to here, not the
  reverse.

## Images

`img/` holds the page photography. **The current set is placeholder stock, not
EarthScapes' own work.** They are deliberately generic — no branded vehicles, no
crew, no signage — so the page never implies a job the company did not do. Alt
text describes the scene and does not claim authorship.

Replace with Nick's real property photos when available, keeping the same
filenames, and bump the `?v=` query in `commercialSnowPage.js` so browsers and
the CDN pick up the change.

| File | Placement |
|---|---|
| `img/hero-lot.jpg` | Hero background |
| `img/plow.jpg` | Documentation / liability section background |
| `img/entrance.jpg` | Full-width band below the services list |
