let broadway={name:"broadway",primary:"#919191",secondary:"white"};
let state={name:"state",primary:"#80aaff",secondary:"#d5e9ff"};
let wall={name:"wall", primary:"#ffdc5f",secondary:"#fff8de"};
let bowlingGreen={name:"bowling-green", primary:"#75c998",secondary:"#d1ffdc"};
let batteryPl={name:"battery-pl", primary:"#ffb19e",secondary:"#ffe2db"};
let bridge={name:"bridge", primary:"#dff2a5",secondary:"#f7ffde"};
let pearl={name:"pearl", primary:"#f0eee9",secondary:"#fffdf7"};
let whitehall={name:"whitehall", primary:"#eeabff",secondary:"#fcf0ff"};

let blocks=[broadway, state, wall, bowlingGreen, batteryPl, bridge, pearl, whitehall];

for (i=0;i<blocks.length;i++){
    // console.log(blocks[i].name);
    let thisBlock=$("." + blocks[i].name);
    thisBlock.css({"box-shadow":"0px 0px 3px" + blocks[i].primary});
    thisBlock.attr("data-color",blocks[i].primary);
}

$(".block").each(function(){
    console.log($(this).attr("id")!="enter")
    if($(this).attr("id")!="enter"){
    $(this).append("<p class='street-name'>" + $(this).attr("data-type") + "</p>");
    $(this).mouseover(function(){
        $(this).css("background-color",$(this).attr("data-color"));
    })
    $(this).mouseout(function(){
        $(this).css("background-color","transparent");
    })
    }
})