#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

find_gh() {
  if [[ -n "${GH_BIN:-}" ]] && command -v "$GH_BIN" >/dev/null 2>&1; then
    echo "$GH_BIN"
    return
  fi
  if command -v gh >/dev/null 2>&1; then
    command -v gh
    return
  fi
  local candidate
  for candidate in \
    /tmp/gh_2.69.0_macOS_arm64/bin/gh \
    /opt/homebrew/bin/gh \
    /usr/local/bin/gh; do
    if [[ -x "$candidate" ]]; then
      echo "$candidate"
      return
    fi
  done
  return 1
}

GH_BIN="$(find_gh)" || {
  echo "Cần GitHub CLI (gh). Cài: https://cli.github.com"
  echo "Hoặc: GH_BIN=/đường/dẫn/gh ./scripts/publish-github.sh"
  exit 1
}

if ! "$GH_BIN" auth status >/dev/null 2>&1; then
  echo "Đăng nhập GitHub..."
  "$GH_BIN" auth login -h github.com -p https -w
fi

REPO_NAME="${1:-thu-chi}"

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote origin đã có — đẩy code..."
  git push -u origin main
else
  echo "Tạo repo public $REPO_NAME và đẩy code..."
  "$GH_BIN" repo create "$REPO_NAME" --public --source=. --remote=origin --push
fi

echo ""
echo "Bật GitHub Pages: repo → Settings → Pages → Source: GitHub Actions"
echo "Sau vài phút: https://$( "$GH_BIN" api user -q .login ).github.io/$REPO_NAME/"
