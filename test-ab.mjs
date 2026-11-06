import assert from 'node:assert/strict';
import {calculateAB,AB_BUSINESSES,AB_AUDIENCES,AB_PRESETS} from './dist/ab.mjs';
const baseline=calculateAB();
assert.equal(baseline.a.buyers,150);assert.equal(baseline.b.buyers,220);
assert.equal(baseline.a.mean,25.5);assert.ok(Math.abs(baseline.b.mean-35.58)<1e-9);
assert.ok(Math.abs(baseline.net-4440)<1e-8);assert.equal(baseline.decision,'scale');
assert.equal(calculateAB({preset:'continue'}).decision,'continue');
assert.equal(calculateAB({preset:'service'}).decision,'fix');
assert.equal(calculateAB({preset:'loss'}).decision,'stop');
const higherSetup=calculateAB({setup:1600});assert.ok(Math.abs(higherSetup.net-(baseline.net-1000))<1e-8);assert.ok(Math.abs(higherSetup.low-(baseline.low-1000))<1e-8);
const moreContact=calculateAB({contact:1.5});assert.ok(Math.abs(moreContact.net-(baseline.net-500))<1e-8);
for(const [industry,business] of Object.entries(AB_BUSINESSES))for(const [audience] of AB_AUDIENCES)for(const [change] of business.changes)for(const [preset] of AB_PRESETS){
 const r=calculateAB({industry,audience,change,preset});
 for(const x of [r.net,r.low,r.high,r.se])assert.ok(Number.isFinite(x));
 assert.ok(r.low<=r.net&&r.net<=r.high);assert.equal(r.a.buyers+r.a.nonbuyers,r.n);assert.equal(r.b.buyers+r.b.nonbuyers,r.n);
 assert.ok(Math.abs(r.net-((r.b.contribution-r.b.communication)-(r.a.contribution-r.a.communication)-r.setup))<1e-7);
}
assert.throws(()=>calculateAB({n:0}));assert.throws(()=>calculateAB({setup:-1}));assert.throws(()=>calculateAB({contact:NaN}));
console.log('PASS A/B: hand-calculated profit, all four decisions, uncertainty, full assigned population, cost deduction and 144 scenario combinations');
