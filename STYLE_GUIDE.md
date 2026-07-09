# Style Guide

## Recommended Direction

Use option 1: Premium Dark Fitness.

The app is a daily performance dashboard, so dark default fits the context better than a bright clinical dashboard. Red should signal energy and focus, not dominate the interface.

## Evaluated Options

1. Premium Dark Fitness
   - Best fit for a polished training dashboard.
   - Supports focused evening/mobile use.
   - Current recommendation and implementation.

2. Clean White Performance
   - Strong option for later if the app becomes more analytical.
   - Less distinctive for the initial fitness product feel.

3. Hybrid Adaptive Theme
   - Good later direction.
   - Dark should come first; light mode can follow once core workflows stabilize.

## Palette

- Background: near-black and charcoal.
- Surface: matte dark cards with subtle borders.
- Text: warm white and soft gray.
- Accent: controlled red for primary actions and key progress.
- Secondary accents: restrained gold and green for progress/status variety.

## Typography

The typography should feel like a premium athletic dashboard: clear, energetic, and young without becoming loud or arcade-like.

Font stack:

- Primary: `Plus Jakarta Sans`
- Fallback: `Inter`, `system-ui`, `sans-serif`

CSS variables:

- `--font-sans`
- `--text-xs`
- `--text-sm`
- `--text-md`
- `--text-lg`
- `--text-xl`
- `--text-hero`
- `--weight-regular`
- `--weight-medium`
- `--weight-semibold`
- `--weight-bold`

Usage:

- Hero headings use large confident sizing with variable weight around `750`, tight but polished tracking, and a premium line height.
- Eyebrows stay uppercase, small, red, and tracked; they should accent the interface rather than shout.
- Card section labels use smaller uppercase type than the hero eyebrow.
- Card titles use `700` weight with slight negative tracking.
- Body and helper text use regular weight and `1.55` line height.
- Form labels use semibold, small, non-uppercase text.
- Inputs use medium-weight values; placeholders stay regular and muted.
- Buttons use semibold text with subtle negative tracking, not heavy display weight.
- Stat values are bold but restrained, with supporting copy in regular weight.

## UI Principles

- Dashboard first.
- Cards should be functional containers, not decoration.
- Keep red as an accent.
- Use compact hierarchy on mobile.
- Empty states should explain the next useful action.
- Forms should be fast on mobile: clear labels, numeric keyboards, sensible defaults.
- Avoid generic Bootstrap styling and oversized marketing sections.

## Component Rules

- Cards use `8px` border radius.
- Buttons use icon plus text for primary actions.
- Destructive icon buttons must have accessible labels and hover affordance.
- Charts stay minimal and readable.
- Text must not overflow controls at mobile widths.
