const projects = document.querySelectorAll('#portfolio .project');
projects.forEach((item, index) => {
  item.id = `project-${index}`
});

const slidersProjects = document.querySelectorAll('#portfolio .project .slider');
slidersProjects.forEach((item, index) => {
  item.classList.add(`slick-slider-preview-${index}`)
});



if (window.innerWidth >= 768)
  $('.project .about').on('click', function(e) {
    $(this).toggleClass('expended')
  })
