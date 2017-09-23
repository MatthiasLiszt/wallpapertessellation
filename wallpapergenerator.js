

var Patternscreen=document.getElementById("patternscreen");

var RightSymetry=[];
var LeftSymetry=[];
var currentDot={x: 0, y: 0};
var DotCount={left: 0, right: 0};

function initSVG(){
 var code='<polygon points="0,160 160,0 320,160 160,320" style="fill:none;stroke:black;"/>';
 Patternscreen.innerHTML=code;
 RightSymetry.length=0;
 LeftSymetry.length=0;
 DotCount.left=0;
 DotCount.right=0;
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
//bg=getCodeDump("itall");
//document.getElementById("codedump").innerHTML=bg;

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
 var yy=y-correction;
 var cx='cx='+x+' ';
 var cy='cy='+(y-correction)+' ';
 var bx='cx='+(x+160)+' ';
 var by='cy='+(y-correction+160)+' ';

 var dot='<circle '+cx+cy+'r="5" stroke="red" fill="red" />';
 var bluedot='<circle '+bx+by+'r="5" stroke="blue" fill="blue" />';

 var newCode=Patternscreen.innerHTML+dot+bluedot;
 if((x<160)&&(yy>=0)&&(yy<160))
  {Patternscreen.innerHTML=newCode;
   currentDot.x=x;
   currentDot.y=yy;
   LeftSymetry.push((currentDot.x*1000)+currentDot.y);
   ++DotCount.left;
   console.log(JSON.stringify(LeftSymetry)+" "+DotCount.left);
   return;
  }
 
 console.log("false input");
}


//some trash
//var cx="data:image/svg+xml;utf-8,<svg><polygon points='0,160 160,0 320,160 160,320'/></svg>";
//var example="url('"+cx+"')";
//document.body.style.background=example;


