# Pragmatic Writing Techniques

Detailed guide to the 10 core techniques with extended examples.

## 1. Concrete Before Abstract

The most important technique. Never explain a concept before showing it.

### The Pattern

```
1. Show the problem scenario
2. Show the naive/common approach
3. Show it failing
4. Reveal the better approach
5. NOW explain the principle
```

### Extended Example

**Bad (abstract first):**
> The Observer pattern is a software design pattern in which an object, named the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes.

**Good (concrete first):**
> You've got a spreadsheet. Cell A1 contains "10". Cell B1 contains "=A1 * 2". Change A1 to "20", and B1 instantly shows "40".
>
> That's the Observer pattern. B1 is *observing* A1. When A1 changes, B1 gets notified and updates itself.
>
> In code, you might have an Order that needs to notify Inventory, Shipping, and EmailService when it's placed. Instead of the Order calling all three directly...

## 2. Physical Analogies Catalog

### Software Abstraction → Physical Tool

- **Interface** → Power outlet (anything with the right plug works)
- **Caching** → Keeping frequently used tools on your workbench
- **Load balancing** → Multiple checkout lanes at a grocery store
- **Queue** → Line at the DMV
- **Stack** → Stack of plates (last one on is first one off)

### Design Pattern → Architectural Pattern

- **Factory** → Bakery (you order "bread", they handle the recipe)
- **Singleton** → The President (only one at a time)
- **Decorator** → Gift wrapping (adds features without changing the gift)
- **Adapter** → Travel power adapter (makes incompatible things work)

### System Design → Everyday System

- **Microservices** → Restaurant kitchen (grill station, salad station, dessert station)
- **Monolith** → Home kitchen (one person does everything)
- **Event sourcing** → Bank statement (every transaction recorded, balance calculated)
- **API Gateway** → Hotel concierge (single point of contact, routes requests)

## 3. Conversational Register Markers

### Use These

- "Let's say..." (introduces scenarios)
- "Here's the thing..." (pivots to key insight)
- "Now, you might be thinking..." (addresses objections)
- "I've seen this go wrong when..." (shares experience)
- "The trick is..." (reveals technique)

### Avoid These

- "It should be noted that..."
- "One must consider..."
- "The implementation thereof..."
- "As previously mentioned..."
- "In conclusion..."

## 4. Humor Patterns

### The Absurdist Example

Show a bad pattern taken to its extreme:

> If we followed this logic, we'd have a `StringUtils` class with methods like `addOneToNumber(String s)` that parses the string to an int, adds one, and converts back to a string.
>
> Don't laugh. I've seen it in production code.

### The Self-Deprecating Admission

> I spent three hours debugging a race condition before noticing I'd typed `=` instead of `==`. We've all been there. That's why we have linters.

### The Unexpected Comparison

> Debugging is like being the detective in a crime movie where you are also the murderer.

## 5. The "Aha!" Structure Template

```markdown
## [Problem Statement as Question]

You've probably encountered [familiar situation].

The obvious approach is [common solution]:

```code
[naive implementation]
```

This works... until [edge case or scale issue].

[Show the failure scenario]

The insight is: [key realization]

Instead, we can:

```code
[better implementation]
```

Notice how [specific improvement]. This is the principle of [named concept]:

> **[Principle Box]**: [One-sentence version of the insight]
```

## 6. Paragraph Length Guide

### One-sentence paragraphs for:
- Key insights
- Dramatic revelations
- Punchy conclusions
- Transitions

### Two-sentence paragraphs for:
- Quick examples
- Brief asides
- Setup before code

### Three-four sentence paragraphs for:
- Explanations
- Scenarios
- Analysis

### Never more than four sentences.

## 7. Code Example Guidelines

### Minimal
Remove everything not essential to the point.

```ruby
# ❌ Too much
class UserService
  def initialize(repository, logger, cache, config)
    @repository = repository
    @logger = logger
    @cache = cache
    @config = config
  end

  def find_user(id)
    @logger.info("Finding user #{id}")
    cached = @cache.get("user:#{id}")
    return cached if cached
    user = @repository.find(id)
    @cache.set("user:#{id}", user, ttl: @config.cache_ttl)
    user
  end
end

# ✅ Just enough
class UserService
  def initialize(repository)
    @repository = repository  # Injected, not created
  end

  def find_user(id)
    @repository.find(id)
  end
end
```

### Progressive
Show evolution from broken to fixed.

```ruby
# First attempt (broken)
def process(items)
  items.each { |i| save(i) }  # What if one fails?
end

# Second attempt (better)
def process(items)
  items.each do |i|
    save(i)
  rescue => e
    log_error(e)  # But we continue with bad data...
  end
end

# Final (robust)
def process(items)
  results = items.map { |i| [i, safely_save(i)] }
  failures = results.select { |_, success| !success }
  raise BatchError, failures if failures.any?
end
```

## 8. Principle Box Formats

### Numbered Tip
> **Tip 23: Don't Repeat Yourself**
> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

### Highlighted Insight
> 💡 **The key insight**: Complexity isn't the enemy. *Unnecessary* complexity is.

### Warning Box
> ⚠️ **Watch out**: If you find yourself adding a boolean parameter, you probably need two methods.

## 9. Friendly Warning Pattern

```markdown
It's tempting to [common mistake] because [why it seems reasonable].

I've done this. [Brief admission of your own mistake]

The problem emerges when [specific failure scenario]:

[Show what goes wrong]

Instead, [better approach]:

[Show the fix]
```

## 10. Callback Examples

### Open with question, close with answer

**Opening**: "Why do we bother with tests if we're just going to rewrite everything?"

**Closing**: "So why bother with tests? Because they're not protecting the code. They're protecting the behavior. The code can change; the contract shouldn't."

### Open with scenario, close with transformation

**Opening**: "It's 3 AM. Your pager goes off. The database is on fire."

**Closing**: "Now when your pager goes off at 3 AM—and it will—you'll have the logs, the metrics, and the runbooks to handle it. You might even get back to sleep."
