#!/usr/bin/env bash
# Renders background.html to PNGs, one per colour variant.
#
# Each variant is rendered twice:
#   out/zoom/ai-one-zoom-<variant>-1920x1080.png   <- upload these to Zoom
#   out/4k/ai-one-zoom-<variant>-3840x2160.png     <- other uses / print-ish
#
# Zoom with HD enabled transmits 1080p, so a 1920x1080 source maps 1:1 with no
# rescaling at all. That is the sharpest possible input; bigger is not better.
#
# Needs a Chromium/Chrome binary. Override with:
#   CHROME=/path/to/chrome ./render.sh
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$DIR/out"
mkdir -p "$OUT/zoom" "$OUT/4k"

CHROME="${CHROME:-}"
if [ -z "$CHROME" ]; then
  # headless_shell captures exactly --window-size; --headless=new can come up a
  # few dozen pixels short, so prefer the shell when it is present.
  for c in /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell \
           /opt/pw-browsers/chromium-*/chrome-linux/chrome \
           "$(command -v chromium || true)" \
           "$(command -v google-chrome || true)" \
           "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
    [ -x "$c" ] && CHROME="$c" && break
  done
fi
[ -n "$CHROME" ] || { echo "No Chrome/Chromium found. Set CHROME=/path/to/chrome" >&2; exit 1; }

HEADLESS=""
case "$CHROME" in *headless_shell) ;; *) HEADLESS="--headless=new";; esac

shoot() { # variant, scale, output filename
  "$CHROME" $HEADLESS --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor="$2" --window-size=1920,1080 \
    --virtual-time-budget=4000 \
    --screenshot="$OUT/$3" \
    "file://$DIR/background.html?variant=$1" >/dev/null 2>&1
  echo "  out/$3"
}

for variant in midnight blue light; do
  shoot "$variant" 1 "zoom/ai-one-zoom-$variant-1920x1080.png"
  shoot "$variant" 2 "4k/ai-one-zoom-$variant-3840x2160.png"
done

echo "Done."
