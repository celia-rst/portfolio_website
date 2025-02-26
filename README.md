# Portfolio Website
An artistic portfolio website showcasing multiple galleries of images and animation films with links to the artist's social media profiles.

### High CLS issue after hosting – Causes

If the website works fine locally but experiences a high Cumulative Layout Shift (CLS) once hosted, the issue is due to delayed loading of images.
- Unoptimized images: large images take longer to load, leading to layout changes.
- Delayed image loading: locally, images load instantly, but on a remote server, network latency can cause layout shifts.

The image creator should reduce the file sizes to ensure they do not exceed 200 KB in order to improve the user experience. As soon as the author has reduced the image sizes, I will reintegrate them into the code.
