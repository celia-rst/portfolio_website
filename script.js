window.onload = () => {
  const items = document.querySelector('.masonry-container');
  var isotopeOptions = {
    itemSelector: '.masonry-container-item',
    masonry: {
      columnWidth: '.masonry-container-item',
      resize: true 
    }
  };
  const itemsGrid = new Isotope(items, isotopeOptions);
  console.log(itemsGrid);
  document.querySelectorAll('.filter-item').forEach(button => {
    button.addEventListener('click', function(event) {
      var filterValue = this.dataset.filter;
      itemsGrid.arrange({ filter: filterValue });
      const filteredItems = itemsGrid.filteredItems.map(item => item.element);
    });
  });
}
const menuBurger = document.querySelector(".default-icon");
const menuLinks = document.querySelector(".header-menu-section");
const body = document.body;
menuBurger.addEventListener('click', function() {
  if (this.src.includes('burger-bar.png')) {
    menuLinks.classList.add('open-menu');
    menuLinks.classList.remove('close-menu', false);
      this.src = '/icons/close-window.png';
      body.style.overflow = 'hidden';
  } else {
    this.src = '/icons/burger-bar.png';
    menuLinks.classList.remove('open-menu');
    menuLinks.classList.add('close-menu');
    body.style.overflow = 'auto';
  }
});
menuLinks.addEventListener('transitionend', function(event) {
  if (event.propertyName === 'opacity') {
    menuLinks.classList.remove('close-menu');
  }
});
document.addEventListener('DOMContentLoaded', function() {
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
                if (project.vimeoLink) {
                    const vimeoContainer = document.createElement('div');
                    vimeoContainer.classList.add('vimeo-container');
                    vimeoContainer.innerHTML = `<iframe src="${project.vimeoLink}&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                    document.querySelector('main').insertBefore(vimeoContainer, document.querySelector('.gallery-description-container'));
                }
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
                if (project.thumbnails.length <= 5) {
                    thumbnails.style.justifyContent = 'center';
                } else {
                    thumbnails.style.justifyContent = 'start';
                }
                const mainImage = document.getElementById('mainImage');
                const thumbnailElements = document.querySelectorAll('.thumbnail');
                const prevBtn = document.getElementById('prevBtn');
                const nextBtn = document.getElementById('nextBtn');
                let currentIndex = 0;
                thumbnailElements[0].classList.add('active');
                function updateMainImage(index) {
                    mainImage.src = thumbnailElements[index].src;
                    document.querySelector('.thumbnail.active').classList.remove('active');
                    thumbnailElements[index].classList.add('active');
                    currentIndex = index;
                }
                thumbnailElements.forEach((thumbnail, index) => {
                    thumbnail.addEventListener('click', () => {
                        updateMainImage(index);
                    });
                });
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        updateMainImage(currentIndex - 1);
                    }
                });
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < thumbnailElements.length - 1) {
                        updateMainImage(currentIndex + 1);
                    }
                });
                const zoomOverlay = document.getElementById('zoomOverlay'); 
                let zoomedImage = null; 
                mainImage.addEventListener('click', () => {
                    if (!zoomedImage) {
                        zoomedImage = document.createElement('img');
                        zoomedImage.classList.add('zoomed-image');
                        zoomedImage.src = mainImage.src;
                        zoomOverlay.appendChild(zoomedImage); 
                        zoomOverlay.style.display = 'flex'; 
                        adjustZoomedImage(zoomedImage);
                        window.addEventListener('mousemove', onMouseMove); 
                        zoomOverlay.addEventListener('click', closeZoom);
                    } else {
                        closeZoom();
                    }
                });
                function adjustZoomedImage(img) {
                    const mainImageWidth = mainImage.offsetWidth; 
                    const mainImageHeight = mainImage.offsetHeight; 
                    img.style.width = `${mainImageWidth * 2}px`; 
                    img.style.height = `${mainImageHeight * 2}px`; 
                    img.style.left = '50%';
                    img.style.top = '50%';
                    img.style.transform = 'translate(-50%, -50%)'; 
                }
                function onMouseMove(e) {
                    if (zoomedImage) {
                        const mouseX = e.clientX;
                        const mouseY = e.clientY;
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                        const imgWidth = zoomedImage.offsetWidth; 
                        const imgHeight = zoomedImage.offsetHeight; 
                        const offsetX = ((mouseX - windowWidth / 2) / windowWidth) * (imgWidth - windowWidth);
                        const offsetY = ((mouseY - windowHeight / 2) / windowHeight) * (imgHeight - windowHeight);
                        zoomedImage.style.transform = `translate(calc(-50% + ${-offsetX}px), calc(-50% + ${-offsetY}px))`;
                    }
                }
                function closeZoom() {
                    if (zoomedImage) {
                        zoomedImage.remove();
                        zoomedImage = null;
                        zoomOverlay.style.display = 'none';
                        window.removeEventListener('mousemove', onMouseMove); 
                        zoomOverlay.removeEventListener('click', closeZoom);
                    }
                }
            }
        })
        .catch(error => console.error('Error loading gallery data:', error));
});
const textarea = document.getElementById('message');
const errorLabel = document.getElementById('too-long-message-error');
const maxChars = 500;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
textarea.addEventListener('input', () => {
    if (textarea.value.length > maxChars) {
        errorLabel.classList.add('active');
    } else {
        errorLabel.classList.remove('active');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const fnameError = document.getElementById('fname-error');
    const lnameError = document.getElementById('lname-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const tooLongMessageError = document.getElementById('too-long-message-error');
    const maxChars = 500; 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateFields()) {
            sendEmail(fname.value, lname.value, email.value, message.value);
        }
    });
  function validateFields() {
      let valid = true;
      fnameError.classList.remove('active');
      lnameError.classList.remove('active');
      emailError.classList.remove('active');
      messageError.classList.remove('active');
      tooLongMessageError.classList.remove('active');
      if (fname.value.trim() === '') {
          fnameError.classList.add('active');
          valid = false;
      }
      if (lname.value.trim() === '') {
          lnameError.classList.add('active');
          valid = false;
      }
      if (!emailPattern.test(email.value.trim())) {
          emailError.classList.add('active');
          valid = false;
      }
      if (message.value.trim() === '') {
          messageError.classList.add('active');
          valid = false;
      } else if (message.value.length > maxChars) {
          tooLongMessageError.classList.add('active');
          valid = false;
      }
      return valid;
  }
  function sendEmail(fname, lname, email, message) {
    const fullMessage = `
    Name: ${fname} ${lname}
    Email: ${email}
    Message: ${message}
    `;
    Email.send({
    SecureToken : "9630ca37-463d-4474-9aca-5660686ec0fc",
    To: 'celia.restes@gmail.com',
    From: "celia.restes@gmail.com",
    Subject: "[Contact]",
    Body: fullMessage
    }).then(
        message => {
            alert("Message sent successfully");
            window.location.href = 'confirmation.html';
        }
    ).catch(
        message => {
        alert('Something went wrong')
        }
    );
  }
    fname.addEventListener('input', function() {
        if (fname.value.trim() !== '') {
            fnameError.classList.remove('active');
        }
    });
    lname.addEventListener('input', function() {
        if (lname.value.trim() !== '') {
            lnameError.classList.remove('active');
      }
    });
    email.addEventListener('input', function() {
        if (emailPattern.test(email.value.trim())) {
            emailError.classList.remove('active');
        }
    });
    message.addEventListener('input', function() {
        if (message.value.trim() !== '' && message.value.length <= maxChars) {
            messageError.classList.remove('active');
            tooLongMessageError.classList.remove('active');
        }
    });
});