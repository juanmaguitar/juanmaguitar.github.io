$(document).ready(function(){

	console.log ("here we are!");
	var api_key = '161950d138fd7c50974cf8fc3ae55808',
	    api_secret = '47f16bec277c8b31',
	    checkPopup,
	    popup,
	    token,
	    frob;

	window.rtm = new RememberTheMilk(api_key, api_secret, 'delete');

	function getConnection(urlString) {
    return new Promise(function(resolve) {
        //Without new Promise, this throwing will throw an actual exception
        var params = parse(urlString);
        resolve(getAdapter(params).getConnection());
    });
}

	function getFrob() {
		console.log ("getFrob...");
		return new Promise( function(resolve){
			rtm.get('rtm.auth.getFrob', function(resp) {
				$('#auth').attr('disabled', null);
				console.log (resp);
				console.log ("getFrob returns => frob = "+ resp.rsp.frob);
				resolve(resp.rsp.frob)
			});
		});
	}

// https://www.rememberthemilk.com/services/auth/?api_key=161950d138fd7c50974cf8fc3ae55808&perms=delete&format=json&api_sig=7b380625b677967429eaa0668651c805

	function getAuth(frob) {
		console.log ("getAuth...");
		return new Promise( function(resolve){
			console.log ("getAuth uses => frob = "+ frob);
			rtm.get('rtm.auth.getToken', {frob: frob}, function(resp){
				console.log (resp);
				if (resp.rsp.auth ) {
					rtm.auth_token = resp.rsp.auth.token;
					resolve(rtm.auth_token)
					//loadLists();
				}
			});
		});
	}

	getFrob()
		.then(getAuth)
		.then(function(token){
			console.log (token);
		})

	$('#auth').click(function(){

		var authUrl = rtm.getAuthUrl(frob);
		var counter = 10; // number of retries
		popup = window.open(
			authUrl,
			'_blank',
			'height=750,width=500,toolbar=0,location=0,menubar=0'
		);

		checkPopup = setInterval(function(){

				if (!counter) {
					popup.close();
					document.location.reload(true);
				}
				else {
					rtm.get('rtm.auth.getToken', {frob: frob}, function(resp){
						console.log (frob);
						console.log (resp);
						console.log (counter);
						if (resp.rsp.auth ) {
							rtm.auth_token = resp.rsp.auth.token;
							popup.close();
							clearInterval(checkPopup);
							loadLists();
						}
					});
					counter--;
				}

		}, 1000);

	})
});

var loadLists = function(){
	console.log ("load lists...")
	$('#auth').hide();

	rtm.get('rtm.lists.getList', function(resp){
		$.each(resp.rsp.lists.list, function(index, list){
			$('<button>').html(list.name).data({
				id: list.id
			}).addClass('list')
			.appendTo($('#lists'));
		});

		$('button.list').click(function(){
			$('#tasks').html('Loading...');
			var listId = $(this).data('id');

			rtm.get('rtm.tasks.getList', {list_id: listId, filter: 'status:incomplete'}, function(resp){
				$('#tasks').empty();

				if (!resp.rsp.tasks || !resp.rsp.tasks.list) {
					$('#tasks').html('No tasks!');
					return;
				}

				$.each(resp.rsp.tasks.list, function(index, listItem){
					if (Object.prototype.toString.call(listItem.taskseries) != '[object Array]') {
						listItem.taskseries = [listItem.taskseries];
					}

					$.each(listItem.taskseries, function(index, task){
						var div = $('<div>').addClass('task-div');
						$('<input>').attr('type', 'checkbox').appendTo(div);
						$('<span>').html(task.name).appendTo(div);

						div.appendTo($('#tasks'));
					})
				});
			})
		})
	});

}
