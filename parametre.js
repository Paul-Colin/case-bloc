var etat_pause = true;
var strCouleur;
var changeCouleur = 0;
function parametre(){
	document.getElementById("canvas").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById("bt_setting").style.display = "none";
	document.getElementById("parametre").style.display = "block";
}


function  niveau(){
	if (diff == 2){
		diff=3;
		document.getElementById("difficulte").value = "difficile";
		rapidite = 10;
	}
	
	else if (diff == 3){
		diff=1;
		document.getElementById("difficulte").value = "facile";
		rapidite = 25;
	}
	
	else {
		diff=2;
		document.getElementById("difficulte").value = "normal";
		rapidite = 20;
	}
}
function valider() {
	document.getElementById("canvas").style.display = "block";
	document.getElementById("info").style.display = "block";
	document.getElementById("bt_setting").style.display = "block";
	document.getElementById("parametre").style.display = "none";
	document.getElementById("regle").style.display = "none";
	document.getElementById("credit").style.display = "none";
	separateur();
}


function plus(){
	decompte = true
	s =s + 10 ;
	if(m <= 0 && s < 0){
		s =0;
	}
	
	if (s < 10){
		sec="0" + s.toString();
	}
	else{
		sec=s;
	}
	
	if (s==60){
		m=m+1 ;
		s=0 ;
		sec="00"
	}
	
	t = m + ":" + sec;
	document.getElementById("temps").value = t;
}


function moins(){
	decompte = true
	
	 if(s == 0){
		m= m -1;
		s = 50
		
		
	} 
	
	s = s - 10 
	t = m + ":" + s
	
	if(m < 0){
		document.getElementById("temps").value = "0:00";
		s = 0;
		m = 0;
	}
	else {
		document.getElementById("temps").value = t;
	}
}

function infini(){
	decompte = false ;
	document.getElementById("temps").value = "infini";
	m = 0;
	s = 0;
	
}

function vie1(){
	document.getElementById("bt_vie3").style.backgroundImage = 'url("img/coeur_perdu_petit.png")';
	document.getElementById("bt_vie2").style.backgroundImage = 'url("img/coeur_perdu_petit.png")';
	document.getElementById("f_coeur2").style.display = "none";
	document.getElementById("f_coeur3").style.display = "none";
	vie = 1 
}

function vie2(){
	document.getElementById("bt_vie3").style.backgroundImage = 'url("img/coeur_perdu_petit.png")';
	document.getElementById("bt_vie2").style.backgroundImage = 'url("img/coeur_petit.png")';
	document.getElementById("f_coeur2").style.display = "list-item inline ";
	document.getElementById("f_coeur3").style.display = "none";
	vie = 2
}

function vie3(){
	document.getElementById("bt_vie3").style.backgroundImage = 'url("img/coeur_petit.png")';
	document.getElementById("bt_vie2").style.backgroundImage = 'url("img/coeur_petit.png")';
	document.getElementById("f_coeur3").style.display = "list-item inline ";
	document.getElementById("f_coeur2").style.display = "list-item inline ";
	
	vie = 3
}

function bleu(){

	if ( 0 in mesCouleurs == true){
		document.getElementById("bt_bleu").style.backgroundImage = 'url("img/bleu_croix.jpg")';
		delete mesCouleurs[0];
		changeCouleur = changeCouleur + 1;
		}
	else if (0 in mesCouleurs == false){
		document.getElementById("bt_bleu").style.backgroundColor = "blue";
		document.getElementById("bt_bleu").style.backgroundImage = "none";
		mesCouleurs[0]="blue,/";
		changeCouleur = changeCouleur + 1;
	}
}

function rouge(){

	if ( 1 in mesCouleurs == true){
		document.getElementById("bt_rouge").style.backgroundImage = 'url("img/rouge_croix.jpg")';
		delete mesCouleurs[1];
		changeCouleur = changeCouleur + 1;
		}
	else if (1 in mesCouleurs == false){
		document.getElementById("bt_rouge").style.backgroundColor = "red";
		document.getElementById("bt_rouge").style.backgroundImage = "none";
		mesCouleurs[1]=",red,";
		changeCouleur = changeCouleur + 1;
		
	}
}

function jaune(){

	if ( 2 in mesCouleurs == true){
		document.getElementById("bt_jaune").style.backgroundImage = 'url("img/jaune_croix.jpg")';
		delete mesCouleurs[2];
		changeCouleur = changeCouleur +1;
		
		}
	else if (2 in mesCouleurs == false){
		document.getElementById("bt_jaune").style.backgroundColor = "yellow";
		document.getElementById("bt_jaune").style.backgroundImage = "none";
		mesCouleurs[2]=",yellow,";
		changeCouleur = changeCouleur + 1;
	}
}

function vert(){

	if ( 3 in mesCouleurs == true){
		document.getElementById("bt_vert").style.backgroundImage = 'url("img/vert_croix.jpg")';
		delete mesCouleurs[3];
		changeCouleur = changeCouleur +1;
		
		}
	else if (3 in mesCouleurs == false){
		document.getElementById("bt_vert").style.backgroundColor = "green";
		document.getElementById("bt_vert").style.backgroundImage = "none";
		mesCouleurs[3]=",green,";
		changeCouleur = changeCouleur + 1;
	}
}

function rose(){

	if ( 4 in mesCouleurs == true){
		document.getElementById("bt_rose").style.backgroundImage = 'url("img/rose_croix.jpg")';
		delete mesCouleurs[4];
		changeCouleur = changeCouleur +1;
		}
	else if (4 in mesCouleurs == false){
		document.getElementById("bt_rose").style.backgroundColor = "pink";
		document.getElementById("bt_rose").style.backgroundImage = "none";
		mesCouleurs[4]=",pink";
		changeCouleur = changeCouleur + 1;
	}
}

function separateur(){ //cette fonction permet d'éviter de commencer avec une couleur indéfini et donc elle permet de reduire le tableau  
	strCouleur = mesCouleurs.join();
	for(i=0 ;i < changeCouleur ; i=i+1){
		strCouleur = strCouleur.replace(",,",", ");//dimnue les virgules
		strCouleur = strCouleur.replace(", ,",",");//dimnue les virgules
	
	}
	strCouleur = strCouleur.replace(",/",",");
	if (4 in mesCouleurs == false && 3 in mesCouleurs ==true){
		strCouleur = strCouleur.replace("n,","n");//enlève la virgule dans la chaine lorsque rose disparait a côté de vert 
		
	}
	if (4 in mesCouleurs == false && 3 in mesCouleurs ==false && 2 in mesCouleurs ==true  ){
		strCouleur = strCouleur.replace("w,","w");//enlève la virgule dans la chaine lorsque rose disparait a côté de jaune
	}
	if(4 in mesCouleurs == false && 3 in mesCouleurs ==false && 2 in mesCouleurs ==false && 1 in mesCouleurs == true){
		strCouleur = strCouleur.replace("e,","e");//enlève la virgule dans la chaine lorsque rose disparait a côté de bleu
	}
	if(4 in mesCouleurs == false && 3 in mesCouleurs ==false && 2 in mesCouleurs ==false && 1 in mesCouleurs == false && 0 in mesCouleurs == true){
		strCouleur = strCouleur.replace("d,","d");//enlève la virgule dans la chaine lorsque rose disparait a côté de rouge
	}
	strCouleur = strCouleur.replace(",/",","); // remplace ,/ par une virgule lorsque l'on ajou bleu
	strCouleur = strCouleur.replace(", ","");//suprime les virgules en trop 
	strCouleur = strCouleur.replace(", ,","");//suprime les virgules en trop 
	couleur_choisi = strCouleur.split(","); //transforme la chaine de carractère en liste (on sépare les élements de la liste par une virgue)
}



function perdu(){
	document.getElementById("canvas").style.display = "none";
	document.getElementById("info").style.display = "none";
	document.getElementById("bt_pause").style.display = "none";
	document.getElementById("ecran_perdu").style.display = "block "; // va afficher l'écran de défaite
	document.getElementById("annonce").innerHTML ="votre score est de : " + Point + " Pts";
	clearInterval(interval_jeu );
	clearInterval(interval_timer );
}


function pause(){
	if (etat_pause == true){
		clearInterval(interval_jeu );
		clearInterval(interval_timer );
		document.getElementById("bt_pause").style.backgroundImage = 'url("img/play.png")';
		etat_pause = false;
	}
	else{
		interval_jeu = setInterval(animerChute,10) ;
		interval_timer = setInterval(timer,1000) ;
		document.getElementById("bt_pause").style.backgroundImage = 'url("img/pause.png")';
		etat_pause = true
	}
	
}

function regle(){
	document.getElementById("parametre").style.display = "none";
	document.getElementById("regle").style.display = "flex";
	document.getElementById("bt_retour1").style.display = "block";
}

function credit(){
	document.getElementById("parametre").style.display = "none";
	document.getElementById("credit").style.display = "flex";
	document.getElementById("bt_retour2").style.display = "block";

}
