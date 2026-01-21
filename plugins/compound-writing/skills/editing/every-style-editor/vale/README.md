# Every Vale Style

Vale linting rules for Every's writing style guide.

## Installation

1. **Install Vale**
   ```bash
   # macOS
   brew install vale

   # Or download from https://vale.sh/docs/vale-cli/installation/
   ```

2. **Copy to your project**
   ```bash
   # Copy the Every style to your project
   cp -r vale/ /path/to/your/project/

   # Or copy just the style
   mkdir -p .vale/styles
   cp -r vale/Every .vale/styles/
   cp vale/.vale.ini .vale.ini
   ```

3. **Run Vale**
   ```bash
   # Check a file
   vale draft.md

   # Check all markdown files
   vale *.md

   # Check drafts directory
   vale drafts/
   ```

## Rules Included

| Rule | Level | Description |
|------|-------|-------------|
| `OverusedWords` | warning | Flags "actually", "very", "just", etc. |
| `PassiveVoice` | warning | Detects passive voice constructions |
| `EmDash` | error | Ensures no spaces around em dashes |
| `OxfordComma` | warning | Encourages Oxford comma usage |
| `ClickHere` | error | Flags "click here" link text |
| `StartWithThis` | warning | Avoids sentences starting with "This" |
| `WeHaveWeGet` | warning | Avoids "We have" / "We get" openings |
| `Cliches` | warning | Flags business jargon and clichés |
| `Percentages` | error | Enforces "X percent" not "X%" |
| `CompanyPronouns` | suggestion | Companies as "it" not "they" |
| `BoldEmphasis` | warning | Italics only, not bold for emphasis |
| `Numbers` | suggestion | Spell out 1-9, numerals for 10+ |
| `Ellipsis` | warning | No space before ellipsis |
| `OverUnder` | warning | Use "more/fewer than" not "over/under" |
| `Adverbs` | suggestion | Flags cuttable adverbs |

## Alert Levels

- **error**: Must fix before publishing
- **warning**: Should fix, may have exceptions
- **suggestion**: Consider fixing, style preference

## Integration with /writing:review

The `/writing:review` command automatically runs Vale if configured:

```bash
# In your project, run init first
claude /writing:init

# Vale will be run as part of review
claude /writing:review drafts/my-post/draft-v1.md
```

## Customizing Rules

Edit the YAML files in `vale/Every/` to:
- Add new forbidden words to `OverusedWords.yml`
- Add industry-specific clichés to `Cliches.yml`
- Adjust severity levels (`level: error|warning|suggestion`)

## Example Output

```
drafts/my-post.md
 3:15  warning  Avoid overusing 'actually' — it     Every.OverusedWords
               can almost always be deleted.
 7:1   warning  Avoid starting sentences with       Every.StartWithThis
               'This' — be specific about what
               you're referring to.
12:45  error    Em dashes should not have spaces    Every.EmDash
               around them. Use '—' not ' — '
```

## CI Integration

Add to your CI pipeline:

```yaml
# GitHub Actions example
- name: Lint prose
  run: |
    brew install vale
    vale --config=.vale.ini drafts/
```
