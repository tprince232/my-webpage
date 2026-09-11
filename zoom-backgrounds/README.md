# AI One — Zoom backgrounds

Virtual backgrounds built from the AI One logo vectors.

## Upload these three

`out/zoom/` — 1920×1080, one per colourway. This is the set to upload.

| File | Look |
| --- | --- |
| `ai-one-zoom-midnight-1920x1080.png` | Near-black with a blue glow — the default, safest on camera |
| `ai-one-zoom-blue-1920x1080.png` | Deep brand blue gradient |
| `ai-one-zoom-light-1920x1080.png` | Off-white, black logo — for bright rooms |

All three share an identical canvas and pixel-identical logo placement, so they
swap cleanly without anything shifting.

In Zoom: **Settings → Background & Effects → +** and add each PNG.

**Turn on Settings → Video → HD.** Without it Zoom transmits around 360p and the
logo will look soft no matter what you upload.

### Why 1920×1080 and not larger

With HD enabled Zoom transmits 1080p, so a 1920×1080 source maps 1:1 with no
rescaling at all — the sharpest input the pipeline can take. `out/4k/` holds
3840×2160 versions for anything outside Zoom (Teams, Meet, slides, wallpaper),
but don't upload those here: bigger is not better, it just gets scaled back down.

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

## Why a bigger file doesn't make the logo sharper

Nobody on the call ever sees this PNG. Zoom composites it into your camera feed
and ships the result through the H.264 video encoder — often at 720p unless HD
is switched on. That stream, not the source file, is the resolution ceiling, so
a 4K or 8K export changes nothing about how crisp the logo looks.

What does help is stroke weight. The lockup is sized at 34% of frame width so
its strokes stay several pixels thick even after the downscale, which is what
keeps thin geometric linework from turning to mush.

So if the logo ever looks soft again, the thing to check is the transmitted
resolution — HD enabled, CPU headroom, network — not the source file.

## Logo assets

`logo/` holds three forms — wordmark, circular mark, and the full lockup — each
in black, white and brand blue (`#5789FF`). The paths came straight from the
Figma export, so they're the real vectors, not a redraw.

The backgrounds use the **wordmark** top-left, not the lockup: the circular mark
already appears oversized on the right edge, so setting it beside the type as
well just doubles it up.

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
- `?logo=wordmark|lockup|mark` — wordmark is the default
