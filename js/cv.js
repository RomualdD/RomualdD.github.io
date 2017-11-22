var map = new Map("premiere");
var joueur = new Personnage("drogon.png", 25, 28, DIRECTION.BAS);
map.addPersonnage(joueur);

window.onload = function() {
	$("#myModal").modal('show') ;
	//alert("Ce CV est en travaux !")
	//alert("Utilisez les touches du clavier pour vous déplacé \n Maintenez le clique et déplacer le curseur de votre souris si vous ne voulez pas suivre le personnage");

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var div = document.getElementById('canvasdiv');
	var dragging = false;
	var lastX;
	var marginLeft = 0;
	var left = 0;

	canvas.width =	25000;
	canvas.height = 960;

	canvas.addEventListener('mousedown', function(e) {
	    var evt = e || event;
	    dragging = true;
	    lastX = evt.clientX;
	    e.preventDefault();
	}, false);

	window.addEventListener('mousemove', function(e) {
	    var evt = e || event;
	    if (dragging) {
	        var delta = evt.clientX - lastX;
	        lastX = evt.clientX;
	        marginLeft += delta;
	        canvas.style.marginLeft = marginLeft + "px";
	    }
	    e.preventDefault();
	}, false);

	window.addEventListener('mouseup', function() {
	    dragging = false;
	}, false);

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
		// On récupère le code de la touche
		var e = event || window.event;
		var key = e.which || e.keyCode;

		switch(key) {
			case 38 : // Flèche haut
				joueur.deplacer(DIRECTION.HAUT, map);
				break;
			case 40 : // Flèche bas
				joueur.deplacer(DIRECTION.BAS, map);
				break;
			case 37 : // Flèche gauche
				left -= 9;
				joueur.deplacer(DIRECTION.GAUCHE, map);
				div.scrollLeft	=	left;
				break;
			case 39 : // Flèche droite
				joueur.deplacer(DIRECTION.DROITE, map);
				left += 9;
				div.scrollLeft	=	left;
				break;
			default :
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}

		return false;
	}
}
