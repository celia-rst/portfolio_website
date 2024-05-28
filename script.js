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
  console.log(itemsGrid);

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
      this.src = '/icons/close-window.png';
      body.style.overflow = 'hidden';
  // close menu
  } else {
    this.src = '/icons/burger-bar.png';
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