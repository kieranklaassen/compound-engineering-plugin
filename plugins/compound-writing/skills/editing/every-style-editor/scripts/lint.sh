#!/bin/bash
# Lint text against Every's style guide using Vale
#
# Usage:
#   ./lint.sh draft.md           # Lint a single file
#   ./lint.sh drafts/            # Lint a directory
#   ./lint.sh --help             # Show help
#
# Install Vale first:
#   brew install vale
#
# Or download from: https://vale.sh/docs/vale-cli/installation/

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VALE_DIR="$SCRIPT_DIR/../vale"

# Check if Vale is installed
if ! command -v vale &> /dev/null; then
    echo "Error: Vale is not installed."
    echo ""
    echo "Install with:"
    echo "  brew install vale"
    echo ""
    echo "Or download from: https://vale.sh/docs/vale-cli/installation/"
    exit 1
fi

# Show help
if [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]] || [[ -z "$1" ]]; then
    echo "Every Style Linter"
    echo ""
    echo "Usage:"
    echo "  ./lint.sh <file.md>      Lint a single file"
    echo "  ./lint.sh <directory>    Lint all markdown files in directory"
    echo "  ./lint.sh --help         Show this help"
    echo ""
    echo "Examples:"
    echo "  ./lint.sh drafts/my-post/draft-v1.md"
    echo "  ./lint.sh drafts/"
    echo ""
    echo "Rules included:"
    echo "  - OverusedWords (actually, very, just)"
    echo "  - PassiveVoice"
    echo "  - EmDash (no spaces around em dashes)"
    echo "  - OxfordComma"
    echo "  - ClickHere (avoid 'click here' links)"
    echo "  - StartWithThis"
    echo "  - WeHaveWeGet"
    echo "  - Cliches"
    echo "  - Percentages (numerals + 'percent')"
    echo "  - CompanyPronouns (it, not they)"
    echo "  - BoldEmphasis (use italics, not bold)"
    echo "  - Numbers (spell out 1-9)"
    echo "  - Ellipsis (no space before)"
    echo "  - OverUnder (more/fewer than)"
    echo "  - Adverbs (cuttable adverbs)"
    exit 0
fi

# Run Vale with the Every style
echo "Linting with Every style guide..."
echo ""

vale --config="$VALE_DIR/.vale.ini" --styles-path="$VALE_DIR" "$@"

echo ""
echo "Done! Fix errors (red) first, then warnings (yellow)."
