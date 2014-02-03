window.onload = function(){  
    com.bg=new com.class.Bg();
    com.dot = new com.class.Dot();
    com.pane=new com.class.Pane();
    com.pane.isShow=false;
    
    com.childList=[com.bg,com.dot,com.pane];    
    com.mans     ={};       //棋子集合
    com.createMans(com.initMap)     //生成棋子  
    com.bg.show();
    // com.get("bnBox").style.display = "block";
};

$(document).click(function(e){
    var target = $(e.target);
    if(target.is('#startServer')){
        if (confirm("确认StartServer？")){
            // play.isPlay=true ;   
            play.init('red');
        }
    } else if(target.is('#connectServer')){
        $('#connect-modal').modal();
    } else if(target.is('#startConnect')){
        $('#connect-modal').modal('hide');
        play.init('black');
    } else if(target.is('#stypeBn')){
        // var stype =com.nowStype;
        // if (stype=="stype1") stype="stype2";
        // else if (stype=="stype2") stype="stype1";
        // com.init(stype);
        // com.show();
        // play.depth = 4;
        // play.init();
        // document.cookie="stype=" +stype;
        // clearInterval(timer);
        // var i=0;
        // var timer = setInterval(function (){
        //     com.show();
        //     if (i++>=5) clearInterval(timer);
        // },2000);
    } else if(target.is('#chess')){
        play.clickCanvas(e);
    }
});
    