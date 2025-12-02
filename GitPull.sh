#!/bin/bash
# ヘルプは -h/--help または下部の show_help() を参照
set -euo pipefail

show_help() {
	cat <<'EOF'
Usage: GitPull.sh [WORKDIR=/var/www]

Pulls main from origin into WORKDIR.

Options:
	-h, --help   Show this help and exit

Examples:
	./GitPull.sh               # uses /var/www
	./GitPull.sh /path/to/dir  # uses specified directory
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
	show_help
	exit 0
fi

WORKDIR="${1:-/var/www}"
cd "$WORKDIR"
git fetch origin
git reset --hard origin/main
git -c core.sshCommand="ssh -i /root/.ssh/github" pull origin main
