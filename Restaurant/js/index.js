$(document).ready( function() {

	var itemSelector = '.grid-item'; 

	var $container = $('#container').isotope({
		itemSelector: itemSelector,
		masonry: {
		  columnWidth: itemSelector,
		  isFitWidth: true
		}
	});

	//Ascending order
	var responsiveIsotope = [
		[480, 7],
		[720, 10]
	];

	var itemsPerPageDefault = 12;
	var itemsPerPage = defineItemsPerPage();
	var currentNumberPages = 1;
	var currentPage = 1;
	var currentFilter = '*';
	var filterAtribute = 'data-filter';
	var pageAtribute = 'data-page';
	var pagerClass = 'isotope-pager';

	function changeFilter(selector) {
		$container.isotope({
			filter: selector
		});
	}


	function goToPage(n) {
		currentPage = n;

		var selector = itemSelector;
			selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			selector += '['+pageAtribute+'="'+currentPage+'"]';

		changeFilter(selector);
	}

	function defineItemsPerPage() {
		var pages = itemsPerPageDefault;

		for( var i = 0; i < responsiveIsotope.length; i++ ) {
			if( $(window).width() <= responsiveIsotope[i][0] ) {
				pages = responsiveIsotope[i][1];
				break;
			}

			

		}

		return pages;
	}
	
	function setPagination() {

		var SettingsPagesOnItems = function(){

			var itemsLength = $container.children(itemSelector).length;
			
			var pages = Math.ceil(itemsLength / itemsPerPage);
			var item = 1;
			var page = 1;
			var selector = itemSelector;
				selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			
			$container.children(selector).each(function(){
				if( item > itemsPerPage ) {
					page++;
					item = 1;
				}
				$(this).attr(pageAtribute, page);
				item++;
			});

			currentNumberPages = page;

		}();

		var CreatePagers = function() {

			var $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<div class="'+pagerClass+'"></div>') : $('.'+pagerClass);

			$isotopePager.html('');
			
			for( var i = 0; i < currentNumberPages; i++ ) {
				var $pager = $('<a href="javascript:void(0);" class="pager" '+pageAtribute+'="'+(i+1)+'"></a>');
					$pager.html(i+1);
					
					$pager.click(function(){
						var page = $(this).eq(0).attr(pageAtribute);
						goToPage(page);
					});

				$pager.appendTo($isotopePager);
			}

			$container.after($isotopePager);

		}();

	}

	setPagination();
	goToPage(1);

	//Adicionando Event de Click para as categorias
	$('.filters a').click(function(){
		var filter = $(this).attr(filterAtribute);
		currentFilter = filter;

		setPagination();
		goToPage(1);


	});

	//Evento Responsivo
	$(window).resize(function(){
		itemsPerPage = defineItemsPerPage();
		setPagination();
	});

	

});



 $(document).ready( function() {   

// filter items on button click
$('.filter-button-group').on( 'click', 'li', function() {
  var filterValue = $(this).attr('data-filter');
  $('.grid').isotope({ filter: filterValue });
  $('.filter-button-group li').removeClass('active');
  $(this).addClass('active');
});
    })
	

 $(document).ready( function() {   

// filter items on button click
$('.isotope-pager').on( 'click', 'a', function() {
  var filterValue = $(this).attr('data-page');

  $('.isotope-pager a').removeClass('active');
  $(this).addClass('active');
});
    })
	
	
	
	
	
	
	

$(document).ready(function(){
$('.popupimg').magnificPopup({
	type: 'image',
  mainClass: 'mfp-with-zoom', 
  gallery:{
			enabled:true
		},

  zoom: {
    enabled: true, 

    duration: 300, // duration of the effect, in milliseconds
    easing: 'ease-in-out', // CSS transition easing function

    opener: function(openerElement) {

      return openerElement.is('img') ? openerElement : openerElement.find('img');
  }
}

});

});



function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  document.getElementById("defaultOpen").click();



//   sliders

// testimonial slider 



// testimonial slider 

// gallery start 

const html = document.querySelector('html');
html.setAttribute('data-bs-theme', 'dark');

document.addEventListener('DOMContentLoaded', () => {
  // --- Create LightBox
  const galleryGrid = document.querySelector(".gallery-grid");
  const links = galleryGrid.querySelectorAll("a");
  const imgs = galleryGrid.querySelectorAll("img");
  const lightboxModal = document.getElementById("lightbox-modal");
  const bsModal = new bootstrap.Modal(lightboxModal);
  const modalBody = lightboxModal.querySelector(".lightbox-content");

  function createCaption (caption) {
    return `<div class="carousel-caption d-none d-md-block">
        <h4 class="m-0">${caption}</h4>
      </div>`;
  }

  function createIndicators (img) {
    let markup = "", i, len;

    const countSlides = links.length;
    const parentCol = img.closest('.col');
    const curIndex = [...parentCol.parentElement.children].indexOf(parentCol);

    for (i = 0, len = countSlides; i < len; i++) {
      markup += `
        <button type="button" data-bs-target="#lightboxCarousel"
          data-bs-slide-to="${i}"
          ${i === curIndex ? 'class="active" aria-current="true"' : ''}
          aria-label="Slide ${i + 1}">
        </button>`;
    }

    return markup;
  }

  function createSlides (img) {
    let markup = "";
    const currentImgSrc = img.closest('.gallery-item').getAttribute("href");

    for (const img of imgs) {
      const imgSrc = img.closest('.gallery-item').getAttribute("href");
      const imgAlt = img.getAttribute("alt");

      markup += `
        <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
          <img class="d-block img-fluid w-100" src=${imgSrc} alt="${imgAlt}">
          ${imgAlt ? createCaption(imgAlt) : ""}
        </div>`;
    }

    return markup;
  }

  function createCarousel (img) {
    const markup = `
      <!-- Lightbox Carousel -->
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="true">
        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          ${createIndicators(img)}
        </div>
        <!-- Wrapper for Slides -->
        <div class="carousel-inner justify-content-center mx-auto">
          ${createSlides(img)}
        </div>
        <!-- Controls/icons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;

    modalBody.innerHTML = markup;
  }

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const currentImg = link.querySelector("img");
      const lightboxCarousel = document.getElementById("lightboxCarousel");

      if (lightboxCarousel) {
        const parentCol = link.closest('.col');
        const index = [...parentCol.parentElement.children].indexOf(parentCol);

        const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
        bsCarousel.to(index);
      } else {
        createCarousel(currentImg);
      }

      bsModal.show();
    });
  }

  // --- Support Fullscreen
  const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
  const fsExit = document.querySelector(".btn-fullscreen-exit");

  function enterFS () {
    lightboxModal.requestFullscreen().then({}).catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
    fsEnlarge.classList.toggle("d-none");
    fsExit.classList.toggle("d-none");
  }

  function exitFS () {
    document.exitFullscreen();
    fsExit.classList.toggle("d-none");
    fsEnlarge.classList.toggle("d-none");
  }

  fsEnlarge.addEventListener("click", (e) => {
    e.preventDefault();
    enterFS();
  });

  fsExit.addEventListener("click", (e) => {
    e.preventDefault();
    exitFS();
  });
})


// gallery end 


// galleryyyyy start 

const buttons = document.querySelectorAll(".menu-nav button");
    const items = document.querySelectorAll(".menu-item");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        // Remove 'active' from all
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        items.forEach(item => {
          item.style.display =
            filter === "all" || item.classList.contains(filter)
              ? "flex"
              : "none";
        });
      });
    });


// galleryyy end 