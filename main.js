var fs = require('fs');

var currentLine = "";
var reset = true;
var written = 0;
 
function readLines(input, func) {
  var remaining = '';
 
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });
 
  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
    done();
  });
}
 
function func(data) {
  data = data.replace(/^\s+|\s+$/g, '');
  data = data.replace(/^..:/, '').trim();
  if (data.trim().length != 0) {
    if (!reset) {
      currentLine += ",";
    } else {
      reset = false;
    }
    currentLine += data;
    written++;
  } else {
    if (written) {
      currentLine += "\n";
    }
    reset = true;
    written = 0;
  }
}

function done() {
  console.log('Line: ' + currentLine);
}
 
var input = fs.createReadStream('Book1.csv');
readLines(input, func);
