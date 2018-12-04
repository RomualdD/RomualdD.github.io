var DIRECTION = {
	"BAS"    : 0,
	"GAUCHE" : 1,
	"DROITE" : 2,
	"HAUT"   : 3
}

var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 5;

function Personnage(url, x, y, direction) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
	this.etatAnimation = -1;

	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete)
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";

		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / 4;
		this.referenceDuPerso.hauteur = this.height / 4;
	}
	this.image.src = "sprites/" + url;
}

Personnage.prototype.dessinerPersonnage = function(context) {
	var frame = 0; // Numéro de l'image à prendre pour l'animation
	var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
	if(this.etatAnimation >= DUREE_DEPLACEMENT) {
		// Si le déplacement a atteint ou dépassé le temps nécéssaire pour s'effectuer, on le termine
		this.etatAnimation = -1;
	} else if(this.etatAnimation >= 0) {
		// On calcule l'image (frame) de l'animation à afficher
		frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		if(frame > 3) {
			frame %= 4;
		}

		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));

		// À partir de ce nombre, on définit le décalage en x et y.
		if(this.direction == DIRECTION.HAUT) {
			decalageY = pixelsAParcourir;
		} else if(this.direction == DIRECTION.BAS) {
			decalageY = -pixelsAParcourir;
		} else if(this.direction == DIRECTION.GAUCHE) {
			decalageX = pixelsAParcourir;
		} else if(this.direction == DIRECTION.DROITE) {
			decalageX = -pixelsAParcourir;
		}

		// On incrémente d'une frame
		this.etatAnimation++;
	}
	/*
	 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile,
	 * donc il nous suffit de garder les valeurs 0 pour les variables
	 * frame, decalageX et decalageY
	 */

	context.drawImage(
		this.image,
		this.largeur * frame, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
		// Point de destination (dépend de la taille du personnage)
		(this.x * 32) - (this.largeur / 2) + 16 + decalageX, (this.y * 32) - this.hauteur + 24 + decalageY,
		this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
	);
}

Personnage.prototype.getCoordonneesAdjacentes = function(direction) {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.BAS :
			coord.y++;
			break;
		case DIRECTION.GAUCHE :
			coord.x--;
			break;
		case DIRECTION.DROITE :
			coord.x++;
			break;
		case DIRECTION.HAUT :
			coord.y--;
			break;
	}
	return coord;
}

Personnage.prototype.deplacer = function(direction, map) {
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}
	// On change la direction du personnage
	this.direction = direction;

	// On vérifie que la case demand�e est bien situ�e dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);
	if(prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getLargeur() || prochaineCase.y >= map.getHauteur()) {
		// On retourne un booléen indiquant que le déplacement ne s'est pas fait,
		// Ça ne coute pas cher et ca peut toujours servir
		return false;
	}

	// On commence l'animation
	this.etatAnimation = 1;

	// On effectue le d�placement
        if(nameMap == 'troisieme' ) {
            if(this.x == 23 && this.y == 5 || this.x == 23 && this.y == 1) {
                this.x = prochaineCase.x;
                var down = false;
								var talkVersion = 1;
                window.addEventListener('keypress', function(e){
                        if(e.keyCode == 13 && !document.getElementById('wizard') && nameMap == 'troisieme'){
                            $('#canvasdiv').append('<div id="competence"><img src="assets/img/wizard.png" id="wizard" alt="photo wizard" height="725px" width="425px"/><div id="talk">\n\
														<section id="1">\n\
														<p>Bonjour et Bienvenue dans la pr\351sentation de mes comp\351tences.</p>\n\
														<p>Au cours de toutes ces années d\'apprentissage, de travail et d\'abnégation.</p>\n\
														<p>J\'ai appris différent langages informatiques. Je me suis noté comme je pensais être en phase avec ceux-ci</p>\n\
														<p>Je souhaite bien évidemment progresser dans plusieurs de ces langages et pourquoi pas en apprendre de nouveaux.</p>\n\
														<p>Commençons par les systèmes d\'exploitation.</p>\n\
                            <div class="acquirment"><p class="exploitation col-lg-offset-4">Syst\350me d\'exploitation :</p>\n\
              							<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/windows.png" alt="Logo windows" title="Logo Windows" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Windows</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active windows" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">35%</div></div></div></div>\n\
														<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/linux.png" alt="logo linux" title="Logo Linux" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Linux</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active Linux" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div></div></div></div>\n\
                            <button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
														$('.buttonSuivant').click(function() {
															$('#'+talkVersion).remove();
															talkVersion++;
																$('#talk').append('<section" id="2">\n\
																<p>Voici maintenant, les langages informatiques que j\'ai acquis au cours de ces quelques années d\'apprentissage.</p>\n\
																<div class="acquirment" style="color: purple;"><p class="exploitation col-lg-offset-4">Langages :</p>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/html_css.jpg" alt="logo html css" title="logo html et css" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">HTML / CSS</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active html" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/php.png" alt="logo php" title="Logo php" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">PHP</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active php" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" >60%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/mysql.png" alt="logo mysql" title="logo mysql" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">SQL</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active sql" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/cpp_logo.png" alt="Logo C++" title="Logo C++" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">C++</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active c" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/bootstrap.png" alt="Logo Bootstrap" title="Logo Bootstrap" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Bootstrap</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active bootstrap" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/javascript.png" alt="Logo JavaScript" title="Logo Javascript" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">JavaScript</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active javascript" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/jquery.png" alt="Logo jQuery" title="Logo jQuery" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">jQuery</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active javascript" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/angular.png" alt="Logo Angular" title="Logo Angular" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Angular</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active javascript" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">15%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/canvas.png" alt="Logo Canvas" title="Logo Canvas" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Canvas</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active canvas" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
																<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
																$('.buttonClose').click(function() {
																		$('#competence').remove();
																		talkVersion = 1;
																});
																$('.buttonSuivant').click(function() {
																	$('#'+talkVersion).remove();
																	talkVersion++;
																	$('#talk').append('<section" id="3">\n\
																	<p>Voici maintenant, les outils informatiques que j\'ai pu utiliser et maitriser.</p>\n\
																	<div class="acquirment" style="color: purple;"><p class="exploitation col-lg-offset-4">Outils :</p>\n\
																	<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/terminal-hi.png" alt="logo terminal" title="logo terminal" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Ligne de commande</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active command" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div>\n\
																	<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/atom.png" alt="Logo Atom" title="Logo Atom" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Atom</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active atom" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div></div></div></div>\n\
																	<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/nano.png" alt="logo nano" title="logo nano" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Nano</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active nano" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
																	<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/git.png" alt="Logo git" title="Logo git" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Git</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active git" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div></div></div></div>\n\
																	<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/github.png" alt="logo github" title="logo github" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">GitHub :</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active github" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div></div></div></div>\n\
																	<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/vhost.jpg" alt="logo vhost apache" title="logo vhost apache" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Vhost :</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active vhost" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div>\n\
																	<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/builder.png" alt="logo builder" title="Logo builder" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">C++ Builder :</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active builder" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div></div></div></div>\n\
																	<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></section>');
																	$('.buttonClose').click(function() {
																			$('#competence').remove();
																			talkVersion = 1;
																	});
															});
															});
														$('.buttonClose').click(function() {
																$('#competence').remove();
																talkVersion = 1;
														});
														$('.acquirment').attr({style: "color: purple;"})
														$('.buttonTalk').attr({style : "color: black;"})
                            $('#wizard').attr({ style : "display: block; position: relative; float: right;" });
                            $('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: red; color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
                            $('#canvas').attr({ style : "position: absolute;" });
                        }
                    },false);
            } else if(this.x == 21 && this.y == 3 || this.x == 25 && this.y == 5 || this.x == 22 && this.y == 4 || this.x == 21 && this.y == 4 || this.x == 22 && this.y == 2 || this.x == 25 && this.y == 4 || this.x == 25 && this.y == 3 || this.x == 25 && this.y == 2) {
                this.y = prochaineCase.y;
                window.addEventListener('keypress', function(e){
                        if(e.keyCode == 13 && !document.getElementById('wizard') && nameMap == 'troisieme'){
													$('#canvasdiv').append('<div id="competence"><img src="assets/img/wizard.png" id="wizard" alt="photo wizard" height="725px" width="425px"/><div id="talk">\n\
													<section id="1">\n\
													<p>Bonjour et Bienvenue dans la pr\351sentation de mes comp\351tences.</p>\n\
													<p>Au cours de toutes ces années d\'apprentissage, de travail et d\'abnégation.</p>\n\
													<p>J\'ai appris différent langages informatiques. Je me suis noté comme je pensais être en phase avec ceux-ci</p>\n\
													<p>Je souhaite bien évidemment progresser dans plusieurs de ces langages et pourquoi pas en apprendre de nouveaux.</p>\n\
													<p>Commençons par les systèmes d\'exploitation.</p>\n\
													<div class="acquirment"><p class="exploitation col-lg-offset-4">Syst\350me d\'exploitation :</p>\n\
													<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/windows.png" alt="Logo windows" title="Logo Windows" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Windows</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active windows" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">35%</div></div></div></div>\n\
													<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/linux.png" alt="logo linux" title="Logo Linux" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Linux</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active Linux" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div></div></div></div>\n\
													<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Voici maintenant, les langages informatiques que j\'ai acquis au cours de ces quelques années d\'apprentissage.</p>\n\
															<div class="acquirment" style="color: purple;"><p class="exploitation col-lg-offset-4">Langages :</p>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/html_css.jpg" alt="logo html css" title="logo html et css" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">HTML / CSS</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active html" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/php.png" alt="logo php" title="Logo php" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">PHP</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active php" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" >60%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/mysql.png" alt="logo mysql" title="logo mysql" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">SQL</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active sql" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/cpp_logo.png" alt="Logo C++" title="Logo C++" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">C++</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active c" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/bootstrap.png" alt="Logo Bootstrap" title="Logo Bootstrap" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Bootstrap</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active bootstrap" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/javascript.png" alt="Logo JavaScript" title="Logo Javascript" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">JavaScript</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active javascript" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/jquery.png" alt="Logo jQuery" title="Logo jQuery" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">jQuery</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active javascript" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">40%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/angular.png" alt="Logo Angular" title="Logo Angular" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Angular</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active javascript" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">15%</div></div></div></div>\n\
															<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/canvas.png" alt="Logo Canvas" title="Logo Canvas" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Canvas</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active canvas" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
															<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
															$('.buttonClose').click(function() {
																	$('#competence').remove();
																	talkVersion = 1;
															});
															$('.buttonSuivant').click(function() {
																$('#'+talkVersion).remove();
																talkVersion++;
																$('#talk').append('<section" id="3">\n\
																<p>Voici maintenant, les outils informatiques que j\'ai pu utiliser et maitriser.</p>\n\
																<div class="acquirment" style="color: purple;"><p class="exploitation col-lg-offset-4">Outils :</p>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/terminal-hi.png" alt="logo terminal" title="logo terminal" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Ligne de commande</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active command" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/atom.png" alt="Logo Atom" title="Logo Atom" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Atom</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active atom" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/nano.png" alt="logo nano" title="logo nano" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Nano</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active nano" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/git.png" alt="Logo git" title="Logo git" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Git</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active git" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/github.png" alt="logo github" title="logo github" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">GitHub :</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active github" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/vhost.jpg" alt="logo vhost apache" title="logo vhost apache" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Vhost :</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active vhost" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div></div></div>\n\
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/builder.png" alt="logo builder" title="Logo builder" width="25px" height="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">C++ Builder :</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active builder" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div></div></div></div>\n\
																<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></section>');
																$('.buttonClose').click(function() {
																		$('#competence').remove();
																		talkVersion = 1;
																});
														});
														});
													$('.buttonClose').click(function() {
															$('#competence').remove();
															talkVersion = 1;
													});
													$('.acquirment').attr({style: "color: purple;"})
													$('.buttonTalk').attr({style : "color: black;"})
													$('#wizard').attr({ style : "display: block; position: relative; float: right;" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: red; color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
                        };
                    },false);
            }
            else {
                this.x = prochaineCase.x;
                this.y = prochaineCase.y;
            }
        } else if(nameMap == 'quatrieme') {
					if(this.x == 23 && this.y == 5 || this.x == 23 && this.y == 1) {
							this.x = prochaineCase.x;
							var down = false;
							var talkVersion = 1;
							window.addEventListener('keypress', function(e){
											if(e.keyCode == 13 && !document.getElementById('knight') && nameMap == 'quatrieme'){
												$('#canvasdiv').append('<div id="parcours"><img src="assets/img/lord_knight.png" id="knight" alt="photo knight" height="725px" width="425px"/><div id="talk">\n\
												<section id="1">\n\
												<p>Bonjour et Bienvenue dans la pr\351sentation de mon parcours.</p>\n\
												<p class="acquirment">Je suis actuellement en contrat de professionnalisation à La Manu et dans l\'entreprise "picardie-informatique" à Amiens, pour obtenir le titre RNCP de Concepteur Développeur Informatique de niveau II.</p>\n\
												<p>J\'ai toujours voulu faire un métier dans le rapport du numérique, plus spécifiquement dans le domaine du jeuxvidéo.</p>\n\
												<p>C\'est pourquoi j\'ai réalisé mon cv numérique de cette façon, j\'ai eu l\'idée de faire un cv qui pouvait convenir à plusieurs de mes intérêts.</p>\n\
												<p>Mon premier CV est en rapport avec ma passion des jeuxvidéo et ce CV en est la concrétisation.</p>\n\
												<p>Voici désormais mon parcours, je vais commencer à partir du début.</p>\n\
												<div class="acquirment">\n\
												<div class="row">En Juin 2011, à la fin de ma classe de 3ème j\'ai acquis le brevet des collèges.</div>\n\
												<div class="row">Suite à mes études de collèges, je me suis isncrit au lycée Mireille Grenet, afin d\'étudier les options Sciences de l\'ingénieur.</div>\n\
												<div class="row">Puis un bac Scientifique option Science de l\'ingénieur avec comme spécialité l\'ISN (science du numérique) que j\'ai obtenu en 2015.</div>\n\
												<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Puis après mon baccalauréat, je me suis orienté vers une spécialité en réseaux informatique.</p>\n\
															<div class="acquirment" style="color: purple;">\n\
															<div class="row">J\'ai obtenu un BTS systèmes numérique informatique et réseaux.</div>\n\
															<div class="row">Grâce à ce BTS, j\'ai pu apprendre quelques langages, dont un que j\'ai voulu perfectionner.</div>\n\
															<div class="row">Afin de perfectionner le domaine auquel j\'ai le plus apprécier (le développement web), je me suis orienté vers celui-ci, grâce à une formation professionnelle.</div>\n\
															<div class="row">La formation professionnelle E2N (maintenant appelé La Manu), j\'ai acquis le titre RNCP de Concepteur Développeur de niveau III.</div>\n\
															<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></section>');
															$('.buttonClose').click(function() {
																	$('#parcours').remove();
																	talkVersion = 1;
															});
													});
													$('.buttonClose').click(function() {
															$('#parcours').remove();
															talkVersion = 1;
													});
													$('.acquirment').attr({style: "color: purple;"})
													$('.buttonTalk').attr({style : "color: black;"})
													$('#knight').attr({ style : "display: block; position: relative; float: right;" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: red; color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
											}
									},false);
					} else if(this.x == 21 && this.y == 3 || this.x == 25 && this.y == 5 || this.x == 22 && this.y == 4 || this.x == 21 && this.y == 4 || this.x == 22 && this.y == 2 || this.x == 25 && this.y == 4 || this.x == 25 && this.y == 3 || this.x == 25 && this.y == 2) {
							this.y = prochaineCase.y;
							window.addEventListener('keypress', function(e){
											if(e.keyCode == 13 && !document.getElementById('knight') && nameMap == 'quatrieme'){
												$('#canvasdiv').append('<div id="parcours"><img src="assets/img/lord_knight.png" id="knight" alt="photo knight" height="725px" width="425px"/><div id="talk">\n\
												<section id="1">\n\
												<p>Bonjour et Bienvenue dans la pr\351sentation de mon parcours.</p>\n\
												<p class="acquirment">Je suis actuellement en contrat de professionnalisation à La Manu et dans l\'entreprise "picardie-informatique" à Amiens, pour obtenir le titre RNCP de Concepteur Développeur Informatique de niveau II.</p>\n\
												<p>J\'ai toujours voulu faire un métier dans le rapport du numérique, plus spécifiquement dans le domaine du jeuxvidéo.</p>\n\
												<p>C\'est pourquoi j\'ai réalisé mon cv numérique de cette façon, j\'ai eu l\'idée de faire un cv qui pouvait convenir à plusieurs de mes intérêts.</p>\n\
												<p>Mon premier CV est en rapport avec ma passion des jeuxvidéo et ce CV en est la concrétisation.</p>\n\
												<p>Voici désormais mon parcours, je vais commencer à partir du début.</p>\n\
												<div class="acquirment">\n\
												<div class="row">En Juin 2011, à la fin de ma classe de 3ème j\'ai acquis le brevet des collèges.</div>\n\
												<div class="row">Suite à mes études de collèges, je me suis isncrit au lycée Mireille Grenet, afin d\'étudier les options Sciences de l\'ingénieur.</div>\n\
												<div class="row">Puis un bac Scientifique option Science de l\'ingénieur avec comme spécialité l\'ISN (science du numérique) que j\'ai obtenu en 2015.</div>\n\
												<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Puis après mon baccalauréat, je me suis orienté vers une spécialité en réseaux informatique.</p>\n\
															<div class="acquirment" style="color: purple;">\n\
															<div class="row">J\'ai obtenu un BTS systèmes numérique informatique et réseaux.</div>\n\
															<div class="row">Grâce à ce BTS, j\'ai pu apprendre quelques langages, dont un que j\'ai voulu perfectionner.</div>\n\
															<div class="row">Afin de perfectionner le domaine auquel j\'ai le plus apprécier (le développement web), je me suis orienté vers celui-ci, grâce à une formation professionnelle.</div>\n\
															<div class="row">La formation professionnelle E2N (maintenant appelé La Manu), j\'ai acquis le titre RNCP de Concepteur Développeur de niveau III.</div>\n\
															<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></section>');
															$('.buttonClose').click(function() {
																	$('#parcours').remove();
																	talkVersion = 1;
															});
													});
													$('.buttonClose').click(function() {
															$('#parcours').remove();
															talkVersion = 1;
													});
													$('.acquirment').attr({style: "color: purple;"})
													$('.buttonTalk').attr({style : "color: black;"})
													$('#knight').attr({ style : "display: block; position: relative; float: right;" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: red; color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
											}
									},false);
					}
					else {
							this.x = prochaineCase.x;
							this.y = prochaineCase.y;
					}
				} else {
            this.x = prochaineCase.x;
            this.y = prochaineCase.y;
        }
	return true;
}
