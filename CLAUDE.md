# Knightcott Self Storage — website

This repo is the Knightcott Self Storage website: a **single** self-contained static
page, `index.html` (all CSS inline, no build step), plus the photos in `images/` and
`assets/storage-forms.js`. Pushing to `main` automatically deploys the site live in
~15 seconds.

The business is run by **Ian and Cathy Roberts** in Banwell, North Somerset.
Phone on the site: **01934 822420**.

## Who you're helping

You are usually helping **Kelly**, who looks after the site. She is **not a developer** —
she describes changes in plain English. So:

- Explain things simply, no jargon. Never make her read or write code.
- Make the change she asks for, then **offer to preview it before publishing**.
- After publishing, tell her plainly that it's live (and that it may take a minute
  to appear).
- If a request is ambiguous, ask a short plain-English question rather than guessing.

## How to publish ("put it live")

When she's happy and says something like *"publish it"* / *"put it live"*:

1. `git add` the changed files and commit with a short, plain message.
2. `git push origin main`.

That's it — GitHub Actions deploys automatically (`aws s3 sync`, then clears the CDN
cache). No build, no AWS steps, nothing else to run. You can watch it with
`gh run watch` if asked.

To **preview locally** before publishing: `python -m http.server 8000` in this folder,
then open `http://localhost:8000`.

## Guardrails — important

- **Make only the change requested.** Do not reformat, re-indent, restructure, or
  "tidy up" HTML that you weren't asked to change. The page is large and hand-authored;
  leave everything else byte-for-byte as it is.
- **Preserve the look and feel.** Don't change the design, layout, colours, or fonts
  unless Kelly explicitly asks. This is her design.
- **The deploy is verbatim** — files are served exactly as they are in the repo. Never
  add a build/minify/transform step or a framework.
- **Do NOT touch the enquiry-form wiring.** Leave `assets/storage-forms.js`, the form's
  `onsubmit` handler, the hidden `_gotcha` spam-trap field, the `enquirySent`
  confirmation block, and the `<script>` tag at the bottom of the page alone. They
  connect the form to the backend that emails enquiries — changing them breaks real
  enquiries. (Editing the *visible text* around the form is fine.)
- **If a page is ever added**, add its address to `sitemap.xml` too, or Google won't
  find it.

## Where things are on the page

`index.html` is one page with anchor sections, in this order:

| Section id | What it is |
|---|---|
| (top) | Top bar, header with the logo (inline SVG), nav, and hero |
| `#solutions` | "Storage solutions for every need" |
| `#prices` | Unit sizes and prices — "Find the right size, at a price you can see upfront" |
| `#why` | "What our customers keep telling us" |
| `#reviews` | Google reviews |
| `#about` | "A genuine family business" — about Ian and Cathy |
| `#contact` | Address, opening hours, and the enquiry form |

The logo at the top is a hand-drawn **inline SVG**, not an image file. The `#stripes`
id inside it is part of the logo artwork (reused by `<use href="#stripes">`) — it is
not a link target, so don't remove it.

## What is NOT in this repo

Hosting, the domain (`www.knightcottselfstorage.uk`), email, and the **enquiry email
template** live in a separate infrastructure repo (`Tofu-iac`, environment
`storage-prod`) — not here. If Kelly asks to change how the site is hosted, the web
address, where enquiries are emailed, or the layout of the *email* that enquiries
arrive in, tell her that lives in the other project and can't be changed from this one.

> That repo also holds the **KSS (Knightcott Surface Solutions)** website's
> infrastructure. They are two different businesses and two different sites — don't
> mix them up.
