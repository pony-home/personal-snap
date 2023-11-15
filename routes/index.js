var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Annual snapshot' });
});

router.post('/', function(req, res, next) {

  let fileName = 'Annual snapshot-' + new Date().getFullYear()
  res.setHeader('Content-disposition', 'inline; filename='+ fileName +'.pdf');

  const doc = new PDFDocument();
  doc.pipe(res);

  let currentY = 10;
  let titleBoxHeight = 30;
  let titleBoxWidth = 700;

  doc.rect(0, 0, titleBoxWidth, 60).fillOpacity(0.4).fill("gray");
  doc.fillOpacity(0.8).fontSize(10).fillColor('white').text("Annual snapshot, " + new Date().getFullYear() ,500, 10, {oblique: true, lineBreak: false});

  currentY = 40;

  doc.fontSize(18).fillOpacity(1).fillColor('white').text(req.body.name.toUpperCase() + ", " + req.body.age + " YEARS", 210, currentY);

  currentY = 75;
  // TODO add image upload
  doc.fillOpacity(1).image("public/images/image.jpg", 110, currentY, {height: 160,  align: 'center', valign: 'center'});


// SECTION WITH WHEEL OF LIFE - START
// TODO: move to separate method
// TODO: change colors
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


  let sectionRate = req.body.healthRate;
  let radius = sectionRadius * sectionRate;
  let xVal2 = x0 + (angledSectionRadius * sectionRate);
  let yVal1 = y0 - radius;
  let yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("green")
    .stroke();

  sectionRate = req.body.mentalRate;
  let xVal1 = x0 + (sectionRadius * sectionRate);
  radius = sectionRadius * sectionRate;
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("orange")
    .stroke();

  sectionRate = req.body.relationsRate;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 + (sectionRadius * sectionRate);
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("red")
    .stroke();

  sectionRate = req.body.careerRate;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 + radius;
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("yellow")
    .stroke();

  sectionRate = req.body.fitnessRate;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 - radius;
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("violet")
    .stroke();

  sectionRate = req.body.financeRate;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 - (sectionRadius * sectionRate);
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("blue")
    .stroke();

  sectionRate = req.body.hobbiesRate;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 - (sectionRadius * sectionRate);
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("pink")
    .stroke();

  sectionRate = req.body.funRate;
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
  if (req.body.gender === '1') {
      doc.image("public/images/female.jpg", 85, currentY, {height: 215,  align: 'center', valign: 'center'});
        //body measurments
      doc.fontSize(7).fillOpacity(1);
      doc.fillColor("gray").text(req.body.height + " cm", 70, currentY+90);
      doc.fillColor("gray").text(req.body.neck + " cm", 147, currentY+38);
      doc.fillColor("gray").text(req.body.chest + " cm", 160, currentY+58);
      doc.fillColor("gray").text(req.body.arm + " cm", 160, currentY+67);
      doc.fillColor("gray").text(req.body.waist + " cm", 160, currentY+78);
      doc.fillColor("gray").text(req.body.hips + " cm", 160, currentY+96);
      doc.fillColor("gray").text(req.body.thigh + " cm", 158, currentY+116);
      doc.fillColor("gray").text(req.body.calf + " cm", 154, currentY+159);
  } else {  
      doc.image("public/images/male.jpg", 85, currentY, {height: 215,  align: 'center', valign: 'center'});
        //body measurments
      doc.fontSize(7).fillOpacity(1);
      doc.fillColor("gray").text(req.body.height + " cm", 70, currentY+90);
      doc.fillColor("gray").text(req.body.neck + " cm", 147, currentY+28);
      doc.fillColor("gray").text(req.body.chest + " cm", 170, currentY+57);
      doc.fillColor("gray").text(req.body.arm + " cm", 172, currentY+64);
      doc.fillColor("gray").text(req.body.waist + " cm", 173, currentY+83);
      doc.fillColor("gray").text(req.body.hips + " cm", 173, currentY+101);
      doc.fillColor("gray").text(req.body.thigh + " cm", 158, currentY+125);
      doc.fillColor("gray").text(req.body.calf + " cm", 160, currentY+161);
  }

  //body metrics
  currentY = 513;
  let titleWidth = 70;
  let scoreWidth = 85;
  let tableHeight = 10;
  x0 = 50;
  doc.rect(x0+10, currentY, titleWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(x0+10, currentY+10, titleWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(x0+10, currentY+20, titleWidth, tableHeight).fillAndStroke("gray", "white");
  doc.rect(x0+10, currentY+30, titleWidth, tableHeight).fillAndStroke("gray", "white");
  //titles
  doc.fontSize(6).fillOpacity(1);
  doc.fillColor("white").text("Weight", x0+13, currentY+3);
  doc.fillColor("white").text("BMI", x0+13, currentY+13);
  doc.fillColor("white").text("Face skin quality", x0+13, currentY+23);
  doc.fillColor("white").text("Body skin quality", x0+13, currentY+33);
  //value background
  let gradX1 = 130;
  let gradX2 = 215;
  let aesteticGrad = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  aesteticGrad.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.2).rect(gradX1, currentY, scoreWidth, tableHeight).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+10, scoreWidth, tableHeight).fillAndStroke("gray", "white");
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, scoreWidth, 5).fill(aesteticGrad);
  doc.rect(gradX1, currentY+33, scoreWidth, 5).fill(aesteticGrad);
  //values
  doc.fontSize(6).fillOpacity(1);
  doc.fillColor("gray").text(req.body.weight + " kg", gradX1 + 3, currentY+3);
  let valueStep = scoreWidth /10;
  let valueSignWidth = 1;
  let valueSightHeight = 9;

  let heightInMeters = req.body.height/100;
  let weight = req.body.weight;
  let bmiScore = weight/(heightInMeters*heightInMeters);
  let bmiColor = ((bmiScore > 18.5 && bmiScore < 25) ? 'green' : 'red');
  
  doc.fillColor("gray").text(bmiScore.toFixed(1), gradX1 + 3, currentY+13);
  doc.fillOpacity(0.4).circle(gradX1 + 20, currentY + 15, 2).fill(bmiColor);
  let faceSkinScore = req.body.faceskin;
  doc.fillOpacity(1).rect(gradX1 + valueStep*faceSkinScore, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let bodySkinScore = req.body.bodyskin;
  doc.rect(gradX1 + valueStep*bodySkinScore, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');

  valueStep = 8.5;


  // HEALTH MARKERS PART
  doc.strokeOpacity(0.6).fillOpacity(1);
  let markersRectWidth = 70;
  let markersValueRectWidth = 90;
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

  // TODO: add green,yellow, red background color, depending on the value (or dor after the value instead of background)
  doc.fontSize(6).fillOpacity(1);
  doc.fillColor("white").text("Blood pressure", 230, currentY+13);
  doc.fillColor("white").text("Blood cholesterol", 230, currentY+23);
  doc.fillColor("white").text("Blood glucose", 230, currentY+33);
  doc.fillColor("white").text("Body fat", 230, currentY+43);
  doc.fillColor("white").text("VO2max", 230, currentY+53);
  doc.fillColor("white").text("Resting heart rate", 230,currentY+63);

  doc.fillColor("gray").text(req.body.bloodpressure + " mmHg", 300, currentY+13);
  doc.text(req.body.cholesterol + " mmol/L", 300, currentY+23);
  doc.text(req.body.glucose + " mmol/L", 300, currentY+33);
  doc.text(req.body.bodyfat + "% (" + req.body.bodyfatmeasure + ")", 300, currentY+43);
  doc.text(req.body.vo2max + " ml/kg/min", 300, currentY+53);
  doc.text(req.body.restinghr + " bpm", 300, currentY+63);


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
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Healthy food percentage", 409, currentY+63);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Sport disciplines", 409, currentY+73);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Training routine", 409, currentY+83);

  //value background
  gradX1 = 480;
  gradX2 = 570;
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
  let moodScore = req.body.mood;
  doc.fillOpacity(1).rect(gradX1 + valueStep*moodScore, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let sleepScore = req.body.sleep0;
  doc.rect(gradX1 + valueStep*sleepScore, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');

  doc.fillColor("gray").text(req.body.sleep1 + " hours", gradX1+2, currentY+33);
  doc.fillColor("gray").text(req.body.training0 + " hours", gradX1+2, currentY+43);
  doc.fillColor("gray").text(req.body.training1, gradX1+2, currentY+53, {width: 96});
  doc.fillColor("gray").text(req.body.training4 + " %", gradX1+2, currentY+63);
  doc.fillColor("gray").text(req.body.training2, gradX1+2, currentY+73, {width: 95});
  doc.fillColor("gray").text(req.body.training3, gradX1+2, currentY+83, {align: 'justify', width: 90});


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
  doc.fillColor("white").text("Max " + req.body.pushuptype + " amount", 230, currentY+36);
  doc.fillColor("white").text("Max squats", 230, currentY+46);

  doc.fontSize(6).fillColor("gray").fillOpacity(1).text(req.body.pullup, 320, currentY+26);
  doc.text(req.body.pushup, 320, currentY+36);
  doc.text(req.body.squats + req.body.squatstype, 320, currentY+46);


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

  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Fastest "+ req.body.prdist1 + " " + req.body.prtype1, 230, currentY+11);
  doc.fillColor("white").text("Fastest "+ req.body.prdist2 + " " + req.body.prtype2, 230, currentY+21);
  doc.fillColor("white").text("Fastest "+ req.body.prdist3 + " " + req.body.prtype3, 230, currentY+31);
  doc.fillColor("white").text("Longest distance (" + req.body.longesttype1 +")", 230, currentY+41);
  doc.fillColor("white").text("Longest distance (" + req.body.longesttype2 +")", 230, currentY+51);
  doc.fillColor("white").text("Yearly mileage (" + req.body.yearlytype1 +")", 230, currentY+61);
  doc.fillColor("white").text("Yearly mileage (" + req.body.yearlytype2 +")", 230, currentY+71);
  doc.fillColor("white").text("Average steps per day (yearly)", 230, currentY+81);

  doc.fontSize(6).fillColor("gray").fillOpacity(1).text(req.body.cardio0, 320, currentY+11);
  doc.text(req.body.cardio1, 320, currentY+21);
  doc.text(req.body.cardio2 , 320, currentY+31);
  doc.text(req.body.cardio3 + " km", 320, currentY+41);
  doc.text(req.body.cardio4 + " km" , 320, currentY+51);
  doc.text(req.body.cardio5 + " km" , 320, currentY+61);
  doc.text(req.body.cardio6 + " km", 320, currentY+71);
  doc.text(req.body.cardio7 + " steps" , 320, currentY+81);

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

  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Shoulders mobility", 230, currentY+11);
  doc.fillColor("white").text("Thoracic spine mobility", 230, currentY+21);
  doc.fillColor("white").text("Hips mobility", 230, currentY+31);
  doc.fillColor("white").text("Ankles mobility", 230, currentY+41);

  let mobilityScore = req.body.mobilityRate0;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 8, valueSignWidth, valueSightHeight).fill('gray');
  mobilityScore = req.body.mobilityRate1;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 18, valueSignWidth, valueSightHeight).fill('gray');
  mobilityScore = req.body.mobilityRate2;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 28, valueSignWidth, valueSightHeight).fill('gray');
  mobilityScore = req.body.mobilityRate3;
  doc.rect(gradX1 + valueStep*mobilityScore, currentY + 38, valueSignWidth, valueSightHeight).fill('gray');

  // SUMMARY PART
  currentY = 415;
  doc.fontSize(9).fillColor("gray").text("Summary", 405, currentY);
  doc.font("public/fonts/Arial.ttf").fontSize(6).fillColor("gray").text(req.body.healthnote, 405, currentY+10, {align: 'justify', width: 160});
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
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Emotion controlling skills", titleStartX, currentY+83);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Anxiety", titleStartX, currentY+93);

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
  doc.fillOpacity(0.3).rect(gradX1, currentY+83, gradWidth, 5).fill(grad3);
  let grad4 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad4.stop(0, 'green').stop(0.5, 'yellow').stop(1, 'red');
  doc.fillOpacity(0.3).rect(gradX1, currentY+93, gradWidth, 5).fill(grad4);

  //value text or value
  doc.fontSize(6).fillOpacity(1);
  valueStep = gradWidth / 10;
  let resilienceScore = req.body.resilienceScore;
  doc.rect(gradX1 + valueStep*resilienceScore, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let positivityScore = req.body.positivityScore;
  doc.rect(gradX1 + valueStep*positivityScore, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let compassionScore = req.body.compassionScore;
  doc.rect(gradX1 + valueStep*compassionScore, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  let happinessScore = req.body.happinessScore;
  doc.rect(gradX1 + valueStep*happinessScore, currentY + 41, valueSignWidth, valueSightHeight).fill('gray');
  let socialScore = req.body.socialScore;
  doc.rect(gradX1 + valueStep*socialScore, currentY + 51, valueSignWidth, valueSightHeight).fill('gray');
  let confidenceScore = req.body.confidenceScore;
  doc.rect(gradX1 + valueStep*confidenceScore, currentY + 61, valueSignWidth, valueSightHeight).fill('gray');
  let willpowerScore = req.body.willpowerScore;
  doc.rect(gradX1 + valueStep*willpowerScore, currentY + 71, valueSignWidth, valueSightHeight).fill('gray');
  let explosivnessScore = req.body.explosivnessScore;
  doc.rect(gradX1 + valueStep*explosivnessScore, currentY + 81, valueSignWidth, valueSightHeight).fill('gray');
  let anxietyScore = req.body.anxietyScore;
  doc.rect(gradX1 + valueStep*anxietyScore, currentY + 91, valueSignWidth, valueSightHeight).fill('gray');

  let textColumnX = 260;
  doc.fontSize(7).fillColor("gray").text(req.body.mental11, textColumnX, currentY+10, {align: 'justify', width: 310});
  

/////////////////////////////////////////////////////////////////////
  doc.addPage();
  currentY = 5;
  titleBoxHeight = 25;
  // RELATIONSHIPS SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight)
    .fillOpacity(0.4)
    .fill("gray");

  doc.fontSize(12).fillOpacity(1).fillColor('white').text("RELATIONSHIPS", 240, currentY + 5);

  let column1X = 55;
  let column2X = 227;
  let column3X = 400;
  currentY = 35;

  //romantic
  doc.fontSize(9).fillColor("gray").text("Romantic", column1X, currentY);
  doc.rect(column1X, currentY+10, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column1X, currentY+20, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column1X, currentY+30, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Satisfaction", column1X +3, currentY+12);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (amount)", column1X +3, currentY+22);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (quality)", column1X +3, currentY+32);

  gradX1 = 130;
  gradX2 = 220;
  valueStep = markersValueRectWidth/10;
  let grad5 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad5.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+13, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+33, markersValueRectWidth, 5).fill(grad5);
  doc.fontSize(6).fillOpacity(1);
  let romanticSatisfaction = req.body.romantic1;
  doc.rect(gradX1 + valueStep*romanticSatisfaction, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let romanticTimeAmount = req.body.romantic2;
  doc.rect(gradX1 + valueStep*romanticTimeAmount, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let romanticTimeQuality = req.body.romantic4;
  doc.rect(gradX1 + valueStep*romanticTimeQuality, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  doc.fontSize(6).fillColor("gray").text(req.body.romantic3, column1X, currentY+45, {align: 'justify', width: 165});


  //family
  doc.fontSize(9).fillColor("gray").text("Family", column2X, currentY);
  doc.rect(column2X, currentY+10, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column2X, currentY+20, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column2X, currentY+30, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Atmosphere", column2X +3, currentY+12);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (amount)", column2X +3, currentY+22);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (quality)", column2X +3, currentY+32);

  gradX1 = 302;
  gradX2 = 392;
  grad5 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad5.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+13, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+33, markersValueRectWidth, 5).fill(grad5);
  doc.fontSize(6).fillOpacity(1);
  let familyAtmosphere = req.body.family1;
  doc.rect(gradX1 + valueStep*familyAtmosphere, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let familyTime = req.body.family2;
  doc.rect(gradX1 + valueStep*familyTime, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let familyTimeQuality = req.body.family4;
  doc.rect(gradX1 + valueStep*familyTimeQuality, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  doc.fontSize(6).fillColor("gray").text(req.body.family3, column2X, currentY+45, {align: 'justify', width: 165});

  //friends
  doc.fontSize(9).fillColor("gray").text("Friends", column3X, currentY);
  doc.rect(column3X, currentY+10, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column3X, currentY+20, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.rect(column3X, currentY+30, markersRectWidth, 10).fillAndStroke("gray", "white");
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Friendship satisfaction", column3X +3, currentY+12);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (amount)", column3X +3, currentY+22);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time together (quality)", column3X +3, currentY+32);

  gradX1 = 475;
  gradX2 = 565;
  grad5 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad5.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+13, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+23, markersValueRectWidth, 5).fill(grad5);
  doc.fillOpacity(0.3).rect(gradX1, currentY+33, markersValueRectWidth, 5).fill(grad5);
  doc.fontSize(6).fillOpacity(1);
  let friendsAmount = req.body.friends1;
  doc.rect(gradX1 + valueStep*friendsAmount, currentY + 11, valueSignWidth, valueSightHeight).fill('gray');
  let friendsTime = req.body.friends2;
  doc.rect(gradX1 + valueStep*friendsTime, currentY + 21, valueSignWidth, valueSightHeight).fill('gray');
  let friendsTimeQuality = req.body.friends4;
  doc.rect(gradX1 + valueStep*friendsTimeQuality, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');
  doc.fontSize(6).fillColor("gray").text(req.body.friends3, column3X, currentY+45, {align: 'justify', width: 165});



  //////////////////////////////////////////////////////////////////////////////////////////////////
  currentY = 142;
  // BUSINESS AND CAREER SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("BUSINESS AND CAREER", 220, currentY + 5);

  currentY = 167;
  //metrics
  //gray boxed
  grayBoxWidth = 100;
  doc.rect(x0, currentY+10, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+20, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+30, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+40, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+50, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+60, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+70, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+80, grayBoxWidth, 10).fillAndStroke("gray", "white");

  //titles on gray background
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Money earned by", titleStartX, currentY+12);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Career path", titleStartX, currentY+22);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Role in the team", titleStartX, currentY+32);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Amount of time for job (weekly)", titleStartX, currentY+42);

  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Amount of time spent (satisfaction)", titleStartX, currentY+52);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Job/career satisfaction", titleStartX, currentY+62);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Salary satisfaction", titleStartX, currentY+72);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Fit to life mission", titleStartX, currentY+82);

  //value background
  gradX1 = 150;
  gradX2 = 235;
  let valueRectWidth = 90;
  gradWidth = 90;
  valueStep = (gradWidth - 2) /10;
  doc.fillOpacity(0.2).rect(gradX1, currentY+10, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+20, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+30, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+40, valueRectWidth, 10).fillAndStroke("gray", "white");

  let grad6 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad6.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1+2, currentY+53, gradWidth-2, 5).fill(grad6);
  doc.fillOpacity(0.3).rect(gradX1+2, currentY+63, gradWidth-2, 5).fill(grad6);
  doc.fillOpacity(0.3).rect(gradX1+2, currentY+73, gradWidth-2, 5).fill(grad6);
  doc.fillOpacity(0.3).rect(gradX1+2, currentY+83, gradWidth-2, 5).fill(grad6);

  //value text or value
  doc.fontSize(6).fillOpacity(1);
  doc.fillColor("gray").text(req.body.career1, gradX1+2, currentY+13);
  doc.fillColor("gray").text(req.body.career2, gradX1+2, currentY+23);
  doc.fillColor("gray").text(req.body.career21, gradX1+2, currentY+33);
  doc.fillColor("gray").text(req.body.career6, gradX1+2, currentY+43);

  let timeSatisfaction = req.body.career7;
  doc.rect(gradX1 + valueStep*timeSatisfaction, currentY + 51, valueSignWidth, valueSightHeight).fill('gray');
  let jobSatisfaction = req.body.career3;
  doc.rect(gradX1 + valueStep*jobSatisfaction, currentY + 61, valueSignWidth, valueSightHeight).fill('gray');
  let salarySatisfaction = req.body.career4;
  doc.rect(gradX1 + valueStep*salarySatisfaction, currentY + 71, valueSignWidth, valueSightHeight).fill('gray');
  let missionSatisfaction = req.body.career5;
  doc.rect(gradX1 + valueStep*missionSatisfaction, currentY + 81, valueSignWidth, valueSightHeight).fill('gray');

  doc.fontSize(7).fillColor("gray").text(req.body.career8, textColumnX, currentY+5, {align: 'justify', width: 310});

  //////////////////////////////////////////////////////////////////////////////////////////////////

  currentY = 270;
  // FINANCE SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("FINANCE", 260, currentY + 5);
  // TODO: add micro font with description of Basic needs/other needs
  // TODO: add method for color in value fields (if less/more than 40 - then green/red)
  currentY = 300;
  //metrics
  //gray boxed
  grayBoxWidth = 100;
  doc.rect(x0, currentY+10, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+20, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+30, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+40, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+50, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+60, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+70, grayBoxWidth, 10).fillAndStroke("gray", "white");

  //titles on gray background
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Monthly income", titleStartX, currentY+12);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Monthly spendings", titleStartX, currentY+22);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Income satisfaction", titleStartX, currentY+32);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Debts to income ratio", titleStartX, currentY+42);

  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Percent of passive income", titleStartX, currentY+52);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Basic needs coverage", titleStartX, currentY+62);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Secondary needs and lusts", titleStartX, currentY+72);

  //value background
  valueRectWidth = 90;
  gradX1 = 150;
  gradX2 = 235;
  doc.fillOpacity(0.2).rect(gradX1, currentY+10, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+20, valueRectWidth, 10).fillAndStroke("gray", "white");

  let grad7 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad7.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');

  doc.fillOpacity(0.3).rect(gradX1, currentY+33, gradWidth, 5).fill(grad7);
  doc.fillOpacity(0.2).rect(gradX1, currentY+40, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+50, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+60, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+70, valueRectWidth, 10).fillAndStroke("gray", "white");

  //value text or value
  doc.fontSize(6).fillOpacity(1);
  doc.fillColor("gray").text(req.body.finance2, gradX1+2, currentY+13);
  doc.fillColor("gray").text(req.body.finance3, gradX1+2, currentY+23);

  valueStep = gradWidth /10;
  let incomeSatisfaction = req.body.finance1;
  doc.rect(gradX1 + valueStep*incomeSatisfaction, currentY + 31, valueSignWidth, valueSightHeight).fill('gray');

  valueStep = valueRectWidth/100;
  valueSightHeight = 8;
  let debtToIncome = req.body.finance4;
  doc.fillOpacity(0.3).rect(gradX1, currentY + 41, valueStep * debtToIncome, valueSightHeight).fill('orange');
  let passiveIncome = req.body.finance5;
  doc.fillOpacity(0.3).rect(gradX1, currentY + 51, valueStep * passiveIncome, valueSightHeight).fill('orange');
  let basicNeeds = req.body.finance6;
  doc.fillOpacity(0.3).rect(gradX1, currentY + 61, valueStep * basicNeeds, valueSightHeight).fill('orange');
  let secondaryNeeds = req.body.finance7;
  doc.fillOpacity(0.3).rect(gradX1, currentY + 71, valueStep * secondaryNeeds, valueSightHeight).fill('orange');

  doc.fillOpacity(1).fontSize(7).fillColor("gray")
  .text(req.body.finance8, textColumnX, currentY+2, {align: 'justify', width: 310});


  //////////////////////////////////////////////////////////////////////////////////////////////////
  currentY = 395;
  // HOBBIES SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("HOBBIES AND PERSONAL GROWTH", 190, currentY + 5);

  currentY = 415;
  //metrics
  //gray boxed
  grayBoxWidth = 100;
  doc.rect(x0, currentY+10, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+20, grayBoxWidth, 20).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+40, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+50, grayBoxWidth, 20).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+70, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+80, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+90, grayBoxWidth, 10).fillAndStroke("gray", "white");

  //titles on gray background
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Current goals", titleStartX, currentY+12);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Topics of interest/hobbies", titleStartX, currentY+22);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Sports", titleStartX, currentY+42);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Major achievments", titleStartX, currentY+52);

  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Major failures", titleStartX, currentY+72);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time for hobbies, per week", titleStartX, currentY+82);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Time for hobbies (satisfaction)", titleStartX, currentY+92);

 //value background
  valueRectWidth = 110;
  gradX1 = 150;
  gradX2 = 270;
  doc.fillOpacity(0.2).rect(gradX1, currentY+10, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+20, valueRectWidth, 20).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+40, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+50, valueRectWidth, 20).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+70, valueRectWidth, 10).fillAndStroke("gray", "white");
  doc.fillOpacity(0.2).rect(gradX1, currentY+80, valueRectWidth, 10).fillAndStroke("gray", "white");
  let grad8 = doc.linearGradient(gradX1, currentY, gradX2, currentY);
  grad8.stop(0, 'red').stop(0.5, 'yellow').stop(1, 'green');
  doc.fillOpacity(0.3).rect(gradX1, currentY+93, valueRectWidth, 5).fill(grad8);

   //value text or value
   doc.fontSize(6).fillOpacity(1);
   doc.fillColor("gray").text(req.body.personal2, gradX1+2, currentY+13);
   doc.fillColor("gray").text(req.body.personal3, gradX1+2, currentY+23, {width: 108});
   doc.fillColor("gray").text(req.body.personal8, gradX1+2, currentY+43);
   doc.fillColor("gray").text(req.body.personal6, gradX1+2, currentY+53, {width: 108});
   doc.fillColor("gray").text(req.body.personal7, gradX1+2, currentY+73);
   doc.fillColor("gray").text(req.body.personal5, gradX1+2, currentY+83);
 
   let timeHobbiesSatisfaction = req.body.personal4;
   valueStep = valueRectWidth/10;
   doc.rect(gradX1 + valueStep*timeHobbiesSatisfaction, currentY + 91, valueSignWidth, valueSightHeight).fill('gray');

   doc.fillOpacity(1).fontSize(7).fillColor("gray")
   .text(req.body.personal9, textColumnX+15, currentY+8, {align: 'justify', width: 295});


  //////////////////////////////////////////////////////////////////////////////////////////////////
  currentY = 525;
  // FUN SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("FUN AND RECREATION", 210, currentY + 5);

  currentY = 550;
  //gray boxed
  grayBoxWidth = 100;
  doc.rect(x0, currentY+10, grayBoxWidth, 10).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+20, grayBoxWidth, 20).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+40, grayBoxWidth, 20).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+60, grayBoxWidth, 20).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+80, grayBoxWidth, 25).fillAndStroke("gray", "white");
  doc.rect(x0, currentY+105, grayBoxWidth, 10).fillAndStroke("gray", "white");

  //titles on gray background
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Travel frequency", titleStartX, currentY+12);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("This year I saw/visited/experienced", titleStartX, currentY+22);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Amusements (rename)", titleStartX, currentY+42);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Next year I plan to see/try/visit", titleStartX, currentY+62);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("I spend free time:", titleStartX, currentY+82);
  doc.fontSize(6).fillColor("white").fillOpacity(1).text("Fun is scheduled in routine", titleStartX, currentY+107);

   //value background
   valueRectWidth = 120;
   gradX1 = 150;
   doc.fillOpacity(0.2).rect(gradX1, currentY+10, valueRectWidth, 10).fillAndStroke("gray", "white");
   doc.fillOpacity(0.2).rect(gradX1, currentY+20, valueRectWidth, 20).fillAndStroke("gray", "white");
   doc.fillOpacity(0.2).rect(gradX1, currentY+40, valueRectWidth, 20).fillAndStroke("gray", "white");
   doc.fillOpacity(0.2).rect(gradX1, currentY+60, valueRectWidth, 20).fillAndStroke("gray", "white");
   doc.fillOpacity(0.2).rect(gradX1, currentY+80, valueRectWidth, 25).fillAndStroke("gray", "white");
   doc.fillOpacity(0.2).rect(gradX1, currentY+105, valueRectWidth, 10).fillAndStroke("gray", "white");
 
   //value text or value
   doc.fontSize(6).fillOpacity(1);
   doc.fillColor("gray").text("~ " + req.body.fun2 + " times per year", gradX1+2, currentY+12);
   doc.fillColor("gray").text(req.body.fun3, gradX1+2, currentY+22, {align: 'justify', width: 116});
   doc.fillColor("gray").text(req.body.fun31, gradX1+2, currentY+42, {align: 'justify', width: 116});
   doc.fillColor("gray").text(req.body.fun4, gradX1+2, currentY+62, {align: 'justify', width: 116});
   doc.fillColor("gray").text(req.body.fun5, gradX1+2, currentY+82, {align: 'justify', width: 116});
   if (req.body.funincluded === 'Yes') {
      doc.fillOpacity(0.4).circle(gradX1 + 6, currentY + 110, 4).fill("green");
   } else {  
      doc.fillOpacity(0.4).circle(gradX1 + 6, currentY + 110, 4).fill("red");
   } 
   doc.fillOpacity(1).fontSize(7).fillColor("gray")
   .text(req.body.fun8, textColumnX+20, currentY+10, {align: 'justify', width: 290});


     //////////////////////////////////////////////////////////////////////////////////////////////////
  currentY = 670;
  // FUTURE ME SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight).fillOpacity(0.4).fill("gray");
  doc.fontSize(12).fillOpacity(1).fillColor('white').text("FUTURE " + req.body.name.toUpperCase() , 230, currentY + 5);

  doc.fillOpacity(1).fontSize(6).fillColor("gray")
  .text(req.body.futureyou, x0, currentY+35, {align: 'justify', width: 530});


  doc.end();
});


module.exports = router;