# Portfolio Website
An artistic portfolio website showcasing multiple galleries of images and animation films with links to the artist's social media profiles.

### High CLS Issue after hosting – Causes

If the website works fine locally but experiences a high Cumulative Layout Shift (CLS) once hosted, the issue is likely due to delayed loading of images or improper initialization of layout scripts like Isotope.js.

Possible Causes:
- Delayed image loading: Locally, images load instantly, but on a remote server, network latency can cause layout shifts.
Isotope.js 
- Running too early: If Isotope arranges elements before images are fully loaded, it can cause shifting.
- Unoptimized images: Large images take longer to load, leading to layout changes.
- Missing width/Height attributes: Without predefined dimensions, the browser doesn’t reserve space for images, causing layout shifts when they load.
