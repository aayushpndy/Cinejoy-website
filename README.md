# Cinejoy: Android APK Download Website

A lightweight, responsive download page for the Cinejoy Android app. Built with plain HTML, CSS and JavaScript, with no frameworks, backend or build step. It is ready to host free on GitHub Pages.

## Project structure

```
index.html
styles.css
script.js
assets/
  app-icon.png
  favicon-192.png
  favicon-48.png
  posters/          (optional, your poster images)
```

## Configuration

All settings are in the `CONFIG` block at the top of `script.js`:

| Setting | Default | What it does |
|---|---|---|
| `APP_NAME` | `Cinejoy` | App name shown across the site |
| `APP_VERSION` | `1.0.0` | Version shown in the download card |
| `APK_DOWNLOAD_URL` | `YOUR_APK_DOWNLOAD_URL` | Link used by every download button |
| `APP_ICON_PATH` | `assets/app-icon.png` | Icon used in the nav, download card and footer |
| `COUNTER_WORKSPACE` | `YOUR_COUNTERAPI_WORKSPACE` | CounterAPI workspace used for live visit and download-click totals |
| `POSTERS` | `[]` | Images for the hero poster wall |

**Required before publishing:** replace `YOUR_APK_DOWNLOAD_URL` with your real APK link.

### Live activity totals

The page can display shared totals without a database or server of its own by
using [CounterAPI](https://counterapi.dev/):

1. Create a CounterAPI account and workspace.
2. Set `COUNTER_WORKSPACE` in `script.js` to the workspace name.
3. Publish the site. The `visits` counter increments when the page loads, and
   the `downloads` counter increments when a download button is clicked.

The displayed download total counts button clicks, not confirmed completed APK
downloads. Website visits count page loads, not unique people. These public
browser-side counters can be affected by repeat visits or automated requests.
If the workspace is not configured or the service is unavailable, the page
shows a status message instead of a fabricated total.

## Hosting the APK

The easiest free option is a GitHub Release:

1. In your repository, open **Releases**, then **Draft a new release**.
2. Attach your `.apk` file and publish the release.
3. Under **Assets**, right-click the APK and copy the link.
4. Paste it into `APK_DOWNLOAD_URL` in `script.js`.

GitHub Release links also let the page show the file size automatically. If the host blocks it, the page shows "See download details".

## Adding poster images

The hero shows a drifting poster wall. Until you add images, it shows neutral placeholder tiles.

1. Create the folder `assets/posters/` and add your images (2:3 portrait, around 300×450 px, JPG or WebP).
2. Add them to the `POSTERS` list in `script.js`:

```js
POSTERS: [
  { src: "assets/posters/poster-1.jpg", title: "First title" },
  { src: "assets/posters/poster-2.jpg", title: "Second title" }
]
```

- `src` is the path to the image, relative to `index.html`.
- `title` is read aloud by screen readers.
- You can also use a full `https://` link instead of a local file.
- File names are case-sensitive on GitHub Pages.

Only use images you have the right to use, and only show titles the app actually offers.

## Deploying to GitHub Pages

1. Create a new **public** repository on GitHub.
2. Click **uploading an existing file** and upload `index.html`, `styles.css`, `script.js`, the `assets` folder and this `README.md`. Keep `index.html` at the top level.
3. Commit the changes.
4. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
5. After a minute or two, your site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
6. Open the live site on your phone and tap **Download APK** to confirm the link works.

To update the site later, edit the file on GitHub (pencil icon) and commit. Changes go live within a minute or so.

## Pre-publish checklist

- [ ] `APK_DOWNLOAD_URL` set to your real APK link
- [ ] `APP_VERSION` matches the APK you uploaded
- [ ] Poster images added (optional) and file names match exactly
- [ ] Download button tested on an Android phone
- [ ] Download button tested on a desktop browser

## Customizing

- **Colors:** edit the variables at the top of `styles.css` (`--bg`, `--card`, `--accent`).
- **Text:** edit the copy directly in `index.html`.
- **Font:** the site loads Manrope from Google Fonts and falls back to the system font if it is unavailable.

## Notes

- The APK is distributed directly from this website, not through Google Play.
- Install APK files only from sources you trust.