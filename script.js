window.onload = () => {
  const grid = document.querySelector('.masonry-container');
  
  const masonry = new Masonry(grid, {
    itemSelector: '.masonry-container-item',
    // gutter: 5,
    fitWidth: true,
  });

  masonry.on('layoutComplete', () => console.log('Layout Complete'));
};
