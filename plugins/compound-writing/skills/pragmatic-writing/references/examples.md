# Pragmatic Writing Examples

Before/after transformations showing the techniques in action.

## Example 1: API Documentation

### Before (Dry, Abstract)

> The Authentication module provides mechanisms for verifying user credentials and managing session state. It implements the OAuth 2.0 specification and supports multiple grant types including authorization_code, client_credentials, and refresh_token flows.

### After (Pragmatic)

> **Getting Users Logged In**
>
> Your app needs to know who's making requests. Here's the simplest path:
>
> ```ruby
> # In your controller
> token = request.headers['Authorization']
> user = Auth.verify(token)
> ```
>
> That's it for reading. The token comes from your login flow, which we'll set up next.
>
> (We support OAuth 2.0 with authorization_code, client_credentials, and refresh_token flows. But let's start with the basics.)

## Example 2: Design Pattern Explanation

### Before (Textbook)

> The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it. This pattern is useful when you have multiple algorithms for a specific task and want to switch between them at runtime.

### After (Pragmatic)

> **Swapping Algorithms at Runtime**
>
> Say you're building a pricing calculator. Some customers get standard pricing. VIPs get 20% off. Enterprise clients have custom negotiated rates.
>
> The naive approach:
>
> ```ruby
> def calculate_price(customer, items)
>   case customer.type
>   when :standard
>     items.sum(&:price)
>   when :vip
>     items.sum(&:price) * 0.8
>   when :enterprise
>     # 50 lines of custom logic
>   end
> end
> ```
>
> Every new customer type means editing this method. Testing is a nightmare. And that enterprise logic? Nobody wants to touch it.
>
> Instead, make each pricing approach its own object:
>
> ```ruby
> class StandardPricing
>   def calculate(items)
>     items.sum(&:price)
>   end
> end
>
> class VipPricing
>   def calculate(items)
>     items.sum(&:price) * 0.8
>   end
> end
>
> # Usage
> pricing = customer.pricing_strategy
> total = pricing.calculate(items)
> ```
>
> Now adding a new customer type is adding a new class. No touching existing code. Each strategy can be tested in isolation.
>
> That's the Strategy pattern: algorithms as interchangeable objects.

## Example 3: Error Handling Guide

### Before (Formal)

> Error handling should be implemented consistently throughout the application. All exceptions should be caught at appropriate boundaries and either handled or re-thrown with additional context. Logging should capture sufficient information for debugging while avoiding sensitive data exposure.

### After (Pragmatic)

> **When Things Go Wrong**
>
> Errors happen. The question isn't if, but what you do when they do.
>
> The worst thing:
>
> ```ruby
> begin
>   do_risky_thing
> rescue
>   # Silent failure. Good luck debugging this at 3 AM.
> end
> ```
>
> The second worst thing:
>
> ```ruby
> begin
>   do_risky_thing
> rescue => e
>   puts e.message  # Hope someone's watching stdout!
>   raise  # Now we have two problems
> end
> ```
>
> Here's what actually helps:
>
> ```ruby
> begin
>   do_risky_thing(user_id: user.id)
> rescue NetworkError => e
>   # Expected failure, handle gracefully
>   ErrorTracker.capture(e, user_id: user.id)
>   return fallback_response
> rescue => e
>   # Unexpected failure, add context and escalate
>   raise ContextualError.new(
>     "Failed processing user #{user.id}",
>     cause: e
>   )
> end
> ```
>
> Notice:
> 1. We catch *specific* errors we know how to handle
> 2. We add context (the user_id) for debugging
> 3. Unexpected errors get wrapped with context, not swallowed
>
> > **Tip**: Every `rescue` without a specific exception type is a code smell. What exactly are you expecting to fail?

## Example 4: Performance Optimization

### Before (Generic)

> Performance optimization should focus on identifying bottlenecks through profiling before implementing changes. Premature optimization can lead to unnecessary complexity. Database queries are often the primary source of performance issues in web applications.

### After (Pragmatic)

> **Your App Is Slow. Now What?**
>
> First rule: **measure, don't guess**.
>
> I once spent a week optimizing a sorting algorithm only to discover the actual bottleneck was a DNS lookup. Don't be me.
>
> Here's the debugging order:
>
> ```
> 1. Is it the database?
>    → Check slow query log. 90% of the time, it's here.
>
> 2. Is it N+1 queries?
>    → user.posts.each { |p| p.author.name }
>    → That's 1 query for posts + N queries for authors
>
> 3. Is it memory?
>    → Loading 10,000 records into memory to count them?
>    → Use User.count, not User.all.size
>
> 4. Is it external services?
>    → API calls inside loops are death
>    → Batch them or cache them
> ```
>
> Once you've measured and found the bottleneck:
>
> ```ruby
> # Before: 47 queries, 2.3 seconds
> posts = user.posts
> posts.each { |p| render p.author.name }
>
> # After: 2 queries, 0.1 seconds
> posts = user.posts.includes(:author)
> posts.each { |p| render p.author.name }
> ```
>
> That's it. One word: `includes`. 23x faster.
>
> > **The real tip**: The fastest code is the code that doesn't run. Can you cache it? Can you skip it? Can you do it later?

## Example 5: Testing Philosophy

### Before (Textbook)

> Unit tests should verify the behavior of individual components in isolation. Tests should be deterministic, fast, and independent of external state. Mock objects can be used to isolate the system under test from its dependencies.

### After (Pragmatic)

> **Tests That Actually Help**
>
> Bad tests are worse than no tests. They slow you down, break randomly, and give false confidence.
>
> Here's a bad test:
>
> ```ruby
> test "user is valid" do
>   user = User.new(name: "Bob", email: "bob@test.com")
>   assert user.valid?
> end
> ```
>
> What does this actually test? That `User.new` works? That `valid?` returns a boolean? When this test fails, what do you learn?
>
> Here's a useful test:
>
> ```ruby
> test "user requires email to be unique" do
>   User.create!(email: "taken@test.com")
>   duplicate = User.new(email: "taken@test.com")
>
>   assert_not duplicate.valid?
>   assert_includes duplicate.errors[:email], "has already been taken"
> end
> ```
>
> This test:
> - Documents a business rule (unique emails)
> - Fails with a meaningful message if the rule breaks
> - Won't pass accidentally
>
> > **The test you need**: Write the test that would have caught last week's bug. That's usually the test worth writing.
