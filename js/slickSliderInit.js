// Slider for our clients
$('.slick-slider-clients').slick({
  slidesToShow: 3,
  prevArrow: $(`#clients .arrow-prev`),
  nextArrow: $(`#clients .arrow-next`),
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 720,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

// Slider for our services
$('.slick-slider-services').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  prevArrow: $(`#services .arrow-prev`),
  nextArrow: $(`#services .arrow-next`),
  autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 720,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

// Slider for projects preview
const slidersPreviews = document.querySelectorAll('#portfolio .project');
slidersPreviews.forEach((item, index) => {
  $(`.slick-slider-preview-${index}`).slick({
    dots: true,
    infinity: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $(`#portfolio #project-${index} .about-project .preview .arrow-left`),
    nextArrow: $(`#portfolio #project-${index} .about-project .preview .arrow-right`),
    appendDots: $(`#portfolio #project-${index} .about-project .preview .dots`),
    dotsClass: 'dot',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      }, {
        breakpoint: 720,
        settings: {
          slidesToShow: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});
