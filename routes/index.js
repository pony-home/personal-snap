var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');

var doc = new PDFDocument();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Annual snapshot' });
});

router.post('/', function(req, res, next) {
  doc.pipe(res);

  let currentY = 10;
  let titleBoxHeight = 30;
  let titleBoxWidth = 700;

  doc.fontSize(10).text("Annual snapshot",450, 10);

  currentY = 40;

  // TODO text to upper case, change font, add background
  // doc.fontSize(20).fillColor('black').text(req.body.name + "," + req.body.age + " years", 180, currentY);
  doc.fontSize(20).fillColor('black').text("KRISTINA, 31 years", 180, currentY).fillOpacity(1);

  currentY = 75;
  doc.image("public/images/image.jpeg", 50, currentY, {height: 170,  align: 'center', valign: 'center'});


// SECTION WITH WHEEL OF LIFE - START
// TODO move to separate method
// TODO change colors
// TODO add titles for each section
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
  sectionRate = 7;
  let xVal1 = x0 + (sectionRadius * sectionRate);
  radius = sectionRadius * sectionRate;
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("orange")
    .stroke();

  // sectionRate = req.body.relationshipsRate;
  sectionRate = 6;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 + (sectionRadius * sectionRate);
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("red")
    .stroke();

  // sectionRate = req.body.careerRate;
  sectionRate = 3;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 + radius;
  xVal2 = x0 + (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("yellow")
    .stroke();

  // sectionRate = req.body.fitnessRate;
  sectionRate = 9;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 - radius;
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("violet")
    .stroke();

// sectionRate = req.body.financeRate;
sectionRate = 5;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 - (sectionRadius * sectionRate);
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 - (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("blue")
    .stroke();

// sectionRate = req.body.hobbiesRate;
sectionRate = 10;
  radius = sectionRadius * sectionRate;
  xVal1 = x0 - (sectionRadius * sectionRate);
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " H " + xVal1 + " A " + radius + " " + radius + " 0 0 0 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("pink")
    .stroke();

// sectionRate = req.body.funRate;
sectionRate = 2;
  radius = sectionRadius * sectionRate;
  yVal1 = y0 + radius;
  xVal2 = x0 - (angledSectionRadius * sectionRate);
  yVal2 = y0 + (angledSectionRadius * sectionRate);
  doc.path("M " + x0 + "," + y0+ " V " + yVal1 + " A " + radius + " " + radius + " 0 0 1 " + xVal2 + " " + yVal2 + " Z")
    .fillOpacity(0.3)
    .fill("gold")
    .stroke();    

  // x=x0+r⋅cos δ
  // y=y0+r⋅sin δ
// SECTION WITH WHEEL OF LIFE - END

  
  doc.moveDown();
  currentY = 250;
  // todo change to doc.width
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight)
    .fillOpacity(0.6)
    .fill("gray");

  doc.fontSize(12).fillColor('black').text("PHYSICAL HEALTH AND FITNESS", 200, currentY + 10); 

  currentY = 290;
  // AESTHETIC PART
  doc.rect(50, currentY, 170, 250)
    .stroke();

    // TODO add if for male/female
  doc.image("public/images/female.jpg", 50, currentY, {height: 240,  align: 'center', valign: 'center'})


  // HEALTH MARKERS PART
  doc.rect(240, currentY, 160, 120)
    .stroke();

  // FUNCTIONAL PART
  doc.rect(420, currentY, 160, 120)
    .stroke();

  currentY = 420;
  // REST PART
  doc.rect(240, currentY, 160, 120)
    .stroke();

  // FREE TEXT PART
  doc.rect(420, currentY, 160, 120)
    .stroke();




  currentY = 550;
// MENTAL HEALTH SECTION START
  doc.rect(0, currentY, titleBoxWidth, titleBoxHeight)
  .fillOpacity(0.6)
  .fill("gray");

  doc.fillColor('black').text("MENTAL HEALTH", 260, currentY + 10); 


  doc.end();
});


module.exports = router;
