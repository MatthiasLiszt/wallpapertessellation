

var Patternscreen=document.getElementById("patternscreen");
var Dump=document.getElementById("codedump");
var Base64=document.getElementById("base64dump");

var RightSymetry=[];
var LeftSymetry=[];
var currentDot={x: 0, y: 0};
var DotCount={left: 0, right: 0};
var Code=0;

function initSVG(){
 var code='<polygon points="0,160 160,0 320,160 160,320" style="fill:none;stroke:black;"/>';
 Patternscreen.innerHTML=code;
 RightSymetry.length=0;
 LeftSymetry.length=0;
 DotCount.left=0;
 DotCount.right=0;
 Code=0;
 Dump.textContent="";
 Base64.innerHTML="";
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
 var gx='cx='+(x-160)+' ';
 var gy='cy='+(y-correction+160)+' ';

 var dot='<circle '+cx+cy+'r="5" stroke="red" fill="red" />';
 var bluedot='<circle '+bx+by+'r="5" stroke="blue" fill="blue" />';
 var odot='<circle '+cx+cy+'r="5" stroke="orange" fill="orange" />';
 var gdot='<circle '+gx+gy+'r="5" stroke="green" fill="green" />';

 var newCode=Patternscreen.innerHTML+dot+bluedot;
 var rightCode=Patternscreen.innerHTML+odot+gdot;

 if((x<160)&&(yy>=0)&&(yy<160))
  {Patternscreen.innerHTML=newCode;
   currentDot.x=x;
   currentDot.y=yy;
   LeftSymetry.push((currentDot.x*1000)+currentDot.y);
   ++DotCount.left;
   console.log(JSON.stringify(LeftSymetry)+" "+DotCount.left);
   return;
  }

 if((x>160)&&(yy>=0)&&(yy<160)&&(x<320))
  {Patternscreen.innerHTML=rightCode;
   currentDot.x=x;
   currentDot.y=yy;
   RightSymetry.push((currentDot.x*1000)+currentDot.y);
   ++DotCount.right;
   console.log(JSON.stringify(RightSymetry)+" "+DotCount.right);
   return;
  } 
 
 console.log("false input");
}

function mirror(){ // mirrors dots from the left to the right side 
 LeftSymetry.map(function(c){
                 var x=320-Math.round(c/1000);
                 var y=(c%1000);
                 var cx='cx='+x+' ';
                 var cy='cy='+y+' ';     
                 var gx='cx='+(x-160)+' ';
                 var gy='cy='+(y+160)+' '; 
                 var odot='<circle '+cx+cy+'r="5" stroke="orange" fill="orange" />';
                 var gdot='<circle '+gx+gy+'r="5" stroke="green" fill="green" />';
                 var rightCode=Patternscreen.innerHTML+odot+gdot;
                 RightSymetry.push((x*1000)+y);
                 ++DotCount.right; 
                 Patternscreen.innerHTML=rightCode;
 });
 console.log(JSON.stringify(RightSymetry)+" "+DotCount.right); 
}

function generate(){
 var luCo=[],rlCo=[];
 console.log("generate() exec.");
 LeftSymetry.sort();
 LeftSymetry.map(function(x){
                 var cx=Math.round(x/1000); 
                 var cy=(x%1000);
                 var bx=cx+160, by=cy+160;
                 var s=cx+","+cy+" ";
                 var d=bx+","+by+" ";
                 //console.log(s);
                 luCo.push(s);
                 rlCo.push(d);
 });
 var luCood=luCo.reduce(function(a,x){return a+x;});
 var rlCood=rlCo.reduce(function(a,x){return a+x;});
 var lub="0,160 ",lue="160,0 ";
 var rlb="160,320 ",rle="320,160 ";
 var lu="<polyline points='"+lub+luCood+lue+"' style='fill:none;stroke:green;'/>";
 var rl="<polyline points='"+rlb+rlCood+rle+"' style='fill:none;stroke:green;'/>";
 console.log("luCood "+luCood);
 console.log(lu);
 console.log(rl);

 var ruCo=[],llCo=[];
 RightSymetry.sort();
 RightSymetry.map(function(x){
                  var cx=Math.round(x/1000); 
                  var cy=(x%1000);
                  var bx=cx-160, by=cy+160;
                  var s=cx+","+cy+" ";
                  var d=bx+","+by+" "; 
                  ruCo.push(s);
                  llCo.push(d); 
 });
 var ruCood=ruCo.reduce(function(a,x){return a+x;});
 var llCood=llCo.reduce(function(a,x){return a+x;});
 var rub="160,0 ",rue="320,160 ",llb="0,160 ",lle="160,320 "; 
 var ru="<polyline points='"+rub+ruCood+rue+"' style='fill:none;stroke:green;'/>";
 var ll="<polyline points='"+llb+llCood+lle+"' style='fill:none;stroke:green;'/>";
 console.log(ru); 
 console.log(ll); 
 var svghead="<svg>",svgtail="</svg>";
 Code=svghead.split('')+lu.split('')+rl.split('')+ru.split('')+ll.split('')+svgtail.split('');
 console.log("Code: "+JSON.stringify(Code));
 Patternscreen.innerHTML=lu+rl+ru+ll;
}

function dumpCode(){
 var x=Code,xx=[],w;
  
 for(var i=0;i<x.length;++i)
  {if(x[i]!=",")
    {xx.push(x[i]);
     if((x[i+1]==",")&&(x[i+2]==","))
      {xx.push(",");}  
    }
  }
 w=xx.join('');
 console.log(w);
 if(Code === 0)
  {alert("try to generate the tile first by clicking on =generate=");}
 else
  {Dump.textContent=w;}
}

function dumpBase64(){
 var x=Code,xx=[],w,b64;

 for(var i=0;i<x.length;++i)
  {if(x[i]!=",")
    {xx.push(x[i]);
     if((x[i+1]==",")&&(x[i+2]==","))
      {xx.push(",");}  
    }
  }
 w=xx.join('');
 console.log(w);
 if(Code === 0)
  {alert("dump code first ! bonŝancon !");}
 else
  {b64=window.btoa(w);
   Base64.innerHTML="<textarea cols='71' rows='7'>"+b64+"</textarea>";}
}
//some trash
//var cx="data:image/svg+xml;utf-8,<svg><polygon points='0,160 160,0 320,160 160,320'/></svg>";
//var example="url('"+cx+"')";
//document.body.style.background=example;


