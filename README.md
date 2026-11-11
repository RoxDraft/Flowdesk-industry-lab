# Flowdesk — POS & SOP Industry Lab

ต้นแบบเว็บเชิงโต้ตอบสำหรับเรียนรู้การเชื่อม POS, SOP, ข้อมูลลูกค้า และการทดลองวัดกำไรส่วนเพิ่ม ในร้านอาหาร ค้าปลีก ร้านบริการ และโรงงาน

## ผู้พัฒนาและการใช้ AI

**โปรเจกต์นี้พัฒนาและเขียนโค้ดโดย GPT ผ่าน OpenAI Codex ตามแนวคิด ความต้องการ และคำแนะนำของเจ้าของโปรเจกต์** โดย GPT-6.1 Sol ช่วยออกแบบหน้าจอ เขียนโปรแกรม สร้างข้อมูลสมมติ และจัดทำการทดสอบ เจ้าของโปรเจกต์เป็นผู้กำหนดทิศทางและขอบเขตการใช้งาน

## Public demo / เว็บสาธิตสาธารณะ

- ไทย: https://roxdraft.github.io/Flowdesk-industry-lab/?lang=th
- English: https://roxdraft.github.io/Flowdesk-industry-lab/?lang=en
- อุปกรณ์ 3D และ Tech stack: https://roxdraft.github.io/Flowdesk-industry-lab/?lang=th#equipment
- 3D equipment and stack: https://roxdraft.github.io/Flowdesk-industry-lab/?lang=en#equipment

หน้า 3D หมุน ซูม และเลือกอุปกรณ์ 10 ชนิดได้ แยกหน้าร้าน–หลังร้าน พร้อมพอร์ต เส้นทางข้อมูล และข้อเสนอ Tech stack สำหรับระบบจริง โมเดลเป็นรูปทรงตัวอย่าง ไม่ใช่แบบติดตั้งหรือการเชื่อมต่อจริง

The 3D page offers 10 selectable devices, orbit/zoom, front/back-of-house filters, logical data links and proposed production technologies. Models are illustrative, not equipment replicas or installation plans.

GitHub Pages publishes static demo assets from the `gh-pages` branch. Source files live in `main/dist`. It does not run server APIs, databases, actual payments or device drivers. Browser trial data is specific to each site origin.

## ทดลองใช้งาน

- เว็บเดิมที่เผยแพร่แบบส่วนตัว: https://flowdesk-pos-sop-lab.sappydrift2.chatgpt.site/
- หน้าพฤติกรรมจากกล้องจำลอง: https://flowdesk-pos-sop-lab.sappydrift2.chatgpt.site/#camera
- หน้าทดลอง A/B: https://flowdesk-pos-sop-lab.sappydrift2.chatgpt.site/#ab

สิทธิ์เข้าถึงเว็บ Sites และสิทธิ์เข้าถึง GitHub เป็นคนละส่วนกัน การนำโค้ดขึ้น GitHub ไม่เปลี่ยนสิทธิ์เว็บหรือเผยแพร่เวอร์ชันใหม่โดยอัตโนมัติ

## Animated data flow / แอนิเมชันข้อมูลไหล

หน้า 3D เลือกเหตุการณ์การขาย รับสินค้า เวลาบริการ สถิติกล้อง และอุณหภูมิได้ มีปุ่มเล่น/พัก ปรับความเร็ว และกดดูคำอธิบาย POS, ERP, CRM/CDP และ A/B ทั้งไทย/อังกฤษ สถิติกล้องไม่ไหลไปสร้างตัวตนลูกค้า

The 3D page animates sales, stock, service, anonymous traffic and temperature routes. Play/pause, speed controls and clickable POS/ERP/CRM-CDP/A-B destinations work in both languages. Dots are synthetic logical messages, not real network activity or proof of incremental profit. Reduced-motion users start paused.

## ภาษา / Languages

กด **English** ที่มุมขวาบนเพื่อสลับเป็นภาษาอังกฤษ และกด **ไทย** เพื่อกลับ ระบบจำภาษาบนอุปกรณ์นี้ การเปลี่ยนภาษาไม่ล้างรายการขายหรือค่าทดลอง และไม่แปลข้อความที่ผู้ใช้บันทึกเอง

Click **English** at the top right, or **ไทย** to switch back. The browser remembers your choice. Orders, experiment settings, and user-entered notes are preserved. Amounts remain in Thai baht. Translations are bundled locally; no external translation service is used.

## ความสามารถ

- POS จำลอง: เพิ่มรายการ ส่วนลด สมาชิก ตรวจความพร้อมก่อนยืนยัน และยกเลิกรายการเพื่อคืนสต็อก
- SOP: ขั้นตอนงานตามอุตสาหกรรม บันทึกเวลาและปัญหา
- ภาพรวมธุรกิจและแคมเปญจำลอง: ตรวจสิทธิ์การตลาดก่อนบันทึกตัวอย่างข้อความ
- ข้อมูลลูกค้า: แยกลูกค้าบอกเอง ระบบสังเกตได้ ระบบคาดการณ์ และยังไม่ทราบ พร้อมแหล่งข้อมูลและข้อจำกัด
- A/B สมาชิก: เทียบกลุ่มควบคุมและทดลอง รวมผู้ไม่ซื้อ หักต้นทุนและค่าเริ่มทดลอง แสดงช่วงประมาณกำไรและเกณฑ์ขยายผล
- พฤติกรรมจากกล้อง: แผนผังจุดเคลื่อนไหว หยุดดูสินค้า และคิว เชื่อมสถิติรวมกับ POS ตามสาขาและช่วงเวลา
- A/B ปรับร้าน: เปรียบเทียบคู่สาขา–ช่วงเวลา ใช้ความแปรปรวนระดับคู่ ไม่ถือการเดินผ่านแต่ละครั้งเป็นตัวอย่างอิสระ

## ข้อมูลและข้อจำกัด

ข้อมูลทั้งหมดเป็นข้อมูลสมมติ ไม่มีการรับเงินจริง ส่งแคมเปญจริง เชื่อม ERP จริง หรือเปิดกล้องจริง ไม่เก็บภาพใบหน้าและไม่จับคู่บุคคลกับบิล

ข้อมูลทดลอง POS เก็บใน localStorage ของเบราว์เซอร์ ส่วนตัวอย่างลูกค้า A/B และกล้องมีชุดสมมติแยกกัน สถิติกล้องและ POS ที่หน้าเดียวกันเชื่อมด้วยสาขา/ช่วงเวลา ไม่ใช้รหัสสมาชิก

กำไรส่วนเพิ่มในต้นแบบคือส่วนต่างส่วนเกินหลังต้นทุนที่เกี่ยวข้องและค่าเริ่มทดลอง ไม่ใช่กำไรสุทธิทางบัญชี ช่วงประมาณอาศัยสมมติฐานของชุดตัวอย่าง ไม่ใช่หลักฐานผลประกอบการหรือคำทำนายยอดขายจริง

## เปิดในเครื่อง

ใช้ Node.js รุ่น 22 ขึ้นไป ไม่ต้องติดตั้งไลบรารีเพิ่มเติม

```sh
node serve.mjs
```

เปิด http://127.0.0.1:4173 แล้วกด Ctrl+C เพื่อหยุดเซิร์ฟเวอร์ ควรเปิดไฟล์แบบแยกโมดูลผ่านเซิร์ฟเวอร์นี้ แทนการดับเบิลคลิก dist/index.html

## ทดสอบสูตรและกฎงาน

```sh
node test-core.mjs
node test-ab.mjs
node test-camera.mjs
```

การทดสอบครอบคลุมยอดและต้นทุน SOP สต็อก การยกเลิก การแยกอุตสาหกรรม สูตรกำไร A/B ช่วงประมาณระดับคู่ และข้อมูลรวมกล้อง

## โครงสร้างไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| dist/index.html | โครงหน้าเว็บ |
| dist/styles.css | รูปแบบและหน้าจอมือถือ |
| dist/app.js | หน้าจอและการโต้ตอบ |
| dist/i18n.mjs | ข้อความอังกฤษและการจำภาษา / English UI catalogue and language preference |
| dist/equipment.mjs | โมเดลอุปกรณ์ 3D จุดเชื่อมต่อ และ Tech stack |
| dist/core.mjs | ข้อมูลตั้งต้น POS และ SOP |
| dist/ab.mjs | สูตรทดลองข้อเสนอสมาชิก |
| dist/camera.mjs | สถิติกล้อง/POS จำลอง และสูตรทดลองปรับร้าน |
| serve.mjs | เซิร์ฟเวอร์สำหรับเปิดในเครื่อง |
| test-*.mjs | การทดสอบสูตรและกฎงาน |

ก่อนนำไปใช้จริงต้องเพิ่มระบบผู้ใช้ ฐานข้อมูล การเชื่อมระบบธุรกิจ และการทดสอบความปลอดภัย/ความถูกต้องตามบริบทใช้งาน
