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
