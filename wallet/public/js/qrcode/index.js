var $ = require('jQuery');
var QRCode = require('qrcode');

exports.makeQRCode = function (element, str) {
  QRCode.toCanvas($(element)[0], str, function (error) {
    if (error) {
      console.error(error)
    }
  });
};