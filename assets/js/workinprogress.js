var previous = document.getElementById('btnPrevious')
var next = document.getElementById('btnNext')
var gallery = document.getElementById('image-gallery')
var pageIndicator = document.getElementById('page')
var galleryDots = document.getElementById('gallery-dots');

var images= [];
for (var i = 2; i <= 54; i++) {
  images.push({
    title:(''),
    source: "assets/img/workINProgress/"+i+".webp",
  });
}

var perPage = 51;
var page = 1;
var pages = Math.ceil(images.length / perPage)


// Gallery dots
for (var i = 0; i < pages; i++){
  var dot = document.createElement('button')
  var dotSpan = document.createElement('span')
  var dotNumber = document.createTextNode(i + 1)
  dot.classList.add('gallery-dot');
  dot.setAttribute('data-index', i);
  dotSpan.classList.add('sr-only');
  
  dotSpan.appendChild(dotNumber);
  dot.appendChild(dotSpan)
  
  dot.addEventListener('click', function(e) {
    var self = e.target
    goToPage(self.getAttribute('data-index'))
  })
  
  galleryDots.appendChild(dot)
}







// Load images
function showImages() {
  while(gallery.firstChild) gallery.removeChild(gallery.firstChild)
  
  var offset = (page - 1) * perPage;
  var dots = document.querySelectorAll('.gallery-dot');
  
  for (var i = 0; i < dots.length; i++){
    dots[i].classList.remove('active');
  }
  
  dots[page - 1].classList.add('active');
  
  for (var i = offset; i < offset + perPage; i++) {
    if ( images[i] ) {
      var template = document.createElement('div');
      var title = document.createElement('p');
      var titleText = document.createTextNode(images[i].title);
      var img = document.createElement('img');
  
    
      template.classList.add('template')
      
      img.setAttribute("src", images[i].source);
      img.setAttribute('alt', images[i].title);

      title.appendChild(titleText);
      template.appendChild(img);
      template.appendChild(title);
      gallery.appendChild(template);      
    }
  }
  
  // Animate images
  var galleryItems = document.querySelectorAll('.template')
  for (var i = 0; i < galleryItems.length; i++) {
    var onAnimateItemIn = animateItemIn(i);
    setTimeout(onAnimateItemIn, i * 100);
  }
  
  function animateItemIn(i) {
    var item = galleryItems[i];
    return function() {
      item.classList.add('animate');
    }
  }
  
}

showImages();