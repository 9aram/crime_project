var request = require('request');
var fs = require('fs'); //파일을 읽고 쓰기 위해서 fs모듈을 가져옴
var req2, total_size, progressBar, display, finalPath, fileURL;
var received_bytes = 0,
  total_bytes = 0;
var subW;
var endV = 0;

function download_file(event, filename) {
  var filename
  var a = event.currentTarget;
  var td = a.parentElement;
  var tr = td.parentElement;
  var id = '';
  var test;
  //다운로드버튼의 글자를 바꾸기 위한 클래스 이름 저장
  test = '' + tr.querySelector('.test > a').getAttribute('class');
  console.log(test);
  //프로그래스바 초기 설정
  progressBar = tr.querySelector('progress');
  display = tr.querySelector('span');
  progressBar.value = 0;
  display.innerText = '0%';
  // Save variable to know progress
  //fileURL = "http://speedtest-ny.turnkeyinternet.net/100mb.bin";
  fileURL = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73751/world.topo.bathy.200407.3x21600x10800.jpg";
   finalPath = "./download/world.topo.bathy.200407.3x21600x10800.jpg";
  console.log(filename);
//  fileURL = "http://speedtest-ny.turnkeyinternet.net/"+filename;
//  finalPath = "./download/"+filename;
  //fileURL = "http://speedcheck.cdn.on.net/5000meg.test";
  //finalPath = "./download/5000meg.test";
  req2 = request({
    method: 'GET',
    uri: fileURL,
    //  timeout:500000
  });
  var out = fs.createWriteStream(finalPath);
  req2.pipe(out); //파일을 읽어서 out에 쓴다. 입력을 출력으로 리다이렉트 할 수 있게 해준다. stream 간의 read 와 write event를 여결 해준다. 여러개 연결가능
  //req2 같은 변수에 pipe로 계속해도 덮어쓰기된다.
  //Every req2 stream that you create points to the same variable which is key, at the end of main loop, each of those callbacks will have the same value.
  //response 이벤트가 들어올때 한번 실행됨
  req2.on('response', function(data) {
    // Change the total bytes value to get progress later.
    console.log('실행 response data');
    total_bytes = parseInt(data.headers['content-length']);

    console.log('  전체 크기는?' + total_bytes);
    progressBar.max = total_bytes;

  });

  //데이터들이 들어올때마다 실행됨
  req2.on('data', function(chunk) {
    //프로그래스바. 현재 받은 데이터 크기를 프로그래스바에 반영
    // Update the received bytes
    //console.log(chunk); //버퍼로 들어옴
    //console.log('실행 data chunk');
    //progressBar.max = total_bytes;
    received_bytes += chunk.length;
    progressBar.value = received_bytes;
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%';
    //  console.log("받은 데이터는"+received_bytes);

  });
  //에러 발생시
  req2.on('error', function(err) {
    console.log(err);
  });
  //끝났을때 '다운로드끝'로 다운로드 버튼 글자 바꿈
  req2.on('end', function() {
    subW = test.substring(9, 18).trim();
    $("." + subW).text('다운로드끝');
    endV = 2;
  });
  //에러발생시
  process.on('uncaughtException', function(err) {
    console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!');
    console.log(err);
  });
}

//멈추는 함수
function pause22() {
  console.log('pause function called');
  req2.pause();
}

//다시 시작하는 함수
function restart_test() {
  //fileURL = "http://speedcheck.cdn.on.net/5000meg.test";
  //finalPath = "./download/5000meg.test";
  fileURL = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73751/world.topo.bathy.200407.3x21600x10800.jpg";
   finalPath = "./download/world.topo.bathy.200407.3x21600x10800.jpg";
  // fileURL = "http://speedtest-ny.turnkeyinternet.net/1000mb.bin";
  // finalPath = "./download/1000mb.bin";
  req2 = request({
    method: 'GET',
    uri: fileURL
  });
  var out = fs.createWriteStream(finalPath);
  req2.pipe(out); //파일을 읽어서 out에 쓴다//데이터들이 들어올때마다 실행됨
  req2.on('data', function(chunk) {
    received_bytes += chunk.length;
    progressBar.value = received_bytes;
    console.log(received_bytes);
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%';
  });
  req2.on('end', function() {
    subW = test.substring(9, 18).trim();
    $("." + subW).text('다운로드끝');
    endV = 2;
  });
}

// 테스트버전
// //멈추는 함수
// function pause22() {
//   console.log('pause function called');
//   req2.pause();
// }
// //다시 시작하는 함수
// function restart22() {
//   console.log('RESUME function called');
//   //progressBar.max=progressBar.max-progressBar.value;
//   //progressBar.value = received_bytes;
//   //  progressBar.max=total_bytes;
//   console.log(progressBar.max);
//   //received_bytes = progressBar.value ;
//   console.log(progressBar.value);
//   // received_bytes= progressBar.value;
//   //progressBar.max=progressBar.max-progressBar.value;
//
//   //  fileURL = "http://speedtest-ny.turnkeyinternet.net/100mb.bin";
//   //    fileURL = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73751/world.topo.bathy.200407.3x21600x10800.jpg";
//   //  finalPath = "./download/world.topo.bathy.200407.3x21600x10800.jpg";
//   fileURL = "http://speedtest-ny.turnkeyinternet.net/1000mb.bin";
//   finalPath = "./download/1000mb.bin";
//   req2 = request({
//     method: 'GET',
//     uri: fileURL,
//     //  timeout:500000
//   });
//   var out = fs.createWriteStream(finalPath);
//   req2.pipe(out); //파일을 읽어서 out에 쓴다
//   //response 이벤트가 들어올때 한번 실행됨
//   // req2.on('response', function(data) {
//   //   // Change the total bytes value to get progress later.
//   //   console.log('실행 response data');
//   //   total_bytes = parseInt(data.headers['content-length']);
//   //   console.log('  전체 크기는?'+total_bytes);
//   //   progressBar.max = total_bytes;
//   // });
//
//   //데이터들이 들어올때마다 실행됨
//   req2.on('data', function(chunk) {
//     //프로그래스바. 현재 받은 데이터 크기를 프로그래스바에 반영
//     // Update the received bytes
//     //console.log(chunk); //버퍼로 들어옴
//     //console.log('실행 data chunk');
//     //progressBar.max = total_bytes;
//     received_bytes += chunk.length;
//     progressBar.value = received_bytes;
//     display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%';
//     //  console.log("받은 데이터는"+received_bytes);
//   });
// }
