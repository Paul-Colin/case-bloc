////////////////////////////////////////////////////////////////////////////
///////////////////////Délclaration des variables///////////////////////////
////////////////////////////////////////////////////////////////////////////

var ctx;
var x = 0 , y = 0 ;
var ox = 0 ;
var oy=  400 ;
var ov = 50 ;
var droite = 50;
var gauche = 50;
var rapidite = 20  ;
ctx = document.getElementById("zonedessin").getContext('2d');
var couleur 
var mesCouleurs = ["blue", "red", "yellow", "green", "pink"];
var couleur_choisi = mesCouleurs
var mesblocs =[]
var n=0;
var limite=750 
var cptBoucle =0;
var s=0 ; 
var sec=0;
var m=0 ;
var Ligne_Complete=[] ;
var Point = 0 ;
var affichage_points = 0;
var vie = 3;
var compteur = 0 // compte le nombre bloc de la ligne au dessus de celle qui a été effacée
var diff = 2;
var decompte = false ;
var interval_jeu  ;
var interval_timer ;
var codeTouche;
window.addEventListener("load",init);



function init() {// fonction qui est appeler au chargement de la page 
  
  cadrillage();//appelle la fonction qui dessine le cadrillage
  document.addEventListener("keydown", deplacement);//appelle la fonction qui permet de déplacer les blocs horizontalement 
  addEventListener("keydown", disableScroll, false);//évenement qui empêche de faire descendre la barre de glissement avec la fonction disableScroll
  return
}

function cadrillage(){ //fonction qui permet de créer le cadrillage sur le canvas 

    ctx.beginPath("cadre") ; // contruit le cadre 
        ctx.moveTo(0,0);     
        ctx.lineTo(0,800);
        ctx.lineTo(600,800);
        ctx.lineTo(600,0);
        ctx.lineTo(0,0);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";
        ctx.stroke();
    ctx.closePath("cadre");

    while ( x < 600) {//construit les lignes horizontales 
        x=x+50;
    
        ctx.beginPath("zonedessin"); 
            ctx.moveTo(x, 0);
            ctx.lineTo(x,800);
            ctx.strokeStyle="white" ;
            ctx.stroke();
        ctx.closePath("zonedessin");
    }

    while ( y < 800) {//construit les lignes verticales
        y=y+50;
    
        ctx.beginPath("zonedessin") ;
            ctx.moveTo(0 ,y);
            ctx.lineTo(600,y);
            ctx.strokeStyle="white" ;
            ctx.stroke();
        ctx.closePath("zonedessin");
    }
    x = 0 ;
    y = 0 ;
}

function Bloc(x,y,largeur,v,couleur,ligne){//fonction qui permet de créer l'objet bloc avec ses paramètres : coordonnnées x et y ,largeur ,vitesse, couleur et la ligne .
	this.x = x;
	this.y = y;
	this.largeur = largeur;
	this.v = v;
	this.couleur = couleur;
	this.ligne = ligne;
}
function Debut_interval(){ //Lance le début du jeu  et remets les input "text" à 0 
	document.getElementById("f_text").value = "0:00" ;//timer à 0 
	document.getElementById("pts").value = "0 pts" ;// point à 0
	document.getElementById("f_vie").value = "vie : "+ vie ;//affiche le nombre de vie choisi 
	document.getElementById("bt_go").style.display = "none";//rend invisble le bouton go 
	document.getElementById("bt_stop").style.display = "block";// rend visble le bouton pour recommencer
	document.getElementById("parametre").style.display = "none";//rend invisble la div des paramètre 
	document.getElementById("bt_setting").style.display = "none";//rend invisble le bouton pour accéder au paramètre 
	document.getElementById("bt_pause").style.display = "block";// rend visble le bouton pause 
	interval_jeu = setInterval(animerChute,10) ; // interval qui va s'occuper de l'aniamation de la déscente des blocs 
	interval_timer = setInterval(timer,1000) ;// interval qui va s'occuper du timer 
	go();// lance la fonction go qui permet de creer les blocs 
}

function choixCouleur(){ //choisi une couleur aléatoire pour le bloc 
	a = Math.floor((couleur_choisi.length)*Math.random()); /*permet de choir une couleur aléatoire */
	return couleur_choisi[a];
}

function go(){//permet de creer les bloc en définissant les paramètre de l'objet Bloc .
	couleur = choixCouleur() ;// choisi une couleur pour le bloc qui va apparaitre   
	droite =50;
	gauche = 50;
	mesblocs[n]= new Bloc(300,0,50,50,couleur,750);//creer le bloc avec les paramètres choisi
		
	}
	

function ConstructionBloc (Bloc) {// fonction qui construit  l'apparence des blocs .
	
	ctx.beginPath("bloc")  ;
	ctx.rect(Bloc.x , Bloc.y , Bloc.largeur , Bloc.largeur);// construit un bloc à partir des paramètre de l'objet Bloc
	ctx.fillStyle = Bloc.couleur; // choisi une couleur 
	ctx.fill();
	ctx.lineWidth = 2;	
	ctx.strokeStyle = "#000000"; 
	ctx.stroke();  
	ctx.closePath("bloc");
		
}

function deplacement(event) {
  codeTouche = event.keyCode; // keycode renvoie le code touche
  var touche = String.fromCharCode(codeTouche); // on convertit le code en caractère
  
  if (codeTouche == 40)//aller vers le bas
	{ 
		if (mesblocs[n].x >= ox && mesblocs[n].x <= ox+50 && mesblocs[n].y <= oy){//détectection si l'on touche l'obstacle
		obstacle_touche() 
		}
		else{
		anti_bug();
		droite = 0;
		gauche = 0;
		mesblocs[n].y= limite;
		
		}
	}
	
	if (codeTouche == 39 && mesblocs[n].x <550)//aller à droite
	{
		anti_deppassement();
		
		mesblocs[n].x = mesblocs[n].x + droite ;
		
	}

	if (codeTouche == 37 && mesblocs[n].x > 0)//aller à gauche
	{
		anti_deppassement();
		mesblocs[n].x= mesblocs[n].x - gauche ;
	}
  

  
}


function stop() {//fonction qui relance la page 
	window.location.reload();
	document.getElementById("f_text").value = "0:00" ;
	document.getElementById("pts").value = "0 pts" ;
	document.getElementById("f_vie").value = "vie : 3" ;
	return
}
function recommencer(){ // permet de passer au prochain bloc est de détecter lorsque que l'on fait une ligne ou quand on pert une vie ...  
	n = n + 1;
	limite = 750;
	
	if (mesblocs[n-1].y == oy+50){
		perdu();
	}
	
	if (mesblocs[n-1].y == 800) {
	Ligne_Complete.push("");
				
	if (Ligne_Complete.length== 12-compteur){
		compteur = 0;
		Point=Point+100 ;
		affichage_points = Point + " pts ";
		document.getElementById("pts").value = affichage_points  ;
		son_ligne= new Audio("son/ligne.wav");
		son_ligne.play();
		mesblocs[n-1].x = 10000 ;
		
		for(i=0 ;i<n ;i=i+1){
			
			if (mesblocs[i].y == 750){
				mesblocs[i].x = 10000;
				while ( Ligne_Complete.length != 0 ){
				Ligne_Complete.pop() ;
				}
			} 
			else if(mesblocs[i].y < 750){
				mesblocs[i].ligne = mesblocs[i].ligne + 50;
				}
				
			if(mesblocs[i].y == 700){
				compteur = compteur + 1;
			}		 
		

		}
	}
	
	
	}
	go();
	
	
}
	 	
function animerChute(){ //permet d'animer la  chute des blocs 
	
	if (mesblocs[n].y <= limite){
		
		ctx.clearRect( 0 , 0, 1000 , 1000);
		cadrillage(); 
		ConstructionBloc(mesblocs[n]);
		mesblocs[n].ligne= mesblocs[n].y ;
		
		obstacle();	
		
		for(i=0 ;i<n ;i=i+1){
			mesblocs[i].y = mesblocs[i].ligne ;
			
			
		
			
			if (mesblocs[i].y == mesblocs[n].y && mesblocs[i].x == mesblocs[n].x){ 
				mesblocs[n].y = mesblocs[n].y-50;
				limite= mesblocs[n].y;
				droite = 0;
				gauche = 0;
				
					
				}
				
		
				ConstructionBloc(mesblocs[i]);
				/* permet de reconstruire les bloc à l'infini */
				 
		 
			}
	}
	
	else {
		son_place= new Audio("son/pose.wav");
		son_place.play();
		recommencer()	;
	}
	
	if (cptBoucle == rapidite){
		mesblocs[n].y = mesblocs[n].y + mesblocs[n].v ;
		ox=ox+ov;
		if (ox >= 500){
			ov=-ov
		}
		if(ox<=0){
			ov=-ov;
		}
		cptBoucle = 0;
	}
	
	else{
		cptBoucle++ ;
	}
	
	if (mesblocs[n].v ==0 ){
		return;
	}
	else {
		mesblocs[n].v= 50
	}
	
	if (mesblocs[n].y == oy &&   mesblocs[n].x >= ox && mesblocs[n].x <= ox+100 ){
	obstacle_touche();
	
	}
	
}

	

function obstacle () {
	
	ctx.beginPath("obstacle")  ;
	ctx.rect(ox,oy,100,50);
	ctx.fillStyle = "orange"; 
	ctx.fill();
	ctx.lineWidth = 2;	
	ctx.strokeStyle = "#000000"; 
	ctx.stroke();  
	ctx.closePath("obstacle");
	
	
}

function obstacle_touche() {
	
		mesblocs[n].x = 100000;
		son_oof= new Audio("son/oof.mp3");
		son_oof.play();
		
		vie = vie - 1 ;
		vie_rest = "vie : "+ vie 
		document.getElementById("f_vie").value = vie_rest ;
		
		if (vie == 2){
			document.getElementById("f_coeur3").style.backgroundImage = 'url("img/coeur_perdu.jpg")';
		}
		else if (vie == 1){
			document.getElementById("f_coeur2").style.backgroundImage = 'url("img/coeur_perdu.jpg")';
		}
			
		else{
			document.getElementById("f_coeur1").style.backgroundImage = 'url("img/coeur_perdu.jpg")';
			perdu()

		} 
		recommencer();
		
}





function timer(){
	
	if(decompte == true){
	
		t =document.getElementById("temps").value ;
		document.getElementById("f_text").value = t ;
		if (m < 0) {
			perdu();
		}
		
		if (s < 10){
			sec="0" + s.toString();
		}
		else{
			sec=s;
		}
		if(s == 0){
			m= m -1;
			s = 50;
			
		} 
		s = s - 1;
		t = m + ":" + sec;
		document.getElementById("temps").value = t ;
		
	}
	
	else if (decompte == false) {
	s=s+1 ;
	if (s < 10){
		sec="0" + s.toString();
	}
	else{
		sec=s
	}
	if (s==60)
	{
		m=m+1 ;
		s=0 ;
		sec = "00";
	}
	
	t =m +":" + sec
	document.getElementById("f_text").value = t ;
	}

}

function anti_deppassement(){
	for(i=0 ;i<n ;i=i+1){
		if(mesblocs[i].y <= mesblocs[n].y && mesblocs[i].x == mesblocs[n].x+50 && codeTouche == 39){
			droite = 0 ;
		}
		
		if(mesblocs[i].y <= mesblocs[n].y && mesblocs[i].x == mesblocs[n].x-50 && codeTouche == 37){
			gauche = 0 ;
		}
	}
}
function anti_bug(){
	for(i=0 ;i<n ;i=i+1){
		if (mesblocs[i].x == mesblocs[n].x){
			Math.min.apply(null, mesblocs[i])
			limite=Math.min(mesblocs[i].y)
		}
	}
	
}

function disableScroll(e){// désactive le scroll de la page lorsque l'on appuie sur la flèche du bas 
	
	if (e.keyCode) {
		/^(32|33|34|35|36|38|40)$/.test(e.keyCode) && e.preventDefault();
	}else {
		e.preventDefault();
	}

}
