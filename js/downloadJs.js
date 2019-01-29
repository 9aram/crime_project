var request = require('request');
var fs = require('fs');

function downloadFile() {
  var progressBar = document.getElementById("progress"),
    loadBtn = document.getElementById("button"),
    display = document.getElementById("display");
    progressBar.value = 0;
    display.innerText = '0%';


    var a = event.currentTarget;
    var td = a.parentElement;
    var tr = td.parentElement;
    var id = '';
    id = '' + tr.querySelector('td li a').getAttribute('href');
    progressBar= tr.querySelector('progress');
    display= tr.querySelector('span');

  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;
    var fileURL = "http://speedtest-ny.turnkeyinternet.net/10000mb.bin";
  //var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
  //var fileURL="file:///C:/Users/CP/Desktop/electron/first_test/electron-quick-start/download/butterfly-wallpaper.jpeg";
  //var fileURL="/download/butterfly-wallpaper2.jpeg"
  var finalPath = "./download/10000mb.bin";
  var req = request({
    method: 'GET',
    uri: fileURL
  });

  var out = fs.createWriteStream(finalPath);
  req.pipe(out);

  req.on('response', function(data) {
    // Change the total bytes value to get progress later.
    total_bytes = parseInt(data.headers['content-length']);
    progressBar.max = total_bytes;
  });

  req.on('data', function(chunk) {
    // Update the received bytes
    progressBar.max = total_bytes;
    received_bytes += chunk.length;
    progressBar.value = received_bytes;
    display.innerText = Math.floor((progressBar.value / progressBar.max) * 100) + '%'
    showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    alert("File succesfully downloaded");
  });
}

function showProgress(received, total) {
  var percentage = (received * 100) / total;
  console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");

}



function downloadClick(event, val) {
  var a = event.currentTarget;
  var td = a.parentElement;
  var tr = td.parentElement;
  var id = '';
  id = '' + tr.querySelector('td li a').getAttribute('href');
  console.log(id);
  $.ajax({
    url: 'http://localhost:8090/curriculum1.4/login_controller.jspx?cmd=downloadFile&bFile=' + id,
    type: 'get',
    //dataType: 'json',
    xhrFields: {
      responseType: 'blob'
    },
    success: function(resp) {
      console.log("success");
      console.log(resp);
      var a = document.createElement('a');
      // 		//	var url = window.URL.createObjectURL(resp);
      a.href = 'http://localhost:8090/curriculum1.4/login_controller.jspx?cmd=downloadFile&bFile=' + id;
      a.download = id;
      a.click();
      //	window.URL.revokeObjectURL(url);
      //  window.open("C:\Users\CP\Desktop\테스트\core5.0.14\out\artifacts\unnamed\curriculum1.4\filedir\bullet01.png");
    },
    error: function(xhr, status, error) {
      alert("err")
    }
  });
}
