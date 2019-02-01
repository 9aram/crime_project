var request = require('request');
var fs = require('fs');
const stream = require('stream');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
const events = require('events');
var EventEmitter = new events.EventEmitter();

db.serialize(function() {

  db.run("CREATE TABLE if not exists user (id STRING, pw STRING)");
//  var stmt = db.prepare("INSERT INTO user VALUES (?,?)");

  ///    stmt.run( "처음ID", "처음PW");
  ///    stmt.run( "333", "33PW");

///  stmt.finalize();

 db.each("SELECT id, pw FROM user", function(err, row) {
     console.log(row.id + ": " + row.pw);
 });
 db.each("SELECT id, pw FROM user where id='qwe'", function(err, row) {
   console.log("db에 저장된 id는"+row.id);
   });
});

db.close();

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
    var test='';
    test = '' + tr.querySelector('.test > a').getAttribute('class');

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

  EventEmitter.on("stop2",function(){
        req.pause();
    })
    EventEmitter.on("resume2",function(){
          req.resume();
      })
      EventEmitter.on("stop4",function(){
            req.pause();
        })
        EventEmitter.on("resume4",function(){
              req.resume();
          })

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
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000)/10 + '%'
//   showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    var subW;
  subW=  test.substring(9,18).trim();
  $("."+subW).text('다운로드끝');
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
    var test='';
    test = '' + tr.querySelector('.test > a').getAttribute('class');

    fileSize = '' + tr.querySelector('td').getAttribute('id');

    console.log(fileSize);
    console.log(test);
    progressBar= tr.querySelector('progress');
    display= tr.querySelector('span');

  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;
  var saved_data=0;

    var fileURL = "http://www.ovh.net/files/100Mb.dat";
  //var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
  //var fileURL="file:///C:/Users/CP/Desktop/electron/first_test/electron-quick-start/download/butterfly-wallpaper.jpeg";
  //var fileURL="/download/butterfly-wallpaper2.jpeg"
  var finalPath = "./download/10Mb.dat";
  var req = request({
    method: 'GET',
    uri: fileURL
  });

  var out = fs.createWriteStream(finalPath);
  req.pipe(out);

  EventEmitter.on("stop1",function(){
        req.pause();
    })
    EventEmitter.on("resume1",function(){
          req.resume();
      })

  req.on('response', function(data) {
    // Change the total bytes value to get progress later.
    total_bytes = parseInt(data.headers['content-length']);
    progressBar.max = total_bytes;
  });

  req.on('data', function(chunk) {
    // Update the received bytes
    progressBar.max = total_bytes;
    received_bytes += chunk.length;
    saved_data+=chunk.length;
//    console.log('Received'+chunk.length+' bytes of data.');
    progressBar.value = received_bytes;
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000)/10 + '%'
  });
  req.on('end', function() {

    var subW;
  subW=  test.substring(9,18).trim();
  $("."+subW).text('다운로드끝');
  });
}
function stop(n) {
  console.log(n);
  switch ( n ) {
      case 1:
        EventEmitter.emit("stop1");
        break;
      case 2:
        EventEmitter.emit("stop2");
        break;
      case 3:
        EventEmitter.emit("stop3");
        break;
        case 4:
          EventEmitter.emit("stop4");
          break;
          case 5:
            EventEmitter.emit("stop5");
            break;
  }
}
function resume(n) {
  console.log(n);
  switch ( n ) {
      case 1:
        EventEmitter.emit("resume1");
        break;
      case 2:
        EventEmitter.emit("resume2");
        break;
      case 3:
        EventEmitter.emit("resume3");
        break;
        case 4:
          EventEmitter.emit("resume4");
          break;
          case 5:
            EventEmitter.emit("resume5");
            break;
  }
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
    var test='';
    test = '' + tr.querySelector('.test > a').getAttribute('class');

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
  EventEmitter.on("stop5",function(){
        req.pause();
    })
    EventEmitter.on("resume5",function(){
          req.resume();
      })

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
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000)/10 + '%'
  //  showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    var subW;
  subW=  test.substring(9,18).trim();
  $("."+subW).text('다운로드끝');
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
    var test='';
    test = '' + tr.querySelector('.test > a').getAttribute('class');

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
  EventEmitter.on("stop3",function(){
        req.pause();
    })
    EventEmitter.on("resume3",function(){
          req.resume();
      })

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
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000)/10 + '%'
  //  showProgress(received_bytes, total_bytes);
  });

  req.on('end', function() {
    var subW;
  subW=  test.substring(9,18).trim();
  $("."+subW).text('다운로드끝');
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
    var test='';
    test = '' + tr.querySelector('.test > a').getAttribute('class');

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
    var subW;
  subW=  test.substring(9,18).trim();
  $("."+subW).text('다운로드끝');
  });
}




function insultMember2() {
  var id = $('#id').val();
  var pw = $('#password').val();
  console.log("id는"+id);
  db = new sqlite3.Database('mydb.db');
  db.run("INSERT into user(id,pw) VALUES(?,?)",[id,pw], function(err, row) {
    });
  db.close();

  window.location.href = "finishedJoin.html";
};

function loginConfirm2() {
  var id = $('#id').val();
  var s_id="'"+id+"'";
  var pw = $('#password').val();
  var pw=''+pw;
  var d_id='';
  var d_pw='';
  console.log(id);
  console.log(pw);
  if(id==''){
    alert("id를 입력하지 않으셨습니다.")
  } else if(pw==''){
      alert("pw를 입력하지 않으셨습니다.")
    }
if(id){

  db = new sqlite3.Database('mydb.db');
  db.each("SELECT id, pw FROM user where id="+s_id, function(err, row) {
    console.log("db에 저장된 id는"+row.id);
    console.log("db에 저장된 pw는"+row.pw);
    d_id=row.id;
    d_pw=row.pw;
      console.log("변수에 저장된 pw는"+d_pw);
    if((id==row.id)&&(pw==row.pw)) { window.location.href = "distribute_download.html?id=" + id; }
    ale();
    //else if(row.id=='undefined'){
    //   alert("비밀번호를 잘못 입력하셨습니다"); //
    // }
    });
  db.close();
}


function ale(){

  console.log("바깥에 pw는"+d_pw);
  console.log("바깥에 id는"+d_id);
  if(d_pw!=pw){
  alert("비밀번호를 잘못 입력하셨습니다");
  }
}


}
function join() {
    location.href = "sign_up.html";
}
