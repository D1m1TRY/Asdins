$(document).ready(function() {

 $('#form-0').on('submit', function(e){
  e.preventDefault(); 
  var $that = $(this).get(0),
  formData = new FormData($that);
  console.log(formData); 
  $.ajax({
    url: '/formsend.php', 
    type: 'POST', 
    dataType: 'json',
    contentType: false, 
    processData: false,
    data: formData,
  beforeSend: function(){ 
        console.debug('Request send, waiting answer');
    },
  error: function(req, text, error){ 
    console.error('Error: ' + text + ' | ' + error);
    },
  success: function(msg){
      $('.statusMsg').html('');
      if(msg == 'ok'){
        $('#form-0')[0].reset();
        $('.statusMsg').html('<span style="font-size:14px;color:#34A853">Form data submitted successfully.</span>');
      }else{
        $('.statusMsg').html('<span style="font-size:14px;color:#EA4335">Some problem occurred, please try again.</span>');
      }
    }
  });
});
 $('#form-1').on('submit', function(e){
  e.preventDefault(); 

  var $that = $(this).get(0),
  formData = new FormData($that);

  console.log(formData); 
  $.ajax({
    url: 'http://formsend.php', 
    type: 'POST', 
    dataType: 'json',
    contentType: false, 
    processData: false,
    data: formData,
  beforeSend: function(){ 
        console.debug('Request send, waiting answer');
    },
  error: function(req, text, error){ 
    console.error('Error: ' + text + ' | ' + error);
    },
  success: function(msg){
      $('.statusMsg').html('');
      if(msg == 'ok'){
        $('#form-1')[0].reset();
        $('.statusMsg').html('<span style="font-size:14px;color:#34A853">Form data submitted successfully.</span>');
      }else{
        $('.statusMsg').html('<span style="font-size:14px;color:#EA4335">Some problem occurred, please try again.</span>');
      }
    }
  });
});
 $('#form-2').on('submit', function(e){
  e.preventDefault(); 

  var $that = $(this).get(0),
  formData = new FormData($that);

  console.log(formData); 
  $.ajax({
    url: 'http://formsend.php', 
    type: 'POST', 
    dataType: 'json',
    contentType: false, 
    processData: false,
    data: formData,
  beforeSend: function(){ 
        console.debug('Request send, waiting answer');
    },
  error: function(req, text, error){ 
    console.error('Error: ' + text + ' | ' + error);
    },
  success: function(msg){
    $('.statusMsg').html('');
    if(msg == 'ok'){
      $('#form-2')[0].reset();
      $('.statusMsg').html('<span style="font-size:14px;color:#34A853">Form data submitted successfully.</span>');
    }else{
      $('.statusMsg').html('<span style="font-size:14px;color:#EA4335">Some problem occurred, please try again.</span>');
    }
  }
});
});
 $('#form-3').on('submit', function(e){
  e.preventDefault(); 

  var $that = $(this).get(0),
  formData = new FormData($that);

  console.log(formData); 
  $.ajax({
    url: 'http://formsend.php', 
    type: 'POST', 
    dataType: 'json',
    contentType: false, 
    processData: false,
    data: formData,
  beforeSend: function(){ 
        console.debug('Request send, waiting answer');
    },
  error: function(req, text, error){ 
    console.error('Error: ' + text + ' | ' + error);
    },
  success: function(msg){
      $('.statusMsg').html('');
      if(msg == 'ok'){
        $('#form-3')[0].reset();
        $('.statusMsg').html('<span style="font-size:14px;color:#34A853">Form data submitted successfully.</span>');
      }else{
        $('.statusMsg').html('<span style="font-size:14px;color:#EA4335">Some problem occurred, please try again.</span>');
      }
    }
  });
});

});


// $(function(){
//   $('#form-0').on('submit', function(e){
//     e.preventDefault(); 

//     var $that = $(this),
//     formData = new FormData($that.get(0)); 
//     $.ajax({
//       url: 'formsend.php', 
//       type: 'POST', 
//       dataType: 'json',
//       contentType: false, 
//       processData: false,
//       data: formData,
//       success: function(msg){
//                 $('.statusMsg').html('');
//                 if(msg == 'ok'){
//                     $('#form-0')[0].reset();
//                     $('.statusMsg').html('<span style="font-size:14px;color:#34A853">Form data submitted successfully.</span>');
//                 }else{
//                     $('.statusMsg').html('<span style="font-size:14px;color:#EA4335">Some problem occurred, please try again.</span>');
//                 }
//             }
//     });
//   });
// })();

