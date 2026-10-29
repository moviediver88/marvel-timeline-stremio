# Marvel Timeline

### Free Marvel catalogs and suggested watch orders for Stremio

An independent fan project by **DolphinDiver**. Browse Marvel movies, television, animation, and **Spider-Man**, including older productions.

**Version 1.0.0 · 235 unique titles · 10 categories**

## Install

After deployment, open the add-on's Render website and choose **Install in Stremio**, or copy its manifest URL into Stremio's add-on search field or Addon Manager.

The manifest address is your Render website address followed by `/manifest.json`.

Open **Discover → Marvel** and choose a collection. Use the same Stremio account on your other devices. If a catalog looks stale, switch to another collection and back.

## Collections

| Collection | What it contains |
| --- | --- |
| MCU Story Order | Suggested main-universe film and special sequence |
| MCU Release Order | MCU films, series, animation, specials, and One-Shots by release date |
| Movies | Released films, TV movies, and selected shorts |
| Series | Released live-action and animated series |
| Animation | Cartoons, anime, animated films, LEGO, and selected motion comics |
| Spider-Man | Live-action films, Spider-Verse, cartoons, Japanese television, and related Sony films |
| X-Men | Films, television, and animation, including Deadpool and Wolverine |
| Fantastic Four | Film and animated adaptations, including related Silver Surfer titles |
| Marvel Television | Selected live-action TV productions, older Marvel Television shows, and modern MCU series |
| Coming Soon | Cataloged titles with future release dates |

Movies, Series, and character collections overlap. Titles from future release dates appear in Coming Soon instead of the released collections.

## Watch-order notes

**MCU Story Order is a suggested movie-and-special guide, not a complete chronological timeline of every Marvel production.** It does not interleave television episodes, seasons, flashbacks, or end-credit scenes. Series remain in MCU Release Order and the series collections.

Multiverse branches without a clear position in the main timeline, including *The Fantastic Four: First Steps* and *Deadpool & Wolverine*, remain in release order and character collections rather than receiving an invented chronological position. Later main-timeline placements are provisional.

MCU Release Order uses metadata release dates. Festival and regional dates can differ; records with only a known year sort at year-end. Older Marvel Television productions are grouped separately rather than making a blanket claim about canon.

## Playback and artwork

**This add-on provides catalogs only. It does not host video streams.** Playback needs other installed add-ons and depends on their availability. Keep a movie/series metadata provider such as Cinemeta installed for full details and episode lists.

Included titles have IMDb IDs checked against title/year metadata. This does not guarantee a working stream or the correctness and availability of every poster.

## Coverage

The initial catalog contains **235 unique records**, including classic television, older films, animation, MCU productions, Spider-Man, X-Men, and Fantastic Four. Selected related imprint adaptations, including *Men in Black*, *Kingsman*, *Kick-Ass*, *Powers*, and *Big Hero 6*, appear in the general collections; they are not classified as MCU.

Broad coverage is the goal, but this is **not yet a verified inventory of everything Marvel has produced**. See [COVERAGE.md](COVERAGE.md) for unresolved records and scope limits. New titles require maintenance; this is not an automatic Marvel feed.

## Optional support

Enjoying the add-on? Tips help support maintenance and future improvements.

### [☕ Support DolphinDiver on Ko-fi](https://ko-fi.com/dolphindiver)

**The add-on remains free.** Donations do not purchase movies, streams, or access.

## Feedback

[Report missing titles, incorrect artwork, or catalog issues](https://github.com/moviediver88/marvel-timeline-stremio/issues).

Include the title, year, device, and Stremio version. Do not include passwords, API keys, private add-on URLs, or payment details.

## Deployment and local use

See [DEPLOY.md](DEPLOY.md) for GitHub and Render instructions.

Requires **Node.js 22 or newer**. No API key or paid metadata account is required by this server.

```bash
npm install
npm test
npm start
```

Open `http://localhost:7000/manifest.json`. Render supplies its own `PORT`.

---

Not affiliated with Marvel, Disney, Sony, or Stremio. Character names and artwork belong to their respective owners.
