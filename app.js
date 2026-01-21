let room='public';
let ws;
const me='user'+Math.floor(Math.random()*10000);
document.getElementById('me').textContent=me;


function join(r){
room=r;
if(ws) ws.close();
ws=new WebSocket(`wss://YOUR_WORKER_URL/ws/${room}`);
ws.onmessage=e=>{
const d=JSON.parse(e.data);
add(d.user,d.text);
};
}


function send(){
const t=document.getElementById('msg').value;
ws.send(JSON.stringify({user:me,text:t}));
document.getElementById('msg').value='';
}


function add(u,t){
const m=document.getElementById('messages');
m.innerHTML+=`<div><b>${u}</b>: ${t}</div>`;
m.scrollTop=m.scrollHeight;
}


join(room);
