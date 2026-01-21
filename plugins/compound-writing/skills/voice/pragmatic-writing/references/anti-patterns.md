# Seven Deadly Sins of Technical Writing

Anti-patterns to avoid, with examples and fixes.

## 1. The Abstract Opening

Starting with definitions instead of examples.

### The Sin

> "Dependency injection is a design pattern in software engineering whereby one object supplies the dependencies of another object."

The reader's eyes glaze over before they understand why they should care.

### The Fix

Start with a problem they recognize:

> "Your tests are slow because every test spins up a real database connection. Let's fix that."

Then show the solution. *Then* name the pattern.

## 2. The Wall of Text

Paragraphs that go on and on, packing multiple ideas into dense blocks of text that require re-reading to understand, without any visual breaks to help the reader parse the information or take a breath between concepts.

### The Sin

The paragraph above. Did you read it? Or did you skim?

### The Fix

One idea per paragraph.

Short paragraphs are easier to scan.

They create rhythm.

And they emphasize key points.

Like this one.

## 3. The Passive Epidemic

### The Sin

> "The configuration file is read by the application when it is started. The values are validated and errors are logged if issues are found. The settings are then cached for performance."

Who's doing what? It's unclear. It's boring. It sounds like a legal document.

### The Fix

> "When your app starts, it reads the configuration file. It validates each value and logs any errors. Then it caches the settings so future reads are instant."

Active voice. Clear actors. Engaging rhythm.

## 4. The Jargon Dump

### The Sin

> "Leverage the microservice architecture's eventual consistency model to optimize throughput while maintaining idempotency across distributed transactions."

This might be technically accurate. It's also unreadable.

### The Fix

Either:
1. Define terms on first use
2. Use simpler words
3. Show an example first

> "When you split your app into services, they can't share a database. So Service A might update before Service B knows about it. Here's how to handle that gap..."

## 5. The Code Novel

### The Sin

```ruby
# This is a comprehensive example demonstrating the full implementation
# of a user authentication service including all edge cases, error
# handling, logging, caching, and rate limiting functionality.

class AuthenticationService
  RATE_LIMIT = 100
  CACHE_TTL = 3600

  def initialize(user_repository, token_service, cache, logger, rate_limiter)
    @user_repository = user_repository
    @token_service = token_service
    @cache = cache
    @logger = logger
    @rate_limiter = rate_limiter
  end

  # ... 100 more lines ...
end
```

By line 20, the reader has forgotten what point you were making.

### The Fix

Show only what's necessary for the current point:

```ruby
class AuthenticationService
  def initialize(user_repository)
    @users = user_repository  # Injected, not created
  end
end
```

Then say: "We'll add caching and rate limiting in the next section."

## 6. The Disclaimer Flood

### The Sin

> "While there are many approaches to this problem, and your mileage may vary depending on your specific circumstances, and this isn't intended as professional advice, and you should consult your team lead before implementing, one possible approach that might work in some cases is..."

By the time you get to the point, the reader has left.

### The Fix

State your recommendation clearly:

> "Use connection pooling. Here's why and how."

Add caveats at the end if needed, not before.

## 7. The Missing Why

### The Sin

> "Step 1: Add `gem 'sidekiq'` to your Gemfile
> Step 2: Run `bundle install`
> Step 3: Create a worker class
> Step 4: Configure Redis
> Step 5: Start the Sidekiq process"

The reader follows the steps but doesn't understand what they're building or why each step matters.

### The Fix

Start with the problem:

> "Your app freezes for 10 seconds when sending emails. Users hate it. You hate it.
>
> The fix: send emails in the background. When a user signs up, you add "send welcome email" to a queue and immediately return. A separate process handles the queue.
>
> Let's set that up..."

Now the steps have context.

---

## Quick Reference: Warning Signs

Your writing might be slipping if you see:

| Warning Sign | Probable Sin |
|--------------|--------------|
| "is defined as" in the first paragraph | Abstract Opening |
| Paragraphs over 5 lines | Wall of Text |
| "is/was/are/were" more than 30% of verbs | Passive Epidemic |
| More than 3 technical terms without explanation | Jargon Dump |
| Code examples over 30 lines | Code Novel |
| First sentence contains "while", "although", "however" | Disclaimer Flood |
| Tutorial without "why" explanation | Missing Why |
