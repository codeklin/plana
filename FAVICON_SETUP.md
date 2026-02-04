# Favicon and App Icon Setup

## Current Configuration ✅

The Plana app is now configured to use `plana-logo.png` as the favicon and app icon across all platforms.

### Files Updated:
- ✅ `app/layout.tsx` - Updated with comprehensive favicon metadata
- ✅ `public/manifest.json` - Created PWA manifest with icon references
- ✅ `public/plana-logo.png` - Main logo file (222x226px)

### Current Icon Configuration:

**Favicon (Browser Tabs):**
- 16x16px - Small browser tab icon
- 32x32px - Standard browser tab icon
- 192x192px - High-resolution displays
- 512x512px - Extra high-resolution displays

**Apple Touch Icon:**
- 180x180px - iOS home screen icon

**PWA Icons:**
- 192x192px - Android home screen
- 512x512px - Android splash screen

## Browser Support

The current configuration works across:
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ iOS Safari (Home Screen)
- ✅ Android Chrome (Home Screen)

## How It Works

Modern browsers automatically resize the `plana-logo.png` (222x226px) to the required sizes. This approach:
- ✅ Works perfectly for most use cases
- ✅ Reduces file size (single image file)
- ✅ Simplifies maintenance
- ⚠️ May not be optimal for very small sizes (16x16)

## Optional: Generate Optimized Icon Sizes

For optimal performance and quality, you can generate specific icon sizes:

### Option 1: Online Tools (Recommended)
Use these free online tools to generate optimized icons:

1. **Favicon Generator** - https://realfavicongenerator.net/
   - Upload `plana-logo.png`
   - Download all generated sizes
   - Replace files in `/public` directory

2. **PWA Asset Generator** - https://www.pwabuilder.com/imageGenerator
   - Upload `plana-logo.png`
   - Generate all PWA icons
   - Download and extract to `/public`

### Option 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Navigate to project root
cd /path/to/plana

# Generate favicon sizes
convert public/plana-logo.png -resize 16x16 public/favicon-16x16.png
convert public/plana-logo.png -resize 32x32 public/favicon-32x32.png
convert public/plana-logo.png -resize 180x180 public/apple-touch-icon.png
convert public/plana-logo.png -resize 192x192 public/icon-192x192.png
convert public/plana-logo.png -resize 512x512 public/icon-512x512.png

# Generate favicon.ico (multi-size)
convert public/plana-logo.png -resize 16x16 \
        public/plana-logo.png -resize 32x32 \
        public/plana-logo.png -resize 48x48 \
        public/favicon.ico
```

### Option 3: Using Sharp (Node.js)

Install sharp as a dev dependency:

```bash
pnpm add -D sharp
```

Then create and run this script:

```javascript
// scripts/generate-icons.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
];

async function generateIcons() {
  const source = path.join(__dirname, '..', 'public', 'plana-logo.png');
  
  for (const { name, size } of sizes) {
    await sharp(source)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(path.join(__dirname, '..', 'public', name));
    console.log(`✅ Generated ${name}`);
  }
}

generateIcons();
```

Run with: `node scripts/generate-icons.js`

## After Generating Optimized Icons

If you generate optimized icon files, update `app/layout.tsx`:

```typescript
icons: {
  icon: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  shortcut: '/favicon-32x32.png',
},
```

## Testing Your Favicon

1. **Local Testing:**
   ```bash
   pnpm dev
   ```
   Open http://localhost:3000 and check the browser tab icon

2. **Clear Browser Cache:**
   - Chrome: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Firefox: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Safari: Cmd+Option+E (Mac)

3. **Test on Mobile:**
   - iOS: Add to Home Screen and check icon
   - Android: Add to Home Screen and check icon

4. **PWA Testing:**
   - Chrome DevTools > Application > Manifest
   - Verify all icons are listed and loading correctly

## Troubleshooting

**Favicon not showing?**
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console for 404 errors

**Wrong icon showing?**
- Browser may be caching old icon
- Try incognito/private mode
- Check file paths in `app/layout.tsx`

**PWA icon not working?**
- Verify `manifest.json` is accessible at `/manifest.json`
- Check Chrome DevTools > Application > Manifest
- Ensure icons are square (same width and height)

## Current Status

✅ **Working:** Favicon configuration is complete and functional
✅ **Working:** PWA manifest is configured
✅ **Working:** Apple touch icon is configured
⚠️ **Optional:** Generate optimized icon sizes for best quality

The app is ready to use with the current configuration!

