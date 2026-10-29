# Deploy Marvel Timeline

## 1. Upload to GitHub

1. Download and extract Marvel_Timeline_v1.0.zip.
2. Open https://github.com/moviediver88/marvel-timeline-stremio.
3. Choose **Add file → Upload files** (the Add file control may appear as a plus button).
4. Upload every extracted file directly into the repository's top level. Do not upload the ZIP or an enclosing folder.
5. Commit directly to main. The supplied README.md replaces the starter README.

The top level must contain server.js, catalog.json, story-order.json, package.json, package-lock.json, render.yaml, test.js, README.md, COVERAGE.md, and DEPLOY.md.

## 2. Create a Render service

1. Open the Render dashboard and choose **New → Web Service**.
2. Connect GitHub if needed and select **moviediver88/marvel-timeline-stremio**. If it is missing, grant Render access to this repository.
3. Use the Node runtime and the main branch. Leave the root directory blank.
4. Name the service **marvel-timeline-stremio**, or choose an available name.
5. Build command: **npm install**.
6. Start command: **npm start**.
7. Choose a suitable service plan. The included blueprint requests the free plan; review the displayed plan and pricing before creating a service.
8. Under environment variables, set **NODE_VERSION** to **22**.
9. Set the health check path to **/health** if the form offers it.
10. Deploy and wait for the service to report Live.

Alternatively, Render can read render.yaml through its Blueprint deployment flow.

## 3. Verify before sharing

Use the exact website address Render assigns. The desired service name is not proof that a particular URL is available.

1. Open the Render address with **/health** appended. Expect status ok, version 1.0.0, entries 235, imdbLinked 235, referenceOnly 0, catalogs 10.
2. Open the base address to see the installation page.
3. Install from that page, or copy the actual **/manifest.json** URL into Stremio or Addon Manager.
4. Check **Discover → Marvel**. Try Movies, Series, Spider-Man, MCU Story Order, and MCU Release Order.
5. Open a series and check seasons/episodes, then try playback through your usual installed stream providers.
6. Check your onn Google TV device and Windows laptop. Local server tests do not replace these device checks.

If stale results appear, switch categories and back or restart the app. Do not resubmit the public add-on just to refresh a title.

## 4. Publish after device checks

Submit the actual public manifest URL at:
https://stremio.github.io/stremio-publish-addon/index.html

Share the manifest URL with Addon Manager users. A Stremio web sharing-page link is not the same thing as a direct manifest URL.

## Maintenance

Edit catalog.json when adding titles. Each record needs a correct IMDb ID, movie/series type, title, year, tags, and an ISO releaseDate. Keep dates accurate: future dates place records in Coming Soon. Dates stored in the year-only format use December 31 as a conservative sorting placeholder.

Update story-order.json only for titles that belong in the suggested main-universe film/special sequence. It is an ordered list of IMDb IDs, not a list of title searches.

Run **npm test** after edits. Commit changes; Render can redeploy automatically from main. Verify the live catalog before announcing the update.

No browser credentials, payment credentials, or private stream-provider URLs belong in this repository.
