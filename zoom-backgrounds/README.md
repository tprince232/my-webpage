# AI One — Zoom backgrounds

1920×1080 virtual backgrounds built from the AI One logo vectors.

## Ready-to-use images

| File | Look |
| --- | --- |
| `out/ai-one-zoom-midnight.png` | Near-black with a blue glow — the default, safest on camera |
| `out/ai-one-zoom-blue.png` | Deep brand blue gradient |
| `out/ai-one-zoom-light.png` | Off-white, black logo — for bright rooms |

In Zoom: **Settings → Background & Effects → +** and pick a PNG.

Note that Zoom mirrors your *self*-view, so the logo will look reversed to you.
Everyone else sees it the right way round — leave "Mirror my video" on.

## Layout

The logo sits top-left and the oversized mark bleeds off the right edge, so the
centre and lower-left stay clear — that's where you sit and where Zoom draws the
name badge.

## Logo assets

`logo/` holds the mark and the full AI·ONE lockup in black, white and brand blue
(`#5789FF`). The paths came straight from the Figma export, so they're the real
vectors, not a redraw.

## Re-rendering

`background.html` is the source. Edit it, then:

```sh
./render.sh
```

It finds a local Chromium/Chrome and writes all three PNGs to `out/`. Point it
somewhere else with `CHROME=/path/to/chrome ./render.sh`.

Open `background.html` in a browser to preview. It takes query parameters:

- `?variant=midnight|light|blue`
- `?tagline=Some%20supporting%20line` — off by default
- `?logo=mark` — mark only, no wordmark
