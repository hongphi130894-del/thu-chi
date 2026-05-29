#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GH_BIN="${GH_BIN:-gh}"
if ! command -v "$GH_BIN" >/dev/null 2>&1; then
  echo "Cần GitHub CLI (gh). Cài: https://cli.github.com"
  exit 1
fi

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
