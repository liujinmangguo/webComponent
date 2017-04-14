/* 柱图组件对象 */
var H5ComponentPolyline = function (name, cfg) {
	var component = new H5ComponentBase(name, cfg);

    var w = cfg.width/2;
    var h = cfg.height/2;

    // 底图层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = w;
	cns.height = h;
	component.append(cns);
	var eHeight = h/10;
	var eWidth = w/(cfg.data.length+1);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#eee";
    ctx.beginPath();
	for(var i=0; i<=10; i++){
		ctx.moveTo(0, eHeight*i);
		ctx.lineTo(w, eHeight*i);
	}
	for(var step=0; step<=cfg.data.length+1; step++){
		ctx.moveTo(eWidth*step,0);
		ctx.lineTo(eWidth*step,h);
	}
	ctx.stroke();

	// 输出项目文字
	
	for(var i =0; i<cfg.data.length; i++){
		var text = $('<div class="text"></div>');
		component.append(text);
		text.text(cfg.data[i][0]);
		text.css('width', eWidth+'px');
		text.css('left', (i+0.5)*eWidth+'px');

	}
	

    // 数据层
	cns = document.createElement('canvas');
	ctx = cns.getContext('2d');
	cns.width = w;
	cns.height = h;
	component.append(cns);

	var draw = function(per){
		ctx.clearRect(0,0,w,h);
		ctx.strokeStyle = "red";
		ctx.fillStyle = "pink";
		ctx.moveTo(eWidth,h);
	    for(step=1; step<=cfg.data.length; step++){
	    	ctx.lineTo(eWidth*step, h*(1-cfg.data[step-1][1]*per));
		}
		ctx.lineTo(eWidth*cfg.data.length,h)
		ctx.stroke();
		ctx.fill();
	    
	    for(step=1; step<=cfg.data.length; step++){
	    	ctx.fillStyle = "red";
	    	ctx.beginPath();
			ctx.arc(eWidth*step, h*(1-cfg.data[step-1][1]*per),3,0,Math.PI*2);
			ctx.closePath();
			ctx.fill();
		}
	}

	var s=0;
    component.on('onLeave', function(){
	    for(var i=0; i<100; i++){
    		setTimeout(function(){
    			s-=0.01
    			draw(s);
    		}, i*10);
    	}  	
    });
    component.on('onLoad', function(){
    	for(var i=0; i<100; i++){
    		setTimeout(function(){
    			s+=0.01
    			draw(s);
    		}, i*10)
    	}	
    });
    

    return component;
}

