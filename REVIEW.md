# Review instructions

Next.js site for Tioga AI (tioga.ai). This repo is PUBLIC and every review
comment is public too: never quote secrets, internal notes or client details.
Read `CLAUDE.md` and `design.md` before judging UI changes.

## Prioritise (flag these)

1. Secrets and private material. API keys, tokens, `.env` values, passwords,
   internal URLs, client names or data, and non-public assets (videos,
   recordings, internal datasets) committed under `public/` or anywhere else.
   Gated content belongs in private storage behind a route, not in git.
2. Broken navigation. Links, `href`s, redirects (`vercel.json`,
   `next.config.js`, `middleware.ts`) and routes that point to a missing page;
   pages missing from `app/sitemap.ts`; removed pages with no redirect.
3. Wording rules (public copy, metadata, `llms.txt`, chatbot and email-agent
   prompts in `lib/`):
   - Say "principal-led practice". Never "solo practice", "solo-run",
     "at least for now" or "team to staff up".
   - Never imply a bench, client roster, case studies, testimonials or logos
     that do not exist. Demos are described as demos, dated data as dated.
   - Do not call a control Tioga built "independent" or "independently
     verified". No "multi-vendor" or vendor-tie claims that are not true today.
   - No unqualified compliance, certification or "guaranteed" claims.
4. Offer and pricing consistency. The service catalog (`PRACTICES` in
   `app/services/page.tsx`) is the source of truth. Any price, scope,
   deliverable, duration or offer name elsewhere (home, discovery-sprint,
   contact, lp/*, solutions, changelog, `lib/*prompts*.ts`) must match it.
   Flag a number that appears in two places with two values.
5. Design system. No raw hex colours in components; use `var(--token)` from
   `app/globals.css`. Exceptions: 8-digit hex with alpha, and
   `app/opengraph-image.tsx`. Do not use `bg-brand-*` Tailwind classes.
6. Accessibility. Images without `alt`, icon-only buttons or links without an
   accessible name, heading-level skips, missing form labels, low contrast,
   focus states removed, motion with no `prefers-reduced-motion` fallback.
7. Build and types. Anything that would fail `npm run lint` (zero warnings
   allowed), `next build` or `tsc`; server-only code or env vars leaking into
   client components; new `NEXT_PUBLIC_*` variables holding sensitive values.
8. Tests. Copy changes that contradict a guard in `tests/` (those specs encode
   past wording decisions). A behaviour change with no test update is worth a note.

## Skip (do not comment)

- Formatting, import order, quote style, naming taste: ESLint and Prettier own these.
- Generated or lockfile noise (`package-lock.json`, `tsconfig.tsbuildinfo`,
  `test-results/`) unless a dependency change looks unintended.
- Tailwind class ordering and pre-existing issues the PR did not touch.

## Style of review

- Keep each comment short: the problem, the file and line, one suggested fix.
- Group repeated instances of one issue into a single comment.
- Mark severity (blocker, should fix, nit) and cap nits at three.
- If nothing in the list above applies, say so in one line.
