# Interactive 3D Moon Atlas

An interactive 3D Moon in the browser, built on real NASA lunar data.

- Drag to rotate, scroll or pinch to zoom, click a label to fly to it
- 45 labelled features: maria, impact basins, craters, mountain ranges, and Apollo, Chandrayaan-3 and Chang'e landing sites
- Layer toggles, lat/long grid, sunlight-direction slider, relief exaggeration, near/far side and pole shortcuts

Live site: `https://<your-username>.github.io/<repo-name>/`

## Data and credits

- Colour map: LROC WAC colour mosaic (NASA / GSFC / Arizona State University), via NASA's Scientific Visualization Studio CGI Moon Kit (https://svs.gsfc.nasa.gov/4720). Resampled to 4096x2048.
- Elevation: LRO LOLA laser-altimeter data, used for relief shading and terrain displacement.
- NASA imagery is generally not copyrighted; please credit "NASA's Scientific Visualization Studio". The maps are tuned for aesthetics, not for scientific analysis; use the original archived data for research.
- Rendering: three.js r128 (MIT), loaded from cdnjs.

## Run locally

Open `index.html` in a browser. The imagery is embedded in the file, so no server or extra downloads are needed (three.js loads from a CDN, so an internet connection is required).

## Licence

Code: MIT (see LICENSE). Imagery: NASA, see credits above.
