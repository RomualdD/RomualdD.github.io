function Text(url, x, y) {
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
