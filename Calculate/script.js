document.getElementById('calcBtn').addEventListener('click', calculate);


function calculate() {
  const area = parseFloat(document.getElementById('area').value) || 0;
  const startDateValue = document.getElementById('startDate').value;
  const weather = document.getElementById('weather').value;


  if (!startDateValue) {
    return showResult('กรุณาระบุวันที่เริ่มต้น');
  }
  if (area <= 0) {
    return showResult('กรุณาระบุพื้นที่ให้ถูกต้อง');
  }


  // ตั้งค่าระยะเวลาและผลผลิตตามสภาพอากาศ
  let harvestDays, yieldPerRai;
  switch (weather) {
    case 'ร้อนจัด':
      harvestDays = 15; yieldPerRai = 2000; break;
    case 'ปกติ':
      harvestDays = 20; yieldPerRai = 1500; break;
    case 'มีเมฆบางส่วน':
      harvestDays = 25; yieldPerRai = 1200; break;
    case 'มีเมฆมาก':
      harvestDays = 30; yieldPerRai = 1000; break;
    default:
      harvestDays = 20; yieldPerRai = 1500;
  }


  // คำนวณวันที่เก็บเกี่ยว
  const start = new Date(startDateValue);
  const harvestDate = new Date(start);
  harvestDate.setDate(start.getDate() + harvestDays);


  // คำนวณผลผลิตรวม
  const totalYield = yieldPerRai * area;


  // แสดงผล
  showResult(`
    <h2>ผลการคำนวณ</h2>
    <p><strong>วันที่เริ่มต้น:</strong> ${formatDate(start)}</p>
    <p><strong>ระยะเวลาในการผลิต:</strong> ${harvestDays} วัน</p>
    <p><strong>วันที่คาดว่าจะเก็บเกี่ยวได้:</strong> ${formatDate(harvestDate)}</p>
    <p><strong>ผลผลิตโดยประมาณ:</strong> ${yieldPerRai.toLocaleString()} กก./ไร่</p>
    <p><strong>ผลผลิตรวมโดยประมาณ:</strong> ${totalYield.toLocaleString()} กก. (${(totalYield/1000).toFixed(2)} ตัน)</p>
  `);
}


function showResult(html) {
  document.getElementById('result').innerHTML = html;
}


function formatDate(d) {
  return d.toLocaleDateString('th-TH', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}
