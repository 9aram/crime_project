var request = require('request');
var fs = require('fs'); //파일을 읽고 쓰기 위해서 fs모듈을 가져옴
const stream = require('stream');
var check;
const events = require('events');
var EventEmitter = new events.EventEmitter();
var req2;
var total_size;
var fileSize = '';
var fileURL;
var finalPath;
var progressBar;
var display;
var received_bytes = 0;
var total_bytes = 0;
var test = '';
var etag;
//db 연결 생성
var sqlite3 = require('sqlite3').verbose(); //sqlite를 연결하는 객체를 만듭니다.
var db = new sqlite3.Database('mydb.db'); //위에서 만든 sqlite 객체를 이용하여 //메모리에 데이터베이스를 생성합니다.
db.serialize(function() { // 여기서부터 위에서 만든 데이터베이스를 이용한다고 알림
  db.run("CREATE TABLE if not exists user (id STRING, pw STRING)"); //데이터베이스에 user 테이블을 만들고 필드로 string타입의 id, pw를 만듭니다.
  //  var stmt = db.prepare("INSERT INTO user VALUES (?,?)"); //sql문에 여러 개의 값을 동적으로 변경하기 위해 sql문의 틀을 준비합니다.
  ///    stmt.run( "처음ID", "처음PW");
  ///    stmt.run( "333", "33PW");
  ///  stmt.finalize(); //stmt객체 즉 sql문을 파괴합니다.
  db.each("SELECT id, pw FROM user", function(err, row) { //위에서 user테이블에 있는 id값을 확인하기 위한 select 문입니다.
    console.log(row.id + ": " + row.pw);
  });
  db.each("SELECT id, pw FROM user where id='qwe'", function(err, row) {
    console.log("db에 저장된 id는" + row.id);
  });
});
db.close(); //메모리의 데이터베이스를 종료하며 파괴합니다. 물론 기억된 내용도 사라집니다.

//스탑함수 호출
function stop2() {
  console.log("스탑 함수 호출");
  req2.pause();
}

// function resume2() {
//   console.log("리쥼 함수 호출");
//   req2.resume();
// }

//다운로드 함수 실행
function download_file(event, filename) {
  // this.stop = function stop(){
  //   req3.pause();
  //   console.log("calleddddd!!!");
  //  }

  var a = event.currentTarget;
  var td = a.parentElement;
  var tr = td.parentElement;
  var id = '';
  //다운로드버튼의 글자를 바꾸기 위한 클래스 이름 저장

  test = '' + tr.querySelector('.test > a').getAttribute('class');
  //프로그래스바 초기 설정

  progressBar = tr.querySelector('progress');
  display = tr.querySelector('span');
  progressBar.vaㄴlue = 0;
  display.innerText = '0%';
  // Save variable to know progress


  EventEmitter.on("restart", function() {
      //로컬에 저장된 파일의 사이즈를 불러와서 그 크기부터 다운로드 재시작.
      var fileSizeInBytes = total_size;
      var curruntSize;
      //  total_bytes=104857600;
      //console.log(fileSizeInBytes);
      // finalPath='.'+finalPath;
      // console.log(finalPath);
      var stats = fs.statSync(finalPath)
      console.log(stats);
      curruntSize = stats.size;
      console.log("현재 사이즈는? " + curruntSize);
      if (fileSizeInBytes > 1) {
        console.log("원본 사이즈는" + total_size);
        //  console.log('tota l data.' + total_bytes);
        //received_bytes = fileSizeInBytes;
        //  console.log("받아논 사이즈는"+received_bytes);
      }
      req2 = request({
        method: 'GET',
        uri: fileURL,
        headers: {
          'Range': 'bytes=' + curruntSize + '-',
          'If-Range': etag
        }
      });
      received_bytes=curruntSize;
      var out = fs.createWriteStream(finalPath);
      req2.pipe(out); //파일을 읽어서 out에 쓴다
      //response 이벤트가 들어올때
      req2.on('response', function(data) {
        // Change the total bytes value to get progress later.
        total_bytes = parseInt(data.headers['content-length']);
        console.log(data.headers);
        progressBar.max = total_bytes;
      //  total_size = total_bytes;
      });
      //데이터들이 들어올때 실행됨
      req2.on('data', function(chunk) {
        //프로그래스바. 현재 받은 데이터 크기를 프로그래스바에 반영
        // Update the received bytes
        progressBar.max = total_bytes;100;
        //received_bytes=curruntSize;
        received_bytes += chunk.length;
        progressBar.value = received_bytes;
        display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
        //console.log( received_bytes);
        //  console.log('tota l data.' + total_bytes);
        //  console.log('Received'+chunk.length+' bytes of data.');
        //  showProgress(received_bytes, total_bytes);
      });
      //에러발생시
      req2.on('error', function(err) {
        console.log(err);
      })
      //끝났을때 '다운로드끝'로 다운로드 버튼 글자 바꿈
      req2.on('end', function() {
        var subW;
        subW = test.substring(9, 18).trim();
        $("." + subW).text('다운로드끝');
      });
      //에러발생시
      process.on('uncaughtException', function(err) {
        console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
        console.log(err);
      });

  });

  // EventEmitter.on("resume2", function() {
  //   req2.resume();
  //   console.log("리쥼 함수 실행");
  //   //  req.pipe(out);
  // })


  //100mb 다운로드일 때 실행
  if (filename == '100mb.bin') {
    fileSize = filename
    fileURL = "http://speedtest-ny.turnkeyinternet.net/100mb.bin";
    finalPath = "./download/100mb.bin";
    req2 = request({
      method: 'GET',
      uri: fileURL
    });
    //파일 존재 시 삭재함.
    //exists()를 이용하여 파일 존재 유무부터 확인

        // fs.exists(finalPath, function(exists) {
        //   if (exists) {
        //     //존재한다면? unlink() 로 삭제한다
        //     fs.unlink(finalPath, function(err) {
        //       if (err) throw err;
        //       console.log('파일' + finalPath + '삭제됨');
        //     });
        //   };
        // });
    var out = fs.createWriteStream(finalPath);

    req2.pipe(out); //파일을 읽어서 out에 쓴다
    //response 이벤트가 들어올때
    req2.on('response', function(data) {
      // Change the total bytes value to get progress later.
      total_bytes = parseInt(data.headers['content-length']);
      etag = data.headers['etag'];
      console.log(etag);
      progressBar.max = total_bytes;
      total_size = total_bytes;
    });
    //데이터들이 들어올때 실행됨
    req2.on('data', function(chunk) {
      //프로그래스바. 현재 받은 데이터 크기를 프로그래스바에 반영
      // Update the received bytes
      progressBar.max = total_bytes;
      received_bytes += chunk.length;
      progressBar.value = received_bytes;
      display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
      //console.log( received_bytes);
      //  console.log('tota l data.' + total_bytes);
      //  console.log('Received'+chunk.length+' bytes of data.');
      //  showProgress(received_bytes, total_bytes);
    });
    //에러발생시
    req2.on('error', function(err) {
      console.log(err);
    })
    //끝났을때 '다운로드끝'로 다운로드 버튼 글자 바꿈
    req2.on('end', function() {
      var subW;
      subW = test.substring(9, 18).trim();
      $("." + subW).text('다운로드끝');
    });
    //에러발생시
    process.on('uncaughtException', function(err) {
      console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
      console.log(err);
    });
  }
}

//----------------------------------------------------------삭제-----------------------------------------------------------------------
/*
function restart() {
  var fileSizeInBytes = total_size;
  var curruntSize;
  //  total_bytes=104857600;
  //console.log(fileSizeInBytes);
  // finalPath='.'+finalPath;
  // console.log(finalPath);
  var stats = fs.statSync(finalPath)
  console.log(stats);
  curruntSize = stats.size;
  console.log("현재 사이즈는? " + curruntSize);
  if (fileSizeInBytes > 1) {
    console.log("원본 사이즈는" + fileSizeInBytes);
    //  console.log('tota l data.' + total_bytes);
    //received_bytes = fileSizeInBytes;
    //  console.log("받아논 사이즈는"+received_bytes);
  }
  req = request({
    method: 'GET',
    uri: fileURL,
    headers: {
      'Range': 'bytes=' + curruntSize + '-'
    }
  });
  var out = fs.createWriteStream(finalPath);
  req.pipe(out); //파일을 읽어서 out에 쓴다
  //response 이벤트가 들어올때
  req.on('response', function(data) {
    // Change the total bytes value to get progress later.
    total_bytes = parseInt(data.headers['content-length']);
    progressBar.max = total_bytes;
    total_size = total_bytes;
  });
  //데이터들이 들어올때 실행됨
  req.on('data', function(chunk) {
    //프로그래스바. 현재 받은 데이터 크기를 프로그래스바에 반영
    // Update the received bytes
    progressBar.max = total_bytes;
    received_bytes += chunk.length;
    progressBar.value = received_bytes;
    display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
    //console.log( received_bytes);
    //  console.log('tota l data.' + total_bytes);
    //  console.log('Received'+chunk.length+' bytes of data.');
    //  showProgress(received_bytes, total_bytes);
  });
  //에러발생시
  req.on('error', function(err) {
    console.log(err);
  })
  //끝났을때 '다운로드끝'로 다운로드 버튼 글자 바꿈
  req.on('end', function() {
    var subW;
    subW = test.substring(9, 18).trim();
    $("." + subW).text('다운로드끝');
  });
  //에러발생시
  process.on('uncaughtException', function(err) {
    console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
    console.log(err);
  });
}
*/

//----------------------------------------------------------------------------파일 이어받기 기능 삭제가능
//  var fileSizeInBytes=0;
//  total_bytes=104857600;

//  fs.stat(finalPath, function(err, data) {
//if (err) {

//}
//----------------------------------------------------------------------------파일 이어받기 기능 삭제가능
/*
  else {

    console.log('it exists');
    var stats = fs.statSync(finalPath)
    fileSizeInBytes = stats.size;
    if(fileSizeInBytes>1){
      console.log("원래있던 사이즈는"+fileSizeInBytes);
    //  console.log('tota l data.' + total_bytes);
    received_bytes = fileSizeInBytes;
    console.log("받아논 사이즈는"+received_bytes);
    }
    req = request({
      method: 'GET',
      uri: fileURL,
       headers:{
     'Range': 'bytes='+fileSizeInBytes+'-'}
   });


     var out = fs.createWriteStream(finalPath);
     //var temp= 104857000;
     //req.headers.Range='bytes=104800000-' //헤더 변경하는 방법
     //req.headers.Range='bytes='+temp+'-'; // 변수로 헤더 변경 방법
     req.pipe(out);

     EventEmitter.on("stop2", function() {
       req.pause();
       //req.unpipe();
       console.log("스탑 함수 실행");
     })
     EventEmitter.on("resume2", function() {
       req.resume();
       console.log("리쥼 함수 실행");
     //  req.pipe(out);
     })
     EventEmitter.on("stop4", function() {
       req.pause();
       console.log("스탑 함수 실행");
     })
     EventEmitter.on("resume4", function() {
       req.resume();
       console.log("리쥼 함수 실행");
     })

     req.on('response', function(data) {
       // Change the total bytes value to get progress later.
    //   total_bytes = parseInt(data.headers['content-length']);
       progressBar.max = total_bytes;
     });
     console.log("토탈바이트는"+total_bytes);
    console.log("받아논 바이트는 "+received_bytes);
     req.on('data', function(chunk) {

       // Update the received bytes

       progressBar.max = total_bytes;
       received_bytes += chunk.length;
       progressBar.value = received_bytes;

       display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
   console.log( received_bytes);
     //  console.log('tota l data.' + total_bytes);
       //  console.log('Received'+chunk.length+' bytes of data.');
       //showProgress(received_bytes, total_bytes);
     });
     req.on('error', function(err) {
       console.log(err);
     })

     req.on('end', function() {
       var subW;
       subW = test.substring(9, 18).trim();
       $("." + subW).text('다운로드끝');


     });

     process.on('uncaughtException', function(err) {
       console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
       console.log(err);
     })

  }
  //----------------------------------------------------------------------------파일 이어받기 기능 삭제가능

*/
//  });

//폴더에 저장된 파일이 있는지 확인.
// const stats ; = fs.statSync(finalPath)
// console.log(stats);
// if(stats){
//  const fileSizeInBytes = stats.size
//  //console.log(stats);
//  if(fileSizeInBytes){
//    console.log(fileSizeInBytes);
//    console.log('tota l data.' + total_bytes);
//  }
// }


//----------------------------------------------------------삭제-----------------------------------------------------------------------------

//콘솔에 받은양/전체양 표시
function showProgress(received, total) {
  var percentage = (received * 100) / total;
  console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");

}

function restart(n) {
  console.log(n);
  switch (n) {
    case 2:
      EventEmitter.emit("restart");
      console.log("스탑 함수 호출");
      break;
  }
}
// function resume(n) {
//   console.log(n);
//   switch (n) {
//     case 2:
//       EventEmitter.emit("resume2");
//       console.log("리줌 함수 호출");
//       break;
//   }
// }

//회원가입 함수
function insultMember2() {
  var id = $('#id').val();
  var pw = $('#password').val();
  console.log("id는" + id);
  db = new sqlite3.Database('mydb.db');
  db.run("INSERT into user(id,pw) VALUES(?,?)", [id, pw], function(err, row) {});
  db.close();
  window.location.href = "finishedJoin.html";
};
//로그인 함수
function loginConfirm2() {
  var id = $('#id').val();
  var s_id = "'" + id + "'";
  var pw = $('#password').val();
  var pw = '' + pw;
  var d_id = '';
  var d_pw = '';
  console.log(id);
  console.log(pw);
  if (id == '') {
    alert("id를 입력하지 않으셨습니다.")
  } else if (pw == '') {
    alert("pw를 입력하지 않으셨습니다.")
  }
  if (id) {

    db = new sqlite3.Database('mydb.db');
    db.each("SELECT id, pw FROM user where id=" + s_id, function(err, row) {
      console.log("db에 저장된 id는" + row.id);
      console.log("db에 저장된 pw는" + row.pw);
      d_id = row.id;
      d_pw = row.pw;
      console.log("변수에 저장된 pw는" + d_pw);
      if ((id == row.id) && (pw == row.pw)) {
        window.location.href = "distribute_download.html?id=" + id;
      }
      ale();
      //else if(row.id=='undefined'){
      //   alert("비밀번호를 잘못 입력하셨습니다"); //
      // }
    });
    db.close();
  }


  function ale() {
    console.log("바깥에 pw는" + d_pw);
    console.log("바깥에 id는" + d_id);
    if (d_pw != pw) {
      alert("비밀번호를 잘못 입력하셨습니다");
    }
  }
}

//회원가입 페이지로 이동.
function join() {
  location.href = "sign_up.html";
}
