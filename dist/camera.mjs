export const CAMERA_PLANS=[['layout','ย้ายจุดแสดงสินค้า','ย้ายจุดแสดงมาใกล้เส้นทางเข้า พร้อมเปิดช่องเดิน'],['queue','แยกจุดรับและเพิ่มช่องบริการ','แยกคิวสั่งกับคิวรับ เตรียมงานก่อนช่วงหนาแน่น'],['signage','ปรับป้ายและตำแหน่งราคา','แสดงราคาและตัวเลือกให้เห็นก่อนถึงเคาน์เตอร์']];
export const CAMERA_CASES=[['clear','ตัวอย่าง: กำไรเพิ่มชัดเจน'],['weak','ตัวอย่าง: ยังสรุปไม่ได้'],['congested','ตัวอย่าง: ขายดีแต่คิวยาว'],['loss','ตัวอย่าง: ปรับแล้วไม่คุ้ม']];
export const CAMERA_BUSINESSES={restaurant:{zone:'จุดแสดงเมนู',counter:'สั่ง / รับอาหาร',sale:'บิลอาหารสำเร็จ',price:180,cost:95},retail:{zone:'ชั้นสินค้าตัวอย่าง',counter:'ชำระ / รับสินค้า',sale:'บิลขายสำเร็จ',price:390,cost:210},service:{zone:'จุดแสดงแพ็กเกจ',counter:'รับคิวบริการ',sale:'บิลบริการที่เสร็จแล้ว',price:650,cost:250},factory:{zone:'ชั้นตัวอย่างบรรจุภัณฑ์',counter:'รับชุดตัวอย่าง',sale:'บิลชุดตัวอย่างสำเร็จ',price:450,cost:250}};
export function cameraExperiment({industry='restaurant',plan='layout',example='clear',pairs=12}={}){
 const business=CAMERA_BUSINESSES[industry],intervention=CAMERA_PLANS.find(x=>x[0]===plan);
 if(!business||!intervention||!CAMERA_CASES.some(x=>x[0]===example)||![6,12,24].includes(pairs))throw Error('ชุดการทดลองกล้องไม่ถูกต้อง');
 const scale=(business.price-business.cost)/85,setup=600*scale,noise=[-7,7,-5,5,-3,3,-8,8,-4,4,-6,6];
 const blocks=Array.from({length:pairs},(_,i)=>{
  const passages=110+i*17%65,receipts=Math.round(passages*.22),effect=({clear:8,weak:1,congested:8,loss:-4}[example])+(plan==='queue'?1:plan==='signage'?-1:0),bReceipts=Math.max(0,receipts+effect+noise[i%12]);
  function arm(arm,tx,passing){
   const isB=arm==='B',stops=Math.round(passing*(isB?(plan==='queue'?.31:.44):.28)),queueEntries=tx+5+(i%4),wait=isB?(example==='congested'?14+i%3:plan==='queue'?3+i%2:5+i%3):8+i%3,netRevenue=tx*business.price,variableCost=tx*(business.cost+(isB?2*scale:0)),operatingCost=isB?60*scale:0;
   return {pair:i+1,arm,store:((i%2===0)===(arm==='A'))?'สาขาสมมติ 01':'สาขาสมมติ 02',window:'12:00–13:00',block:'D'+String(i+1).padStart(2,'0'),passages:passing,stops,dwellSeconds:isB?34+i%7:20+i%7,queueEntries,waitMinutes:wait,receipts:tx,cancellations:2+i%2,netRevenue,variableCost,operatingCost,profit:netRevenue-variableCost-operatingCost};
  }
  return {pair:i+1,a:arm('A',receipts,passages),b:arm('B',bReceipts,passages+(i%3-1)*3)};
 });
 const total=arm=>{
  const rows=blocks.map(x=>x[arm]),sum=k=>rows.reduce((s,x)=>s+x[k],0),queueEntries=sum('queueEntries'),stops=sum('stops');
  return {passages:sum('passages'),stops,receipts:sum('receipts'),cancellations:sum('cancellations'),netRevenue:sum('netRevenue'),variableCost:sum('variableCost'),operatingCost:sum('operatingCost'),profit:sum('profit'),queueEntries,waitMinutes:rows.reduce((s,x)=>s+x.waitMinutes*x.queueEntries,0)/queueEntries,dwellSeconds:rows.reduce((s,x)=>s+x.dwellSeconds*x.stops,0)/stops};
 };
 const a=total('a'),b=total('b'),differences=blocks.map(x=>x.b.profit-x.a.profit),mean=differences.reduce((s,x)=>s+x,0)/pairs,variance=differences.reduce((s,x)=>s+(x-mean)**2,0)/(pairs-1),se=Math.sqrt(variance/pairs),critical={6:2.571,12:2.201,24:2.069}[pairs],net=b.profit-a.profit-setup,low=(mean-critical*se)*pairs-setup,high=(mean+critical*se)*pairs-setup,serviceOK=b.waitMinutes<=10,decision=!serviceOK?'fix':low>0?'scale':high<0?'stop':'continue';
 return {industry,plan,example,pairs,business,intervention,blocks,a,b,setup,mean,se,critical,net,low,high,serviceOK,decision};
}
export function cameraPosition(progress,kind='pass',improved=false,waitMinutes=9){
 const x=improved?265:390;
 const queueX=improved?560:470,waiting=Array.from({length:Math.max(1,Math.round(waitMinutes/2))},()=>[queueX,330]);
 const points=kind==='stop'?[[10,330],[130,330],[x,230],[x,230],[x,230],[530,330],[730,330]]:kind==='queue'?[[10,330],[160,330],...waiting,[620,330],[620,190],[730,330]]:[[10,330],[200,330],[400,330],[600,330],[730,330]];
 const p=((progress%1)+1)%1*(points.length-1),i=Math.min(points.length-2,Math.floor(p)),t=p-i;
 return {x:points[i][0]+(points[i+1][0]-points[i][0])*t,y:points[i][1]+(points[i+1][1]-points[i][1])*t};
}
