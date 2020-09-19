

export class GameUtil{

    /**
     * 构造圆形泡泡的顶点列表
     * @param centerX 
     * @param centerY 
     * @param radius 
     * @param vtCount 
     */
    public static MakeRegularBubble(centerX,centerY,radius,vtCount=512){
        var points = vtCount; //多边形边的总数目
        var twoPi = 2 * Math.PI;
        var ptList = [];
        var theta = -Math.PI*2/3;
        var x0, y0;
        x0 = centerX + radius * Math.cos(theta);
        y0 = centerY + radius * Math.sin(theta);
        for (var i = 0; i < points; i++) {
            theta += twoPi / points;
            let x = centerX + radius * Math.cos(theta)-x0;
            let y = centerY + radius * Math.sin(theta)-y0;
            ptList.push(x);
            ptList.push(y);
        }
        return [x0,y0,ptList];
    }

    /**
     * 构造一边圆形另一边贝塞尔曲线形状泡泡的顶点列表
     * 模拟泡泡移动拖尾变形
     * @param centerX 
     * @param centerY 
     * @param radius 
     * @param xOffset 
     * @param yOffset 
     * @param vtCount 
     */
    public static MakeBezierBubble(centerX,centerY,radius,xOffset=0,yOffset=0,vtCount=512){
        var points = vtCount; //多边形边的总数目
        var twoPi = 2 * Math.PI;
        var ptList = [];
        var theta = -Math.PI*2/3;
        var x0, y0;
        x0 = centerX + radius * Math.cos(theta);
        y0 = centerY + radius * Math.sin(theta);
        //圆形这边半径稍微加些偏移,模拟捏扁
        let ptCount1 = Math.floor(points*2/3);
        for (var i = 0; i < ptCount1; i++) {
            theta += twoPi / points;
            let offset = 0;//Math.sin((i+1)*Math.PI/ptCount1)*radius;
            let x = centerX + (radius+offset) * Math.cos(theta)-x0;
            let y = centerY + (radius+offset) * Math.sin(theta)-y0;
            ptList.push(x);
            ptList.push(y);
        }
        //另外一半用曲线绘制
        let x1 = ptList[ptList.length-2]+x0;
        let y1 = ptList[ptList.length-1]+y0;
        let x3 = x0;
        let y3 = y0;
        let x2 = x1-2*radius+xOffset;
        let y2 = (y1+y3)/2+yOffset;
        let ptCount2 = points-ptCount1;
        for(let i=0;i<ptCount2;++i){
            let percent = i/(ptCount2);
            let x = this.getBezieratX(x1,x2,x3,percent)-x0;
            let y = this.getBezieratY(y1,y2,y3,percent)-y0;
            ptList.push(x);
            ptList.push(y);
        }
        return [x0,y0,ptList];
    }

    /**
     * 构造随机半径毛边泡泡顶点列表
     * 模拟刺球
     */
    public static MakeRRBubble(centerX, centerY, minRad, maxRad,vtCount=512){
        var points = vtCount; //多边形边的总数目
        var rad, theta;
        var twoPi = 2 * Math.PI;
        var x0, y0; 
        theta = -Math.PI*2/3;
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
        return [x0,y0,ptList];
    }

    /**
     * 构造不规则圆形泡泡:比刺球边缘更平缓
     * @param centerX 
     * @param centerY 
     * @param minRad 
     * @param maxRad 
     * @param phase 
     */
    public static MakeIrregularBubble(centerX, centerY, minRad, maxRad, phase){
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
        return [x0,y0,ptList]
    }


    private static  setLinePoints(iterations) {
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

    /**
     * 返回等待promise对象,方便await使用,单位ms
     * @param time 
     */
    public static wait(time){
        return new Promise((resolve)=>{
            Laya.timer.once(time,this,()=>{
                resolve();
            })
        });
    } 

    public static getBezieratX(x0:number,x1:number,x2:number, t: number): number {
		t = Math.min(t, 1);
		let target: number;
		target = Math.pow(1 - t, 2) * x0 + 2 * t * (1 - t) * x1 + Math.pow(t, 2) * x2;
		return target;
    }
    
    public  static getBezieratY(y0:number,y1:number,y2:number, t: number): number {
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
     public static gradientColors(start, end, steps, gamma?) {
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

    private static parseColor(hexStr) {
		return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); })
	};
	private static pad(s) {
		return (s.length === 1) ? '0' + s : s;
    }
    
    public static powerDistance(x1,y1,x2,y2){
        return Math.pow(x2-x1,2)+Math.pow(y2-y1,2);
    }

    public static clamp(value:number,min:number,max:number):number{
        return value<min?min: value>max?max:value;
    }
    /**
     * 把时间格式化: 分:秒
     * @param time 单位s
     */
    public static fmtTime(seconds:number){
        let min = Math.floor(seconds/60);
        let sec = seconds % 60;
        let minStr = min<10? `0${min}`:min;
        let secStr = sec<10? `0${sec}`:sec;
        return `${minStr}:${secStr}`;
    }

}