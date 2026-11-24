var days=["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];
var times=["08:30–09:10","09:15–09:55","10:00–10:40","10:50–11:30","11:35–12:15","12:20–13:00"];
var T=[
 [["Kelajak soati","",0,""],["Matematika","",0,"№ 245–248 mashqlar"],["Biologiya","",0,"§14 savollari"],["Texnologiya","",0,"Amaliy ish daftari"],["Tarbiya","",0,""],["Ingliz tili","",0,"Unit 5, so‘zlar"]],
 [["Matematika","",0,"№ 260–264"],["Jismoniy tarbiya","",0,""],["O‘zbekiston tarixi","",0,"§12 ni o‘qish"],["Rus tili","",0,"Matnni o‘qish, 3-mashq"],["Geografiya","",0,"Xarita to‘ldirish"],["Ingliz tili","",0,"Unit 5, 2-mashq"]],
 [["Musiqa","",0,""],["Texnologiya","",0,"Chizma tayyorlash"],["Kimyo","",0,"§6 ni takrorlash"],["Informatika","",0,"Python: sikllar"],["Matematika","",0,"№ 270–274"],["Ingliz tili","",0,"Grammatika, 4-mashq"]],
 [["Ona tili","",0,"Gap bo‘laklari, 52-mashq"],["Tasviriy san’at","",0,"Natyurmort chizish"],["Fizika","",0,"§8 savollari"],["Rus tili","",0,"So‘zlarni yodlash"],["O‘zbekiston tarixi","",0,"Savollarga javob"],["Adabiyot","",0,"She’r yodlash"]],
 [["Kimyo","",0,""],["Ona tili","",0,"53-mashq"],["Matematika","",0,"№ 280–283"],["Fizika","",0,"§9 ni o‘qish"],["Jahon tarixi","",0,"§13 ni o‘qish"],["Adabiyot","",0,"Asar tahlili"]],
 [["Ingliz tili","",0,"Matn tarjimasi"],["Matematika","",0,""],["Geografiya","",0,"§10 savollari"],["Ona tili","",0,"54-mashq"],["Jismoniy tarbiya","",0,""],["Biologiya","",0,"Referat"]]
];
var G={};
var O={"Matematika":"Bahodirova Shodiya Baxrom qizi","Ona tili":"Qilichova Dilfuza O‘tkirjonovna","Adabiyot":"Qilichova Dilfuza O‘tkirjonovna","Ingliz tili":"Shakarbekova Gulbahor Fazliddin qizi","Rus tili":"Razzoqova Dilfuza Raxmonovna","Informatika":"Axmatova Dilnoza Bekzod qizi","Fizika":"Shokirov Bekjon Bektosh o‘g‘li","Kimyo":"Usarov Jurabek Ibragimovich","Biologiya":"Komiljonov Abdulaziz Komiljon o‘g‘li","O‘zbekiston tarixi":"Abdullayev Jonibek Hamdullo o‘g‘li","Jahon tarixi":"Abdullayev Jonibek Hamdullo o‘g‘li","Geografiya":"Husanov Suxrob Samariddin o‘g‘li","Jismoniy tarbiya":"Shodmonov Olim Bekpulatovich","Tasviriy san’at":"Ubaydullayeva Dilrabo Murodullayevna","Texnologiya":"Qabulova Iroda Abdumajitovna","Musiqa":"Xolboyev Faxriddin Murodullayevich","Tarbiya":"Shukurov Ulug‘bek Oybek o‘g‘li","Kelajak soati":"Shermatova Erkatosh Zokirjon qizi"};
var A=[["Dushanba","Tarix, 4-dars","Kasallik"],["Payshanba","Fizika, 4-dars","Sababsiz"],["Juma","Jismoniy tarbiya, 4-dars","Sababli"]];
var tab="d",last=ymd(new Date()),lastH="";
var tabs={d:"Kundalik",b:"Baholar",j:"Dars jadvali",h:"Uy vazifalari",a:"Davomat"};
function rnd(s){s=Math.sin(s)*10000;return s-Math.floor(s)}
function bg(d,k,n){var s=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()+k*17+n.length*31;if(rnd(s)<0.45)return 0;var e=times[k].split("–")[1].split(":"),t=new Date(d);t.setHours(+e[0],+e[1],0,0);if(new Date()<t)return 0;var r=rnd(s+1);return r<0.08?5:r<0.22?6:r<0.45?7:r<0.68?8:r<0.88?9:10}
function calcG(){var R={},d=new Date(2026,8,1,12),now=new Date();while(d<=now){if(d.getDay()!=0){T[(d.getDay()+6)%7].forEach(function(l,k){var v=bg(new Date(d),k,l[0]);if(v){(R[l[0]]=R[l[0]]||[]).push(v)}})}d.setDate(d.getDate()+1)}return R}
function g(n){if(!n)return'';var c=n>=9?5:n>=7?4:n>=5?3:2;return'<span class="g g'+c+'">'+n+'</span>'}
function avg(a){return (a.reduce(function(x,y){return x+y},0)/a.length).toFixed(2)}
function ymd(d){return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()}
function shown(){var d=new Date();d.setHours(12,0,0,0);if(d.getDay()==0)d.setDate(d.getDate()+1);return d}
function monday(){var d=shown();d.setDate(d.getDate()-((d.getDay()+6)%7));return d}
function dayHtml(i,hw){
 var d=monday();d.setDate(d.getDate()+i);
 var rows=T[i].map(function(l,k){
  if(hw&&!l[3])return"";
  return '<div class="row"><div class="t">'+(k+1)+'. '+times[k]+'</div><div class="s"><b>'+l[0]+'</b><small>'+(O[l[0]]||l[1])+(l[3]?' · Uy vazifasi: '+l[3]:'')+'</small></div><div>'+g(bg(d,k,l[0]))+'</div></div>'}).join("");
 if(!rows)return"";
 return '<div class="card"><h3>'+days[i]+', '+d.getDate()+'.'+String(d.getMonth()+1).padStart(2,"0")+'</h3>'+rows+'</div>'}
function view(){
 var h="";G=calcG();
 if(tab=="d"){
  var s=shown(),di=(s.getDay()+6)%7;
  h='<h2>Kundalik</h2>'+dayHtml(di,false)}
 if(tab=="b"){
  h='<h2>Baholar</h2><div class="card sc"><table><tr><th>Fan</th><th>Baholar</th><th>O‘rtacha</th></tr>';
  Object.keys(G).forEach(function(k){h+='<tr><td>'+k+'</td><td>'+G[k].map(g).join("")+'</td><td><b>'+avg(G[k])+'</b></td></tr>'});
  h+='</table></div>'}
 if(tab=="j"){
  h='<h2>Dars jadvali</h2><div class="card sc"><table><tr><th>Vaqt</th>'+days.map(function(d){return'<th>'+d+'</th>'}).join("")+'</tr>';
  for(var k=0;k<6;k++){h+='<tr><td>'+times[k]+'</td>'+T.map(function(d){return'<td>'+(d[k]?d[k][0]:'')+'</td>'}).join("")+'</tr>'}
  h+='</table></div>'}
 if(tab=="h"){
  h='<h2>Uy vazifalari</h2>';
  for(var i=0;i<6;i++)h+=dayHtml(i,true)}
 if(tab=="a"){
  h='<h2>Davomat</h2><div class="card">';
  A.forEach(function(r){var c=r[2]=="Sababsiz"?"g2":"g3";h+='<div class="row"><div class="t">'+r[0]+'</div><div class="s">'+r[1]+'</div><span class="pill" style="background:var(--'+(r[2]=="Sababsiz"?"bad":"warn")+')">'+r[2]+'</span></div>'});
  h+='</div><p style="color:var(--mut)">Jami qoldirilgan darslar: 3</p>'}
 if(h===lastH)return;lastH=h;document.getElementById("main").innerHTML=h;
}
function nav(){
 var n=document.getElementById("nav");
 n.innerHTML=Object.keys(tabs).map(function(k){return'<button data-k="'+k+'" class="'+(k==tab?"on":"")+'">'+tabs[k]+'</button>'}).join("");
 n.querySelectorAll("button").forEach(function(b){b.onclick=function(){tab=b.dataset.k;nav();view()}})}
setInterval(function(){if(document.getElementById("app").style.display=="block")view()},30000);
document.getElementById("go").onclick=function(){
 var u=document.getElementById("u").value.trim(),p=document.getElementById("p").value;
 if(!u||!p){document.getElementById("err").textContent="Login va parolni kiriting.";return}
 document.getElementById("login").style.display="none";
 document.getElementById("app").style.display="block";nav();view()};
document.getElementById("out").onclick=function(){
 document.getElementById("app").style.display="none";
 document.getElementById("login").style.display="flex"};