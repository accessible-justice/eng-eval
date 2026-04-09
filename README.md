# Engineering Evaluation

This is a short take-home exercise. We want to understand how you approach real engineering problems — not how fast you can produce code.

## What we actually care about

- Can you **verify** that your code is correct — not just that it runs?
- Can you **explain** a decision, not just make one?
- Can you **evolve** code when requirements change — not just write it once?
- Can you **spot** problems in existing code, not just generate new code?

Speed is not a signal. Judgment is.

## Time commitment

**Plan for 2–4 hours.** A focused, well-reasoned partial solution is better than a rushed complete one.

## The setup

This repo has a minimal TypeScript + Express skeleton — a basic server, one stub route, a shared type. It's intentionally sparse.

You're free to:
- Restructure the code if you think it helps
- Add dependencies (justify them briefly)
- Improve things you notice along the way — note what and why

## Tasks

See the [open issues](../../issues). Each is self-contained.

**Prioritize Issue 1**, then pick from the rest based on time and interest. You don't need to complete all of them.

Issue 5 is a debug task — recommended if you want to demonstrate code review instincts.

## What we look for in every task

Each issue asks you to:
1. **Implement or analyze** something concrete
2. **Explain your reasoning** — tradeoffs, structure, alternatives you considered
3. **Handle a follow-up change** — shows whether your design survives contact with reality
4. **Think about correctness** — edge cases, failure modes, how you'd verify it works

We've deliberately left some things open-ended. If you make an assumption, write it down — that's what we'd expect on the job.

## Submission

1. Fork this repo
2. Create a branch: `eval/<your-name>`
3. Open a pull request back to this repo
4. In your PR description:
   - What you built and why you structured it that way
   - What the follow-up change revealed about your initial design
   - What edge cases or failure modes you considered
   - What you'd do differently with more time
   - Questions you'd ask if this were a real project

## A note on AI tools

You're welcome to use AI tools. What we're evaluating is your **judgment** — your ability to verify, critique, and reason about code, not just produce it. If you use AI-generated code you can't explain or defend, that will be visible in the review conversation.
