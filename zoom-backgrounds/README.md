# AI One — Zoom backgrounds

Virtual backgrounds built from the AI One logo vectors.

## Ready-to-use images

Use the 4K files — Zoom downscales them cleanly, which looks sharper than
feeding it an exactly-1080p image on a hi-dpi display.

| File | Size | Look |
| --- | --- | --- |
| `out/ai-one-zoom-midnight.png` | 3840×2160 | Near-black with a blue glow — the default, safest on camera |
| `out/ai-one-zoom-blue.png` | 3840×2160 | Deep brand blue gradient |
| `out/ai-one-zoom-light.png` | 3840×2160 | Off-white, black logo — for bright rooms |

Each also has a `-1080.png` twin at 1920×1080 if something needs exactly HD.

In Zoom: **Settings → Background & Effects → +** and pick a PNG.

## The logo looks mirrored

That's Zoom's self-view mirror, and it only affects *your* preview — everyone
else always sees the logo the right way round. To make your own view match,
uncheck **Settings → Video → Mirror my video**. Don't flip the image file to
compensate; that would leave it backwards for everyone else.

## Layout

The logo sits top-left and the oversized mark bleeds off the right edge, so the
centre and lower-left stay clear — that's where you sit and where Zoom draws the
name badge.

There's deliberately no texture or pattern. Fine repeating detail aliases once
Zoom rescales and re-compresses the image, which shows up on camera as pixel
noise; flat gradients survive that a lot better.

## Logo assets

`logo/` holds the mark and the full AI·ONE lockup in black, white and brand blue
(`#5789FF`). The paths came straight from the Figma export, so they're the real
vectors, not a redraw.

## Re-rendering

`background.html` is the source. Edit it, then:

```sh
./render.sh
```

It finds a local Chromium/Chrome and writes both sizes of all three variants to
`out/`. Point it somewhere else with `CHROME=/path/to/chrome ./render.sh`.

Open `background.html` in a browser to preview. It takes query parameters:

- `?variant=midnight|light|blue`
- `?tagline=Some%20supporting%20line` — off by default
- `?logo=mark` — mark only, no wordmark
