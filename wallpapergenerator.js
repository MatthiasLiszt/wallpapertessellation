

var Patternscreen=document.getElementById("patternscreen");

function initSVG(){
 var code='<polygon points="0,160 160,0 320,160 160,320" style="fill:none;stroke:black;"/>';
 Patternscreen.innerHTML=code;
}

function salutation(){
 alert('Hello, nice that you are here !');
}

function getCodeDump(x){
 var code=document.getElementById(x);
 var dump=[],n=0,r;

 console.log("getCodeDump executing");
 console.log(code.childNodes.length+" nodes");
 
 console.log(code.childNodes[1].innerHTML);
 
 var v=code.childNodes[1].innerHTML;
 var vv=v.replace("<","&lt;");
 var vvv=vv.replace(">","&gt;");

 return vvv;
}

document.body.style.background="#eaeaea";
initSVG();
bg=getCodeDump("itall");
document.getElementById("codedump").innerHTML=bg;

function getMousePosition(event){
 var mouseposition={x: event.clientX, y: event.clientY};
 console.log("getMousePosition running");
 console.log("X: "+mouseposition.x+" Y: "+mouseposition.y);
 return mouseposition;
}

function drawDot(e){
 var correction=160;// just to get the right mousepositon (correction value)
 var mouseposition=getMousePosition(e);
 var x=mouseposition.x,y=mouseposition.y;
 var cx='cx='+x+' ';
 var cy='cy='+(y-correction)+' ';

 var dot='<circle '+cx+cy+'r="5" stroke="red" fill="red" />';

 var newCode=Patternscreen.innerHTML+dot;
 
 Patternscreen.innerHTML=newCode;
}


//some trash
//var cx="data:image/svg+xml;utf-8,<svg><polygon points='0,160 160,0 320,160 160,320'/></svg>";
//var example="url('"+cx+"')";
//document.body.style.background=example;


