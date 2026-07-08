# CarryMate landing page

Four files, no build step, no dependencies besides Google Fonts:

```
index.html   Structure only — you shouldn't need to touch this
style.css    All visual styling — matches the CarryMate app's colors/fonts
config.js    Every piece of visible text, the ticker routes, and both URLs
app.js       Reads config.js and renders the page + handles the animations
```

## Editing the site's content

Open **`config.js`** — that's the only file you need to edit for text changes,
adding/removing feature cards, changing the sample routes in the hero ticker, or
swapping the two URLs:

```js
appUrl: 'https://your-carrymate-app-url.example.com',
repoUrl: 'https://github.com/your-username/carrymate',
```

Every button on the page ("Open the app", "I'm travelling", "Find a traveller", etc.)
pulls its link from `appUrl` automatically — set it once.

Want to add a 7th feature card, or a 6th sample route in the ticker? Just add another
entry to the relevant array in `config.js` — `app.js` renders however many are there.

## Host it on GitHub Pages

1. Create a new repo (or a `docs/` folder / `gh-pages` branch in an existing one) and add
   all four files (`index.html`, `style.css`, `config.js`, `app.js`) to it, keeping them
   in the same folder.
2. Push it to GitHub.
3. In the repo: **Settings → Pages → Source**, pick the branch/folder that contains
   `index.html`, save.
4. GitHub gives you a URL like `https://your-username.github.io/repo-name/` within a minute
   or two.

That's it — no build step, no npm install, nothing else to configure.

