import readline from "node:readline";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
let slides = [{id:"adapter-hub-3d", type:"adapterHub3D", props:{}}];
rl.on("line",(line)=>{ try{
  const req = JSON.parse(line);
  if (req.method==="slides.list") return console.log(JSON.stringify({id:req.id, result:slides}));
  if (req.method==="slides.create"){ const s={id:Date.now().toString(), ...req.params}; slides.push(s); return console.log(JSON.stringify({id:req.id, result:s})); }
  if (req.method==="slides.update"){ const s=slides.find(x=>x.id===req.params.id); if(s) Object.assign(s, req.params.patch); return console.log(JSON.stringify({id:req.id, result:s||null})); }
  console.log(JSON.stringify({id:req.id, error:{message:"unknown method"}}));
} catch(e){ console.log(JSON.stringify({error:String(e)})); }});