/**
 * YUVA 2026 - Registration backend
 * Deploy this as a Web App (see setup guide). It:
 *  1. Receives JSON POST data from the HTML form
 *  2. Decodes the uploaded payment screenshot and saves it to a Drive folder
 *  3. Appends a row with all fields + a link to the image into this Sheet
 */

var FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE'; // see setup guide Step 2
var SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Registration Type', 'Team Name', 'Team Category',
        'Institution/Village', 'Captain Name', 'Participant Name', 'Age',
        'Mobile', 'WhatsApp', 'Events', 'Player Names / Player 1', 'Player 2',
        'Payment Method', 'UTR / Transaction ID', 'Payment Screenshot'
      ]);
    }

    var imageUrl = '';
    if (data.image && data.image.base64) {
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var bytes = Utilities.base64Decode(data.image.base64);
      var blob = Utilities.newBlob(bytes, data.image.mimeType, data.image.fileName);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      imageUrl = file.getUrl();
    }

    sheet.appendRow([
      new Date(),
      data.registrationType || '',
      data.teamName || '',
      data.teamCategory || '',
      data.institution || '',
      data.captainName || '',
      data.participantName || '',
      data.age || '',
      data.mobile || '',
      data.whatsapp || '',
      (data.events || []).join(', '),
      data.playerNames || data.player1 || '',
      data.player2 || '',
      data.paymentMethod || '',
      data.utr || '',
      imageUrl
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success', imageUrl: imageUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you open the Web App URL in a browser to confirm it's alive
function doGet(e) {
  return ContentService.createTextOutput('YUVA 2026 registration endpoint is running.');
}
