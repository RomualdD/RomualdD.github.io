$(function(){
  $(window).keydown(function(e){
    switch (e.keyCode) {
      case 89: //y
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
        case 82: //r
        window.location.href = "cvnumerique.html";
          break;
        case 76: //r
          window.location.href = "CV_Romuald_Ducrocq.pdf";
        break;
        case 27: //echap
          $('#play').click();
            break;
          case 96: //0
          $('#zero').click();
            break;
            case 97: //1
            $('#un').click();
              break;
          case 98: //2
          $('#deux').click();
              break;
          case 99: //3
          $('#trois').click();
              break;
          case 100: //4
          $('#quatre').click();
              break;
          case 101: //5
          $('#cinq').click();
              break;
          case 102: //6
          $('#six').click();
              break;
          case 103: //7
          $('#sept').click();
                break;
          case 104: //8
          $('#huit').click();
                break;
          case 105: //9
          $('#neuf').click();
                break;
    }
  })
})
