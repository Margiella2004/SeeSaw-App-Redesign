# SeeSawApp Codebase Analysis

## 1. Scope and Method

This analysis covers the entire repository at `/Users/memoryiswar/Downloads/SeeSawApp`, including:

- Build/config files
- Runtime app code in `src/app`
- Generated Figma import code in `src/imports`
- Styling and assets in `src/styles` and `src/assets`
- Supporting docs (`README.md`, `ATTRIBUTIONS.md`, `guidelines/Guidelines.md`)

I analyzed all source files and also computed a runtime reachability graph from `src/main.tsx`.

## 2. High-Level Summary

This project is a Figma-generated React + Vite UI prototype of a gallery/crawl mobile app experience, rendered inside a fixed iPhone-sized frame.

What it currently is:

- Strongly UI-focused prototype with rich static mock data and layered transitions
- No backend integration, no API clients, no persistence, no tests
- No routing library (manual state-based navigation)
- Heavy presence of generated and unused scaffolding code

Core quantitative findings:

- Total `src` LOC: `31,529`
- Runtime-reachable LOC: `9,004`
- Unreachable LOC: `22,525`
- TS/TSX files: `140`
- Runtime-reachable files: `48`
- Unreachable files: `96`

## 3. Repository Structure

- `index.html`: Vite HTML entry shell
- `package.json`: dependencies/scripts
- `vite.config.ts`: React + Tailwind Vite config with `@` alias
- `postcss.config.mjs`: placeholder PostCSS config
- `src/main.tsx`: React entrypoint
- `src/app/App.tsx`: root app shell and navigation orchestration
- `src/app/components/*`: actual feature components and UI composition
- `src/app/components/ui/*`: shadcn/radix UI primitives (not used by runtime app)
- `src/imports/*`: large generated Figma component exports + SVG path modules
- `src/styles/*`: global, Tailwind, theme, font mapping styles
- `src/assets/*`: PNG assets (~38 MB)
- `guidelines/Guidelines.md`: default template placeholder, no active project rules

## 4. Runtime Architecture (What Actually Runs)

Runtime path:

1. `src/main.tsx` renders `App`
2. `src/app/App.tsx` manages tab state (`home`, `discover`, `user`) and overlay/page transitions
3. Feature pages are composed from custom components under `src/app/components`

Navigation model:

- Manual boolean/state toggles, not URL/router based
- Uses `AnimatePresence` + `motion.div` for slide-in overlays
- Multiple overlay layers: gallery page, bottom sheets, map overlay, crawl overlays, profile overlays

Primary runtime features:

- Home discovery feed (`home-page.tsx`)
- Search/discover with view modes (`search-page.tsx`)
- Map experience with Leaflet (`map-overlay.tsx`)
- Gallery detail with tabs (`gallery-content.tsx` + sections)
- Crawl list/detail flows (`crawls-page.tsx`, `crawl-list-page.tsx`)
- User profile and follow sheets (`user-profile-page.tsx`, `follow-list-sheet.tsx`)
- Review flows (`review-content.tsx`, `write-review-sheet.tsx`)
- Reusable visual primitives (`gallery-ui.tsx`, `icons.tsx`, card components)

## 5. Component-Level Analysis

### 5.1 Root and Screen Composition

- `src/app/App.tsx`: central orchestrator; handles tab switching, gallery opening, editor pick crawl opening, and scroll position persistence per tab.
- Strength: clean callback wiring and structured state separation.
- Risk: overlay complexity is growing; state machine logic is implicit and distributed via multiple booleans.

### 5.2 Data Layer

- `src/app/components/gallery-data.ts`: central mock data model (`GalleryData`, `HomePageData`) and defaults.
- Strength: type-backed, single source for prototype data.
- Limitation: all values are hardcoded; no normalization for future API integration.

### 5.3 Search + Filters + Map

- `src/app/components/search-page.tsx`: manages four modes (`main`, `borough`, `results`, `map`).
- `src/app/components/search-filter-panels.tsx`: animated filter UI (sort/rating/date).
- `src/app/components/map-overlay.tsx`: Leaflet map + marker cards + crawl overlays.
- Strength: visually rich and cohesive motion transitions.
- Gaps:
  - Filter controls are mostly UI-only; selected sort/rating/date are not applied to results.
  - `onGallerySelect` in results maps all cards to index `0` rather than selected item.

### 5.4 Gallery Experience

- `src/app/components/gallery-content.tsx`: gallery hero, header, info/reviews tab switch.
- `src/app/components/gallery-sections.tsx`: sectionized content components.
- `src/app/components/review-content.tsx` + `src/app/components/review-ui.tsx`: reviews summary and cards.
- Strength: compositional and reusable section architecture.
- Gaps: many text labels and copy are placeholder-level and include spelling inconsistencies.

### 5.5 Crawl and Profile Flows

- `src/app/components/crawls-page.tsx`: crawl discovery page.
- `src/app/components/crawl-list-page.tsx`: crawl detail with map reveal and edit sheet.
- `src/app/components/user-profile-page.tsx` + `src/app/components/gallery-profile-page.tsx`: profile pages.
- Strength: consistent visual language and transition behavior.
- Gaps: interaction semantics mostly visual only (e.g., follow/edit controls without persistence).

### 5.6 Sheets and Cards

- `src/app/components/bottom-sheet.tsx`: reusable sheet with backdrop + drag-to-dismiss.
- `src/app/components/*-sheet.tsx`: specialized content sheets.
- `src/app/components/cards/*.tsx`: card family for home/search/gallery/crawls.
- Strength: card system is modular and reused effectively.
- Gap: many controls are `div` click targets instead of semantic buttons.

## 6. Unused / Dead Code Analysis

Runtime-unreachable files include:

- `src/app/components/ui/*` (48 files): shadcn/radix wrappers not used by current app entry graph
- `src/imports/*.tsx` large generated frame components (not used)
- Several generated SVG modules not referenced
- `src/app/components/figma/ImageWithFallback.tsx` not used

Impact:

- Significant cognitive overhead
- Large dependency surface pulled in mostly for unreachable code
- Slower onboarding and higher maintenance friction

## 7. Dependency Audit

From `package.json` dependencies (`56` total):

- Used by runtime-reachable code: `3`
  - `leaflet`
  - `motion`
  - (React itself is declared in peer deps)
- Used only by unreachable files: `40`
  - Mainly `@radix-ui/*`, shadcn support libs, chart/form/sidebar libs
- Not used anywhere in source imports: `13`
  - `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `@mui/material`, `@popperjs/core`, `@types/leaflet`, `date-fns`, `react-dnd`, `react-dnd-html5-backend`, `react-leaflet`, `react-popper`, `react-responsive-masonry`, `react-slick`

Conclusion: dependency set is substantially larger than runtime needs.

## 8. Styling and Design System

- `src/styles/index.css` imports fonts/tailwind/theme layers.
- Tailwind v4 setup is present and valid.
- Theme tokens (`src/styles/theme.css`) are comprehensive but mostly support unused shadcn UI primitives.
- Fonts:
  - Uses Google `Inter` plus local `KMR Waldenburg` mappings.
  - Some runtime components reference `KMR_Waldenburg:Fett`, which is not defined in `fonts.css`.

## 9. Assets and Performance Notes

- `src/assets` total size: ~`38 MB`
- Several individual PNGs are 4-6+ MB
- Heavy static image usage is expected to impact initial load/build output if not optimized or lazy-loaded.
- `figma:asset/...` import scheme is Figma-export specific; portability to a plain Vite environment may require adaptation.

## 10. Build, Test, and Tooling Status

Current scripts:

- `npm run dev`
- `npm run build`

Missing quality rails:

- No test setup
- No lint script
- No format script
- No typecheck script
- No lockfile committed

Verification run in current environment:

- `npm run build` fails because dependencies are not installed (`vite: command not found`)

## 11. Key Risks and Gaps

High priority:

1. Large unreachable code surface (`96` files) and dependency bloat
2. Filter/search interactions partly non-functional (UI state not affecting result data)
3. Non-semantic interactive elements (accessibility and keyboard usability risk)

Medium priority:

1. Hardcoded copy/data everywhere; no domain/state layer abstraction
2. Overlay-state complexity in `App.tsx` and map/crawl flows
3. Missing design/content consistency (spelling, duplicate spacing, placeholder text)
4. Font reference mismatch (`Fett` variant not defined)

Low priority:

1. `guidelines/Guidelines.md` still default template
2. Some props declared but currently unused (e.g., sheet close callback paths)

## 12. Notable Content/UX Inconsistencies

Examples found:

- `Recentley Viewed`
- `Freinds Also Like`
- `Simmilar Shows`
- `Editords Picks`
- `All  Galleries` (double space)
- `NYC (23)shows` (missing space)

These indicate prototype-stage copy and should be normalized before production hardening.

## 13. Recommended Cleanup Roadmap

Phase 1 (fast wins):

1. Remove or isolate unreachable generated folders from runtime bundle path
2. Prune dependencies not used by reachable runtime code
3. Add scripts: `lint`, `typecheck`, `test` (even if minimal initially)
4. Fix copy/label inconsistencies and font token mismatch

Phase 2 (stability):

1. Wire filter panel outputs into actual search result transforms
2. Replace clickable `div`s with semantic controls where appropriate
3. Introduce a lightweight route/state model (or explicit state machine) for overlays

Phase 3 (productization):

1. Introduce API-backed data layer and persistence
2. Optimize and compress heavyweight image assets
3. Add regression tests for primary navigation and view transitions

## 14. Final Assessment

This is a strong visual prototype with thoughtful component composition in the active runtime path. The primary engineering challenge is not feature absence but codebase shape: too much generated/unreachable scaffolding around a smaller core app.

If you want, the next step can be a concrete cleanup pass that preserves behavior while reducing file/dependency footprint and making the project easier to evolve.
