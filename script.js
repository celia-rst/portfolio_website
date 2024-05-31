/* Isotope & Mansonry */
window.onload = () => {
    const items = document.querySelector('.masonry-container');

    var isotopeOptions = {
    itemSelector: '.masonry-container-item',
    masonry: {
        columnWidth: '.masonry-container-item',
        resize: true // enables dynamic resizing
    }
    };

    const itemsGrid = new Isotope(items, isotopeOptions);
    //console.log(itemsGrid);

    // Add an event handler to all .filter-item elements
    document.querySelectorAll('.filter-item').forEach(button => {
    button.addEventListener('click', function(event) {
        // Retrieve filter value from the data-filter attribute of the clicked button
        var filterValue = this.dataset.filter;
        // console.log('Filter value:', filterValue);

        // Apply the filter using the Isotope object
        itemsGrid.arrange({ filter: filterValue });
        // console.log('Arranging items with filter:', filterValue);
        // console.log(itemsGrid);

        // Retrieve filtered elements
        const filteredItems = itemsGrid.filteredItems.map(item => item.element);
        // console.log('Filtered items:', filteredItems);
    });
    });
}

/*-----------------------------*/
/* Menu responsive */

const menuBurger = document.querySelector(".default-icon");
const menuLinks = document.querySelector(".header-menu-section");
const body = document.body;

menuBurger.addEventListener('click', function() {
  // open menu
  if (this.src.includes('burger-bar.png')) {
    menuLinks.classList.add('open-menu');
    menuLinks.classList.remove('close-menu', false);
      this.src = '/images/icons/close-window.png';
      body.style.overflow = 'hidden';
  // close menu
  } else {
    this.src = '/images/icons/burger-bar.png';
    menuLinks.classList.remove('open-menu');
    menuLinks.classList.add('close-menu');
    body.style.overflow = 'auto';
  }
});

// apply style for close-menu then remove this class
menuLinks.addEventListener('transitionend', function(event) {
  if (event.propertyName === 'opacity') {
    menuLinks.classList.remove('close-menu');
  }
});

/*-----------------------------*/
/* Gallery templating */

document.addEventListener('DOMContentLoaded', function() {
    // Fetch gallery data
    fetch('galleryData.json')
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const projectIndex = urlParams.get('project');

            if (projectIndex !== null) {
                const project = data[projectIndex];

                document.getElementById('mainImage').src = project.mainImage;
                document.getElementById('projectTitle').innerText = project.title;
                document.getElementById('projectDescription').innerText = project.description;

                // Add Vimeo video if vimeoLink is not empty
                if (project.vimeoLink) {
                    const vimeoContainer = document.createElement('div');
                    vimeoContainer.classList.add('vimeo-container');
                    
                    vimeoContainer.innerHTML = `<iframe src="${project.vimeoLink}&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                    document.querySelector('main').insertBefore(vimeoContainer, document.querySelector('.gallery-description-container'));
                }

                // Add Youtube video if youtubeLink is not empty
                if (project.youtubeLink) {
                    const youtubeContainer = document.createElement('div');
                    youtubeContainer.classList.add('youtube-container');

                    youtubeContainer.innerHTML = `<iframe width="560" height="315" src="${project.youtubeLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
                    document.querySelector('main').insertBefore(youtubeContainer, document.querySelector('.gallery-description-container'));
                }
                
                const thumbnails = document.getElementById('thumbnails');
                thumbnails.innerHTML = '';
                project.thumbnails.forEach((thumbnail, index) => {
                    const img = document.createElement('img');
                    img.src = thumbnail;
                    img.classList.add('thumbnail');
                    img.dataset.index = index;
                    img.alt = `Thumbnail ${index + 1}`;
                    thumbnails.appendChild(img);
                });

                // Adjust justify-content based on the number of thumbnails
                if (project.thumbnails.length <= 5) {
                    thumbnails.style.justifyContent = 'center';
                } else {
                    thumbnails.style.justifyContent = 'start';
                }

                /*-----------------------------*/
                /* Animation & Illustration gallery with navigation arrows and thumbnail strip for quick navigation */

                // Select the main image element
                const mainImage = document.getElementById('mainImage');
                // Select all thumbnail images
                const thumbnailElements = document.querySelectorAll('.thumbnail');
                // Select the previous button
                const prevBtn = document.getElementById('prevBtn');
                // Select the next button
                const nextBtn = document.getElementById('nextBtn');
                // Initialize the index of the currently displayed image to 0
                let currentIndex = 0;

                // Set the first thumbnail as active when the page loads
                thumbnailElements[0].classList.add('active');

                // Function to update the main image based on the index passed as an argument
                function updateMainImage(index) {
                    // Update the source of the main image with that of the corresponding thumbnail
                    mainImage.src = thumbnailElements[index].src;
                    // Remove the 'active' class from the previous thumbnail
                    document.querySelector('.thumbnail.active').classList.remove('active');
                    // Add the 'active' class to the currently displayed thumbnail
                    thumbnailElements[index].classList.add('active');
                    // Update the index of the currently displayed image
                    currentIndex = index;
                }

                // Add event handler to each thumbnail
                thumbnailElements.forEach((thumbnail, index) => {
                    // When a thumbnail is clicked, call the updateMainImage function with the index of that thumbnail
                    thumbnail.addEventListener('click', () => {
                        updateMainImage(index);
                    });
                });

                // Event handler for the 'previous' button
                prevBtn.addEventListener('click', () => {
                    // Check if the current index is greater than 0 to avoid going below 0
                    if (currentIndex > 0) {
                        // Call the updateMainImage function with the decremented index to display the previous image
                        updateMainImage(currentIndex - 1);
                    }
                });

                // Event handler for the 'next' button
                nextBtn.addEventListener('click', () => {
                    // Check if the current index is less than the length of thumbnails minus 1 to avoid exceeding the end
                    if (currentIndex < thumbnailElements.length - 1) {
                        // Call the updateMainImage function with the incremented index to display the next image
                        updateMainImage(currentIndex + 1);
                    }
                });

                /*-----------------------------*/
                /* Zoom image on gallery navigation window */

                const zoomOverlay = document.getElementById('zoomOverlay'); // Selects the zoom overlay
                let zoomedImage = null; // Variable to store the zoomed image

                mainImage.addEventListener('click', () => {
                    if (!zoomedImage) {
                        // If no image is currently zoomed
                        zoomedImage = document.createElement('img');
                        zoomedImage.classList.add('zoomed-image');
                        zoomedImage.src = mainImage.src;
                        zoomOverlay.appendChild(zoomedImage); // Adds the zoomed image to the overlay
                        zoomOverlay.style.display = 'flex'; // Displays the overlay

                        adjustZoomedImage(zoomedImage);

                        window.addEventListener('mousemove', onMouseMove); // Adds a mousemove event listener to the window
                        zoomOverlay.addEventListener('click', closeZoom);
                    } else {
                        closeZoom();
                    }
                });

                function adjustZoomedImage(img) {
                    const mainImageWidth = mainImage.offsetWidth; // Width of the main image
                    const mainImageHeight = mainImage.offsetHeight; // Height of the main image

                    img.style.width = `${mainImageWidth * 2}px`; // Sets the width of the zoomed image to twice the width of the main image
                    img.style.height = `${mainImageHeight * 2}px`; // Sets the height of the zoomed image to twice the height of the main image
                    img.style.left = '50%';
                    img.style.top = '50%';
                    img.style.transform = 'translate(-50%, -50%)'; // Centers the image
                }

                function onMouseMove(e) {
                    // Checks if an image is currently zoomed
                    if (zoomedImage) {
                        // Retrieves the horizontal and vertical coordinates of the mouse position relative to the window
                        const mouseX = e.clientX;
                        const mouseY = e.clientY;
                        
                        // Retrieves the width and height of the browser window
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                        
                        // Retrieves the width and height of the zoomed image
                        const imgWidth = zoomedImage.offsetWidth; // Uses offsetWidth to get the computed width with CSS modifications
                        const imgHeight = zoomedImage.offsetHeight; // Uses offsetHeight to get the computed height with CSS modifications
                
                        // Calculates the offset needed for the movement of the zoomed image
                        const offsetX = ((mouseX - windowWidth / 2) / windowWidth) * (imgWidth - windowWidth);
                        const offsetY = ((mouseY - windowHeight / 2) / windowHeight) * (imgHeight - windowHeight);
                
                        // Applies the CSS transformation to move the zoomed image according to the mouse movement
                        zoomedImage.style.transform = `translate(calc(-50% + ${-offsetX}px), calc(-50% + ${-offsetY}px))`;
                    }
                }
                
                function closeZoom() {
                    if (zoomedImage) {
                        zoomedImage.remove();
                        zoomedImage = null;
                        zoomOverlay.style.display = 'none';
                        window.removeEventListener('mousemove', onMouseMove); // Removes the mousemove event listener from the window
                        zoomOverlay.removeEventListener('click', closeZoom);
                    }
                }
            }
            const description = document.getElementById('projectDescription');
            const title = document.getElementById('projectTitle');
            const container = document.getElementById('descriptionContainer');
        
            if (!description || description.innerText.trim() === '') {
                title.style.margin = '0';
                container.style.margin = '50px 0 30px 0';
            } else {
                title.style.margin = '0 0 30px 0';
                container.style.margin = '50px 0 50px 0';
            }
        })
        .catch(error => console.error('Error loading gallery data:', error));
    
});