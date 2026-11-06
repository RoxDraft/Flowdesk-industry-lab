export const AB_AUDIENCES=[['regular','ลูกค้าประจำ',.30,1],['returning','ลูกค้าที่เริ่มห่างหาย',.14,.8],['new','สมาชิกใหม่',.20,.9]];
export const AB_PRESETS=[['scale','ตัวอย่าง: อัตราซื้อเพิ่มมาก',.14,8],['continue','ตัวอย่าง: อัตราซื้อเพิ่มเล็กน้อย',.015,8],['service','ตัวอย่าง: ซื้อเพิ่มแต่ส่งมอบช้า',.14,16],['loss','ตัวอย่าง: อัตราซื้อลดลง',-.12,8]];
export const AB_BUSINESSES={
 restaurant:{price:180,cost:95,unit:'คน',delivery:'เวลารออาหาร',deliveryUnit:'นาที',limit:10,changes:[['speed','ชุดกลางวันรับด่วน',0,3,'แยกจุดรับและเตรียมวัตถุดิบก่อนช่วงเที่ยง'],['bundle','ชุดอาหารพร้อมเครื่องดื่ม',20,7,'ตรวจความพร้อมทั้งชุดก่อนเปิดขาย'],['discount','ลดราคาเมนูเดิม',-25,0,'ตรวจส่วนลดและสต็อกก่อนยืนยัน']]},
 retail:{price:390,cost:210,unit:'คน',delivery:'เวลารอรับสินค้า',deliveryUnit:'นาที',limit:10,changes:[['speed','สั่งล่วงหน้าและรับหน้าร้าน',0,6,'แยกจุดรับและตรวจสินค้าให้ครบ'],['bundle','ชุดสินค้าที่ใช้ร่วมกัน',40,14,'จัดชุดพร้อมตัวเลือกซื้อแยก'],['discount','ส่วนลดสินค้าที่ซื้อประจำ',-50,0,'ตรวจส่วนลดกับจำนวนพร้อมขาย']]},
 service:{price:650,cost:250,unit:'คน',delivery:'เวลารอก่อนเริ่มบริการ',deliveryUnit:'นาที',limit:10,changes:[['speed','จองเวลาและรับรถตามนัด',0,15,'กันคิวและตรวจทีมก่อนรับนัด'],['bundle','แพ็กเกจดูแลรถครบชุด',100,35,'ตรวจวัสดุและกำลังทีมก่อนรับงาน'],['discount','ส่วนลดบริการเดิม',-100,0,'ตรวจราคาและคิวก่อนยืนยัน']]},
 factory:{price:18000,cost:11500,unit:'บัญชี',delivery:'เวลาส่งมอบงาน',deliveryUnit:'วัน',limit:10,changes:[['speed','ล็อตเริ่มต้นกำหนดวันส่ง',0,250,'กันกำลังผลิตและตรวจวัตถุดิบก่อนรับงาน'],['bundle','ชุดบรรจุภัณฑ์พร้อมออกแบบ',1500,500,'ยืนยันแบบและต้นทุนก่อนผลิต'],['discount','ส่วนลดล็อตเริ่มต้น',-2500,0,'ตรวจราคาตั้งเครื่องและกำลังผลิต']]}
};
export function calculateAB({industry='restaurant',audience='regular',change='speed',preset='scale',n=500,setup=600,contact=.5}={}){
 const business=AB_BUSINESSES[industry],group=AB_AUDIENCES.find(x=>x[0]===audience),offer=business?.changes.find(x=>x[0]===change),example=AB_PRESETS.find(x=>x[0]===preset);
 if(!business||!group||!offer||!example||!Number.isInteger(n)||n<50||n>10000||!Number.isFinite(setup)||setup<0||setup>10000000||!Number.isFinite(contact)||contact<0||contact>10000)throw Error('กรุณาใช้ค่าตัวอย่างในช่วงที่กำหนด');
 const pA=group[2],lift=example[2]*group[3]*(change==='discount'?1.35:1),pB=Math.max(0,Math.min(1,pA+lift));
 function arm(probability,price,cost,fee){
  const buyers=Math.round(n*probability),nonbuyers=n-buyers,revenue=buyers*price,variable=buyers*cost,marginPerBuyer=price-cost,contribution=revenue-variable,communication=n*fee,mean=(contribution-communication)/n;
  const actualP=buyers/n,variance=n/(n-1)*actualP*(1-actualP)*marginPerBuyer**2;
  return {n,buyers,nonbuyers,revenue,variable,contribution,communication,mean,variance,price,cost};
 }
 const a=arm(pA,business.price,business.cost,0),b=arm(pB,business.price+offer[2],business.cost+offer[3],contact);
 const difference=b.mean-a.mean,gross=difference*n,net=gross-setup,se=Math.sqrt(a.variance/n+b.variance/n),low=(difference-1.96*se)*n-setup,high=(difference+1.96*se)*n-setup;
 const service=example[3],serviceOK=service<=business.limit;
 const dataOK=Math.min(a.buyers,a.nonbuyers,b.buyers,b.nonbuyers)>=10;
 const decision=!serviceOK?'fix':!dataOK?'continue':high<0?'stop':low>0?'scale':'continue';
 return {a,b,business,group,offer,example,n,setup,contact,difference,gross,net,se,low,high,service,serviceOK,dataOK,decision};
}
