var request = require('request');
var fs = require('fs'); //파일을 읽고 쓰기 위해서 fs모듈을 가져옴
var req, progressBar, display, finalPath, fileURL;
var received_bytes = 0,
  total_bytes = 0;
var subW;
  var test;
  var pauseName;
  var pausestop;
var oneClick = true;
$(".checkBtn").click(function() {
  if( oneClick = true){
    $(this).text('다운로드중');
  }

});
function download_file(event, filename) {
  if(oneClick){
    oneClick=false;
 var show = event.currentTarget;
 event.currentTarget.innerHTML="다운로드 중";
 console.log(show);
  if(filename=='10Mb.dat'){
 fileURL = "http://www.ovh.net/files/10Mb.dat";
  finalPath = "./download/10Mb.dat";
  console.log(filename);
  }
  else if(filename=='100mb.bin'){
    fileURL = "http://speedtest-ny.turnkeyinternet.net/100mb.bin";
    finalPath = "./download/100mb.bin";  console.log(filename);
  }
  else if(filename=='500MB.test'){
    fileURL = "http://nl.altushost.com/500MB.test";
    finalPath = "./download/500MB.test";  console.log(filename);
  }
  else if(filename=='1000mb.bin'){
    fileURL = "http://speedtest.tele2.net/1GB.zip" ;
    finalPath = "./download/1GB.zip";  console.log(filename);
  }
  else if(filename=='10GBtest.zip'){
    fileURL = "http://lg-tor.fdcservers.net/10GBtest.zip";
    finalPath = "./resources/10GBtest.zip";  console.log(filename);
  }

  var a = event.currentTarget;
  var td = a.parentElement;
  var tr = td.parentElement;
  var id = '';

  //다운로드버튼의 글자를 바꾸기 위한 클래스 이름 저장
  test = '' + tr.querySelector('.test > a').getAttribute('class');
  console.log(test);
  pauseName= '' + tr.querySelector('.pauseName > a').getAttribute('id');
  console.log(pauseName);
  //프로그래스바 초기 설정
  progressBar = tr.querySelector('progress');
  display = tr.querySelector('span');
  progressBar.value = 0;
  display.innerText = '0%';
  received_bytes=0;
  // Save variable to know progress
  //fileURL = "http://speedtest-ny.turnkeyinternet.net/100mb.bin";
  // fileURL = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73751/world.topo.bathy.200407.3x21600x10800.jpg";
  // finalPath = "./download/world.topo.bathy.200407.3x21600x10800.jpg";
  // console.log(filename);
  //  fileURL = "http://speedtest-ny.turnkeyinternet.net/"+filename;
  //  finalPath = "./download/"+filename;
  //fileURL = "http://speedcheck.cdn.on.net/5000meg.test";
  //finalPath = "./download/5000meg.test";
  req = request({
    method: 'GET',
    uri: fileURL,
  });
  var out = fs.createWriteStream(finalPath);
  req.pipe(out); //파일을 읽어서 out에 쓴다. 입력을 출력으로 리다이렉트 할 수 있게 해준다. stream 간의 read 와 write event를 여결 해준다. 여러개 연결가능
  req.on('response', function(data) {
    // Change the total bytes value to get progress later.
    console.log('실행 response data');
    total_bytes = parseInt(data.headers['content-length']);
    console.log('  전체 크기는?' + total_bytes);
    progressBar.max = total_bytes;
  });

  //데이터들이 들어올때마다 실행됨
  req.on('data', function(chunk) {

    received_bytes += chunk.length;
    progressBar.value = received_bytes;
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%';
    //  console.log("받은 데이터는"+received_bytes);
  });
  //에러 발생시
  req.on('error', function(err) {
    console.log(err);
  });
  //끝났을때 '다운로드끝'로 다운로드 버튼 글자 바꿈
  req.on('end', function() {
    subW = test.substring(9, 18).trim();
    //pausestop = pauseName.substring(9, 18).trim();
    console.log(subW);
    console.log(pauseName);
    $("." + subW).text('다운로드끝');
     oneClick = true;
     document.getElementById(subW).onclick = null;
     $('#'+pauseName).unbind('click');
  //   req.unpipe(out);
     received_bytes=0;

  });
  //에러발생시
  process.on('uncaughtException', function(err) {
    console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!');
    console.log(err);
  });
}
else{alert('다운로드중인 파일이 있습니다');}
}
//멈추는 함수
function pause22() {
  console.log('pause function called');
  req.pause();
}

//다시 시작하는 함수
function restart_test() {
  // fileURL = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73751/world.topo.bathy.200407.3x21600x10800.jpg";
  // finalPath = "./download/world.topo.bathy.200407.3x21600x10800.jpg";

  req = request({
    method: 'GET',
    uri: fileURL,
    headers:{
      'Range': 'bytes='+received_bytes+'-'}
  });
  var out = fs.createWriteStream(finalPath);
  req.pipe(out); //파일을 읽어서 out에 쓴다//데이터들이 들어올때마다 실행됨
  req.on('data', function(chunk) {
    received_bytes += chunk.length;
    progressBar.value = received_bytes;
  // console.log(received_bytes);
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%';
    // if(display.innerText=='100%'){
    //   req.abort();
    // }
  });
  req.on('end', function() {
    subW = test.substring(9, 18).trim();
    $("." + subW).text('다운로드끝');
    endV = 2;
     oneClick = true;
     document.getElementById(subW).onclick = null;
        $('#'+pauseName).unbind('click');
        received_bytes=0;
  });
}

$('#btn-pause').click(function(e) {
  console.log('pause function called');
  req.pause();
});
