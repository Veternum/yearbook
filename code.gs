// DO GET FUNCTION
// function untuk mengirim file html ke orang yang membuka link

function doGet() {
  var html = HtmlService.createTemplateFromFile('Index').evaluate()
  .addMetaTag("viewport", "width=device-width, initial-scale=1")
  .setTitle("Palancas")
  .setFaviconUrl("https://sanurbsd-tng.sch.id/assets/img/logo_2.png"); // icon webnya serviam, nanti bisa diganti

  return html;
}

// SET CSS
// function utk masukin css ke index.html

function includeStyleFile() {
  return HtmlService.createHtmlOutputFromFile("Index_css").getContent();
}

// CREATE GOOGLE SLIDE LINK (LEON)
// function untuk membuat google slide tersendiri masing-masing untuk setiap siswa
// link spreadsheet prototype: https://docs.google.com/spreadsheets/d/1awlbVXy1XY2qyQGAYO3Qqew9vYhPyOEcqxoEwuAm5SM/edit#gid=0

// SEND GOOGLE SLIDE VIA EMAIL (VANESSA)
// function untuk mengirim link google slide yang sudah dibuat diatas kepada setiap siswa. alamat email diambil dari google spreadsheet
// link spreadsheet prototype: https://docs.google.com/spreadsheets/d/1awlbVXy1XY2qyQGAYO3Qqew9vYhPyOEcqxoEwuAm5SM/edit#gid=0

// RENDER STUDENTS
// ambil data dari google spreadsheet, trud jadiin html
var studArr = [];
function renderStudents(studentClass) {
  switch (studentClass) {
    case "MIPA1":
      url = 'https://docs.google.com/spreadsheets/d/1AZ6V2oGYF6h5Kv1wt7f_WpslvNZbSN-A09_aaIRHsbU/edit#gid=0';
      break;
    case "MIPA2":
      url = "https://docs.google.com/spreadsheets/d/1awlbVXy1XY2qyQGAYO3Qqew9vYhPyOEcqxoEwuAm5SM/edit#gid=0";
      break;
    case "MIPA3":
      url = "https://docs.google.com/spreadsheets/d/1AZ6V2oGYF6h5Kv1wt7f_WpslvNZbSN-A09_aaIRHsbU/edit#gid=1894494332";
      break;
    case "IPS1":
      url = "https://docs.google.com/spreadsheets/d/1AZ6V2oGYF6h5Kv1wt7f_WpslvNZbSN-A09_aaIRHsbU/edit#gid=1732109899";
      break;
    case "IPS2":
      url = "https://docs.google.com/spreadsheets/d/1AZ6V2oGYF6h5Kv1wt7f_WpslvNZbSN-A09_aaIRHsbU/edit#gid=1884522317";
      break;
    case "IPB":
      url = "https://docs.google.com/spreadsheets/d/1AZ6V2oGYF6h5Kv1wt7f_WpslvNZbSN-A09_aaIRHsbU/edit#gid=1349488745";
      break;
    case "missingPerson":
      url = "https://docs.google.com/spreadsheets/d/1AZ6V2oGYF6h5Kv1wt7f_WpslvNZbSN-A09_aaIRHsbU/edit#gid=1279992471";
  }

  let Sheet = SpreadsheetApp.openByUrl(url);
  let RowCount = Sheet.getLastRow();
  for (i=2; i<=RowCount; i++) {
    const x = i.toString();
      var itemObj = {
        id: 0,
        name: "",
        url: ""
      }
    itemObj.id = Sheet.getRange('A'+x).getValues();
    itemObj.name = Sheet.getRange('B'+x).getValues();
    itemObj.url = Sheet.getRange('E'+x).getValues();
    studArr.push(itemObj);

    };
    return studArr;
}


// CREATE NEW SLIDE/PAGE (LEON)
// function untuk membuat slide baru dalam google slide setiap kali terdapat pengirim yang menuliskan palancas ke orang tersebut
// link google slide prototype: https://docs.google.com/presentation/d/1pL51UmZYlNuQd8wZlMWC2GuOES-6n2EbHgAUrOJ3sNI/edit#slide=id.p

function appendSlide(message, sender) {
  let Url = 'https://docs.google.com/presentation/d/1pL51UmZYlNuQd8wZlMWC2GuOES-6n2EbHgAUrOJ3sNI/edit#slide=id.p';
  let Presentation = SlidesApp.openByUrl(Url);

  let Message = message;
  let Sender = sender;
  let Image = DriveApp.getFileById('1vdcA9OztAb0kTuuNOei8q8LWd146CXY8');
  let HasImage = false;
  let TextFont = 'Pacifico';
  let TextSize = 30;
  let TextColor = '#1d661b';


  if (HasImage == true){
    Presentation.appendSlide(); 
    const Slide = Presentation.getSlides()[Presentation.getSlides().length - 1];

    Slide.getImages()[0].replace(Image, true).setTitle('Img');

    Slide.insertTextBox(Message,90, 77, 300, 250).setTitle('Msg');
    for (i=0; i<Slide.getPageElements().length ; i++){
      
      //Logger.log(Slide.getPageElements()[i].asShape().getAutofit().enableAutofit().getAutofitType());
      
      
      if (Slide.getPageElements()[i].getTitle() == 'Msg'){
        Slide.getPageElements()[i].asShape().getText().getTextStyle().setFontSize(TextSize);
        Slide.getPageElements()[i].asShape().getText().appendParagraph('-' + Sender).getRange().getTextStyle().setFontSize(15);
        Slide.getPageElements()[i].asShape().getText().getTextStyle().setFontFamily(TextFont).setForegroundColor(TextColor);
        Slide.getPageElements()[i].asShape().getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
        //Logger.log(Slide.getPageElements()[i].asShape().getAutofit().getAutofitType());
      }
    }

  } else {
    Presentation.appendSlide(); 
    const Slide = Presentation.getSlides()[Presentation.getSlides().length - 1];
  
    Slide.insertTextBox(Message,209, 77, 300, 250).setTitle('Msg');
    for (i=0; i<Slide.getPageElements().length ; i++){
      if (Slide.getPageElements()[i].getTitle() == 'Msg'){
        Slide.getPageElements()[i].asShape().getText().getTextStyle().setFontSize(TextSize);
        Slide.getPageElements()[i].asShape().getText().appendParagraph('-' + Sender).getRange().getTextStyle().setFontSize(15);
        Slide.getPageElements()[i].asShape().getText().getTextStyle().setFontFamily(TextFont).setForegroundColor(TextColor);
        Slide.getPageElements()[i].asShape().getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
      }
    }    
  }
}


// UPLOAD IMAGE TO DRIVE --> nanti digabung ke function diatas
function saveFile(e) {
  var blob = Utilities.newBlob(e.bytes, e.mimeType, e.filename);
  let ImageDatabase = DriveApp.getFolderById("1gWUZIXB2QPPYJrgli1Ay-1hQUt-gPamd");
  let UploadedImage = ImageDatabase.createFile(blob); // nanti dipake bwt slide

  // nanti apus aja, ini bwt tes
  let Destination = DriveApp.getFolderById("1tPWJGSWX_TE9r4j00fsXD4tRXTqzaQy8");
  Destination.createFile(UploadedImage)
}
