
function insultMember(){
	var id = $( '#id' ).val();
		var pw = $( '#password' ).val();
		console.log(id);
		console.log(pw);

	$.ajax({
	    url: 'http://localhost:8090/curriculum1.4/login_controller.jspx?cmd=insertMember&id='+id+"&pw="+pw,
	    type: 'get',
	    //dataType: 'json',
	    success: function (resp) {
	     //console.log("success");

								location.href = "finishedJoin.html";
	    }, error: function (xhr, status, error) {
	        alert("err")
	    }
	});
};


function loginConfirm(){
	var id = $( '#id' ).val();
		var pw = $( '#password' ).val();
		console.log(id);
		console.log(pw);

	$.ajax({
	    url: 'http://localhost:8090/curriculum1.4/login_controller.jspx?cmd=loginConfirm&id='+id+"&pw="+pw,
	    type: 'get',
	   // dataType: 'json',
	    success: function (resp) {
				alert(resp)
			 console.log("resp");
	    }, error: function (xhr, status, error) {
	        alert("err")
	    }
	});
}
