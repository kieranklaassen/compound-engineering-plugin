# Example Voice Profiles

Sample voice profiles demonstrating the format.

## Example 1: DHH (David Heinemeier Hansson)

```yaml
name: dhh-blog

traits:
  - direct
  - opinionated
  - contrarian

register: informal

prohibited:
  - hedge words (seems, might, perhaps)
  - passive voice (except for emphasis)
  - corporate buzzwords (synergy, leverage, optimize)
  - exclamation marks (unless ironic)
  - "I think" or "in my opinion" (implied)

vocabulary:
  signature_words:
    - "bullshit"
    - "vanilla"
    - "majestic"
    - "heresy"
  formality: casual-professional
  complexity: moderate
  contractions: always

sentences:
  average_length: 12
  fragment_usage: frequent
  opening_preference: subject-verb

paragraphs:
  average_length: 2-3
  white_space: airy
  structure: claim-evidence

rhythm:
  pacing: punchy
  rule_of_three: frequent
  em_dash: occasional
  semicolon: rare

tone:
  primary: confident
  secondary: provocative
  stakes: medium-high
  distance: conversational

channels:
  blog:
    length: "500-1500 words"
    personality: "full"
    controversy: "welcomed"
  twitter:
    length: "single tweet preferred"
    personality: "concentrated"
    controversy: "frequent"

exemplars:
  - text: "Most meetings are a waste of time. Not some. Most."
    demonstrates: ["short sentences", "contrarian", "repetition"]
  - text: "We don't do free. We don't do enterprise. $99. Done."
    demonstrates: ["fragments", "rule of three", "directness"]
```

## Example 2: Joel Spolsky

```yaml
name: joel-on-software

traits:
  - analytical
  - humorous
  - storytelling

register: conversational

prohibited:
  - jargon without explanation
  - abstract theory without concrete examples
  - formal academic tone
  - passive voice (mostly)

vocabulary:
  signature_words:
    - "leaky abstractions"
    - "Joel Test"
    - "shlemiel the painter"
  formality: casual-technical
  complexity: moderate-high (explained)
  contractions: yes

sentences:
  average_length: 18
  fragment_usage: occasional
  opening_preference: varied

paragraphs:
  average_length: 3-4
  white_space: moderate
  structure: story-point-lesson

rhythm:
  pacing: varied
  parenthetical_asides: frequent
  em_dash: occasional
  footnotes: rare

tone:
  primary: explanatory
  secondary: witty
  stakes: medium
  distance: friendly-expert

channels:
  blog:
    length: "1500-3000 words"
    personality: "full, storytelling"
    humor: "embedded throughout"
  documentation:
    length: "as needed"
    personality: "reduced but present"
    humor: "occasional"

exemplars:
  - text: "The Joel Test is a quick measure of the quality of a software team. The higher the score, the better the team. No, it's not perfect, but it's fast and pretty good."
    demonstrates: ["conversational", "practical", "self-aware"]
  - text: "Shlemiel gets a job as a street painter, painting the dotted lines down the middle of the road..."
    demonstrates: ["storytelling", "physical analogy", "setup-punchline"]
```

## Example 3: Paul Graham

```yaml
name: paul-graham-essays

traits:
  - exploratory
  - philosophical
  - building-arguments

register: semiformal

prohibited:
  - starting with conclusions
  - excessive qualification
  - jargon without setup

vocabulary:
  signature_words:
    - "ramen profitable"
    - "do things that don't scale"
    - "frighteningly ambitious"
  formality: intellectual-accessible
  complexity: high (earned)
  contractions: some

sentences:
  average_length: 22
  fragment_usage: rare
  opening_preference: statement

paragraphs:
  average_length: 4-5
  white_space: moderate-dense
  structure: logical-progression

rhythm:
  pacing: measured
  nested_clauses: accepted
  em_dash: frequent
  semicolon: occasional

tone:
  primary: thoughtful
  secondary: counterintuitive
  stakes: medium
  distance: intellectual-peer

channels:
  essay:
    length: "2000-4000 words"
    personality: "reflective"
    structure: "meandering toward insight"

exemplars:
  - text: "Don't just not be evil. Be good."
    demonstrates: ["moral clarity", "concision", "building on negation"]
  - text: "The way to get startup ideas is not to try to think of startup ideas."
    demonstrates: ["counterintuitive", "paradox setup", "memorable"]
```

## Example 4: Corporate Neutral (Anti-Example)

```yaml
name: corporate-neutral
description: "What NOT to do - included for contrast"

traits:
  - hedged
  - safe
  - buzzword-laden

register: formal

vocabulary:
  signature_words:
    - "leverage"
    - "synergy"
    - "value proposition"
    - "best-in-class"
  formality: corporate-formal
  complexity: low-disguised-as-high
  contractions: never

sentences:
  average_length: 28
  fragment_usage: never
  opening_preference: "There are/It is"

paragraphs:
  average_length: 6+
  white_space: dense
  structure: circular

tone:
  primary: safe
  secondary: defensive
  stakes: artificially high
  distance: distant

problems:
  - "Says nothing memorable"
  - "Could be any company"
  - "No human voice"
  - "Exhausting to read"

exemplar_bad:
  - text: "We are excited to announce a strategic initiative designed to enhance our value proposition through synergistic partnerships that will drive innovation across our ecosystem."
    problems: ["no meaning", "all buzzwords", "passive framing"]
```

## Using These Profiles

### For Matching Voice

Compare your writing to the exemplars:
1. Read the exemplar aloud
2. Read your writing aloud
3. Do they sound like the same person?

### For Voice Guardian Scoring

When scoring voice match:
- Check against prohibited words
- Compare sentence length
- Verify tone matches
- Look for signature vocabulary

### For Learning Style

Study the difference between profiles:
- DHH: Short, punchy, contrarian
- Joel: Story-driven, explanatory
- Paul Graham: Exploratory, builds arguments
- Corporate: Avoid at all costs
