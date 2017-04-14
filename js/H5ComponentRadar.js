/* 雷达图组件对象 */
var H5ComponentRadar = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);
	var w = cfg.width/2;
	var h = cfg.height/2;

	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = w;
	cns.height = h;
	component.append(cns);

    var r = w/2;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#eee";
	ctx.arc(r,r,r, 0, Math.PI*2);
	ctx.stroke()

	// 圆周上的坐标
	// rad=2*Math.PI/360 * 360/step *i
	// x=a+Math.sin(rad)*r
	// y=b+Math.cos(rad)*r
	// 绘制网格背景
	var isBlue = false;
	for(var s=10; s>0; s--){
		var step = cfg.data.length;
		ctx.beginPath()
	    for(var i=0; i<step; i++){
	    	var rad = 2*Math.PI/360 * 360/step *i;
	    	var x=r+Math.sin(rad)*r*(s/10);
	    	var y=r+Math.cos(rad)*r*(s/10);
	    	ctx.lineTo(x,y);
	    }
	    ctx.closePath()
	    ctx.fillStyle = (isBlue = !isBlue)? "#99c0ff":"#f1f9ff";
	    ctx.fill();
	}

	// 绘制伞骨图
	ctx.beginPath()
    for(var i=0; i<step; i++){
    	var rad = 2*Math.PI/360 * 360/step *i;
    	var x=r+Math.sin(rad)*r;
    	var y=r+Math.cos(rad)*r;
    	ctx.moveTo(r,r);
    	ctx.lineTo(x,y);
    	// 输出项目文字
    	var text = $('<div class="text"></div>');
    	component.append(text);
    	text.text(cfg.data[i][0]);
    	if(x>r){
    		text.css('left', x+'px');
    	}else{
    		text.css('right', (w-x)+'px');
    	}
    	if(y>r){
    		text.css('top', y+'px');
    	}else{
    		text.css('bottom', (h-y)+'px');
    	}
    	if(cfg.data[i][2]){
			text.css('color', cfg.data[i][2]) ;
    	}else{
    		text.css('color', 'blue');
    	}
    	text.css('transition', 'all .5s '+i*.1+'s');
    	text.css('opacity','0');
    }
	ctx.strokeStyle = "#e0e0e0";
	ctx.stroke();

    // 数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = w;
    cns.height = h;
    component.append(cns);
    var draw = function(per){
    	if(per<1){
    		component.find('.text').css('opacity','0');
    	}
    	if(per>=1){
    		component.find('.text').css('opacity','1');
    	}
    	ctx.clearRect(0,0,w,h);
	    // 输出折线
	    ctx.beginPath();	    
	    ctx.strokeStyle = "red";
	    for(var i=0; i<step; i++){
	    	var rate = cfg.data[i][1] * per;
	    	var rad = 2*Math.PI/360 * 360/step *i;
	    	var x=r+Math.sin(rad)*r*rate;
	    	var y=r+Math.cos(rad)*r*rate;
	    	ctx.lineTo(x,y);
	    }
	    ctx.closePath();
		ctx.stroke();
		 
	    ctx.fillStyle = "yellow";
	    for(var i=0; i<step; i++){
	    	var rate = cfg.data[i][1];
	    	var rad = 2*Math.PI/360 * 360/step *i;
	    	var x=r+Math.sin(rad)*r*rate * per;
	    	var y=r+Math.cos(rad)*r*rate * per;
	    	ctx.beginPath();
	    	ctx.arc(x,y,5,0,Math.PI*2);
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

