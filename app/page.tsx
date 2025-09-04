"use client";
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

/* ----- 3D helpers for Slide 2 ----- */
function Link({ from, to, color }: { from:[number,number,number]; to:[number,number,number]; color:string }) {
  const positions = useMemo(() => new Float32Array([...from, ...to]), [from, to]);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={2} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} />
    </line>
  );
}

function PulsingCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const s = 1 + 0.1 * Math.sin(clock.elapsedTime * 2.0);
    if (ref.current) ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.6, 64, 64]} />
      <meshStandardMaterial emissive="#10b981" emissiveIntensity={1.5} color="#10b981" />
    </mesh>
  );
}

function Node({
  position, color, label,
}: { position:[number,number,number]; color:string; label:string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    // subtle pop-in and float
    const t = clock.elapsedTime;
    const s = 1 + 0.03 * Math.sin(t * 3 + position[0]);
    if (ref.current) ref.current.scale.setScalar(s);
  });
  return (
    <group>
      <Link from={[0,0,0]} to={position} color={color} />
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={0.8} color="#0a0a0a" />
      </mesh>
      <Html position={position} distanceFactor={10}>
        <div className="px-2 py-1 rounded bg-black/60 border border-white/20 text-xs">{label}</div>
      </Html>
    </group>
  );
}
function AdapterHub3D() {
  const nodes = [
    { label:"Ethereum / Base", pos:[ 2, 1, 0], color:"#34d399" },
    { label:"Solana",          pos:[ 3,-1, 0], color:"#34d399" },
    { label:"Cosmos SDK",      pos:[ 0,-3, 0], color:"#34d399" },
    { label:"Polkadot",        pos:[-3,-1, 0], color:"#34d399" },
    { label:"Avalanche",       pos:[-2, 1, 0], color:"#34d399" },
    { label:"TON",             pos:[ 0, 3, 0], color:"#34d399" },
    { label:"Aptos / Sui",     pos:[ 4, 0,-1], color:"#6366f1" },
    { label:"Near",            pos:[ 0,-4,-1], color:"#6366f1" },
    { label:"Bitcoin L2s",     pos:[-4, 0,-1], color:"#6366f1" },
    { label:"Institutional APIs", pos:[0,4,-1], color:"#6366f1" },
  ] as const;

  return (
    <section className="h-screen flex flex-col items-center justify-center px-12">
      <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold mb-6">
        Universal Adapter Hub
      </motion.h1>
      <div className="w-full max-w-5xl h-[70vh] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 relative">
        <Canvas camera={{ position:[0,0,8], fov:50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5,5,5]} intensity={1.2} />
          <Suspense fallback={null}>
            <PulsingCore />
            {nodes.map((n,i)=>(<Node key={i} position={n.pos as any} color={n.color} label={n.label} />))}
            <EffectComposer>
              <Bloom mipmapBlur intensity={0.6} />
              <Vignette eskil={false} offset={0.2} darkness={0.6} />
            </EffectComposer>
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-neutral-400 text-sm">Green = live · Indigo = upcoming</p>
        </div>
      </div>
    </section>
  );
}

/* ----- Deck ----- */
export default function Page() {
  return (
    <div className="main w-full h-full bg-black text-white">
      {/* 1. Adapter Coverage */}
      <section className="h-screen flex flex-col items-center justify-center px-12">
        <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold mb-12">Universal Adapter Coverage</motion.h1>
        <div className="grid grid-cols-2 gap-12 w-3/4">
          <Card><CardContent><h2 className="text-2xl font-semibold mb-6 text-emerald-400">Native Now</h2><ul className="space-y-3 text-lg"><li>Ethereum / Base (EVM)</li><li>Solana</li><li>Cosmos SDK</li><li>Polkadot / Substrate</li><li>Avalanche</li><li>TON</li></ul></CardContent></Card>
          <Card><CardContent><h2 className="text-2xl font-semibold mb-6 text-indigo-400">Planned 2026</h2><ul className="space-y-3 text-lg"><li>Aptos / Sui</li><li>Near</li><li>Bitcoin L2s</li><li>Institutional FIX/ISO APIs</li></ul></CardContent></Card>
        </div>
      </section>

      {/* 2. 3D Adapter Hub */}
      <AdapterHub3D />

      {/* 3. Execution Strategy */}
      <section className="h-screen flex flex-col items-center justify-center px-12">
        <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold mb-12">Execution Strategy – Winning All Categories</motion.h1>
        <div className="grid grid-cols-3 gap-8 w-5/6">
          <Card><CardContent className="text-center"><h2 className="text-2xl font-semibold mb-4 text-emerald-400">Aggregators First</h2><p className="text-lg mb-2">Latency, throughput, IL protection.</p><p className="text-sm text-neutral-400">Direct adapters = routing preference.</p></CardContent></Card>
          <Card><CardContent className="text-center"><h2 className="text-2xl font-semibold mb-4 text-indigo-400">Institutions</h2><p className="text-lg mb-2">FIX/ISO, custodians, vaults.</p><p className="text-sm text-neutral-400">Risk-adjusted yield, compliance.</p></CardContent></Card>
          <Card><CardContent className="text-center"><h2 className="text-2xl font-semibold mb-4 text-pink-400">Retail</h2><p className="text-lg mb-2">Simple dashboards, shielded, predictions.</p><p className="text-sm text-neutral-400">Marketing loop + LP incentives.</p></CardContent></Card>
        </div>
      </section>

      {/* 4. Working Product */}
      <section className="h-screen flex flex-col items-center justify-center px-12">
        <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold mb-12">Live Product – Already Working</motion.h1>
        <div className="grid grid-cols-2 gap-12 w-5/6">
          <Card><CardContent className="text-center"><CheckCircle className="text-emerald-400 w-10 h-10 mx-auto mb-4" /><h2 className="text-2xl font-semibold mb-4">Base Sepolia</h2><p className="text-lg">580k+ TPS, 62–100µs latency.</p></CardContent></Card>
          <Card><CardContent className="text-center"><CheckCircle className="text-emerald-400 w-10 h-10 mx-auto mb-4" /><h2 className="text-2xl font-semibold mb-4">Dashboard</h2><p className="text-lg">Markets, LP, Perps, Shielded, Predictions.</p></CardContent></Card>
        </div>
      </section>

      {/* 5. Reproducible Performance */}
      <Slide3col title="Reproducible Performance"
        aTitle="Benchmark Harness" aText="Deterministic seeds, fixed mixes, CSV/JSONL."
        bTitle="Latency Truth"     bText="HW timestamps, p50/95/99/99.9, NIC+kernel."
        cTitle="Replay & Audit"    cText="Deterministic replay, Merkle proofs, signed." />

      {/* 6. Security & Compliance */}
      <Slide3col title="Security and Compliance"
        aTitle="Threat Model" aText="STRIDE, abuse cases, mitigations."
        bTitle="Verification" bText="Property tests, fuzzing, formal checks."
        cTitle="Supply Chain" cText="SBOM, SLSA, signed images." />

      {/* 7. Aggregators & Adapter SDK */}
      <Slide3col title="Aggregators & Adapter SDK"
        aTitle="SDKs"      aText="Rust, TS, Python clients, FIX bridge."
        bTitle="Adapter Specs" bText="Traits, conformance, error taxonomy."
        cTitle="Guides"    cText="Quickstarts, flows, OpenAPI." />

      {/* 8. SLOs & Ops */}
      <Slide3col title="SLOs and Operations"
        aTitle="SLOs" aText="Latency, availability, error budgets."
        bTitle="Observability" bText="Metrics, traces, logs, alerts."
        cTitle="Runbooks" cText="Incidents, DR, backups." />

      {/* 9. Liquidity & MM */}
      <Slide3col title="Liquidity and Market Making"
        aTitle="Liquidity Plan" aText="Depth targets, incentives, IL-proof."
        bTitle="MM Integrations" bText="Risk limits, sandbox, settlement."
        cTitle="Proof of Execution" cText="Live volume, slippage, audits." />

      {/* 10. SDKs & APIs */}
      <Slide3col title="SDKs and APIs"
        aTitle="OpenAPI & Auth" aText="Quotes, orders, cancels; HMAC + nonce."
        bTitle="SDK Parity" bText="Rust/TS/Py; pagination, retries."
        cTitle="Sequence"   cText="Client → Gateway → Adapter → Matcher." />

      {/* 11. Aggregator Strategy */}
      <Slide3col title="Aggregator Strategy"
        aTitle="Routing Wins" aText="Low p99, fresh quotes, low fail."
        bTitle="Integrations" bText="Native adapter endpoints."
        cTitle="Milestones"   cText="Test routes, sandbox, cutover." />

      {/* 12. Institutional Onboarding */}
      <Slide3col title="Institutional Onboarding"
        aTitle="Custody & Access" aText="Custodian, FIX/ISO, tiers."
        bTitle="Compliance" bText="KMS rotation, audit trails."
        cTitle="Ops Runbook" cText="SLA tiers, escalation." />

      {/* 13. Retail Growth */}
      <Slide3col title="Retail Growth"
        aTitle="Funnel" aText="Aggregator → pro UI → simple flows."
        bTitle="Features" bText="Shielded, predictions, IL-free LP."
        cTitle="Incentives" cText="Tiers, rebates, referrals." />

      {/* 14. Economics */}
      <Slide3col title="Economics"
        aTitle="Fees & Rebates" aText="Maker/taker, agg incentives."
        bTitle="Vault Yields" bText="USD-credit targets, risk."
        cTitle="Unit Economics" cText="Margins at target volume." />

      {/* 15. Governance */}
      <Slide3col title="Governance & Change Management"
        aTitle="Risk Reviews" aText="Gates, rollback, incidents."
        bTitle="Compliance" bText="Retention, access audits."
        cTitle="Transparency" cText="Status page, signed reports." />

      {/* 16. Roadmap */}
      <section className="h-screen flex flex-col items-center justify-center px-12">
        <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold mb-12">Roadmap: Q4 2025 → Q4 2026</motion.h1>
        <div className="grid grid-cols-4 gap-6 w-5/6 text-sm">
          {[
            { q:"Q4 2025",  items:["Aggregator integrations live","Signed test routes","Benchmarks published"], color:"text-emerald-400" },
            { q:"Q1 2026",  items:["Retail rollout","Vaults GA","FIX bridge GA"], color:"text-indigo-400" },
            { q:"Q2–Q3 2026", items:["Non-EVM adapters","Structured products","Region failover"], color:"text-pink-400" },
            { q:"Q4 2026",  items:["Institutional credit","SLO compliance","Perf portal"], color:"text-yellow-400" },
          ].map((b,i)=>(
            <Card key={i}><CardContent className="p-4">
              <h3 className={`font-semibold mb-2 ${b.color}`}>{b.q}</h3>
              <ul className="space-y-1 text-neutral-300">{b.items.map((x,j)=>(<li key={j}>{x}</li>))}</ul>
            </CardContent></Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* helper for 3-col slides */
function Slide3col({ title, aTitle, aText, bTitle, bText, cTitle, cText }:{
  title:string; aTitle:string; aText:string; bTitle:string; bText:string; cTitle:string; cText:string;
}) {
  return (
    <section className="h-screen flex flex-col items-center justify-center px-12">
      <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold mb-12">{title}</motion.h1>
      <div className="grid grid-cols-3 gap-8 w-5/6">
        <Card><CardContent className="text-center"><h2 className="text-xl font-semibold mb-3 text-emerald-400">{aTitle}</h2><p className="text-sm text-neutral-300">{aText}</p></CardContent></Card>
        <Card><CardContent className="text-center"><h2 className="text-xl font-semibold mb-3 text-indigo-400">{bTitle}</h2><p className="text-sm text-neutral-300">{bText}</p></CardContent></Card>
        <Card><CardContent className="text-center"><h2 className="text-xl font-semibold mb-3 text-pink-400">{cTitle}</h2><p className="text-sm text-neutral-300">{cText}</p></CardContent></Card>
      </div>
    </section>
  );
}
