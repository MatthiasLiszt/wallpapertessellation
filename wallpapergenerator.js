

var Patternscreen=document.getElementById("patternscreen");
var Dump=document.getElementById("codedump");
var Base64=document.getElementById("base64dump");
var Colormenu=document.getElementById("colormenu");
var Colorfield=document.getElementById("colorfield");
var ColorButton=document.getElementById("color");
var Codedumpheadline=document.getElementById("codedumpheadline");
var Base64headline=document.getElementById("base64headline");
var Itall=document.getElementById("itall");
var HelpButton=document.getElementById("help");
var Helptext=document.getElementById("helptext");
//var BegMarquee=document.getElementById("beg");
//var BegActive=false;

var RightSymetry=[];
var LeftSymetry=[];
var currentDot={x: 0, y: 0};
var DotCount={left: 0, right: 0};
var Code=0;
var B64code=false;
var Background=false;
var BackgroundIncrease=false;
var FillColor="grey";
var Color=false;
var BGColor=0;
var FColor=0;
var HELP=false;

function initSVG(){
 var code='<polygon points="0,160 160,0 320,160 160,320" style="fill:none;stroke:black;"/>';
 document.body.style.background="#eaeaea";
 Patternscreen.innerHTML=code;
 RightSymetry.length=0;
 LeftSymetry.length=0;
 DotCount.left=0;
 DotCount.right=0;
 Code=0;
 Dump.textContent="";
 Base64.innerHTML="";
 B64code=false;
 Background=false;
 BackgroundIncrease=false;
 FillColor="grey";
 Color=false;
 BGColor=0;
 FColor=0;
 Codedumpheadline.style.display="none";
 Base64headline.style.display="none";
 HELP=false;
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
 var luCo=[],rlCo=[],mluCo=[],mrlCo=[];
 console.log("generate() exec.");
 LeftSymetry.sort(function(a,b){return a-b;});
 LeftSymetry.map(function(x){
                 var cx=Math.round(x/1000); 
                 var cy=(x%1000);
                 var bx=cx+160, by=cy+160;
                 var s=cx+","+cy+" ";
                 var d=bx+","+by+" ";
                 var ms=(cx/10)+","+(cy/10)+" ";
                 var md=(bx/10)+","+(by/10)+" ";
                 //console.log(s);
                 luCo.push(s);
                 rlCo.push(d);
                 mluCo.push(ms); 
                 mrlCo.push(md);
 });
 var luCood=luCo.reduce(function(a,x){return a+x;});
 var rlCood=rlCo.reduce(function(a,x){return a+x;});
 var mluCood=mluCo.reduce(function(a,x){return a+x;});
 var mrlCood=mrlCo.reduce(function(a,x){return a+x;});
 var lub="0,160 ",lue="160,0 ";
 var mlub="0,16.0 ",mlue="16.0,0 ";
 var rlb="160,320 ",rle="320,160 ";
 var mrlb="16.0,32.0 ",mrle="32.0,16.0 ";
 var g="<g style='fill:none;stroke:green;'>",gg="</g>";
 var gc="<g style='fill:none;stroke:grey;'>"
 var lu="<polyline points='"+lub+luCood+lue+"' />";
 var rl="<polyline points='"+rlb+rlCood+rle+"' />";
 var mlu="<polyline points='"+mlub+mluCood+mlue+"' />";
 var mrl="<polyline points='"+mrlb+mrlCood+mrle+"' />";
 console.log("luCood "+luCood);
 console.log(lu);
 console.log(rl);

 var ruCo=[],llCo=[],mruCo=[],mllCo=[];
 RightSymetry.sort(function(a,b){return a-b;});
 RightSymetry.map(function(x){
                  var cx=Math.round(x/1000); 
                  var cy=(x%1000);
                  var bx=cx-160, by=cy+160;
                  var s=cx+","+cy+" ";
                  var d=bx+","+by+" "; 
                  var ms=(cx/10)+","+(cy/10)+" ";
                  var md=(bx/10)+","+(by/10)+" ";
                  ruCo.push(s);
                  llCo.push(d); 
                  mruCo.push(ms);
                  mllCo.push(md); 
 });
 var ruCood=ruCo.reduce(function(a,x){return a+x;});
 var llCood=llCo.reduce(function(a,x){return a+x;});
 var mruCood=mruCo.reduce(function(a,x){return a+x;});
 var mllCood=mllCo.reduce(function(a,x){return a+x;});
 var rub="160,0 ",rue="320,160 ",llb="0,160 ",lle="160,320 "; 
 var mrub="16.0,0 ",mrue="32.0,16.0 ",mllb="0,16.0 ",mlle="16.0,32.0 "; 
 var ru="<polyline points='"+rub+ruCood+rue+"' />";
 var mru="<polyline points='"+mrub+mruCood+mrue+"' />";
 var ll="<polyline points='"+llb+llCood+lle+"' />";
 var mll="<polyline points='"+mllb+mllCood+mlle+"' />";
 console.log(ru); 
 console.log(ll); 
 var xy=' width="32px" height="32px" ';
 var vbox=' viewBox="0 0 32 32" ';
 var svghead='<svg xmlns="http://www.w3.org/2000/svg"'+xy+vbox+'>'+gc;
 var svgtail=gg+"</svg>";
 Code=svghead.split('')+mlu.split('')+mrl.split('')+mru.split('')+mll.split('')+svgtail.split('');
 console.log("Code: "+JSON.stringify(Code));
 Patternscreen.innerHTML=g+lu+rl+ru+ll+gg;
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
  {Codedumpheadline.style.display="inline";
   Dump.textContent=w;}
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
   B64code=b64;
   Base64headline.style.display="inline";
   Base64.innerHTML="<textarea cols='71' rows='7'>"+b64+"</textarea>";}
}

function showBackground(){
 console.log("showBackground executed");
 if(B64code)
  {var url='url("data:image/svg+xml;base64,';
   var urltail='") repeat';
   console.log(url+B64code+urltail);
   document.body.style.background=url+B64code+urltail;
   document.body.style.backgroundSize = "64px 64px";
   Background=64;
  }
 else
  {alert("Be so kind and generate the base64 code first!");}
}

function scaleBackground(){
 
 console.log("body clicked "+Background);

 if(Background)
  {var b;
   if(Background<32)
    {BackgroundIncrease=true;}
   if(Background>96)
    {BackgroundIncrease=false;}
   if(BackgroundIncrease)
    {b=Background*1.41}   
   else
    {b=Background/1.41}   
   document.body.style.backgroundSize=b+"px "+b+"px ";
   Background=b;
  }
  
}

function setBackgroundColor(){
 var palette=[];

 palette.push("#eaeaea");
 palette.push("#e0e0e0"); 
 palette.push("#d0d0d0"); 
 palette.push("#c0c0c0"); 
 palette.push("#b0b0b0");
 palette.push("#a0a0a0"); 

 ++BGColor;
 if(BGColor>5){BGColor=0;}
 document.body.style.backgroundColor=palette[BGColor];
}

function generatePolygon(){
 var luCo=[],rlCo=[],ruCo=[],llCo=[];
 var mluCo=[],mrlCo=[],mruCo=[],mllCo=[];
 var lub="0,160 ",lue="160,0 ";
 var mlub="0,16.0 ",mlue="16.0,0 ";
 var rlb="160,320 ",rle="320,160 ";
 var mrlb="16.0,32.0 ",mrle="32.0,16.0 ";
 var rub="160,0 ",rue="320,160 ",llb="0,160 ",lle="160,320 "; 
 var mrub="16.0,0 ",mrue="32.0,16.0 ",mllb="0,16.0 ",mlle="16.0,32.0 "; 

 console.log("generate filled polygon");
 LeftSymetry.sort(function(a,b){return a-b;});
 RightSymetry.sort(function(a,b){return a-b;});
 luCo.push(lub);
 rlCo.push(rlb);
 mluCo.push(mlub);
 mrlCo.push(mrlb);
 LeftSymetry.map(function(x){
                 var cx=Math.round(x/1000); 
                 var cy=(x%1000);
                 var bx=cx+160, by=cy+160;
                 var s=cx+","+cy+" ";
                 var d=bx+","+by+" ";
                 var ms=(cx/10)+","+(cy/10)+" ";
                 var md=(bx/10)+","+(by/10)+" ";
                 luCo.push(s);
                 rlCo.push(d);
                 mluCo.push(ms); 
                 mrlCo.push(md);
 });
 luCo.push(lue);
 rlCo.push(rle);
 mluCo.push(mlue);
 mrlCo.push(mrle);
 ruCo.push(rub);
 llCo.push(llb);
 mruCo.push(mrub);
 mllCo.push(mllb);
 RightSymetry.map(function(x){
                  var cx=Math.round(x/1000); 
                  var cy=(x%1000);
                  var bx=cx-160, by=cy+160;
                  var s=cx+","+cy+" ";
                  var d=bx+","+by+" "; 
                  var ms=(cx/10)+","+(cy/10)+" ";
                  var md=(bx/10)+","+(by/10)+" ";
                  ruCo.push(s);
                  llCo.push(d); 
                  mruCo.push(ms);
                  mllCo.push(md); 
 });
 ruCo.push(rue);
 llCo.push(lle);
 mruCo.push(mrue);
 mllCo.push(mlle);

 var luCood=luCo.reduce(function(a,x){return a+x;});
 var rlCood=rlCo.reduce(function(a,x){return a+x;});
 var ruCood=ruCo.reduce(function(a,x){return a+x;});
 var llCood=llCo.reduce(function(a,x){return a+x;});
 var mluCood=mluCo.reduce(function(a,x){return a+x;});
 var mrlCood=mrlCo.reduce(function(a,x){return a+x;});
 var mruCood=mruCo.reduce(function(a,x){return a+x;});
 var mllCood=mllCo.reduce(function(a,x){return a+x;});
 var allCood=luCood+ruCood+llCood+rlCood;
 var mallCood=mluCood+mruCood+mllCood+mrlCood;

 var g="<g style='fill:orange;stroke:none;'>",gg="</g>";
 var gc="<g style='fill:"+FillColor+";stroke:none;'>"
 var xy=' width="32px" height="32px" ';
 var vbox=' viewBox="0 0 32 32" ';
 var svghead='<svg xmlns="http://www.w3.org/2000/svg"'+xy+vbox+'>'+gc;
 var svgtail=gg+"</svg>";
 var poly='<polygon points="'+allCood+'"/>';
 var mpoly='<polygon points="'+mallCood+'"/>';

 Code=svghead.split('')+mpoly.split('')+svgtail.split('');
 console.log("Code: "+JSON.stringify(Code));
 Patternscreen.innerHTML=g+poly+gg;
}

function generateCheck(){
 console.log("generateCheck() executed");
 if(Color)
  {generatePolygon();}
 else
  {generate();}
}

function setColor(){
 console.log("setColor() executed");
 if(Color)
  {Colormenu.style.display="none";
   Color=false;
   ColorButton.textContent="color";
  }
 else
  {Colormenu.style.display="inline";
   Color=true; 
   ColorButton.textContent="contour";
  }
}

function removeColorMenu(){
 Colormenu.style.display="none"; 
}

function setFillColor(){
 var palette=[];

 palette.push("grey");
 palette.push("#d0cac0"); 
 palette.push("#c0bab0"); 
 palette.push("#c0d0c0"); 
 palette.push("#b0c0b0");
 palette.push("#c0c0d0"); 
 palette.push("#b0b0c0"); 

 ++FColor;
 if(FColor>6){FColor=0;}
 FillColor=palette[FColor];
 Colorfield.style.backgroundColor=FillColor;
}

function pinkifyFillColor(){
 var palette=[];

 palette.push("deeppink");
 palette.push("#FFC0CB"); 
 palette.push("#fac0ca"); 
 palette.push("#FFB6C1"); 
 palette.push("#fab6c3");
 palette.push("#FF69B4"); 
 palette.push("#fa69b7"); 

 FillColor=palette[FColor];
 Colorfield.style.backgroundColor=FillColor;
}

function showHelp(){
 if(!HELP)
  {Itall.style.display="none";
   HelpButton.textContent="back to programm";
   Helptext.style.display="inline";
   //Helptext.style.innerHTML= loadUrl('help.html');
   HELP=true;
  }
 else
  {Itall.style.display="inline";
   HelpButton.textContent="HELP";
   Helptext.style.display="none";
   HELP=false;
  } 
}