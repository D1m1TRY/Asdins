$('#start').on('click', () => {
  let heightContact = 700;
  if ($(window).width() >= 600)
    heightContact =
      document
        .getElementById('contact')
        .getBoundingClientRect()
        .height;

  document.getElementById('contact').style.height = `${heightContact}px`;
  $('.button-wrapper.by').remove();
  $('#contact .title').fadeOut(400);
  $('#contact .wrap-content').fadeOut(400, () => {
    $('#typeform').fadeIn(400);
    // Set first question active
    document.querySelector('#typeform .question input').focus();
  });
});
