var request = require('request');
var fs = require('fs');

function downloadFile() {
//    var progressBar = document.getElementById("progress"),
//      display = document.getElementById("display");
  //  progressBar.value = 0;
  //  display.innerText = '0%';
    var a = event.currentTarget;
    var td = a.parentElement;
    var tr = td.parentElement;

    var id = '';
    var fileSize='';
    fileSize = '' + tr.querySelector('td').getAttribute('id');
    console.log(fileSize);
      var progressBar;
      var display;
    progressBar= tr.querySelector('progress');
    display= tr.querySelector('span');
    progressBar.value = 0;
    display.innerText = '0%';
  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;

    var fileURL = "http://speedtest-ny.turnkeyinternet.net/"+fileSize;
  //var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
  //var fileURL="file:///C:/Users/CP/Desktop/electron/first_test/electron-quick-start/download/butterfly-wallpaper.jpeg";
  //var fileURL="/download/butterfly-wallpaper2.jpeg"
  var finalPath = "./resources/"+fileSize;
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
  //  showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    //alert("File succesfully downloaded");
  });
}

function showProgress(received, total) {
  var percentage = (received * 100) / total;
  console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");

}
function downloadFile2() {
    var progressBar = document.getElementById("progress"),
      display = document.getElementById("display");
    progressBar.value = 0;
    display.innerText = '0%';
    var a = event.currentTarget;
    var td = a.parentElement;
    var tr = td.parentElement;

    var id = '';
    var fileSize='';
    fileSize = '' + tr.querySelector('td').getAttribute('id');
    console.log(fileSize);
    progressBar= tr.querySelector('progress');
    display= tr.querySelector('span');

  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;

    var fileURL = "http://www.ovh.net/files/100Mb.dat";
  //var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
  //var fileURL="file:///C:/Users/CP/Desktop/electron/first_test/electron-quick-start/download/butterfly-wallpaper.jpeg";
  //var fileURL="/download/butterfly-wallpaper2.jpeg"
  var finalPath = "./resources/10Mb.dat";
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
  //  showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    //alert("File succesfully downloaded");
  });
}

function downloadFile3() {
//    var progressBar = document.getElementById("progress"),
//      display = document.getElementById("display");
//    progressBar.value = 0;
//    display.innerText = '0%';
    var a = event.currentTarget;
    var td = a.parentElement;
    var tr = td.parentElement;

    var id = '';
    var fileSize='';
    fileSize = '' + tr.querySelector('td').getAttribute('id');
    console.log(fileSize);
    progressBar= tr.querySelector('progress');
    display= tr.querySelector('span');
    progressBar.value = 0;
    display.innerText = '0%';
  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;

    var fileURL = "http://lg-tor.fdcservers.net/10GBtest.zip";
  //var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
  //var fileURL="file:///C:/Users/CP/Desktop/electron/first_test/electron-quick-start/download/butterfly-wallpaper.jpeg";
  //var fileURL="/download/butterfly-wallpaper2.jpeg"
  var finalPath = "./resources/10GBtest.zip";
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
  //  showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    //alert("File succesfully downloaded");
  });
}

function downloadFile4() {
//    var progressBar = document.getElementById("progress"),
  //    display = document.getElementById("display");
  //  progressBar.value = 0;
  //  display.innerText = '0%';
    var a = event.currentTarget;
    var td = a.parentElement;
    var tr = td.parentElement;

    var id = '';
    var fileSize='';
    fileSize = '' + tr.querySelector('td').getAttribute('id');
    console.log(fileSize);
    progressBar= tr.querySelector('progress');
    display= tr.querySelector('span');
    progressBar.value = 0;
    display.innerText = '0%';
  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;

    var fileURL = "http://nl.altushost.com/500MB.test";
  //var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
  //var fileURL="file:///C:/Users/CP/Desktop/electron/first_test/electron-quick-start/download/butterfly-wallpaper.jpeg";
  //var fileURL="/download/butterfly-wallpaper2.jpeg"
  var finalPath = "./resources/500MB.test";
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
  //  showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    //alert("File succesfully downloaded");
  });
}

function downloadFile5() {
    var progressBar = document.getElementById("progress"),
      display = document.getElementById("display");
    progressBar.value = 0;
    display.innerText = '0%';
    var a = event.currentTarget;
    var td = a.parentElement;
    var tr = td.parentElement;

    var id = '';
    var fileSize='';
    fileSize = '' + tr.querySelector('td').getAttribute('id');
    console.log(fileSize);
    progressBar= tr.querySelector('progress');
    display= tr.querySelector('span');

  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;

    var fileURL = "http://nl.altushost.com/500MB.test";
  //var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
  //var fileURL="file:///C:/Users/CP/Desktop/electron/first_test/electron-quick-start/download/butterfly-wallpaper.jpeg";
  //var fileURL="/download/butterfly-wallpaper2.jpeg"
  var finalPath = "./download/500MB.test";
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
  //  showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    //alert("File succesfully downloaded");
  });
}




function insultMember() {
  window.location.href = "finishedJoin.html";
};
function loginConfirm() {
  var id = $('#id').val();
  var pw = $('#password').val();
  console.log(id);
  console.log(pw);
  window.location.href = "distribute_download.html?id=" + id;
}
function join() {
    location.href = "sign_up.html";
}
