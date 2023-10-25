var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Annual snapshot' });
});

router.post('/', function(req, res, next) {

  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit.';

  let fileName = 'Annual snapshot'
  res.setHeader('Content-disposition', 'inline; filename='+ fileName +'.pdf');

  const doc = new PDFDocument();
  doc.pipe(res);

  let currentY = 10;
  let titleBoxHeight = 30;
  let titleBoxWidth = 700;

  doc.fontSize(10).fillColor('gray').text("Annual snapshot, " + new Date().getFullYear() ,500, 10, {oblique: true, lineBreak: false});

  currentY = 40;

  // TODO text to upper case, change font, add background
  // doc.fontSize(20).fillColor('black').text(req.body.name + "," + req.body.age + " years", 180, currentY);
  doc.fontSize(20).fillColor('gray').text("KRISTINA, 31 years", 210, currentY).fillOpacity(1);

  currentY = 75;
  doc.roundedRect(40, currentY-5, 250, 170, 20).fillOpacity(0.3).fill("gray");
  doc.fillOpacity(1).image("public/images/image.jpeg", 60, currentY, {height: 160,  align: 'center', valign: 'center'});


// SECTION WITH WHEEL OF LIFE - START
// TODO: move to separate method
// TODO: change colors
// TODO: add titles for each section
  let x0 = 440;
  let y0 = 160;
  let sectionRadius = 8;
  let angledSectionRadius = 5.6;

  doc.circle(x0, y0, sectionRadius*10).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*9).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*8).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*7).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*6).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*5).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*4).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*3).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius*2).opacity(0.1).stroke("gray");
  doc.circle(x0, y0, sectionRadius).opacity(0.1).stroke("gray");

  doc.fontSize(6).fillColor('black').opacity(0.5).text("Fitness", 380, currentY+8);
  doc.fontSize(6).fillColor('black').opacity(0.5).text("Health", 480, currentY+8);

  doc.fontSize(6).fillColor('black').opacity(0.5).text("Finance", 340, currentY+58);
  doc.fontSize(6).fillColor('black').opacity(0.5).text("Mental health", 520, currentY+58, {lineBreak: false});

  doc.fontSize(6).fillColor('black').opacity(0.5).text("Personal growth", 317, currentY+108);
  doc.fontSize(6).fillColor('black').opacity(0.5).text("Relationships", 520, currentY+108, {lineBreak: false});

  doc.fontSize(6).fillColor('black').opacity(0.5).text("Fun and recreation", 357, currentY+158);
  doc.fontSize(6).fillColor('black').opacity(0.5).text("Career", 480, currentY+158);


  // let sectionRate = req.body.healthRate;
  let sectionRate = 8;
  let radius = sectionRadius * sectionRate;
  let xVal2 = x0 + (angledSectionRadius * sectionRate);
  let yVal1 = y0 - radius;
  let yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("green")
    .stroke();

  // sectionRate = req.body.mentalRate;
  let xVal1 = x0 + (sectionRadius * sectionRate);
  radius = sectionRadius * sectionRate;
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("orange")
    .stroke();

  // sectionRate = req.body.relationsRate;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 + (sectionRadius * sectionRate);
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("red")
    .stroke();

  // sectionRate = req.body.careerRate;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 + radius;
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("yellow")
    .stroke();

  // sectionRate = req.body.fitnessRate;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 - radius;
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("violet")
    .stroke();2

// sectionRate = req.body.financeRate;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 - (sectionRadius * sectionRate);
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("blue")
    .stroke();

// sectionRate = req.body.hobbiesRate;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 - (sectionRadius * sectionRate);
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("pink")
    .stroke();

// sectionRate = req.body.funRate;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 + radius;
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("gold")
    .stroke();    
// SECTION WITH WHEEL OF LIFE - END

  


// HEALTH SECTION - START
  currentY = 250;
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight)
    .fillOpacity(0.4)
    .fill("gray");

  doc.fontSize(12).fillOpacity(1).fillColor('white').text("PHYSICAL HEALTH AND FITNESS", 200, currentY + 10);

  currentY = 290;
  // AESTHETIC PART
  // doc.rect(50, currentY, 170, 250)
  //   .stroke();

  if (req.body.genderRadio === 'Female') {
    // doc.fontSize(12).fillColor('black').text("32", 200, currentY+20);

      doc.image("public/images/female.jpg", 50, currentY, {height: 240,  align: 'center', valign: 'center'});
  } else {  
    doc.image("public/images/male.jpg", 50, currentY, {height: 240,  align: 'center', valign: 'center'});
    // doc.fontSize(10).fillColor('black').text("32", 120, currentY+50);
    // TODO: add BMI scale on the bottom

  }



  // HEALTH MARKERS PART
  let physicalBoxWidth = 170;

  doc.strokeOpacity(0.6);
  // doc.rect(220, currentY, physicalBoxWidth, 120).stroke();
  let markersRectWidth = 70;
  let markersValueRectWidth = 90;

  doc.fontSize(10).fillColor("gray").text("Health markers", 225, currentY +5);
  doc.rect(225, currentY+20, markersRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(225, currentY+32, markersRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(225, currentY+44, markersRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(225, currentY+56, markersRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(225, currentY+68, markersRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(225, currentY+80, markersRectWidth, 12).fillAndStroke("gray", "white");

  doc.fillOpacity(0.2).rect(295, currentY+20, markersValueRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(295, currentY+32, markersValueRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(295, currentY+44, markersValueRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(295, currentY+56, markersValueRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(295, currentY+68, markersValueRectWidth, 12).fillAndStroke("gray", "white");
  doc.rect(295, currentY+80, markersValueRectWidth, 12).fillAndStroke("gray", "white");

  // TODO: add units of measurments
  // TODO: add green,yellow, red background color, depending on the value (or dor after the value instead of background)
  doc.fontSize(7).fillColor("white").fillOpacity(1).text("Blood pressure", 230, currentY+23);
  doc.fillColor("white").text("Blood cholesterol", 230, currentY+35);
  doc.fillColor("white").text("Blood glucose", 230, currentY+47);
  doc.fillColor("white").text("Body fat", 230, currentY+59);
  doc.fillColor("white").text("VO2max", 230, currentY+71);
  doc.fillColor("white").text("Resting heart rate", 230, currentY+83);

  // TODO: add values from input form
  doc.fontSize(7).fillColor("gray").fillOpacity(1).text("120/80 mmHg", 300, currentY+23);
  doc.text("4 mmol/L", 300, currentY+35);
  doc.text("4 mmol/L", 300, currentY+47);
  doc.text("26% (DEXA scan)", 300, currentY+59);
  doc.text("50 ml/kg/min", 300, currentY+71);
  doc.text("40 bpm", 300, currentY+83);


  // OTHERS PART
  // doc.strokeColor("gray").fillColor("gray").rect(400, currentY, physicalBoxWidth, 120).stroke();


  currentY = 420;
  // FITNESS PART
  // doc.rect(220, currentY, physicalBoxWidth, 120).stroke();

  // FREE TEXT PART
  // doc.rect(400, currentY, physicalBoxWidth, 120).stroke();
  doc.fontSize(10).fillColor("gray").text("Summary", 405, currentY +5);
  doc.fontSize(7).fillColor("gray").text(lorem, 405, currentY+20, {align: 'justify', width: 160});


// HEALTH SECTION - END


  currentY = 550;
// MENTAL HEALTH SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight)
  .fillOpacity(0.6)
  .fill("gray");

  doc.fillColor('black').text("MENTAL HEALTH", 260, currentY + 10);

  doc.end();
});


module.exports = router;
