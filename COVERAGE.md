# Coverage and verification notes

Snapshot: October 29, 2026.

235 unique catalog records. Each included title has an IMDb ID and a title/year match against Cinemeta metadata. This checks identity, not stream availability or the correctness of every poster. Duplicate IDs are merged.

## Coverage

Includes MCU films, Disney+ series and specials; older live-action Marvel films and television; Spider-Man films and cartoons (including Japanese television); X-Men; Fantastic Four; animated films, cartoons, anime, LEGO, selected motion comics; and selected Marvel-related imprint adaptations such as Men in Black, Kingsman, Kick-Ass, Powers and Big Hero 6. Imprint adaptations are not classified as MCU.

Tag counts overlap: {'mcu': 66, 'spiderman': 35, 'xmen': 26, 'fantasticfour': 11, 'animation': 87, 'tv': 50}.

This is broad coverage, not a verified exhaustive inventory. Documentaries, promotional videos, every web short, every episode compilation, every motion comic, and every Marvel-owned imprint adaptation are not comprehensively inventoried. Cancelled and unproduced projects are not a coverage goal. Series are listed once, not once per season.

## Watch-order limitations

MCU Story Order is an editorial main-universe film/special guide based on principal story events. It does not interleave episodes, seasons, flashbacks or end-credit scenes. It omits multiverse branches without a clear main-universe position (including The Fantastic Four: First Steps and Deadpool & Wolverine); those remain in MCU Release Order, Movies and character collections. Series remain in MCU Release Order and Series/Marvel Television. Placement after Endgame is provisional. Release order uses metadata release dates, which can differ by country or festival; year-only dates sort at year-end.

MCU Release Order includes Marvel Studios MCU productions, animation and One-Shots. Older Marvel Television series are grouped separately rather than making a blanket canon claim. Team Thor/Team Darryl are treated as comedy shorts outside MCU continuity. Upcoming titles appear only in Coming Soon; dates can change and do not imply streams exist.

## Unresolved candidate records

These candidates are not silently counted as installed titles:

| Title | Year | Reason |
| --- | --- | --- |
| Marvel Rising: Chasing Ghosts | 2019 | No exact IMDb suggestion match |
| Marvel Rising: Heart of Iron | 2019 | No exact IMDb suggestion match |
| Marvel Rising: Battle of the Bands | 2019 | No exact IMDb suggestion match |
| Marvel Rising: Operation Shuri | 2019 | No exact IMDb suggestion match |
| Marvel Rising: Playing with Fire | 2019 | No exact IMDb suggestion match |
| LEGO Marvel Super Heroes: Guardians of the Galaxy - The Thanos Threat | 2017 | Check mismatch: Rakht (2004) |
| WHIH Newsfront | 2015 | Metadata unavailable; needs manual check |
| Marvel's Rocket & Groot | 2017 | No exact IMDb suggestion match |
| Marvel Funko Shorts | 2016 | No exact IMDb suggestion match |
| Marvel Knights: Spider-Woman, Agent of S.W.O.R.D. | 2009 | No exact IMDb suggestion match |
| Wolverine: Origin | 2013 | Metadata unavailable; needs manual check |
| Wolverine Versus Sabretooth | 2014 | No exact IMDb suggestion match |
| Eternals | 2014 | No exact IMDb suggestion match |

The five Marvel Rising specials are also indexed as episodes under Marvel Rising: Initiation by IMDb. Standalone movie matching remains unresolved. The LEGO Guardians record has a valid IMDb page but conflicting Cinemeta metadata, so it is withheld pending correction.

## Sources and maintenance

- Included records store their Cinemeta verification URL in catalog.json.
- [Marvel television index](https://www.marvel.com/tv-shows/)
- [Disney MCU guide](https://www.disney.com.au/news/a-marvel-movie-timeline-of-every-film-in-order-of-release) — background for the early-film sequence, not authority for all later placements.
- [Sony Spider-Man: Brand New Day](https://www.sonypictures.com/movies/spidermanbrandnewday)
- [Stremio manifest documentation](https://stremio.github.io/stremio-addon-sdk/api/responses/manifest.html)

The catalog is a maintained snapshot, not an automatic Marvel feed. New productions require catalog edits. Art and full metadata come from other services; catalog identity checks do not guarantee working playback.
