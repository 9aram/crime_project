


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

function showOk() {
  $.ajax({
    url: 'http://localhost:8090/curriculum1.4/login_controller.jspx?cmd=fileList',
    type: 'get',
    dataType: 'json',
    success: function(resp) {
      //	alert(resp);
      //	alert(resp.id);
      //console.log(resp.file.result);
      var obj = JSON.parse(resp.file.result);
      //console.log(obj);
      //console.log(obj.univ[1]);
      //console.log(obj.univ[1].file);
      var list4;
      var a4;
      var node;
      var element;

      for (i = 0; i < Object.keys(obj.univ).length; i++) {
        //  console.log(obj.univ[i].file);
        list4 = document.createElement("li");
        a4 = document.createElement("a");
        node = document.createTextNode(obj.univ[i].file);
        a4.setAttribute('href', obj.univ[i].file);
        list4.appendChild(a4);
        a4.appendChild(node);

        var num = i;
        var inte = 'fileList' + num;
        console.log(inte);

        element = document.getElementById(inte);
        element.appendChild(list4);

        // var innerText=""<li><a href="">홍길동</a></li>"
        // document.getElementById('fileList').innerHTML= innerText;
      }
      //	var dname=	obj.univ[1].file;
      //	alert(dname);
      //	$(".wrap").append("<a href="#">"+dname+"</a>");
      //		 console.log(obj.univ.[1]);

      //document.getElementById("down_name").innerHTML = resp.id;
      // 	document.getElementById("id").innerHTML=resp.OK;
      //	$('id').html(resp.OK);
      //	event.preventDefault()
    },
    error: function(xhr, status, error) {
      alert("오류입니다.");
    }
  });
}

function insultMember() {
  var id = $('#id').val();
  var pw = $('#password').val();
  console.log(id);
  console.log(pw);
/*
  $.ajax({
    url: 'http://localhost:8090/curriculum1.4/login_controller.jspx?cmd=insertMember&id=' + id + "&pw=" + pw,
    type: 'get',
    //dataType: 'json',
    success: function(resp) {
      //console.log("success");

      location.href = "finishedJoin.html";
    },
    error: function(xhr, status, error) {
      alert("err")
    }
  });
  */
  location.href = "finishedJoin.html";
};


function loginConfirm() {
  var id = $('#id').val();
  var pw = $('#password').val();
  console.log(id);
  console.log(pw);

  $.ajax({
    url: 'http://localhost:8090/curriculum1.4/login_controller.jspx?cmd=loginConfirm&id=' + id + "&pw=" + pw,
    type: 'get',
    dataType: 'json',
    success: function(resp) {
      //	alert(resp);
      //	alert(resp.id);

      console.log(resp.id + "입니다");
      //document.getElementById("down_name").innerHTML = resp.id;
      location.href = "test_download_js.html?id=" + resp.id;

    },
    error: function(xhr, status, error) {
      alert("아이디와 비밀번호를 잘못 입력하셨습닌다.");
    }
  });
}
