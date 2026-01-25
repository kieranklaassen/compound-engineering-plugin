# Structural Fork Pattern

How to maintain a fork with local structural changes while staying synced with upstream content.

## Problem

You want to fork a project and add structural improvements (build systems, configuration layers, reorganization) but still receive content updates from upstream without merge conflicts.

## Solution

Separate **structure** from **content** by introducing an indirection layer:

```
upstream/
├── components/        # Source of truth upstream
│   └── feature.md

your-fork/
├── _source/           # Your source of truth (synced from upstream)
│   └── components/
│       └── feature.md
├── components/        # Generated output (ignored or committed)
│   └── feature.md
├── bin/build          # Your structural addition
└── config.json        # Your structural addition
```

## Key Principles

1. **Upstream content → `_source/`**: Sync upstream files into a source directory
2. **Build system generates output**: Your tooling reads `_source/` and produces the final structure
3. **Path mapping**: Simple prefix transformation (`components/x` → `_source/components/x`)
4. **Sync script**: Automates fetching, diffing, and applying upstream changes to `_source/`

## Implementation

### 1. Create the indirection

Move upstream content into `_source/`:
```bash
mkdir _source
mv components _source/
```

### 2. Build script

Create `bin/build` that copies from `_source/` to output, applying any transformations:
```ruby
# Read config, copy enabled components from _source/ to output
config = JSON.parse(File.read("config.json"))
enabled = filter_components(config)
enabled.each { |c| copy_component(c) }
```

### 3. Sync script

Create `bin/sync-upstream` that:
1. Fetches upstream
2. Diffs upstream paths against `_source/` paths
3. Shows changes interactively
4. Applies approved changes
5. Runs build

```bash
# Map upstream path to local path
map_path() {
  echo "$1" | sed 's|project/|project/_source/|'
}

# Extract file from upstream and write to _source
git show "upstream/main:$upstream_path" > "$local_path"
```

## Benefits

- **No merge conflicts**: Upstream changes apply cleanly to `_source/`
- **Full control**: Your build system can filter, transform, or enhance
- **Clear separation**: Structure changes live outside `_source/`, content inside
- **Easy upgrades**: Run sync script, review diffs, rebuild

## Trade-offs

- **Extra indirection**: Two copies of content (source + output)
- **Build step required**: Changes need rebuild to take effect
- **Manual sync**: Must remember to run sync periodically

## When to Use

- Adding configuration/filtering layers to plugins or packages
- Wrapping upstream tools with custom build systems
- Maintaining forks with organizational improvements
- Any case where you modify HOW content is used, not WHAT the content is

## Example: Plugin with Configurable Components

This pattern powers the compound-engineering plugin fork:

- **Upstream**: All agents/commands/skills in flat directories
- **Fork adds**: `_source/` indirection, `bin/build`, `compound.config.json`
- **Benefit**: Users can enable/disable components without forking again
- **Sync**: `bin/sync-upstream` keeps content current with upstream improvements
