/**
 * Created by ksong on 2016/7/14.
 */
var canvas, ctx,step=0;
var lines = ["rgba(54,122,236, 0.5)",  
                       "rgba(54,122,236, 0.9)",  
                       "rgba(54,122,236, 0.7)"];  
var boHeight;
var posHeight;
function initCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = canvas.parentNode.offsetWidth;  
    canvas.height = 200;
    ctx = canvas.getContext("2d");
    boHeight = canvas.height /6 ;
    posHeight = canvas.height /2;
}
 window.requestAnimFrame = (function(){  
        return  window.requestAnimationFrame       ||  
                window.webkitRequestAnimationFrame ||  
                window.mozRequestAnimationFrame    ||  
                function( callback ){  
                  window.setTimeout(callback, 1000 / 60);  
                };  
        })();  
function loop(){  
            ctx.clearRect(0,0,canvas.width,canvas.height);  
            step++;  
           
            for(var j = lines.length - 1; j >= 0; j--) {  
                ctx.fillStyle = lines[j];  
               
                var angle = (step+j*50)*Math.PI/180;  
                var deltaHeight   = Math.sin(angle) * boHeight;
                var deltaHeightRight   = Math.cos(angle) * boHeight;  
                ctx.beginPath();
                ctx.moveTo(0, posHeight+deltaHeight);  
                ctx.bezierCurveTo(canvas.width/2, posHeight+deltaHeight-boHeight, canvas.width / 2, posHeight+deltaHeightRight-boHeight, canvas.width, posHeight+deltaHeightRight);  
                ctx.lineTo(canvas.width, canvas.height);  
                ctx.lineTo(0, canvas.height);  
                ctx.lineTo(0, posHeight+deltaHeight);  
                ctx.closePath();  
                ctx.fill();  
            }
            requestAnimFrame(loop);
        }  

function init()  {
	initCanvas();
        loop(); 
};
function resize() {
	initCanvas();
}
var addListener = function (e, str, func) {
    if (e.addEventListener) {
        e.addEventListener(str, func, false);
    } else if (e.attachEvent) {
        e.attachEvent("on" + str, func);
    }
};
addListener(window, "load", init);
addListener(window, "resize", resize);



