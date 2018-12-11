var map = new Map("seconde");
var joueur = new Personnage("drogon.png", 20, 2, DIRECTION.BAS);
map.addPersonnage(joueur);
var nameMap = 'seconde';

window.onload = function() {
	$("#myModal").modal('show') ;

		$('#canvasdiv').append('<div id="touchehelp"><img src="assets/img/touche.png" id="touche" alt="photo touche" height="725px" width="425px"/></div>');
		$('#canvas').attr({ style : "position: absolute;" });
		$('#touche').attr({ style : "display: block; position: relative; float: right;" });

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var div = document.getElementById('canvasdiv');
	var dragging = false;
	var lastX;
	var marginLeft = 0;
	var left = 0;

	canvas.width =	1534;
	canvas.height = 744;

	window.requestAnimFrame = (function(){
       return  window.requestAnimationFrame       ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame    ||
               window.oRequestAnimationFrame      ||
               window.msRequestAnimationFrame     ||
               function(/* function */ callback, /* DOMElement */ element){
                 window.setTimeout(callback, 1000 / 60);
               };
     })();

     (function animloop(){
       requestAnimFrame(animloop); //Remplce le setInterval pour un rendu plu fluide
       map.dessinerMap(ctx);
     })();

	// Gestion du clavier
	window.onkeydown = function(event) {
		// On r�cup�re le code de la touche
		var e = event || window.event;
		var key = e.which || e.keyCode;
                if(!document.getElementById('wizard')) {
                    switch(key) {
                            case 38 : // Fl�che haut
                                    joueur.deplacer(DIRECTION.HAUT, map);
                                    break;
                            case 40 : // Fl�che bas
                                    joueur.deplacer(DIRECTION.BAS, map);
                                    break;
                            case 37 : // Fl�che gauche
                                    joueur.deplacer(DIRECTION.GAUCHE, map);
                                    break;
                            case 39 : // Fl�che droite
                                    joueur.deplacer(DIRECTION.DROITE, map);
                                    break;
														case 27 : document.location.href="https://romualdd.github.io/";
																		break;
                            default :
                                    //alert(key);
                                    // Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
                                    return true;
                    }
                }
                console.log(nameMap);
                console.log(joueur.y);
                console.log('x :'+joueur.x);
                if(joueur.x == 4 && joueur.y == 6 && nameMap == 'seconde') {
                    map = new Map("troisieme");
                    joueur = new Personnage("drogon.png", 23, 21, DIRECTION.HAUT);
                    var joueur1 = new Personnage("wiz.png", 23, 2, DIRECTION.BAS);
                    map.addPersonnage(joueur);
                    map.addPersonnage(joueur1);
                    nameMap = 'troisieme';
                } else if(joueur.x == 33 && joueur.y == 4 && nameMap == 'seconde') {
                    map = new Map('quatrieme');
                    joueur = new Personnage("drogon.png", 23, 21, DIRECTION.HAUT);
                    var joueur1 = new Personnage("knight.png", 23, 2, DIRECTION.BAS);
                    map.addPersonnage(joueur);
                    map.addPersonnage(joueur1);
                    nameMap = 'quatrieme';
                } else if(joueur.x == 4 && joueur.y == 16 && nameMap == 'seconde') {
                    map = new Map('cinquieme');
                    joueur = new Personnage("drogon.png", 23, 21, DIRECTION.HAUT);
                    var joueur1 = new Personnage("bard.png", 23, 2, DIRECTION.BAS);
                    map.addPersonnage(joueur);
                    map.addPersonnage(joueur1);
                    nameMap = 'cinquieme';
                } else if(joueur.x == 30 && joueur.y == 15 && nameMap == 'seconde') {
                    map = new Map('sixieme');
                    joueur = new Personnage("drogon.png", 23, 21, DIRECTION.HAUT);
                    var joueur1 = new Personnage("blacksmith.png", 23, 2, DIRECTION.BAS);
                    map.addPersonnage(joueur);
                    map.addPersonnage(joueur1);
                    nameMap = 'sixieme';
                } else if((joueur.x == 23 || joueur.x == 24 || joueur.x == 22) && joueur.y == 22  && nameMap != 'seconde') {
									if(nameMap == 'troisieme') {
	                  map = new Map('seconde');
										joueur = new Personnage("drogon.png", 4, 7, DIRECTION.HAUT);
                    map.addPersonnage(joueur);
										nameMap = 'seconde';
									} else if(nameMap == 'quatrieme') {
	                  map = new Map('seconde');
										joueur = new Personnage("drogon.png", 33, 5, DIRECTION.HAUT);
                    map.addPersonnage(joueur);
										nameMap = 'seconde';
									} else if(nameMap == 'cinquieme') {
	                  map = new Map('seconde');
										joueur = new Personnage("drogon.png", 4, 17, DIRECTION.HAUT);
                    map.addPersonnage(joueur);
										nameMap = 'seconde';
									} else if(nameMap == 'sixieme') {
	                  map = new Map('seconde');
										joueur = new Personnage("drogon.png", 30, 16, DIRECTION.HAUT);
                    map.addPersonnage(joueur);
										nameMap = 'seconde';
									}
								}
                // personnage fait par Farheit de deviantart / ftabah / josmiley
								// image blacksmith réalisé par Creative Uncut
								// tileset meuble pixana
		return false;
	}

}
