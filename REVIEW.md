# REVIEW.md: what to check on pull requests to tioga-ai-website

This repository is **public**. Review comments are public too. Do not quote, paraphrase or hint at anything private in a comment.

## Flag as a problem (blocking in spirit; you never block the merge)

1. **Private material committed.** Videos, internal data, client names, account numbers, API keys, `.env` files, or anything under a password-gated page's real source. Private assets belong in private storage (Vercel Blob), never in git. If in doubt, flag it.
2. **Hard-coded colors.** Every color must use a CSS custom property from `app/globals.css` (`var(--accent)`, `var(--bg-card)`, `var(--error)`). A raw 6-digit hex literal is a violation. Allowed exceptions: 8-digit hex with an alpha suffix for translucent tints, and `app/opengraph-image.tsx` (its renderer cannot use `var()`). A genuinely new color needs a new named token in `:root` first.
3. **Dead Tailwind brand classes.** `bg-brand-*` and the other `brand.*` colors in `tailwind.config.ts` are unused and stale. New UI must not use them.
4. **Identity and wording.**
   - The founder is anonymous by decision: no founder name, photo or personal profile link in page copy, metadata or structured data.
   - Do not describe the business as a "solo practice" or state a headcount. The approved wording is "principal-led practice".
   - The legal entity is Tiogasoft, L.L.C.; "Tioga AI" is the trade name. Do not call it a C-corp or Inc.
5. **Unverified claims in copy.** No client results, statistics, named customers, certifications or "independent" claims that the PR does not source. A claim with no cited source in the PR description or an adjacent comment is a finding.
6. **Outbound promises.** Copy that implies a delivered engagement, a signed client or a live product that does not exist yet.

## Flag as a suggestion

- New UI that skips the shapes in `design.md` (border radius by role, card and button patterns, slate grays, the typography scale).
- The slop watchlist in `design.md`: off-palette gradients or glows, sparkle/rocket/robot icons, identical card grids, several focal points in one view, buzzwords such as "supercharge" or "seamless", pill-shaped primary buttons, text over busy imagery.
- Accessibility regressions: missing alt text, unlabeled controls, focus order, contrast that depends on a non-token color. CI runs the a11y spec.
- Routes, sitemap, `llms.txt` or `/offers.json` that no longer agree with the page copy they describe.

## Do not flag

- Style nits that `npm run lint` already enforces (`eslint . --max-warnings 0`).
- The historical, stale parts of `NEXT_STEPS.md` (its dark navy and cyan description predates the 2026-09-01 redesign).
- Anything outside the diff.

## How to report

- Lead with the highest-severity item. Name the file and line.
- Say what the rule is and which section above it comes from. One sentence per finding.
- If a finding depends on something you cannot see in the PR (a source, a decision), say so instead of asserting it.
- Never approve or block. Never request secrets or private context.

CI for context: `.github/workflows/e2e.yml` runs lint (zero warnings) and the Playwright structural and a11y specs on every push and pull request; `prod-health-check.yml` runs daily against production.
