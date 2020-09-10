export default class test extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    
    constructor() { super(); }
    private _graphic:Laya.Graphics;
    private _sp:Laya.Sprite;
    private _bubbleSp:Laya.Sprite;
    private _anim:Laya.Animation;
    private _offset=50;
    private _itemList:Laya.Sprite[];
    private _curRotation:number=0;
    onEnable(): void {
        console.log("enable script")
        this._bubbleSp = new Laya.Sprite();
        this._bubbleSp.size(50,50);
        this._bubbleSp.pivot(25,25);
        this.owner.addChild(this._bubbleSp);
        this._sp= new Laya.Sprite();
        this._sp.size(50,50);
        this._sp.pivot(25,25);
        this._sp.pos(25,25);
        this._bubbleSp.addChild(this._sp);

        this._bubbleSp.pos(200,100);
        this._graphic = this._sp.graphics;  
        this._anim = new Laya.Animation();
        this._anim.loadAnimation("chat/anim/emoji_1.ani",Laya.Handler.create(this,()=>{
            let bound = this._anim.getGraphicBounds();
            //this._anim.size(165,165);
            this._anim.pivot(bound.x+bound.width/2,bound.y+bound.height/2)
            let scale = Math.min(50/bound.width,50/bound.height);
            this._anim.scale(0.3,0.3);
            this._anim.pos(25,25);
            //this._anim.graphics.drawCircle(bound.width/2,bound.height/2,bound.height/2,'#0000ff');
        }),"res/atlas/chat/emoji.atlas"); 
        this._anim.autoPlay=true;
        this._bubbleSp.addChild(this._anim); 

        // let anim = new Laya.Animation();
        // anim.loadAnimation("chat/anim/emoji_1.ani",Laya.Handler.create(this,()=>{
        //     let bound = anim.getGraphicBounds();
        //     console.log("anim222 w h"+bound.width+" "+bound.height)
        // }),"res/atlas/chat/emoji.atlas"); 
        // anim.autoPlay=true;
        // Laya.stage.addChild(anim); 

        this.drawMove(25,25,25,0);
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onTouchDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onTouchUp);
        this.initItems();
        this.drawCircle(300,200,50,60);
        this.drawCircleEx(800,400,40,60,0);

        let targetRotation = Math.atan2(200-100,100-200)*180/Math.PI;
        console.log("target r "+targetRotation)
        targetRotation = Math.atan2(100-200,100-200)*180/Math.PI;
        console.log("target r "+targetRotation)
    }

    initItems(){
        let colorList = this.gradientColors("#ff0000","#0000ff",100);
        this._itemList = [];
        for(let i=0;i<100;++i){
            let size = 5+Math.floor(Math.random()*10)
            let colorIdx = 1+ Math.floor(Math.random()*colorList.length-2);
            let x = Math.random()*Laya.stage.width;
            let y = Math.random()*Laya.stage.height;
            let sp = new Laya.Sprite();
            sp.size(size,size);
            sp.pivot(size/2,size/2);
            sp.graphics.drawCircle(size/2,size/2,size/2,colorList[colorIdx]);
            this._itemList.push(sp);
            sp.pos(x,y);
            Laya.stage.addChild(sp);

        }
    }

    lastMousePosX:number;
    lastMousePosY:number;
    curMouseX:number;
    curMouseY:number;
    onTouchDown(){
        this.drawMove(25,25,25,this._offset);
        this.lastMousePosX=Laya.stage.mouseX;
        this.lastMousePosY=Laya.stage.mouseY;
        this._sp.rotation = Math.atan2(this.lastMousePosY-this._bubbleSp.y,this.lastMousePosX-this._bubbleSp.x)*180/Math.PI;
        this._curRotation = this._sp.rotation;
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        Laya.timer.loop(30,this,this.onBallMove);
    }

    onTouchMove(){
        this.curMouseX = Laya.stage.mouseX;
        this.curMouseY = Laya.stage.mouseY;
        let targetRotation = Math.atan2(this.curMouseY-this.lastMousePosY,this.curMouseX-this.lastMousePosX)*180/Math.PI;
        //console.log("targetRotation "+targetRotation);
        let targetR = Math.floor(targetRotation);
        this._sp.rotation = targetR;
        // if(targetRotation != 0){
        //     let delta = targetRotation-this._curRotation;
        //     this._curRotation += delta*0.5;
        //     this._curRotation = Math.abs(this._curRotation) > 180 ? (this._curRotation > 0 ? this._curRotation - 360 : this._curRotation + 360) : this._curRotation;
        //     this._sp.rotation =this._curRotation;
        // }

        // console.log(this._sp.rotation)
        //this.lastMousePosX =this.curMouseX;
        //this.lastMousePosY = this.curMouseY;
    }

    onTouchUp(){
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        Laya.timer.clear(this,this.onBallMove);
        this.tweenNormal();
        //this.resetNormal();
    }

    playScaleAnim(){
        Laya.Tween.clearAll(this._sp);
        this._sp.scale(1,1);
        Laya.Tween.from(this._sp,{scaleX:1.3,scaleY:0.7},500,Laya.Ease.backOut);
        //随机切换动画
        let list= [1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
        let idx = Math.floor(Math.random()*list.length);
        this._anim.loadAnimation(`chat/anim/emoji_${list[idx]}.ani`,null,"res/atlas/chat/emoji.atlas");
    }

    tweenNormal(){
        Laya.timer.loop(30,this,this._doTweenNormal);
    }

    _doTweenNormal(){
        this._offset-=10;
        let flag= this.drawMove(25,25,25,this._offset);
        if(!flag){
            Laya.timer.clear(this,this._doTweenNormal);
            this._offset = 50;
        }
    }

    resetNormal(){
        this.drawMove(25,25,25,0);
    }

    onBallMove(){
        var speed = 5;
        var radians = this._sp.rotation*Math.PI/180;
        var xOffset = Math.cos(radians)*speed;
        var yOffset = Math.sin(radians)*speed;
        this._bubbleSp.x += xOffset;
        this._bubbleSp.y += yOffset;
        let delList =[];
        for(let item in this._itemList){
            let sp = this._itemList[item];
            if(this.powDistance(this._bubbleSp.x,this._bubbleSp.y,sp.x,sp.y) <= Math.pow(sp.width/2+this._sp.width/2+5,2)){
                // console.log("吃小球");
                delList.push(sp);
                sp.removeSelf();
                this.playScaleAnim();
            }
        }
        delList.forEach(element => {
            let index = this._itemList.indexOf(element);
            index !=-1 && this._itemList.splice(index,1);
        });
        // console.log(`还剩${this._itemList.length}个小球`);
    }

    powDistance(x1,y1,x2,y2){
        return Math.pow(x2-x1,2)+Math.pow(y2-y1,2);
    }



    drawMove(centerX, centerY, rad, offset){
        var points = 512; //多边形边的总数目
        var twoPi = 2 * Math.PI;
        var ptList = [];
        var theta = -Math.PI*2/3;
        var x0, y0;
        x0 = centerX + rad * Math.cos(theta);
        y0 = centerY + rad * Math.sin(theta);
        let flag;
        if(offset > rad/2){
            for (var i = 0; i < points*2/3; i++) {
                theta += twoPi / points;
                let x = centerX + rad * Math.cos(theta)-x0;
                let y = centerY + rad * Math.sin(theta)-y0;
                ptList.push(x);
                ptList.push(y);
            }
            //另外一半用曲线绘制
            let x1 = ptList[ptList.length-2]+x0;
            let y1 = ptList[ptList.length-1]+y0;
            let x3 = ptList[0]+x0;
            let y3 = ptList[1]+y0;
            let x2 = x1-offset;
            let y2 = (y1+y3)/2;
            for(let i=0;i<=points/3;++i){
                let percent = i/(points/3);
                let x = this.getBezieratX(x1,x2,x3,percent)-x0;
                let y = this.getBezieratY(y1,y2,y3,percent)-y0;
                ptList.push(x);
                ptList.push(y);
            }
            flag=true;
        }else{
            for (var i = 0; i < points; i++) {
                theta += twoPi / points;
                let x = centerX + rad * Math.cos(theta)-x0;
                let y = centerY + rad * Math.sin(theta)-y0;
                ptList.push(x);
                ptList.push(y);
            }
            flag =false;
        }
        this._graphic.clear();
        this._graphic.drawPoly(x0,y0,ptList,'#ff0000','#ffff00',2);    
        return flag;
    }

    setLinePoints(iterations) {
        var pointList:any = {};
        pointList.first = {
            x: 0,
            y: 1
        };
        var lastPoint = {
            x: 1,
            y: 1
        }
        var minY = 1;
        var maxY = 1;
        var point;
        var nextPoint;
        var dx, newX, newY;
     
        pointList.first.next = lastPoint;
        for (var i = 0; i < iterations; i++) {
            point = pointList.first;
            while (point.next != null) {
                nextPoint = point.next;
     
                dx = nextPoint.x - point.x;
                newX = 0.5 * (point.x + nextPoint.x);
                newY = 0.5 * (point.y + nextPoint.y);
                newY += dx * (Math.random() * 2 - 1);
     
                var newPoint:any = {
                    x: newX,
                    y: newY
                };
     
                //min, max
                if (newY < minY) {
                    minY = newY;
                } else if (newY > maxY) {
                    maxY = newY;
                }
     
                //put between points
                newPoint.next = nextPoint;
                point.next = newPoint;
     
                point = nextPoint;
            }
        }
     
        var normalizeRate = 1 / (maxY - minY);
        point = pointList.first;
        while (point != null) {
            point.y = normalizeRate * (point.y - minY);
            point = point.next;
        }
     
        return pointList;
    }

    drawCircle(centerX, centerY, minRad, maxRad){
        var points = 512; //多边形边的总数目
        var rad, theta;
        var twoPi = 2 * Math.PI;
        var x0, y0; 
        theta = 0;
        rad =  minRad + Math.random() * (maxRad - minRad); 
        var ptList = [];
        x0 = centerX + rad * Math.cos(theta);
        y0 = centerY + rad * Math.sin(theta);
        for (var i = 0; i < points; i++) {
            theta += twoPi / points;
            rad = minRad + Math.random() * (maxRad - minRad); //随机半径
            let x = centerX + rad * Math.cos(theta)-x0;
            let y = centerY + rad * Math.sin(theta)-y0;
            ptList.push(x);
            ptList.push(y);
        }
        Laya.stage.graphics.drawPoly(x0,y0,ptList,'#00ff00');
    }

    drawCircleEx(centerX, centerY, minRad, maxRad, phase) {
        var point;
        var rad, theta;
        var twoPi = 2 * Math.PI;
        var x0, y0;
        var ptList = [];
        //生成分形细分顶点链表，用来获取随机半径, 9次迭代将返回512个顶点。
        var pointList = this.setLinePoints(9);
        point = pointList.first;
        theta = phase;
        rad = minRad + point.y * (maxRad - minRad);
        x0 = centerX + rad * Math.cos(theta);
        y0 = centerY + rad * Math.sin(theta);
        while (point.next != null) {
            point = point.next;
            theta = twoPi * point.x + phase;
            rad = minRad + point.y * (maxRad - minRad);
            let x = centerX + rad * Math.cos(theta)-x0;
            let y = centerY + rad * Math.sin(theta)-y0;
            ptList.push(x);
            ptList.push(y);
        }
        Laya.stage.graphics.drawPoly(x0,y0,ptList,'#ffff00');
    }
    
    public  getBezieratX(x0:number,x1:number,x2:number, t: number): number {
		t = Math.min(t, 1);
		let target: number;
		target = Math.pow(1 - t, 2) * x0 + 2 * t * (1 - t) * x1 + Math.pow(t, 2) * x2;
		return target;
    }
    
    public  getBezieratY(y0:number,y1:number,y2:number, t: number): number {
		t = Math.min(t, 1);
		let target: number;
		target = Math.pow(1 - t, 2) * y0 + 2 * t * (1 - t) * y1 + Math.pow(t, 2) * y2;
		return target;
	}

	/**
	  * 获取从开始颜色到结束颜色的简便颜色数组
	  * @param start 开始颜色
	  * @param end 结束颜色
	  * @param steps 要分的份数
	  * @param gamma 
	  */
     public  gradientColors(start, end, steps, gamma?) {
		var i, j, ms, me, output = [], so = [];
		gamma = gamma || 1;
		var normalize = function (channel) {
			return Math.pow(channel / 255, gamma);
		};
		start = this.parseColor(start).map(normalize);
		end = this.parseColor(end).map(normalize);
		for (i = 0; i < steps; i++) {
			ms = i / (steps - 1);
			me = 1 - ms;
			for (j = 0; j < 3; j++) {
				so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
			}
			output.push('#' + so.join(''));
		}
		return output;
    }
    
    private  parseColor(hexStr) {
		return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); })
	};
	private  pad(s) {
		return (s.length === 1) ? '0' + s : s;
	}

    onDisable(): void {
        console.log("disable script")
    }
}