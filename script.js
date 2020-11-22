
// let myMap=
// {
//   "105":["bank","sandwich shop","technical school","architect","nonprofit"],
//   "107":["museum","transit","trade","comission","government"],
//   "109":["school","coffee"],
//   "111":["church","consultant","software","finance"],
//   "112":[],
//   "201":["baby clothing", "subway", "real estate","bank","personal injury attorney","mortgage lender"]
// }

// jQuery.ajaxPrefilter(function(options) {
//     if (options.crossDomain && jQuery.support.cors) {
//         options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//     }
// });

// function getPoem(poemForm, places, surprise){

// 	var purl = new URL("https://poetryme.dei.uc.pt/PoetrymeWeb/rest/poetry/line?lang=en")
// 	purl.searchParams.append("lang", "en")
// 	purl.searchParams.append("form",poemForm)
// 	purl.searchParams.append("seeds",places.join(","))
// 	purl.searchParams.append("surp",surprise)
	
// 	var settings = {
// 	  "url": purl.toString(),
// 	  "method": "GET",
// 	  "timeout": 0,
// 	};
	
// 	$.ajax(settings).done(function (response) {
// 	  console.log(response);
// 	});
// 	}


//background gradient
let url ='https://api.sunrise-sunset.org/json?lat=40.7128&lng=-74.0060&date=today';
let dayLength, day, dayHours, dayMinutes, sunrise, sun, sunHours, sunMinutes;
let dTotal, heresHours, sTotal, dayUnit; 
let dateNow, nHours, nMinutes, nTotal, minPassed, gValue; 

function getTime(dHours, dMinutes, sHours, sMinutes){
	dTotal=(dHours*60)+dMinutes;
	heresHours=(sHours-5);
	sTotal=(heresHours*60)+sMinutes;
	dayUnit=dTotal/100;
	timeNow();
	setInterval(timeNow,60000);
}

function timeNow(){
	dateNow=new Date();
	nHours=dateNow.getHours();
	nMinutes=dateNow.getMinutes();
	nTotal=(nHours*60)+nMinutes;
	minPassed=nTotal-sTotal;
	gValue=minPassed/dayUnit;
	document.body.style.setProperty("--gradValue", gValue + "%");
	console.log(gValue);
}

function sky(){
$.get(url, function( data ) {
	dayLength=data.results.day_length;

	day=new Date("Jan 1, 1990 " + dayLength);
	dayHours=day.getHours();
	dayMinutes=day.getMinutes();

	sunrise=data.results.sunrise;
	sun=new Date("Jan 1, 1990 " + sunrise);
	sunHours=sun.getHours();
	sunMinutes=sun.getHours();

	getTime(dayHours,dayMinutes,sunHours,sunMinutes);
  });
}

//load content
let counter=0;
let fullBlocks=[105, 106, 107, 108, 109, 110, 111, 112, 201, 202, 203, 204];
let fullBlocksLength=fullBlocks.length;
let randomTurns=[];

function loadContent(){
	$.ajaxSetup({async:false});
	loadBlocks();
	addTrees();
}

function loadBlocks(){
	for (i=0; i<fullBlocksLength; i++){
		$("#" + fullBlocks[i] + " .content").load("" + fullBlocks[i] + ".html");
	}
};

function addTrees(){
	$(".building").each(function(){
		let thisBuilding=$(this);
		thisBuilding.html($("<div class='windows'><div class='wleft'></div><div class='wright'></div></div>"));
		thisBuilding.append($("<div class='ceiling'></div>"));
	});

	for(i=0;i<4;i++){
		$("<div class='window'></div>").appendTo($(".wleft"));
		$("<div class='window'></div>").appendTo($(".wright"));
	};
	
	$(".window").append($("<div class='shutter'></div>"));

	
	$(".park").each(function(){
		for(i=0;i<10;i++){
		$(this).append($("<div class='tree'><p>a</p></div>"));
		};
	});
}

let randomTurn;
// function animDuration(){
// 	for(i=0;i<10;i++){
// 		randomTurn=Math.floor(Math.random()*360);
// 		$(".tree:eq(" + i +")").css("transform","rotate(" + randomTurn + "deg)");
// 	}
// }

//find what's around
function aroundDiv(){
	$(".slide").each(function(){
	
		//identify divs around active
		let thisId=parseInt($(this).attr("id"));
		let topId=thisId-1;
		let bottomId=thisId+1;
		let leftId=thisId-100;
		let rightId=thisId+100;
		
		let topIdDiv=$("#"+topId+"");
		let bottomIdDiv=$("#"+bottomId+"");
		let leftIdDiv=$("#"+leftId+"");
		let rightIdDiv=$("#"+rightId+"");
		
		let topIdAttr=topIdDiv.attr("data-type");
		let bottomIdAttr=bottomIdDiv.attr("data-type");
		let leftIdAttr=leftIdDiv.attr("data-type");
		let rightIdAttr=rightIdDiv.attr("data-type");
	
		//nav elements
		let navup="<div class='navelement navup'>&#8593; </div>";
		let navdown="<div class='navelement navdown'>&#8595; </div>";
		let navleft="<div class='navelement navleft'>&#8592;</div>";
		let navright="<div class='navelement navright'>&#8594; </div>";
		
	
		// let navup="<div class='navelement navup'><div class='street-name'>" + topIdAttr + " </div>&#8593; </div>";
		// let navdown="<div class='navelement navdown'><div class='street-name'>" + bottomIdAttr + " </div>&#8595; </div>";
		// let navleft="<div class='navelement navleft'>&#8592; <div class='street-name'> " + leftIdAttr + "</div></div>";
		// let navright="<div class='navelement navright'><div class='street-name'>" + rightIdAttr + " </div>&#8594; </div>";
		
		//append elements to corresponding divs
		let thisDiv=$(this); 
		if(!topIdDiv.hasClass("empty") && topIdDiv.length!=0 && !thisDiv.hasClass("empty") 
		&& !thisDiv.hasClass("horizontal") && !topIdDiv.hasClass("horizontal")){
			thisDiv.addClass("hasUp").append(navup);
		}
		if(!bottomIdDiv.hasClass("empty") && bottomIdDiv.length!=0 && !thisDiv.hasClass("empty") 
		&& !thisDiv.hasClass("horizontal") && !bottomIdDiv.hasClass("horizontal")){
			thisDiv.addClass("hasDown").append(navdown);
		}
		if(!leftIdDiv.hasClass("empty") && leftIdDiv.length!=0 && !thisDiv.hasClass("empty") 
		&& !thisDiv.hasClass("vertical") && !leftIdDiv.hasClass("vertical")){
			thisDiv.addClass("hasLeft").append(navleft);
		}
		if(!rightIdDiv.hasClass("empty") && rightIdDiv.length!=0 && !thisDiv.hasClass("empty") 
		&& !thisDiv.hasClass("vertical") && !rightIdDiv.hasClass("vertical")){
			thisDiv.addClass("hasRight").append(navright);
		}
	});
	}

// click to navigate

function navClick(){
	$(".navdown").click(function(){
		fullpage_api.moveSectionDown();
	});
	
	$(".navup").click(function(){
		fullpage_api.moveSectionUp();
	});
	
	$(".navleft").click(function(){
		fullpage_api.moveSlideLeft();
	});
	
	$(".navright").click(function(){
		fullpage_api.moveSlideRight();
	});
	}

sky();
loadContent();
aroundDiv();
navClick();


// add arrows



// // change color
// $(".material-icons").each(function(){
// 	// let thisColor=$(this).parent().parent().css("background-color");
// 	let thisColor="white";
// 	let colorChange=$(this).css({"color":thisColor});
// });

// $(".navelement").each(function(){
// 	// let thisColor=$(this).parent().css("background-color");
// 	let thisColor="white";
// 	let colorChange=$(this).css({"color":thisColor});
// });







