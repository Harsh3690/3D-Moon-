# Interactive 3D Moon Atlas

An interactive 3D visualization of the Moon in the browser, built using NASA lunar imagery and elevation data.

## Features

- Rotate the Moon by dragging; zoom using the scroll wheel or pinch gestures.
- Explore 45 labelled lunar features, including maria, impact basins, craters, mountain ranges, and Apollo, Chandrayaan-3, and Chang'e landing sites.
- Toggle feature layers and labels.
- Display a latitude/longitude grid.
- Adjust the sunlight direction and terrain relief exaggeration.
- Navigate directly to the near side, far side, north pole, and south pole.
- Select labelled features to fly to their locations and view information.

## Live Demo

[Open the Interactive 3D Moon Atlas](https://harsh3690.github.io/3D-Moon-/)

## Project Structure

```text
3D-Moon-/
├── assets/
│   ├── lunar-color-map.jpg
│   └── lunar-elevation-map.jpg
├── css/
│   └── style.css
├── js/
│   └── main.js
├── index.html
├── LICENSE
└── README.md
```

- `index.html` — Application structure and entry point.
- `css/style.css` — Visual styling and layout.
- `js/main.js` — Three.js scene, lunar feature data, interactions, and rendering logic.
- `assets/lunar-color-map.jpg` — Lunar colour texture.
- `assets/lunar-elevation-map.jpg` — Lunar elevation texture used for terrain relief.

## Technology

- HTML5
- CSS3
- JavaScript
- [Three.js r128](https://threejs.org/), loaded through cdnjs CDN.

An internet connection is required to load Three.js from the CDN.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/Harsh3690/3D-Moon-.git
cd 3D-Moon-
```

Start a local HTTP server using Python:

```bash
python3 -m http.server 8000
```

Open the application in your browser:

```text
http://localhost:8000/
```

The server must remain running while using the application. Press `Ctrl+C` in the terminal to stop it.

## Data and Credits

- **Colour map:** LROC WAC colour mosaic (NASA / GSFC / Arizona State University), via NASA's Scientific Visualization Studio CGI Moon Kit: https://svs.gsfc.nasa.gov/4720. Resampled to 4096 × 2048 pixels.
- **Elevation:** Lunar Reconnaissance Orbiter (LRO) LOLA laser-altimeter data, used for relief shading and terrain displacement.
- NASA imagery is generally not copyrighted. Please credit NASA's Scientific Visualization Studio. These maps are tuned for visualization and aesthetics, not scientific analysis. Use the original archived data for research.
- **Rendering:** Three.js r128 (MIT License).

## Deployment

The project is configured as a static web application. GitHub Pages can serve it directly from the repository root because `index.html` is located there.

Live site: https://harsh3690.github.io/3D-Moon-/

## Licence

Code: MIT License (see [LICENSE](LICENSE)).
Imagery: NASA, see the data and credits section above.
