---
name: agent-browser
description: Automate browser interactions for web testing, form filling, screenshots, and data extraction using Vercel's agent-browser CLI
---

# Agent Browser

Headless browser automation CLI for AI agents. Fast Rust CLI with Node.js fallback.

## Quick Start

```bash
# Install globally
npm install -g agent-browser
agent-browser install  # Download Chromium

# Basic workflow
agent-browser open https://example.com
agent-browser snapshot -i  # Get interactive elements
agent-browser click @e1    # Interact with elements
agent-browser close
```

## Core Workflow

1. **Navigate** to a page using `agent-browser open <url>`
2. **Capture** page state with `agent-browser snapshot -i`
3. **Interact** using element references (like `@e1`, `@e2`)
4. **Close** browser with `agent-browser close`

## Commands Reference

### Navigation

| Command | Description |
|---------|-------------|
| `agent-browser open <url>` | Navigate to URL |
| `agent-browser back` | Go back in history |
| `agent-browser forward` | Go forward in history |
| `agent-browser reload` | Refresh page |
| `agent-browser close` | Terminate session |

### Page Analysis

| Command | Description |
|---------|-------------|
| `agent-browser snapshot` | Full accessibility tree |
| `agent-browser snapshot -i` | Interactive elements only (recommended) |
| `agent-browser snapshot -c` | Compact output |
| `agent-browser snapshot -d 3` | Limit depth to 3 |

### Interactions

| Command | Description |
|---------|-------------|
| `agent-browser click @e1` | Click element |
| `agent-browser dblclick @e1` | Double-click |
| `agent-browser fill @e2 "text"` | Clear and type |
| `agent-browser type @e2 "text"` | Type without clearing |
| `agent-browser press Enter` | Press individual keys |
| `agent-browser press Control+a` | Key combinations |
| `agent-browser hover @e1` | Hover element |
| `agent-browser check @e1` | Check checkbox |
| `agent-browser uncheck @e1` | Uncheck checkbox |
| `agent-browser select @e1 "value"` | Dropdown selection |
| `agent-browser scroll down 500` | Page scrolling |
| `agent-browser scrollintoview @e1` | Scroll element into view |

### Information Retrieval

| Command | Description |
|---------|-------------|
| `agent-browser get text @e1` | Extract element text |
| `agent-browser get value @e1` | Get input value |
| `agent-browser get title` | Page title |
| `agent-browser get url` | Current URL |

### Screenshots

| Command | Description |
|---------|-------------|
| `agent-browser screenshot` | Output to stdout |
| `agent-browser screenshot path.png` | Save to file |
| `agent-browser screenshot --full` | Full page capture |

### Waiting

| Command | Description |
|---------|-------------|
| `agent-browser wait @e1` | Wait for element presence |
| `agent-browser wait 2000` | Wait milliseconds |
| `agent-browser wait --text "Success"` | Wait for text |
| `agent-browser wait --load networkidle` | Network idle state |

### Semantic Locators

Alternative to element references:

```bash
agent-browser find role button click --name "Submit"
agent-browser find text "Sign In" click
agent-browser find label "Email" fill "user@test.com"
```

## Examples

### Form Submission

```bash
agent-browser open https://example.com/form
agent-browser snapshot -i
# Elements return with refs: email (@e1), password (@e2), button (@e3)
agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i
```

### Authentication State Persistence

```bash
# Initial login
agent-browser open https://app.example.com/login
agent-browser fill @e1 "username"
agent-browser fill @e2 "password"
agent-browser click @e3
agent-browser wait --url "**/dashboard"
agent-browser state save auth.json

# Reuse saved state
agent-browser state load auth.json
agent-browser open https://app.example.com/dashboard
```

### Parallel Sessions

```bash
agent-browser --session test1 open site-a.com
agent-browser --session test2 open site-b.com
agent-browser session list
```

## Advanced Features

### JSON Output

For programmatic parsing:

```bash
agent-browser snapshot -i --json
agent-browser get text @e1 --json
```

### Debugging

```bash
agent-browser open example.com --headed  # Show browser window
agent-browser console                     # View console messages
agent-browser errors                      # View page errors
```

## Installation

### Via npm (recommended)

```bash
npm install -g agent-browser
agent-browser install  # Download Chromium
```

### Linux Dependencies

```bash
agent-browser install --with-deps
# or manually:
npx playwright install-deps chromium
```

## When to Use

This skill should be used when you need to:

- Navigate websites and interact with web pages
- Fill forms and submit data
- Take screenshots for documentation or testing
- Extract information from web pages
- Test web applications
- Automate repetitive browser tasks

## Repository

[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)
