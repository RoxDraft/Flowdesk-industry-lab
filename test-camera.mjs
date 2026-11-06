import assert from 'node:assert/strict';
import {cameraExperiment,cameraPosition,CAMERA_BUSINESSES,CAMERA_PLANS,CAMERA_CASES} from './dist/camera.mjs';
const expected={clear:'scale',weak:'continue',congested:'fix',loss:'stop'};
for(const [example,decision] of Object.entries(expected))assert.equal(cameraExperiment({example}).decision,decision);
const r=cameraExperiment();
assert.equal(r.net,r.b.netRevenue-r.b.variableCost-r.b.operatingCost-r.a.netRevenue+r.a.variableCost-r.setup);
const diffs=r.blocks.map(x=>x.b.profit-x.a.profit),mean=diffs.reduce((s,x)=>s+x,0)/12;
const se=Math.sqrt(diffs.reduce((s,x)=>s+(x-mean)**2,0)/11/12);
assert.ok(Math.abs(r.low-((mean-2.201*se)*12-r.setup))<1e-8);
assert.ok(Math.abs(r.high-((mean+2.201*se)*12-r.setup))<1e-8);
for(const industry of Object.keys(CAMERA_BUSINESSES))for(const [plan] of CAMERA_PLANS)for(const [example] of CAMERA_CASES)for(const pairs of [6,12,24]){
 const x=cameraExperiment({industry,plan,example,pairs});assert.ok(x.low<=x.net&&x.net<=x.high);assert.equal(x.blocks.length,pairs);
 for(const arm of ['a','b']){assert.equal(x[arm].passages,x.blocks.reduce((s,p)=>s+p[arm].passages,0));for(const p of x.blocks){assert.ok(p[arm].stops<=p[arm].passages);assert.ok(p[arm].receipts<=p[arm].queueEntries);assert.equal(p[arm].profit,p[arm].netRevenue-p[arm].variableCost-p[arm].operatingCost);}}
 const serialized=JSON.stringify(x);for(const forbidden of ['userId','memberId','faceId','email','trajectory'])assert.equal(serialized.includes(forbidden),false);
}
for(const kind of ['pass','stop','queue'])for(const p of [-1,0,.2,.5,.999,100]){const pos=cameraPosition(p,kind,true,16);assert.ok(Number.isFinite(pos.x)&&Number.isFinite(pos.y));assert.ok(pos.x>=0&&pos.x<=740&&pos.y>=0&&pos.y<=430);}
assert.throws(()=>cameraExperiment({pairs:0}));assert.throws(()=>cameraExperiment({plan:'unknown'}));
console.log('PASS: camera/POS reconciliation, paired-block CI, all four decisions, 144 scenarios, anonymous aggregates and movement bounds');
