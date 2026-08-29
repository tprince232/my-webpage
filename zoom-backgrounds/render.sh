#!/usr/bin/env bash
# Renders background.html to PNGs, one per colour variant.
#
# Each variant is rendered twice:
#   ai-one-zoom-<variant>.png       3840x2160  (2x - use this one in Zoom)
#   ai-one-zoom-<variant>-1080.png  1920x1080  (1x, if something needs exactly HD)
#
# Needs a Chromium/Chrome binary. Override with:
#   CHROME=/path/to/chrome ./render.sh
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$DIR/out"
mkdir -p "$OUT"

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

for variant in midnight light blue; do
  shoot "$variant" 2 "ai-one-zoom-$variant.png"
  shoot "$variant" 1 "ai-one-zoom-$variant-1080.png"
done

echo "Done."
