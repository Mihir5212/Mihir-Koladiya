# Mihir Koladiya — Portfolio

Personal portfolio website: transportation engineering, road safety research, projects, publications and gallery.

Plain static site (HTML, CSS, vanilla JavaScript). No build step needed.

## Folder structure

```
.
├── index.html              # Home
├── about.html              # About / CV
├── projects.html           # Project list
├── project-detail.html     # Single project (?id=...)
├── publications.html       # Publications
├── insights.html           # Articles / insights list
├── insight-detail.html     # Single insight (?id=...)
├── showcase.html           # Showcase
├── gallery.html            # Photo gallery
├── contact.html            # Contact
└── assets/
    ├── css/style.css       # All styles
    ├── js/
    │   ├── data.js         # Site content (edit this to update text, projects, links)
    │   └── main.js         # Rendering and interaction logic
    ├── images/
    │   ├── profile/        # Profile photo
    │   ├── certificates/   # Certificate images
    │   └── gallery/        # Gallery photos
    └── docs/
        ├── cv/             # CV PDF
        ├── publications/   # Papers
        └── reports/        # Reports and notes
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000.

## Deploy

Hosted with GitHub Pages: **Settings → Pages → Deploy from branch → `main` / root**.
