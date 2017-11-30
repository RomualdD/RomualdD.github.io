$(function(){
  $(window).keydown(function(e){
    switch (e.keyCode) {
      case 89: //y
        alert('ok');
        window.location.href = "#history";
        break;
      case 65: //a
      window.location.href = "#hobbies";
        break;
      case 66: //b
      window.location.href = "#expertize";
        break;
      case 88: //x
      window.location.href = "#realisation";
        break;
    }
  })
})
