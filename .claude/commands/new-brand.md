# /new-brand — Generate a new branded design system from praj-design-system

You are a React Native design system generator. When this command is run, you will create a complete new design system project based on praj-design-system as the base, with a new visual identity applied.

## Step 1 — Gather inputs

Ask the user for the following. Ask all questions in ONE message, numbered:

1. **App name** — what is this design system for? (e.g. "fitness-app", "finance-dashboard")
2. **Primary color** — hex code or color name (e.g. "#0A84FF", "blue", "emerald green")
3. **Font** — preferred font from Google Fonts or system font (e.g. "Inter", "Poppins", "SF Pro"). Say "decide for me" to let Claude pick based on the style.
4. **Overall look and feel** — describe the style direction in your own words. Examples:
   - "Modern minimalistic — lots of whitespace, clean lines, nothing unnecessary"
   - "Urban company — bold, high contrast, professional but not corporate"
   - "Playful consumer app — friendly, rounded, colourful, approachable"
   - "Premium luxury — dark surfaces, gold accents, refined typography"
   - "Apple HIG — clean system UI, SF Pro, iOS patterns"
   - "Material You — expressive, dynamic colour, Android patterns"
5. **Any references** — apps, websites, or brands whose visual style you like (optional but helpful). e.g. "Linear, Stripe, Notion, Apple Settings, Airbnb"
6. **Border radius feel** — sharp / medium / very rounded? Or say "decide for me"
7. **Shadow intensity** — none / subtle / medium / strong? Or say "decide for me"

Wait for the user to answer before proceeding.

## Step 2 — Plan the changes

### Translate style direction into design decisions

Use this mapping to interpret the user's look and feel description:

**Modern minimalistic**
→ Generous spacing (increase spacing scale by ~25%), thin borders (1px), very subtle shadows or none, neutral-dominant palette, clean geometric font (Inter, DM Sans), medium-sharp radius, restrained use of primary color

**Urban / company / professional**
→ High contrast, strong typography weight (semibold/bold used more), structured layout, medium spacing, defined borders, medium shadows, neutral-forward palette with one strong accent, fonts like Inter or Neue Haas Grotesk

**Playful / consumer / friendly**
→ Very rounded corners, vibrant saturated primary, heavier shadows, expressive font (Poppins, Nunito), more color in components (colored backgrounds not just borders), generous padding

**Premium / luxury**
→ Dark surface tokens (near-black backgrounds), muted/desaturated primary, tight refined spacing, elegant serif or thin sans font, very subtle shadows, gold/warm accent consideration

**Apple HIG / iOS**
→ System font (SF Pro), radius 10-14px for controls, sheet-style modals, no heavy borders (use backgrounds instead), very subtle shadows, blue system primary unless overridden, native feel

**Material You / Android**
→ Rounded corners (16-28px), dynamic color tinting on surfaces, prominent FAB, bottom sheet patterns, Roboto or Google Sans font, elevation-heavy shadows

**Enterprise / data-heavy**
→ Dense spacing (reduce spacing scale), structured grids, conservative color (blue primary), clear typographic hierarchy, minimal decoration, sharp-medium radius

If the description doesn't match a known pattern exactly, synthesise from the closest matches. Use references (question 5) to refine — e.g. "Linear" = sharp, minimal, dark-capable. "Airbnb" = rounded, warm, friendly.

### Decide on each system

- **Colors** — derive a full token set (primary-high, primary-subtle, primary-muted, primary-disabled) from the given primary color. Consider whether neutral tokens should stay gray or shift warmer/cooler to match the style. Keep semantic tokens (error/success/warning/info) unless brief suggests otherwise.
- **Typography** — if user said "decide for me", pick the font that best fits the style direction. Map chosen font to token roles (heading → display/title, base → body/label).
- **Border radius** — if user said "decide for me", pick from the style mapping above.
- **Shadows** — if user said "decide for me", pick from the style mapping above.
- **Spacing density** — adjust spacing tokens if style calls for it (minimalistic = more space, enterprise = less space).
- **Components to rewrite** — identify which of the 35 components need visual changes beyond tokens.

Summarise your plan to the user in a clear table showing:
- Style direction interpreted as
- Each token system: what changes and why
- Components that will be rewritten
- Components that stay the same

Ask for confirmation before generating.

## Step 3 — Create the new project

### 3a — Set up folder

```bash
NEW_NAME="[app-name]-ds"
NEW_PATH="/Users/PRAJWAL/Desktop/My App/$NEW_NAME"
cp -r "/Users/PRAJWAL/Desktop/My App/Design System/praj-design-system" "$NEW_PATH"
cd "$NEW_PATH"
rm -rf .git
git init
git checkout -b main
```

### 3b — Update token files

Rewrite these files completely based on the brief:
- `src/theme/colors.js`
- `src/theme/typography.js`
- `src/theme/radius.js`
- `src/theme/spacing.js`
- `src/theme/shadows.js`

Also update `tailwind.config.js` if font imports need to change.

### 3c — Update App.tsx font imports

If the font changed, update the `useFonts()` call in `App.tsx` and the `@expo-google-fonts` import to use the new font package. Note the user will need to run `npm install @expo-google-fonts/[font-name]`.

### 3d — Rewrite components

For each component that needs visual changes based on the design language brief:

- Read the current component file
- Rewrite ONLY the visual/styling parts — keep all logic, props, state, and animation intact
- Apply new token classes and layout adjustments
- Do not change the component's API (props stay the same)

Focus on these components most likely to need changes:
- Button (shape, weight, variant style)
- TextField / TextArea (border style, focus ring)
- Toggle (shape, thumb style)
- Dialog (corner radius, overlay style)
- BottomNav (shape, indicator style)
- Header (height, border vs shadow)
- Chip / Badge (shape, padding)
- Select / MultiSelect (modal style)
- Alert / Toast (shape, icon usage)

Leave logic-heavy components unchanged unless the brief specifically addresses them:
- OTPInput, DatePicker, RangeSlider, Slider, Rating, FilterSheet

### 3e — Update HTML docs

Update `docs/architecture.html`:
- Change the brand name from "Praj Design System" to "[App Name] Design System"
- Update the color token table and swatches to reflect new colors
- Update font family tokens table
- Update the example chain sections with new values

### 3f — Update package.json

```json
"name": "[app-name]-ds",
"description": "[App Name] Design System — built on praj-design-system"
```

## Step 4 — Create GitHub repo and push

```bash
cd "/Users/PRAJWAL/Desktop/My App/$NEW_NAME"
gh repo create uxpraj/$NEW_NAME --public --description "[App Name] Design System" --confirm
git add .
git commit -m "Init [app-name]-ds — branded from praj-design-system"
git remote add origin https://github.com/uxpraj/$NEW_NAME.git
git push -u origin main
```

## Step 5 — Final report

Tell the user:

1. ✅ New repo URL: `https://github.com/uxpraj/[app-name]-ds`
2. 📁 Local folder: `/Users/PRAJWAL/Desktop/My App/[app-name]-ds`
3. 🎨 What changed: list token changes + components rewritten
4. 📦 What stayed the same: list unchanged components
5. ⚠️ If font changed: remind them to run `npm install @expo-google-fonts/[font-name]` in the new project folder

---

## Rules

- Never modify the original `praj-design-system` folder
- Keep all 35 component APIs identical — only visuals change
- If unsure about a color shade, derive it systematically (use the primary hue, adjust lightness for muted/disabled variants)
- Always confirm the plan with the user before making any file changes
- Commit only once at the end, not per file
