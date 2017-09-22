
function getCodeDump(x,out){
 var code=document.getElementById(x);
 var o=document.getElementById(out);

 var nodes=code.childNodes[1];
 
 return nodes.innerHTML; 
}

var bg=getCodeDump("itall","codedump");

var cx="data:image/svg+xml;utf-8,<svg><polygon points='0,160 160,0 320,160 160,320'/></svg>";
var example="url('"+cx+"')";


document.body.style.background="#eaeaea";
document.body.style.background=example;

var bbg=bg.replace("<","&lt;");
var bbbg=bbg.replace(">","&gt;");
document.getElementById("codedump").innerHTML=bbbg;
