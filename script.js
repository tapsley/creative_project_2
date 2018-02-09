$(document).ready(function() {
	
	var formatOptions = {
		weekday: "long",
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
		
	}
	
	$("#artistSubmit").click(function(e) {
		
		e.preventDefault();
		var artist = $("#artistInput").val();
		console.log(artist);
				
		var myurl= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=tapsley";
		$.ajax({
			url : myurl,
			dataType : "json",
			success : function(json) {
				console.log(json);
				
				var results = "";
				
				
				if(json.length === 0){
					results += "<h4>Couldn't find artist \"" + artist + "\"</h4>";
				} 
				else {				
					results += '<h4 class="upcoming">Upcoming shows from \"' + artist + "\"</h4>";
					results += '<ul>'
					
					for (var i=0; i<json.length; i++) {
						var date = new Date(json[i].datetime);
						var formattedDate = date.toLocaleDateString('en-US', formatOptions);
						formattedDate = formattedDate.replace(',','')
												.replace('PM', 'p.m.')
												.replace('AM', 'a.m.');
						results += '<li class="question"><div class="concertItem">' 
							+  "<h5>" + json[i].venue.name + "</h5>"
							+  "<h6>" + json[i].venue.city + ", " + json[i].venue.region + ", " + json[i].venue.country + "</h6>"
							+  "<h6>" + formattedDate + "</h6>";
						if(json[i].offers[0] !== undefined) 
							results +=  "<a target='_blank' href=\"" + json[i].offers[0].url +"\">Buy Tickets</a><br>";
						
						results += '</div></li><br>';
					}
					results += '</ul>'
				}
				
				$("#artistResults").html(results);
			},
			failure : function(json) {
				results += "<h4>Couldn't find artist \"" + artist + "\"</h4>";
				$("#artistResults").html(results);
			}
		});	
		
	});
	
	function formatDate(date) {
		
		return date;
	}
	
	$("#weatherTab").click(function(e) {
		$("#weatherTab").addClass("active");
		$("#stackTab").removeClass("active");
		$("#weatherSection").removeClass("hidden");
		$("#stackoverflowSection").addClass("hidden");
	});
	
	$("#stackTab").click(function(e) {
		$("#weatherTab").removeClass("active");
		$("#stackTab").addClass("active");
		$("#weatherSection").addClass("hidden");
		$("#stackoverflowSection").removeClass("hidden");
	});
});