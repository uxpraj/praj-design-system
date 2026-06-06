# /new-brand — Generate a new branded design system from praj-design-system

You are a React Native design system generator. When this command is run, you will create a complete new design system project based on praj-design-system as the base, with a new visual identity applied.

## Step 1 — Gather inputs

Ask the user for the following. Ask all questions in ONE message, numbered:

1. **App name** — what is this design system for? (e.g. "fitness-app", "finance-dashboard")
2. **Primary color** — hex code or color name (e.g. "#0A84FF", "blue", "emerald green")
3. **Font** — preferred font from Google Fonts or system font (e.g. "Inter", "Poppins", "SF Pro")
4. **Design language brief** — describe the vibe in 2–3 sentences. Mention any references (e.g. "Apple HIG — clean, minimal, generous whitespace, sharp corners. Think iOS Settings app.")
5. **Border radius feel** — sharp / medium / very rounded?
6. **Shadow intensity** — none / subtle / medium / strong?

Wait for the user to answer before proceeding.

## Step 2 — Plan the changes

Based on the inputs, decide:

- **Colors** — derive a full token set (primary-high, primary-subtle, primary-muted, primary-disabled) from the given primary color. Keep neutral, semantic (error/success/warning/info) and surface tokens unless the brief suggests otherwise.
- **Typography** — map the chosen font to the existing token roles (heading → display/title, base → body/label). If SF Pro is chosen, use system font stack.
- **Border radius** — sharp = (4/6/8/12/16), medium = (8/12/16/20/24), very rounded = (16/20/24/28/36/1000).
- **Shadows** — adjust subtle/medium/strong opacity and radius to match the brief intensity.
- **Components to rewrite** — identify which of the 35 components need visual changes beyond tokens. Any component whose structure, layout, or interaction pattern should change based on the design language.

Summarise your plan to the user in a clear table and ask for confirmation before generating.

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
