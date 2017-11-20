var c = document.getElementById("mon_canvas");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(148,150,30,0,Math.PI*2,true);
ctx.strokeStyle = "white";
ctx.fillStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(148,60,30,0,Math.PI*2,true);
ctx.strokeStyle = "white";
ctx.fillStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(62,60,30,0,Math.PI*2,true);
ctx.strokeStyle = "white";
ctx.fillStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(62,150,30,0,Math.PI*2,true);
ctx.strokeStyle = "white";
ctx.fillStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(62,60,20,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fillStyle = "grey";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(148,60,20,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(62,150,20,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(148,150,20,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(62,60,5,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(65,62);
ctx.lineTo(80,65);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(148,60);
ctx.lineTo(128,65);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(148,150);
ctx.lineTo(130,145);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(62,150);
ctx.lineTo(80,145);
ctx.stroke();

ctx.beginPath();
ctx.arc(62,150,5,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(148,150,5,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(148,60,5,0,Math.PI*2,true);
ctx.strokeStyle = "#FF4500";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(105,20);
ctx.quadraticCurveTo(70,100,105,190);
ctx.strokeStyle='white';
ctx.fillStyle = 'black';
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(105,20);
ctx.quadraticCurveTo(140,100,105,190);
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(105,40);
ctx.quadraticCurveTo(90,90,105,170);
ctx.fillStyle = 'grey';
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(105,40);
ctx.quadraticCurveTo(120,90,105,170);
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(55,90);
ctx.quadraticCurveTo(65,110,55,120);
ctx.lineTo(45,125);
ctx.quadraticCurveTo(65,110,45,85);
ctx.strokeStyle='white';
ctx.fillStyle="black";
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(160,87);
ctx.quadraticCurveTo(140,110,160,123);
ctx.lineTo(170,128);
ctx.quadraticCurveTo(140,110,170,80);
ctx.fill();
ctx.stroke();
