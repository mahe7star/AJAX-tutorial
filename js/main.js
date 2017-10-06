var clickCount = 1;
var ourRequest = new XMLHttpRequest();

$("#button").click(function(){
    ourRequest.open("GET","https://learnwebcode.github.io/json-example/animals-"+clickCount+".json");
	ourRequest.onload = function(){
		
		if (ourRequest.status>=200 && ourRequest.status<400) {
			var ourData = JSON.parse(ourRequest.responseText);	
	  		renderData(ourData);
		}
		else console.log("Server returned Error");
	
	};
	ourRequest.send();
	clickCount++;
	if(clickCount>3){
		$("#button").prop('disabled', true);
	}
});

ourRequest.onerror= function(){
	console.log("Connection Error");
};

function renderData(data){
	var htmlstring= "";
	for(i=0;i<data.length;i++){
		var del=i/5
		htmlstring+="<p class='para animated zoomIn' style='-webkit-animation-delay:"+del+"s'>"+ data[i].name+ " is a " + data[i].species + " that likes ";

		for(j=0;j<data[i].foods.likes.length;j++){
			if(j==0){
				htmlstring+=data[i].foods.likes[j];
			}
			else{
				htmlstring+=" and "+data[i].foods.likes[j];
			}
		}
		htmlstring+=" but doesn't likes ";
		for(j=0;j<data[i].foods.dislikes.length;j++){
			if(j==0){
				htmlstring+=data[i].foods.dislikes[j];
			}
			else{
				htmlstring+=" and "+data[i].foods.dislikes[j];
			}
		}
		htmlstring+="</p>";
	}
	$("#animal-info").append(htmlstring);
}