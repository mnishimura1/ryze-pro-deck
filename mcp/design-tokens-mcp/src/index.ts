import readline from "node:readline";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const tokens = { theme:"ryze-pro-metallic", accent:"emerald", bg:"#000000", fg:"#ffffff" };
rl.on("line", (line)=>{ try {
  const req = JSON.parse(line);
  if (req.method==="design.tokens.get") return console.log(JSON.stringify({id:req.id, result:tokens}));
  if (req.method==="design.tokens.apply") return console.log(JSON.stringify({id:req.id, result:{ok:true, applied:req.params}}));
  console.log(JSON.stringify({id:req.id, error:{message:"unknown method"}}));
} catch(e){ console.log(JSON.stringify({error:String(e)})); }});