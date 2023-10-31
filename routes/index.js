var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Annual snapshot' });
});

router.post('/', function(req, res, next) {

  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis.';

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
  let valueSignWidth = 1;
  let valueSightHeight = 9;
  let valueStep = 8.5;


  // HEALTH MARKERS PART
  doc.strokeOpacity(0.6);
  // doc.rect(220, currentY, physicalBoxWidth, 120).stroke();
  let markersRectWidth = 70;
  let markersValueRectWidth = 90;
  let tableHeight = 10;
  currentY = 290;
  doc.fontSize(10).fillColor("gray").text("Health markers", 225, currentY);
  doc.rect(225, currentY+10, markersRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(225, currentY+20, markersRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(225, currentY+30, markersRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(225, currentY+40, markersRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(225, currentY+50, markersRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(225, currentY+60, markersRectWidth, tableHeight).fillAndStroke("gray", "white");

  doc.fillOpacity(0.2).rect(295, currentY+tableHeight, markersValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(295, currentY+20, markersValueRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(295, currentY+30, markersValueRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(295, currentY+40, markersValueRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(295, currentY+50, markersValueRectWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(295, currentY+60, markersValueRectWidth, tableHeight).fillAndStroke("gray", "white");

  // TODO: add units of measurments
  // TODO: add green,yellow, red background color, depending on the value (or dor after the value instead of background)
  doc.fontSize(6).fillOpacity(1);
  doc.fillColor("white").text("Blood pressure", 230, currentY+13);
  doc.fillColor("white").text("Blood cholesterol", 230, currentY+23);
  doc.fillColor("white").text("Blood glucose", 230, currentY+33);
  doc.fillColor("white").text("Body fat", 230, currentY+43);
  doc.fillColor("white").text("VO2max", 230, currentY+53);
  doc.fillColor("white").text("Resting heart rate", 230,currentY+63);

  // TODO: add values from input form
  doc.fillColor("gray").text("120/80 mmHg", 300, currentY+13);
  doc.text("4 mmol/L", 300, currentY+23);
  doc.text("4 mmol/L", 300, currentY+33);
  doc.text("26% (DEXA scan)", 300, currentY+43);
  doc.text("50 ml/kg/min", 300, currentY+53);
  doc.text("40 bpm", 300, currentY+63);


  // MISC PART
  doc.fontSize(10).fillColor("gray").text("Misc", 405, currentY);

  //gray boxed
  doc.rect(405, currentY+10, markersRectWidth+4, 10).fillAndStroke("gray", "white");
  doc.rect(405, currentY+20, markersRectWidth+4, 10).fillAndStroke("gray", "white");
  doc.rect(405, currentY+30, markersRectWidth+4, 10).fillAndStroke("gray", "white");
  doc.rect(405, currentY+40, markersRectWidth+4, 10).fillAndStroke("gray", "white");
  doc.rect(405, currentY+50, markersRectWidth+4, 10).fillAndStroke("gray", "white");
  doc.rect(405, currentY+60, markersRectWidth+4, 10).fillAndStroke("gray", "white");
  doc.rect(405, currentY+70, markersRectWidth+4, 10).fillAndStroke("gray", "white");
  doc.rect(405, currentY+80, markersRectWidth+4, 40).fillAndStroke("gray", "white");

  //titles on gray background
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Average mood", 409, currentY+13);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Average sleep quality", 409, currentY+23);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Average amount of sleep", 409, currentY+33);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Training volume per week", 409, currentY+43);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Training volume per week", 409, currentY+53);
  // TODO: rename
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Healthy food percentage", 409, currentY+63);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Sport disciplines", 409, currentY+73);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Training routine", 409, currentY+83);

  //value background
  let gradX1 = 480;
  let gradX2 = 570;
  let grad1 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad1.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');
  doc.fillOpacity(0.3).rect(gradX1+1, currentY+13, markersValueRectWidth+3, 5).fill(grad1);
  doc.fillOpacity(0.3).rect(gradX1+1, currentY+23, markersValueRectWidth+3, 5).fill(grad1);
  doc.fillOpacity(0.2).rect(gradX1, currentY+30, markersValueRectWidth+5, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+40, markersValueRectWidth+5, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+50, markersValueRectWidth+5, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+60, markersValueRectWidth+5, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+70, markersValueRectWidth+5, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+80, markersValueRectWidth+5, 40).fillAndStroke("gray", "white");

  //value text or value
  doc.fontSize(6).fillOpacity(1);
  let moodScore = 7;
  // let moodScore = body.req.??;
  doc.fillOpacity(1).rect(gradX1 + valueStep*moodScore, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let sleepScore = 8;
  // let sleepScore = body.req.??;
  doc.rect(gradX1 + valueStep*sleepScore, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');

  doc.fillColor("gray").text("7 hours", gradX1+2, currentY+33);
  doc.fillColor("gray").text("6 hours", gradX1+2, currentY+43);
  doc.fillColor("gray").text("7 trainigs", gradX1+2, currentY+53);
  doc.fillColor("gray").text("85 %", gradX1+2, currentY+63);
  doc.fillColor("gray").text("Strength, run, bike", gradX1+2, currentY+73);
    // TODO: define max length in input form
  doc.fillColor("gray").text(lorem.substring(0, 150), gradX1+2, currentY+83, {align: 'justify', width: 90});



  currentY = 360;
  // FITNESS PART
  let fitnessRectWidth = 90;
  let fitnessValueRectWidth = 70;

  doc.fontSize(10).fillColor("gray").text("Fitness", 225, currentY +5);
  doc.fontSize(7).fillColor("gray").text("Strength", 225, currentY +15);
  doc.rect(225, currentY+23, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+33, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+43, fitnessRectWidth, 10).fillAndStroke("gray", "white");

  doc.fillOpacity(0.2).rect(315, currentY+23, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+33, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+43, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");

  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Max pull-ups", 230, currentY+26);
  // TODO: retrieve select value
  // doc.fillColor("white").text("Max " + body.req.pushupType + " amount", 230, currentY+35);
  doc.fillColor("white").text("Max regular push-ups amount", 230, currentY+36);
  doc.fillColor("white").text("Max squats", 230, currentY+46);

  doc.fontSize(6).fillColor("gray").fillOpacity(1).text("2", 320, currentY+26);
  doc.text("15", 320, currentY+36);
  // TODDO: retrieve squats characteristics
  // doc.text("34 " + req.body.squatsType, 300, currentY+47);
  doc.text("34 kg" , 320, currentY+46);


  currentY = 415;
  doc.fontSize(7).fillColor("gray").text("Cardiovascular", 225, currentY);
  doc.rect(225, currentY+8, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+18, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+28, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+38, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+48, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+58, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+68, fitnessRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+78, fitnessRectWidth, 10).fillAndStroke("gray", "white");

  doc.fillOpacity(0.2).rect(315, currentY+8, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+18, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+28, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+38, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+48, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+58, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+68, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(315, currentY+78, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");

  // TODO: retrieve select value for all fields
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Fastest 1km run", 230, currentY+11);
  // doc.fillColor("white").text("Max " + body.req.pushupType + " amount", 230, currentY+35);
  doc.fillColor("white").text("Fastest 5km run", 230, currentY+21);
  doc.fillColor("white").text("Fastest 5km bike ride", 230, currentY+31);
  doc.fillColor("white").text("Longest distance (run)", 230, currentY+41);
  doc.fillColor("white").text("Longest distance (bike)", 230, currentY+51);
  doc.fillColor("white").text("Yearly mileage (run)", 230, currentY+61);
  doc.fillColor("white").text("Yearly mileage (bike)", 230, currentY+71);
  doc.fillColor("white").text("Average steps per day (yearly)", 230, currentY+81);

  doc.fontSize(6).fillColor("gray").fillOpacity(1).text("5:00 min", 320, currentY+11);
  doc.text("23:00 mins", 320, currentY+21);
  // TODDO: retrieve squats characteristics
  // doc.text("34 " + req.body.squatsType, 300, currentY+47);
  doc.text("15:00 min" , 320, currentY+31);
  doc.text("15 km", 320, currentY+41);
  doc.text("85 km" , 320, currentY+51);
  doc.text("395 km" , 320, currentY+61);
  doc.text("655 km", 320, currentY+71);
  doc.text("8700 steps" , 320, currentY+81);

  currentY = 505;
  let mobilityScoreWidth = 85;
  doc.fillOpacity(1).fontSize(7).fillColor("gray").text("Mobility", 225, currentY);

  doc.rect(225, currentY+8, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+18, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+28, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(225, currentY+38, fitnessValueRectWidth, 10).fillAndStroke("gray", "white");

  gradX1 = 300;
  gradX2 = 385;
  let grad2 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad2.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+10, mobilityScoreWidth, 5).fill(grad2);
  doc.rect(gradX1, currentY+20, mobilityScoreWidth, 5).fill(grad2);
  doc.rect(gradX1, currentY+30, mobilityScoreWidth, 5).fill(grad2);
  doc.rect(gradX1, currentY+40, mobilityScoreWidth, 5).fill(grad2);

    // TODO: retrieve select value for all fields
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Shoulders mobility", 230, currentY+11);
  doc.fillColor("white").text("Thoracic spine mobility", 230, currentY+21);
  doc.fillColor("white").text("Hips mobility", 230, currentY+31);
  doc.fillColor("white").text("Ankles mobility", 230, currentY+41);

  // TODO: mobility values

  let mobilityScore = 8;
  // let mobilityScore = body.req.mobilityRate0;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 8, valueSignWidth, valueSightHeight).fill('gray');
  // let mobilityScore = body.req.mobilityRate1;
  mobilityScore = 6;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 18, valueSignWidth, valueSightHeight).fill('gray');
  // let mobilityScore = body.req.mobilityRate2;
  mobilityScore = 9;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 28, valueSignWidth, valueSightHeight).fill('gray');
  // let mobilityScore = body.req.mobilityRate3;
  mobilityScore = 5;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 38, valueSignWidth, valueSightHeight).fill('gray');

  // SUMMARY PART
  currentY = 415;
  doc.fontSize(9).fillColor("gray").text("Summary", 405, currentY);
  doc.fontSize(6).fillColor("gray").text(lorem, 405, currentY+10, {align: 'justify', width: 160});
// HEALTH SECTION - END


  currentY = 560;
// MENTAL HEALTH SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight)
    .fillOpacity(0.4)
    .fill("gray");

  doc.fontSize(12).fillOpacity(1).fillColor('white').text("MENTAL HEALTH", 240, currentY + 10);


  currentY = 590;
  x0 = 50;
  let grayBoxWidth = 80;
  //metrics
  //gray boxed
  doc.rect(x0, currentY+10, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+20, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+30, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+40, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+50, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+60, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+70, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+80, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+90, grayBoxWidth, 10).fillAndStroke("gray", "white");

  //titles on gray background
  let titleStartX = 55;
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Resilience", titleStartX, currentY+13);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Positivity", titleStartX, currentY+23);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Compassion and empathy", titleStartX, currentY+33);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Happiness", titleStartX, currentY+43);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Social interactions", titleStartX, currentY+53);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Confidence", titleStartX, currentY+63);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Willpower and tenacity", titleStartX, currentY+73);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Anxiety", titleStartX, currentY+83);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Explosiveness", titleStartX, currentY+93);

  //value background
  gradX1 = 135;
  gradX2 = 235;
  let gradWidth = 100;
  let grad3 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad3.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+13, gradWidth, 5).fill(grad3);
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, gradWidth, 5).fill(grad3);
  doc.fillOpacity(0.3).rect(gradX1, currentY+33, gradWidth, 5).fill(grad3);
  doc.fillOpacity(0.3).rect(gradX1, currentY+43, gradWidth, 5).fill(grad3);
  doc.fillOpacity(0.3).rect(gradX1, currentY+53, gradWidth, 5).fill(grad3);
  doc.fillOpacity(0.3).rect(gradX1, currentY+63, gradWidth, 5).fill(grad3);
  doc.fillOpacity(0.3).rect(gradX1, currentY+73, gradWidth, 5).fill(grad3);
  let grad4 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad4.stop(0, 'green').stop(0.5, 'yellow').stop(1, 'red');
  doc.fillOpacity(0.3).rect(gradX1, currentY+83, gradWidth, 5).fill(grad4);
  doc.fillOpacity(0.3).rect(gradX1, currentY+93, gradWidth, 5).fill(grad4);

  //value text or value
  doc.fontSize(6).fillOpacity(1);
  let resilienceScore = 7;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*resilienceScore, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let positivityScore = 8;
  // let sleepScore = body.req.??;
  doc.rect(gradX1 + valueStep*positivityScore, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let compassionScore = 5;
  // let explosivnessScore = body.req.??;
  doc.rect(gradX1 + valueStep*compassionScore, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  let happinessScore = 9;
  // let explosivnessScore = body.req.??;
  doc.rect(gradX1 + valueStep*happinessScore, currentY + 41, valueSignWidth, valueSightHeight).fill('gray');
  let socialScore = 8;
  // let explosivnessScore = body.req.??;
  doc.rect(gradX1 + valueStep*socialScore, currentY + 51, valueSignWidth, valueSightHeight).fill('gray');
  let confidenceScore = 9;
  // let explosivnessScore = body.req.??;
  doc.rect(gradX1 + valueStep*confidenceScore, currentY + 61, valueSignWidth, valueSightHeight).fill('gray');
  let willpowerScore = 6;
  // let explosivnessScore = body.req.??;
  doc.rect(gradX1 + valueStep*willpowerScore, currentY + 71, valueSignWidth, valueSightHeight).fill('gray');
  let anxietyScore = 7;
// let explosivnessScore = body.req.??;
  doc.rect(gradX1 + valueStep*anxietyScore, currentY + 81, valueSignWidth, valueSightHeight).fill('gray');
  let explosivnessScore = 5;
  // let explosivnessScore = body.req.??;
  doc.rect(gradX1 + valueStep*explosivnessScore, currentY + 91, valueSignWidth, valueSightHeight).fill('gray');

  let textColumnX = 260;
  doc.fontSize(7).fillColor("gray").text(lorem+lorem.substring(250), textColumnX, currentY+10, {align: 'justify', width: 310});
  

/////////////////////////////////////////////////////////////////////
  doc.addPage();
  currentY = 10;
  // RELATIONSHIPS SECTION START
  // TODO: add time quality + time amount metrics (instead of 1 time metric)
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight)
    .fillOpacity(0.4)
    .fill("gray");

  doc.fontSize(12).fillOpacity(1).fillColor('white').text("RELATIONSHIPS", 240, currentY + 10);

  let column1X = 55;
  let column2X = 227;
  let column3X = 400;
  currentY = 45;

  //romantic
  doc.fontSize(9).fillColor("gray").text("Romantic", column1X, currentY);
  doc.rect(column1X, currentY+10, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column1X, currentY+20, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column1X, currentY+30, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Satisfaction", column1X +3, currentY+13);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (amount)", column1X +3, currentY+23);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (quality)", column1X +3, currentY+33);

  gradX1 = 130;
  gradX2 = 220;
  let grad5 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad5.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+13, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+33, markersValueRectWidth, 5).fill(grad5);
  doc.fontSize(6).fillOpacity(1);
  let romanticSatisfaction = 7;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*romanticSatisfaction, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let romanticTimeAmount = 8;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*romanticTimeAmount, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let romanticTimeQuality = 8;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*romanticTimeQuality, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  doc.fontSize(6).fillColor("gray").text(lorem.substring(0, 400), column1X, currentY+45, {align: 'justify', width: 165});


  //family
  doc.fontSize(9).fillColor("gray").text("Family", column2X, currentY);
  doc.rect(column2X, currentY+10, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column2X, currentY+20, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column2X, currentY+30, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Atmosphere", column2X +3, currentY+13);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (amount)", column2X +3, currentY+23);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (quality)", column2X +3, currentY+33);

  gradX1 = 302;
  gradX2 = 392;
  grad5 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad5.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+13, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+33, markersValueRectWidth, 5).fill(grad5);
  doc.fontSize(6).fillOpacity(1);
  let familyAtmosphere = 7;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*familyAtmosphere, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let familyTime = 8;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*familyTime, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let familyTimeQuality = 8;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*familyTimeQuality, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  doc.fontSize(6).fillColor("gray").text(lorem.substring(0, 400), column2X, currentY+45, {align: 'justify', width: 165});

  //friends
  doc.fontSize(9).fillColor("gray").text("Friends", column3X, currentY);
  doc.rect(column3X, currentY+10, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column3X, currentY+20, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column3X, currentY+30, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Friends amount", column3X +3, currentY+13);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (amount)", column3X +3, currentY+23);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (quality)", column3X +3, currentY+33);

  gradX1 = 475;
  gradX2 = 565;
  grad5 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad5.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+13, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+33, markersValueRectWidth, 5).fill(grad5);
  doc.fontSize(6).fillOpacity(1);
  let friendsAmount = 7;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*friendsAmount, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let friendsTime = 8;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*friendsTime, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let friendsTimeQuality = 8;
  // let resilienceScore = body.req.resilienceScore;
  doc.rect(gradX1 + valueStep*friendsTimeQuality, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  doc.fontSize(6).fillColor("gray").text(lorem.substring(0, 400), column3X, currentY+45, {align: 'justify', width: 165});



  /////////////////////////////////////////////////////////////////////
  currentY = 145;
  // BUSINESS AND CAREER SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("BUSINESS AND CAREER", 220, currentY + 10);




  currentY = 270;
  // FINANCE SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("FINANCE", 260, currentY + 10);

  currentY = 395;
  // HOBBIES SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("HOBBIES AND PERSONAL GROWTH", 190, currentY + 10);


  currentY = 525;
  // FUN SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("FUN AND RECREATION", 210, currentY + 10);


  doc.end();
});


module.exports = router;

// TODO add section - how I see myself next year