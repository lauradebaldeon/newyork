
let blockMap={
  "105":["Park","Citibank","Subway","Flatiron School","Hill West Architects","Teach for America", "American Thoratic Society", "Planet Fitness"],
  "107":["Park","Federal Transit Administration","Federal Trade Comission"],
  "109":["Park","Battery Conservancy","Starbucks","New Life Financial","Partnership Fund for New York City"],
  "111":["Park","St. Elizabeth Ann Seton Shrine", "Simon-Kucher & Partners","Amelia, an IPsoft Company"],
  "201":["Park","Saurette", "Trinity Church", "Wall Street Station","TD Bank","Antea Web"],
  "202":["Bean & Bean","Wall Street Dermatology", "Stella Adler Studio of Acting", "Pinkerton","The UPS Store","Touro College","Aboutboul & Company"],
  "204":["Bond Collective","TGI Fridays", "DGA Lighting Designer", "First Derivatives Inc","Gale P Elston PC Law Offices","NYC Consumer Affairs Department", "International Center for Transitional Justice"],
  "206":["Global Entry Processing Office","Southern District of New York Bankruptcy Court", "George Gustav Heye Center","National Archives at New York City"],
  "208":["national museum of the American Indian","Gordon Rees Scully Mansukhani, LLP","Partnership Fund for New York City"],
  "210":["State Pearl Garage", "Clearpool Group","Tax Pro Today","Arizent", "Wibbitz","The LiRo Group"],
  "212":["Our Lady of the Rosary","One State Street Plaza", "Continental Stock Transfer & Trust Company","Park","South Ferry Station"],
  "305":["Park","Lebedin Kofman LLP","26 Broadway", "Wafels and Dinges","GNC","LOFT","MTA Headquarters", "HSBC Bank"],
  "307":["National Museum of the American Indian", "Metro Station Whitehall St","Starbucks", "Chipotle","MTA NYC Transit Customer Service Center","Duane Reade","Premier Home Health Care Services","USPS"],
  "309":["Flavors Cafe", "Innovative Dental","Fitch Ratings Inc.", "Seward & Kissel"],
  "311":["Arizent", "Wibbitz","The LiRo Group", "Interactive One"],
  "313":["Quik Park", "One New York Plaza","Alpha Entertainment", "South Ferry Station"]
}

// let dayLengthMinutesg

//background gradient
let url ='https://api.sunrise-sunset.org/json?lat=40.7128&lng=-74.0060&date=today';
let dayLength, day, dayHours, dayMinutes, sunrise, sun, sunHours, sunMinutes;
let dTotal, heresHours, sTotal, dayUnit; 
let dateNow, nHours, nMinutes, nTotal, minPassed, gValue; 
let sunset, set, setHours, setMinutes, setTotal, tTotal, tHours, tMinutes;


let isNight=0;

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
	if(gValue>100){
		isNight=1;
	} else {
		isNight=0;
	}
}

function makeNight(){
	console.log("isNight");
	if(isNight==1){
	$(".fixedbg").css({"background":"black"});
	$(".navelement").css({"background-color":"var(--bgradient-primary)","color":"black"});
	let activeClass=fullpage_api.getActiveSlide().item;
	for (i=0;i<streets.length;i++){
		if($(activeClass).hasClass(streets[i].name)){
			let root=document.documentElement;
			root.style.setProperty('--red', streets[i].primary);
		}
	}
}
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
	sunMinutes=sun.getMinutes();

	getTime(dayHours,dayMinutes,sunHours,sunMinutes);
  });
}

//load content
let counter=0;
let fullBlocks=[105, 106, 107, 108, 109, 110, 111, 112, 201, 202, 203, 204, 205, 206, 208, 210, 212, 305, 306, 307,308,309,310,311,312,313,314];
let fullBlocksLength=fullBlocks.length;
let randomTurns=[];

function loadContent(){
	$.ajaxSetup({async:false});
	loadBlocks();
	addTrees();
}

function loadBlocks(){
	for (i=0; i<fullBlocksLength; i++){
		$("#" + fullBlocks[i] + " .content").load("/" + fullBlocks[i] + ".html");
	}
};

function addTrees(){
	$(".building").each(function(){
		let thisBuilding=$(this);
		thisBuilding.html($("<div class='windows'><div class='wleft'></div><div class='wright'></div></div>"));
		thisBuilding.append($("<div class='ceiling'></div>"));
	});

	$(".hbuilding").each(function(){
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

	$(".cwalkh").each(function(){
		for(i=0;i<5;i++){
			$(this).append($("<div class='cbarh'></div>"));
			};
	});

	$(".cwalkv").each(function(){
		for(i=0;i<7;i++){
			$(this).append($("<div class='cbarv'></div>"));
			};
	})
}

let randomTurn;

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
		// let navup="<div class='navelement navup'>&#8593; </div>";
		// let navdown="<div class='navelement navdown'>&#8595; </div>";
		// let navleft="<div class='navelement navleft'>&#8592;</div>";
		// let navright="<div class='navelement navright'>&#8594; </div>";
		
	
		let navup="<div class='navelement navup'><div class='street-name'>" + topIdAttr + " </div>&#8593; </div>";
		let navdown="<div class='navelement navdown'><div class='street-name'>" + bottomIdAttr + " </div>&#8595; </div>";
		let navleft="<div class='navelement navleft'>&#8592; <div class='street-name'> " + leftIdAttr + "</div></div>";
		let navright="<div class='navelement navright'><div class='street-name'>" + rightIdAttr + " </div>&#8594; </div>";
		
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

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

let broadway={name:"broadway",primary:"#919191",secondary:"white"};
let state={name:"state",primary:"#80aaff",secondary:"#d5e9ff"};
let wall={name:"wall", primary:"#ffdc5f",secondary:"#fff8de"};
let bowlingGreen={name:"bowling-green", primary:"#75c998",secondary:"#d1ffdc"};
let batteryPl={name:"battery-pl", primary:"#ffb19e",secondary:"#ffe2db"};
let bridge={name:"bridge", primary:"#dff2a5",secondary:"#f7ffde"};
let pearl={name:"pearl", primary:"#f0eee9",secondary:"#fffdf7"};
let whitehall={name:"whitehall", primary:"#eeabff",secondary:"#fcf0ff"};

let streets=[broadway, batteryPl, bowlingGreen, bridge, pearl, state, wall, whitehall];

function changeColors(){
	let activeClass=fullpage_api.getActiveSlide().item;
	for (i=0;i<streets.length;i++){
		if($(activeClass).hasClass(streets[i].name)){
			let root=document.documentElement;
			if(isNight==0){
			root.style.setProperty('--bgradient-primary', streets[i].primary);
			root.style.setProperty('--bgradient-secondary', streets[i].secondary);
			}
			if(isNight==1){
				root.style.setProperty('--red', streets[i].primary);
				root.style.setProperty('--bgradient-primary', streets[i].primary);
			}
		}
	}
}

function waitColors(){
	setTimeout(changeColors,300);
}

function generatePoems(){
	let thisActive=fullpage_api.getActiveSlide().item.id;
	let activeId=$("#" + thisActive);
	if(activeId.find(".poem").length > 0){
		let activePoem=$("#" + thisActive + " .poem p");
		activePoem.html("Turning into poetry...");
	let path = "/poem?blockId=" + fullpage_api.getActiveSlide().item.id; 
	fetch(path).then(response => {
		return response.json()
	}).then(r => {console.log('here') ; 
	let poemText=JSON.parse(r).text;
	let splitPoem=poemText.split("\n");
	let capLines=[];
	let capline;
	for(i=0;i<splitPoem.length;i++){
		capline=splitPoem[i].capitalize();
		capLines.push(capline);
	}
	
	let formatted=capLines.join("<div class='separator'></div>");
	activePoem.html(formatted);
	} );
	} else {console.log("doesn't exist")}
}

function disableScroll(){
	fullpage_api.setAllowScrolling(false);
	changeColors();
	displaybList();
	slowPoems();
}

function whenScroll(){
	waitColors();
	displaybList();
	slowPoems();
}

function displaybList(){
	let thisActive=fullpage_api.getActiveSlide().item.id;
	console.log(thisActive);
	let bArray=blockMap[""+thisActive];
	let bList = bArray.join("<div class='separator'></div>");

	let activeId=$("#" + thisActive);
	if(activeId.find(".poem").length > 0){
		let activePoem=$("#" + thisActive + " .poem p");
		activePoem.html("<i>On This Block...</i><br><br><br>" + bList);
	}
}

function slowPoems(){
	setTimeout(generatePoems, 3250);
}

function navClick(){
	poemLines=[];
	$(".navdown").click(function(){
		fullpage_api.moveSectionDown();
		whenScroll();
	});
	
	$(".navup").click(function(){
		fullpage_api.moveSectionUp();
		whenScroll();
	});
	
	$(".navleft").click(function(){
		fullpage_api.moveSlideLeft();
		whenScroll();
	});
	
	$(".navright").click(function(){
		fullpage_api.moveSlideRight();
		whenScroll();
	});
	}


sky();
loadContent();
aroundDiv();
navClick();
setTimeout(makeNight,500);
setTimeout(disableScroll,1000);
setInterval(makeNight,60000);
