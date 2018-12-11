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
            if(this.x == 23 && this.y == 4 || this.x == 23 && this.y == 1 || this.x == 24 && this.y == 4 || this.x == 22 && this.y == 4) {
								if(prochaineCase.y == 5) {
									this.y = prochaineCase.y;
								}
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
																<div class="row"><div class="progressall marge"><div class="logo col-lg-1"><img src="assets/img/angular.png" alt="Logo Angular" title="Logo Angular" height="25px" width="25px"></div><div class="nameexpert col-lg-3 col-lg-offset-1">Angular</div><div class="progress col-lg-offset-5"><div class="progress-bar progress-bar-success progress-bar-striped active angular" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">15%</div></div></div></div>\n\
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
            } else if(this.x == 24 && this.y == 5 || this.x == 22 && this.y == 4 || this.x == 22 && this.y == 3 || this.x == 22 && this.y == 2 || this.x == 24 && this.y == 4 || this.x == 24 && this.y == 3 || this.x == 24 && this.y == 2) {
								if(prochaineCase.x == 22 || prochaineCase.x == 25 || prochaineCase.x == 21) {
									this.x = prochaineCase.x;
								}
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
					if(this.x == 23 && this.y == 4 || this.x == 23 && this.y == 1 || this.x == 24 && this.y == 4 || this.x == 22 && this.y == 4) {
							if(prochaineCase.y == 5) {
								this.y = prochaineCase.y;
							}
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
												<div class="row">Suite à mes études de collèges, je me suis inscrit au lycée Mireille Grenet, afin d\'étudier les options Sciences de l\'ingénieur.</div>\n\
												<div class="row">Puis un bac Scientifique option Science de l\'ingénieur avec comme spécialité l\'ISN (science du numérique) que j\'ai obtenu en 2015.</div>\n\
												<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Puis après mon baccalauréat, je me suis orienté vers une spécialité en réseaux informatique.</p>\n\
															<div class="acquirment" style="color: purple; margin: 10px;">\n\
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
													$('.acquirment').attr({style: "color: purple; margin: 10px;"})
													$('.buttonTalk').attr({style : "color: black;"})
													$('#knight').attr({ style : "display: block; position: relative; float: right;" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: red; color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
											}
									},false);
								} else if(this.x == 24 && this.y == 5 || this.x == 22 && this.y == 4 || this.x == 22 && this.y == 3 || this.x == 22 && this.y == 2 || this.x == 24 && this.y == 4 || this.x == 24 && this.y == 3 || this.x == 24 && this.y == 2) {
										if(prochaineCase.x == 22 || prochaineCase.x == 25 || prochaineCase.x == 21) {
											this.x = prochaineCase.x;
										}
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
															<div class="acquirment" style="color: purple; margin: 10px;">\n\
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
													$('.acquirment').attr({style: "color: purple; margin: 10px;"})
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
				} else if(nameMap == 'cinquieme') {
					if(this.x == 23 && this.y == 4 || this.x == 23 && this.y == 1 || this.x == 24 && this.y == 4 || this.x == 22 && this.y == 4) {
							if(prochaineCase.y == 5) {
								this.y = prochaineCase.y;
							}
							this.x = prochaineCase.x;
							var down = false;
							var talkVersion = 1;
							window.addEventListener('keypress', function(e){
											if(e.keyCode == 13 && !document.getElementById('bard') && nameMap == 'cinquieme'){
												$('#canvasdiv').append('<div id="hobbies"><img src="assets/img/clown.png" id="bard" alt="photo bard" height="725px" width="425px"/><div id="talk">\n\
												<section id="1">\n\
												<p>Bonjour et Bienvenue dans la pr\351sentation de mes passions.</p>\n\
												<p>Ici, je vais vous parler des activités que je fais hors de mon travail, ce qui me défini.</p>\n\
												<div class="acquirment">\n\
												<div class="row">Tout d\'abord, je vais vous présenter les maquettes "gunpla".</div>\n\
												<div class="row">Pour commencer, précisons qu\'un gunpla et un gundam (des robots assez connus au Japon) en plastique.</div>\n\
												<div class="row">Les pièces qui le constitues sont d\'une taille assez petites, il faut donc minutieux et précis, le tout d\'avoir l\'équipement adéquat.</div>\n\
												<div class="row">C\'est à dire, une pince coupante permettant de couper les morceaux attachés à son plastiques. Voici un exemple lorque c\'est terminé :</div>\n\
												<div class="row"><img id="gundam" src="assets/img/realgundam.jpg" height="200px" width="200px"></div>\n\
												<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Ma deuxième passion est le Japon, j\'aime lire des mangas, manger de la nourriture japonaise et écouter des chansons provenant de ce pays.</p>\n\
															<div class="acquirment" style="color: purple; margin: 10px;">\n\
															<div class="row">Voici un exemple de nourriture japonaise.</div>\n\
															<div class="row"><img id="gundam" src="assets/img/platjap.jpg" height="200px" width="300px"></div>\n\
															<div class="row">Voici quelques liens de musique japonaise.</div>\n\
															<div class="row"><a class="link" href="https://www.youtube.com/watch?v=PDSkFeMVNFs" target="_blank">"Zen Zen Zen" de Radwimps</a></div>\n\
															<div class="row"><a class="link" href="https://www.youtube.com/watch?v=4-zXzhfP2YM" target="_blank">"Kurenaï" de X Japan</a></div>\n\
															<div class="row"><a class="link" href="https://www.youtube.com/watch?v=7Bgr76R0eeg" target="_blank">"Dance my generation" de Golden Bomber</a></div>\n\
															<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
															$('.buttonClose').click(function() {
																	$('#hobbies').remove();
																	talkVersion = 1;
															});
															$('.buttonSuivant').click(function() {
																$('#'+talkVersion).remove();
																talkVersion++;
																$('#talk').append('<section" id="3">\n\
																<div class="acquirment" style="color: white; font-style: "consola"; margin: 10px;">\n\
																<p>Quelques mangas lu :</p>\n\
																<div class="row">One piece :</div>\n\
																<div class="row"><img id="onepiece" src="assets/img/one_piece.jpg" height="200px" width="150px"></div>\n\
																<div class="row">Gantz :</div>\n\
																<div class="row"><img id="gantz" src="assets/img/gantz.jpg" height="200px" width="150px"></div>\n\
																<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
																$('.buttonClose').click(function() {
																		$('#hobbies').remove();
																		talkVersion = 1;
																});
																$('.buttonSuivant').click(function() {
																	$('#'+talkVersion).remove();
																	talkVersion++;
																	$('#talk').append('<section" id="3">\n\
																	<div class="acquirment" style="color: white;font-style: "consola"; margin: 10px;">\n\
																	<p>Ma dernière passion est les jeuxivdéos</p>\n\
																	<p>Depuis tout petit, je joue aux jeuxvidéos. J\'ai commencer par Nintendo, puis je me suis rapproché des consoles Microsoft.</p>\n\
																	<p>Voici quelques jeux auquel je joue, les vidéos sont de ma réalisation.</p>\n\
																	<div class="row videogame" style="color: red" id="smite">Smite (Cliquez ici)</div>\n\
																	<div class="row videogame" style="color: red" id="happywars">Happy Wars (Cliquez ici)</div>\n\
																	<div class="row"><button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></div></section>');
																	$('.buttonClose').click(function() {
																			$('#hobbies').remove();
																			talkVersion = 1;
																	});
																	$('.videogame').hover(function() {
																		$(this).css( 'cursor', 'pointer' );
																	});
																	$('#smite').click(function() {
																		if(!document.getElementById('smitegame')) {
																			$(this).append('<div class="row"><img id="smitegame" src="assets/img/smite.gif" height="200px" width="350px"></div>');
																		}
																		if(document.getElementById('happywarsgame')) {
																				$('#happywarsgame').remove();
																		}
																	})
																	$('#happywars').click(function() {
																		if(document.getElementById('smitegame')) {
																			$('#smitegame').remove();

																		}
																		if(!document.getElementById('happywarsgame')) {
																			$(this).append('<div class="row"><img id="happywarsgame" src="assets/img/happywars.gif" height="200px" width="350px"></div>')
																		}
																	});
																});
															});
													});
													$('.buttonClose').click(function() {
															$('#hobbies').remove();
															talkVersion = 1;
													});
													$('.link').hover(function(){
														$(this).css("color: red;");
													})
													$('.link').attr({style: "color: white;"});
													$('.acquirment').attr({style: "color: white; font-style: 'consola'; margin: 10px;"});
													$('.buttonTalk').attr({style : "color: black;"});
													$('#bard').attr({ style : "display: block; position: relative; float: right;" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: black; color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
											}
									},false);
								} else if(this.x == 24 && this.y == 5 || this.x == 22 && this.y == 4 || this.x == 22 && this.y == 3 || this.x == 22 && this.y == 2 || this.x == 24 && this.y == 4 || this.x == 24 && this.y == 3 || this.x == 24 && this.y == 2) {
										if(prochaineCase.x == 22 || prochaineCase.x == 25 || prochaineCase.x == 21) {
											this.x = prochaineCase.x;
										}
							this.y = prochaineCase.y;
							window.addEventListener('keypress', function(e){
											if(e.keyCode == 13 && !document.getElementById('knight') && nameMap == 'quatrieme'){
												$('#canvasdiv').append('<div id="hobbies"><img src="assets/img/clown.png" id="bard" alt="photo bard" height="725px" width="425px"/><div id="talk">\n\
												<section id="1">\n\
												<p>Bonjour et Bienvenue dans la pr\351sentation de mes passions.</p>\n\
												<p>Ici, je vais vous parler des activités que je fais hors de mon travail, ce qui me défini.</p>\n\
												<div class="acquirment">\n\
												<div class="row">Tout d\'abord, je vais vous présenter les maquettes "gunpla".</div>\n\
												<div class="row">Pour commencer, précisons qu\'un gunpla et un gundam (des robots assez connus au Japon) en plastique.</div>\n\
												<div class="row">Les pièces qui le constitues sont d\'une taille assez petites, il faut donc minutieux et précis, le tout d\'avoir l\'équipement adéquat.</div>\n\
												<div class="row">C\'est à dire, une pince coupante permettant de couper les morceaux attachés à son plastiques. Voici un exemple lorque c\'est terminé :</div>\n\
												<div class="row"><img id="gundam" src="assets/img/realgundam.jpg" height="200px" width="200px"></div>\n\
												<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Ma deuxième passion est le Japon, j\'aime lire des mangas, manger de la nourriture japonaise et écouter des chansons provenant de ce pays.</p>\n\
															<div class="acquirment" style="color: purple; margin: 10px;">\n\
															<div class="row">Voici un exemple de nourriture japonaise.</div>\n\
															<div class="row"><img id="gundam" src="assets/img/platjap.jpg" height="200px" width="300px"></div>\n\
															<div class="row">Voici quelques liens de musique japonaise.</div>\n\
															<div class="row"><a class="link" href="https://www.youtube.com/watch?v=PDSkFeMVNFs" target="_blank">"Zen Zen Zen" de Radwimps</a></div>\n\
															<div class="row"><a class="link" href="https://www.youtube.com/watch?v=4-zXzhfP2YM" target="_blank">"Kurenaï" de X Japan</a></div>\n\
															<div class="row"><a class="link" href="https://www.youtube.com/watch?v=7Bgr76R0eeg" target="_blank">"Dance my generation" de Golden Bomber</a></div>\n\
															<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
															$('.buttonClose').click(function() {
																	$('#hobbies').remove();
																	talkVersion = 1;
															});
															$('.buttonSuivant').click(function() {
																$('#'+talkVersion).remove();
																talkVersion++;
																$('#talk').append('<section" id="3">\n\
																<div class="acquirment" style="color: purple; margin: 10px;">\n\
																<p>Quelques mangas lu :</p>\n\
																<div class="row">One piece :</div>\n\
																<div class="row"><img id="onepiece" src="assets/img/one_piece.jpg" height="200px" width="150px"></div>\n\
																<div class="row">Gantz :</div>\n\
																<div class="row"><img id="gantz" src="assets/img/gantz.jpg" height="200px" width="150px"></div>\n\
																<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
																$('.buttonClose').click(function() {
																		$('#hobbies').remove();
																		talkVersion = 1;
																});$('.buttonSuivant').click(function() {
																	$('#'+talkVersion).remove();
																	talkVersion++;
																	$('#talk').append('<section" id="3">\n\
																	<p>Ma dernière passion est les jeuxivdéos</p>\n\
																	<p>Depuis tout petit, je joue aux jeuxvidéos. J\'ai commencer par Nintendo, puis je me suis rapproché des consoles Microsoft.</p>\n\
																	<p>Voici quelques jeux auquel je joue, les vidéos sont de ma réalisation.</p>\n\
																	<div class="acquirment" style="color: purple; margin: 10px;">\n\
																	<div class="row" id="smite">Smite</div>\n\
																	<div class="row" id="happywars">Happy Wars</div>\n\
																	<div class="row"><button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></div></section>');
																	$('.buttonClose').click(function() {
																			$('#hobbies').remove();
																			talkVersion = 1;
																	});
																	$('#smite').click(function() {
																		if(!document.getElementById('smitegame')) {
																			$(this).append('<div class="row"><img id="smitegame" src="assets/img/smite.gif" height="200px" width="350px"></div>');
																		}
																		if(document.getElementById('happywarsgame')) {
																				$('#happywarsgame').remove();
																		}
																	})
																	$('#happywars').click(function() {
																		if(document.getElementById('smitegame')) {
																			$('#smitegame').remove();

																		}
																		if(!document.getElementById('happywarsgame')) {
																			$(this).append('<div class="row"><img id="happywarsgame" src="assets/img/happywars.gif" height="200px" width="350px"></div>')
																		}
																	})
																});
															});
													});
													$('.buttonClose').click(function() {
															$('#hobbies').remove();
															talkVersion = 1;
													});
													$('.link').hover(function(){
														$(this).css("color: white;");
													})
													$('.link').attr({style: "color: red; font-style: consola;"});
													$('.acquirment').attr({style: "color: white; margin: 10px;"});
													$('.buttonTalk').attr({style : "color: black;"});
													$('#bard').attr({ style : "display: block; position: relative; float: right;" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: black; color: yellow;  float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
											}
									},false);
					}
					else {
							this.x = prochaineCase.x;
							this.y = prochaineCase.y;
					}
				} else if(nameMap == 'sixieme') {
					if(this.x == 23 && this.y == 4 || this.x == 23 && this.y == 1 || this.x == 24 && this.y == 4 || this.x == 22 && this.y == 4) {
							if(prochaineCase.y == 5) {
								this.y = prochaineCase.y;
							}
							this.x = prochaineCase.x;
							var down = false;
							var talkVersion = 1;
							window.addEventListener('keypress', function(e){
											if(e.keyCode == 13 && !document.getElementById('blacksmith') && nameMap == 'sixieme'){
												$('#canvasdiv').append('<div id="creation"><img src="assets/img/blacksmith.png" id="blacksmith" alt="photo bard" height="724px" width="425px"/><div id="talk">\n\
												<section id="1">\n\
												<p>Bienvenue dans mes projets.</p>\n\
												<p>Je vais vous parler de mes projets que j\'ai réalisé seul ou en groupe lors de mes études.</p>\n\
												<div class="acquirment">\n\
												<div class="row">Lors de mon baccalauréat Scientifique j\'ai du réalisé un projet.</div>\n\
												<div class="row">Nous étions un groupe de trois. Nous avons réfléchis à un moyen d\'aider des personnes possédant un handicap.</div>\n\
												<div class="row">Le choix du projet a était porté sur les malvoyants, nous avons programmer un fauteuil roulant.</div>\n\
												<div class="row">Ce fauteuil roulant permettait à l\'utilisateur d\'aller d\'un point A à un point B.</div>\n\
												<div class="row">La programmation était en C++ avec Arduino. Lors de ce projet, nous avons participer aux olympiades (compétition où l\'on présente son projet).</div>\n\
												<div class="row">Nous avons fini second de notre région puis nous avons participer aux olympiades nationales.</div>\n\
												<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Je vais vous parler de mon second projet.</p>\n\
															<div class="acquirment" style="color: purple; margin: 10px;">\n\
															<div class="row">En BTS, nous avions un projet à faire et à présenter à la fin de l\'année en groupe de trois.</div>\n\
															<div class="row">Nous n\'avions pas eu le choix du projet qui était désigné par le professeur.</div>\n\
															<div class="row">Le projet était dans le cadre de l\'escalade pour les professeurs de sport, le but étant de démarrer un chronomètre lors du top départ et l\'arrêter en haut.</div>\n\
															<div class="row">Notre projet était le développement d\'un chronomètre à afficher sur un panneau d\'affichage, lorsque l\'utilisateur appuyé sur le champignon pour terminé ou le tapis pour démarrer</div>\n\
															<div class="row">Je me suis occupé de la partie affichage du chronomètre grâce à un thread en C++. Puis de la partie SQL, enregistrement des données des participants ainsi que leurs temps.</div>\n\
															<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
															$('.buttonClose').click(function() {
																	$('#creation').remove();
																	talkVersion = 1;
															});
															$('.buttonSuivant').click(function() {
																$('#'+talkVersion).remove();
																talkVersion++;
																$('#talk').append('<section" id="3">\n\
																<p>Passons à la programmation depuis mon entré dans le monde du développement web.</p>\n\
																<div class="acquirment" style="color: purple; margin: 10px;">\n\
																<p>Lors de ma formation, nous étions toujours en groupe de quatres pour réaliser nos projets commun</p>\n\
																<div class="row">Nous avons réalisé deux sites e-commerce</div>\n\
																<div class="row">L\'un en JavaScript/jQuery.</div>\n\
																<div class="row">Et un autre en angularJS</div>\n\
																<div class="row">Cependant, j\'ai également réalisé des exercices en Canvas pour ma formation.</div>\n\
																<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
																$('.buttonClose').click(function() {
																		$('#creation').remove();
																		talkVersion = 1;
																});
																$('.buttonSuivant').click(function() {
																	$('#'+talkVersion).remove();
																	talkVersion++;
																	$('#talk').append('<section" id="4">\n\
																	<p>Afin d\'obtenir mon titre professionnel de Concepteur Développeur j\'ai dû réalisé par moi-même intégralement un site.</p>\n\
																	<p>Dernier projet en date :</p>\n\
																	<div class="acquirment" style="color: purple; margin: 10px;">\n\
																	<div class="row">Le site que j\'ai réalisé, est un site dans le cadre d\'une aide médicale pour diabétique ou sous anticoagulant.</div>\n\
																	<div class="row">C\'est à dire que les personnes ayant ce genre de problème de santé doivent régulièrement faire des prises de sang et les noter dans un carnet</div>\n\
																	<div class="row">Souvent des personnes oublient de faire cette prise, grâce à mon application, ils seraient informés qu\'ils doivent la faire. Puis le carnet ne sera jamais à court de page et permettra de faire un suivi.</div>\n\
																	<div class="row">Les patients peut également noter ces rendez-vous et être suivi par son médecin qui verra leurs évolutions si ils l\'acceptent.</div>\n\
																	<div class="row"><button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></div></section>');
																	$('.buttonClose').click(function() {
																			$('#creation').remove();
																			talkVersion = 1;
																	});
																});
															});
													});
													$('.buttonClose').click(function() {
															$('#creation').remove();
															talkVersion = 1;
													});
													$('.acquirment').attr({style: "color: purple; margin: 10px;"});
													$('.buttonTalk').attr({style : "color: black;"});
													$('#blacksmith').attr({ style : "display: block; position: relative; float: right;" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative;  background-color: #C0C0C0; color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
											}
									},false);
								} else if(this.x == 24 && this.y == 5 || this.x == 22 && this.y == 4 || this.x == 22 && this.y == 3 || this.x == 22 && this.y == 2 || this.x == 24 && this.y == 4 || this.x == 24 && this.y == 3 || this.x == 24 && this.y == 2) {
										if(prochaineCase.x == 22 || prochaineCase.x == 25 || prochaineCase.x == 21) {
											this.x = prochaineCase.x;
										}
										this.y = prochaineCase.y;
							window.addEventListener('keypress', function(e){
											if(e.keyCode == 13 && !document.getElementById('blacksmith') && nameMap == 'sixieme'){
												$('#canvasdiv').append('<div id="creation"><img src="assets/img/blacksmith.png" id="blacksmith" alt="photo bard" height="725px" width="425px"/><div id="talk">\n\
												<section id="1">\n\
												<p>Bienvenue dans mes projets.</p>\n\
												<p>Je vais vous parler de mes projets que j\'ai réalisé seul ou en groupe lors de mes études.</p>\n\
												<div class="acquirment">\n\
												<div class="row">Lors de mon baccalauréat Scientifique j\'ai du réalisé un projet.</div>\n\
												<div class="row">Nous étions un groupe de trois. Nous avons réfléchis à un moyen d\'aider des personnes possédant un handicap.</div>\n\
												<div class="row">Le choix du projet a était porté sur les malvoyants, nous avons programmer un fauteuil roulant.</div>\n\
												<div class="row">Ce fauteuil roulant permettait à l\'utilisateur d\'aller d\'un point A à un point B.</div>\n\
												<div class="row">La programmation était en C++ avec Arduino. Lors de ce projet, nous avons participer aux olympiades (compétition où l\'on présente son projet).</div>\n\
												<div class="row">Nous avons fini second de notre région puis nous avons participer aux olympiades nationales.</div>\n\
												<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
													$('.buttonSuivant').click(function() {
														$('#'+talkVersion).remove();
														talkVersion++;
															$('#talk').append('<section" id="2">\n\
															<p>Je vais vous parler de mon second projet.</p>\n\
															<div class="acquirment" style="color: purple; margin: 10px;">\n\
															<div class="row">En BTS, nous avions un projet à faire et à présenter à la fin de l\'année en groupe de trois.</div>\n\
															<div class="row">Nous n\'avions pas eu le choix du projet qui était désigné par le professeur.</div>\n\
															<div class="row">Le projet était dans le cadre de l\'escalade pour les professeurs de sport, le but étant de démarrer un chronomètre lors du top départ et l\'arrêter en haut.</div>\n\
															<div class="row">Notre projet était le développement d\'un chronomètre à afficher sur un panneau d\'affichage, lorsque l\'utilisateur appuyé sur le champignon pour terminé ou le tapis pour démarrer</div>\n\
															<div class="row">Je me suis occupé de la partie affichage du chronomètre grâce à un thread en C++. Puis de la partie SQL, enregistrement des données des participants ainsi que leurs temps.</div>\n\
															<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
															$('.buttonClose').click(function() {
																	$('#creation').remove();
																	talkVersion = 1;
															});
															$('.buttonSuivant').click(function() {
																$('#'+talkVersion).remove();
																talkVersion++;
																$('#talk').append('<section" id="3">\n\
																<p>Passons à la programmation depuis mon entré dans le monde du développement web.</p>\n\
																<div class="acquirment" style="color: purple; margin: 10px;">\n\
																<p>Lors de ma formation, nous étions toujours en groupe de quatres pour réaliser nos projets commun</p>\n\
																<div class="row">Nous avons réalisé deux sites e-commerce</div>\n\
																<div class="row">L\'un en JavaScript/jQuery.</div>\n\
																<div class="row">Et un autre en angularJS</div>\n\
																<div class="row">Cependant, j\'ai également réalisé des exercices en Canvas pour ma formation.</div>\n\
																<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button><button class="col-lg-offset-8 buttonTalk buttonSuivant" type="button" name="suivant">Suivant</button></div></section>');
																$('.buttonClose').click(function() {
																		$('#creation').remove();
																		talkVersion = 1;
																});
																$('.buttonSuivant').click(function() {
																	$('#'+talkVersion).remove();
																	talkVersion++;
																	$('#talk').append('<section" id="4">\n\
																	<p>Afin d\'obtenir mon titre professionnel de Concepteur Développeur j\'ai dû réalisé par moi-même intégralement un site.</p>\n\
																	<p>Dernier projet en date :</p>\n\
																	<div class="acquirment" style="color: purple; margin: 10px;">\n\
																	<div class="row">Le site que j\'ai réalisé, est un site dans le cadre d\'une aide médicale pour diabétique ou sous anticoagulant.</div>\n\
																	<div class="row">C\'est à dire que les personnes ayant ce genre de problème de santé doivent régulièrement faire des prises de sang et les noter dans un carnet</div>\n\
																	<div class="row">Souvent des personnes oublient de faire cette prise, grâce à mon application, ils seraient informés qu\'ils doivent la faire. Puis le carnet ne sera jamais à court de page et permettra de faire un suivi.</div>\n\
																	<div class="row">Les patients peut également noter ces rendez-vous et être suivi par son médecin qui verra leurs évolutions si ils l\'acceptent.</div>\n\
																	<div class="row"><button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></div></section>');
																	$('.buttonClose').click(function() {
																			$('#creation').remove();
																			talkVersion = 1;
																	});
																});
															});
													});
													$('.buttonClose').click(function() {
															$('#creation').remove();
															talkVersion = 1;
													});
													$('.acquirment').attr({style: "color: purple; margin: 10px;"});
													$('.buttonTalk').attr({style : "color: black;"});
													$('#blacksmith').attr({ style : "display: block; position: relative; float: right; background-color: #C0C0C0" });
													$('#talk').attr({ style : "width: 500px; display: block; position: relative; background-color: #C0C0C0 color: yellow; float: right; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });
													$('#canvas').attr({ style : "position: absolute;" });
											}
									},false);
					}
					else {
							this.x = prochaineCase.x;
							this.y = prochaineCase.y;
					}
				} else if(nameMap == 'seconde') {
					if(this.x == 17 && this.y == 3 || this.x == 17 && this.y == 1) {
						if(prochaineCase.y == 4) {
							this.y = prochaineCase.y;
						}
						this.x = prochaineCase.x;
						var down = false;
						var talkVersion = 1;
						window.addEventListener('keypress', function(e){
							if(e.keyCode == 13 && !document.getElementById('pancarte') && nameMap == 'seconde'){
								$('#canvasdiv').append('<div id="pancarte"><div id="talk"><div id="welcome">\n\
								<p>Bienvenue dans le village CV de Romuald DUCROCQ.</p>\n\
								<p>Vous pourrez aller de maison en maison afin de découvrir qui je suis. Lorsque vous êtes près du personnage, appuyez sur la touche "entrée" afin d\'intéragir avec.</p>\n\
								<p>Chaque maison correspond à une partie, les compétences en haut à gauche, les loisirs en bas à gauche, mon parcours en haut à droite et pour finir mes réalisations en bas à droite.</p>\n\
								<p>Ce CV est l\'aboutissement d\'une idée. Il est encore en cours de réalisation et n\'est donc pas terminé.<p>\n\
								<p>Pour informations, les tilesets utilisés ont était pris sur internet.</p></div>\n\
								<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></div>');
									$('.buttonClose').click(function() {
											$('#pancarte').remove();
											talkVersion = 1;
									});
									$('.link').hover(function(){
										$(this).css("color: white;");
									})
									$('.link').attr({style: "color: purple"});
									$('#welcome').attr({style: "text-align: center;"});
									$('.buttonTalk').attr({style : "color: black; margin-left: 40px;"});
									$('#talk').attr({ style : "width: 1350px; display: inline-block; position: relative; background-color: #DEB887; color: yellow; padding-top: 1.0em; margin-left: 2.2em; padding-bottom: 1.0em;" });
									$('#canvas').attr({ style : "position: absolute;" });
									$('#pancarte').attr({style: 'background-color: #7E5835; width: 1450px; display: inline-block;margin-left:40px; margin-top: 40px; position: relative; color: yellow; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });'});
							}
								},false);
					} else if(this.x == 18 && this.y == 2 || this.y == 2 && this.x == 16) {
							if(prochaineCase.x == 19 || prochaineCase.x == 15) {
								this.x = prochaineCase.x;
							}
							this.y = prochaineCase.y;
							window.addEventListener('keypress', function(e){
								if(e.keyCode == 13 && !document.getElementById('pancarte') && nameMap == 'seconde'){
									$('#canvasdiv').append('<div id="pancarte"><div id="talk"><div id="welcome">\n\
									<p>Bienvenue dans le village CV de Romuald DUCROCQ.</p>\n\
									<p>Vous pourrez aller de maison en maison afin de découvrir qui je suis. Lorsque vous êtes près du personnage, appuyez sur la touche "entrée" afin d\'intéragir avec.</p>\n\
									<p>Chaque maison correspond à une partie, les compétences en haut à gauche, les loisirs en bas à gauche, mon parcours en haut à droite et pour finir mes réalisations en bas à droite.</p>\n\
									<p>Ce CV est l\'aboutissement d\'une idée. Il est encore en cours de réalisation et n\'est donc pas terminé.<p>\n\
									<p>Pour informations, les tilesets utilisés ont était pris sur internet.</p></div>\n\
									<button class="buttonTalk buttonClose" type="button" name="close">Fermer</button></div></div>');
										$('.buttonClose').click(function() {
												$('#pancarte').remove();
												talkVersion = 1;
										});
										$('.link').hover(function(){
											$(this).css("color: white;");
										})
										$('.link').attr({style: "color: purple"});
										$('#welcome').attr({style: "text-align: center;"});
										$('.buttonTalk').attr({style : "color: black; margin-left: 40px;"});
										$('#talk').attr({ style : "width: 1350px; display: inline-block; position: relative; background-color: #DEB887; color: yellow; padding-top: 1.0em; margin-left: 2.2em; padding-bottom: 1.0em;" });
										$('#canvas').attr({ style : "position: absolute;" });
										$('#pancarte').attr({style: 'background-color: #7E5835; width: 1450px; display: inline-block;margin-left:40px; margin-top: 40px; position: relative; color: yellow; padding-top: 1.0em; padding-left: 1.0em; padding-right: 1.0em; padding-bottom: 1.0em;" });'});
								}
							},false);
					}  else {
            this.x = prochaineCase.x;
            this.y = prochaineCase.y;
        }
				if(this.x == 19 || this.x == 21 || this.y == 3 || this.y == 1) {
					$('#touchehelp').remove();
				}
			}
	return true;
}
