export class ChatRoom {
constructor(state) {
this.state = state;
this.clients = [];
}


fetch(req) {
if (req.headers.get("Upgrade") === "websocket") {
const pair = new WebSocketPair();
const client = pair[1];
client.accept();
this.clients.push(client);


client.addEventListener("message", msg => {
this.clients.forEach(c => c.send(msg.data));
});


client.addEventListener("close", () => {
this.clients = this.clients.filter(c => c !== client);
});


return new Response(null, { status: 101, webSocket: pair[0] });
}
return new Response("OK");
}
}


export default {
async fetch(req, env) {
const url = new URL(req.url);


if (url.pathname.startsWith('/ws/')) {
const room = url.pathname.split('/')[2];
const id = env.CHAT.idFromName(room);
const obj = env.CHAT.get(id);
return obj.fetch(req);
}


return new Response('Nocca API');
}
};
