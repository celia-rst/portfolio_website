window.onload = () => {
  // Initialisation d'Isotope
  const items = document.querySelector('.masonry-container');

  var isotopeOptions = {
    itemSelector: '.masonry-container-item',
    masonry: {
      columnWidth: '.masonry-container-item',
      resize: true // active la redimension dynamique
    }
  };

  const itemsGrid = new Isotope(items, isotopeOptions);
  console.log(itemsGrid);

  // Ajout d'un écouteur d'événements sur tous les éléments .filter-item
  document.querySelectorAll('.filter-item').forEach(button => {
    button.addEventListener('click', function(event) {
      // Récupération de la valeur de filtre à partir de l'attribut data-filter du bouton cliqué
      var filterValue = this.dataset.filter;
      console.log('Filter value:', filterValue); // Débogage

      // Application du filtre à l'aide de l'objet Isotope
      itemsGrid.arrange({ filter: filterValue });
      console.log('Arranging items with filter:', filterValue); // Débogage
      console.log(itemsGrid);

      // const filterActiveItem = document.querySelector('.filter-item.active');
      // filterActiveItem.classList.remove('active');
      // console.log(filterActiveItem);
      // this.classList.add('active');
      // console.log(this);

      // Récupérer les éléments filtrés
      const filteredItems = itemsGrid.filteredItems.map(item => item.element);
      console.log('Éléments filtrés:', filteredItems);
    });
  });
}

// window.onload = () => {
//   const items = document.querySelector('.masonry-container');
//   // let columnWidth = window.innerWidth >= 800 ? '.masonry-container-item' : 400; // Détermine la largeur initiale des colonnes en fonction de la taille de la fenêtre

//   const masonry = new Masonry(items, {
//     itemSelector: '.masonry-container-item',
//     columnWidth: '.masonry-container-item',
//     resize: true // active la redimension dynamique
//   });

//   masonry.on('layoutComplete', () => console.log('Layout Complete'));

//   // // Écouteur d'événement pour ajuster la largeur des colonnes lors du redimensionnement de la fenêtre
//   // window.addEventListener('resize', () => {
//   //   // Met à jour la valeur de columnWidth en fonction de la largeur de la fenêtre
//   //   columnWidth = window.innerWidth >= 800 ? '.masonry-container-item' : 400;
//   //   masonry.layout(); // Réorganise la disposition Masonry avec la nouvelle largeur des colonnes
//   // });
// };

// window.onload = () => {
//   const items = document.querySelector('.masonry-container');

//   const itemsGrid = new Isotope(items, {
//     itemSelector: '.masonry-container-item',
//     masonry: {
//       columnWidth: '.masonry-container-item',
//       resize: true // active la redimension dynamique
//     }
//     });

//   document.addEventListener('click', (e) => {
//     const targetElement = e.target;
//     if (targetElement.closest('.filter-item')) {
//       const filterItem = targetElement.closest('.filter-item');
//       const filterValue = filterItem.filter;
//       const filterActiveItem = document.querySelector('.filter-item.active');

//       console.log(filterValue.);
      
//       if (filterValue !== undefined) {
//         filterValue === "*" ? itemsGrid.arrange({filter: ``}) : itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` });
//       }
      
//       filterActiveItem.classList.remove('active');
//       filterItem.classList.add('active');

//       e.preventDefault();
//     }
//   });
// };


