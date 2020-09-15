import { GameUtil } from "./GameUtil";

export default class Bubble extends Laya.Sprite{
    public static EMOTION_IDLIST=[1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
    public static SKIN_LIST= ['#ff0000','#ff7d00','#ffff00','#00ff00','0000ff','00ffff','ff00ff'];
    public static TransformTime = 250;
    public static AddCircleByLevels = 10;
    public static AddLevelByBeans=1;
    public static AddSizeByCircle=5;
    public static AddSizeByLevel=2;
    public static InitSize=50;
    private _shapeSp:Laya.Sprite;
    //移动形状顶点列表
    private _moveShape:BubbleShape;
    //空闲形状顶点列表
    private _normalShape:BubbleShape;
    //临时缓存形状顶点列表
    private _tmpShape:BubbleShape;
    //当前形状
    private _curShape:BubbleShape;
    private _initBubbleSize:number;
    private _bubbleSize:number;
    private _isAI:boolean;
    //视野范围
    private _visionRange:number;
    //移动速度
    private _moveSpeed:number=5;
    //泡泡状态
    private _state:BubbleState=BubbleState.INVALID;
    //皮肤索引
    private _skinIndex:number;
    //形状变换标志位
    private _isTransforming:boolean;
    //形状变换完毕回调
    private _transformHandler:Laya.Handler;
    private _level:number;
    private _eatBeans:number;
    
    constructor(){
        super();
    }
    
    init(size:number,skin:number,isAI:boolean){
        this._shapeSp =  this._shapeSp || new Laya.Sprite();
        this.addChild(this._shapeSp);
        this._initBubbleSize = size;
        this._visionRange = size;
        this._skinIndex =skin;
        this._isAI = isAI;
        this._eatBeans=0;
        this.level=0;
        this.State = BubbleState.NORMAL;
    }

    private updateShape(size:number,deltaSize:number){
        let radius = size/2;
        if(this._normalShape == null){
            this._normalShape = new BubbleShape();
            [this._normalShape.startX,this._normalShape.startY,this._normalShape.ptList] = GameUtil.MakeRegularBubble(radius,radius,radius);
        }else if(this.State == BubbleState.NORMAL){
            //为了保持原形状居中,新尺寸下需要重新绘制
            this._normalShape.startX += deltaSize/2;
            this._normalShape.startY += deltaSize/2;
            this.draw(this._normalShape);
            let newShape = new BubbleShape();
            // GameUtil.MakeRRBubble(radius,radius,radius-deltaSize/2,radius) 
            // GameUtil.MakeIrregularBubble(radius,radius,radius-deltaSize,radius,-Math.PI*2/3) 
            [newShape.startX,newShape.startY,newShape.ptList] = GameUtil.MakeRegularBubble(radius,radius,radius);
            this.checkTransformShape(this._normalShape,newShape,Bubble.TransformTime,Laya.Ease.bounceOut,true);
            // newShape = new BubbleShape();
            // [newShape.startX,newShape.startY,newShape.ptList] = GameUtil.MakeRegularBubble(radius,radius,radius) //GameUtil.MakeRegularBubble(radius,radius,radius);
            // this.checkTransformShape(this._normalShape,newShape,Bubble.TransformTime,Laya.Ease.bounceOut,true);
            //同时更新其他形状
            [this._moveShape.startX,this._moveShape.startY,this._moveShape.ptList] = GameUtil.MakeBezierBubble(radius,radius,radius);
        }
        if(this._moveShape == null){
            this._moveShape =  new BubbleShape();
            [this._moveShape.startX,this._moveShape.startY,this._moveShape.ptList] = GameUtil.MakeBezierBubble(radius,radius,radius) //GameUtil.MakeBezierBubble(radius,radius,radius);
        }else if(this.State == BubbleState.MOVE){
            //为了保持原形状居中,新尺寸下需要重新绘制
            this._moveShape.startX += deltaSize/2;
            this._moveShape.startY += deltaSize/2;
            this.draw(this._moveShape);
            let newShape = new BubbleShape();
            [newShape.startX,newShape.startY,newShape.ptList] = GameUtil.MakeBezierBubble(radius,radius,radius);
            this.checkTransformShape(this._moveShape,newShape,Bubble.TransformTime,Laya.Ease.backOut,true);
            //同时更新其他形状
            [this._normalShape.startX,this._normalShape.startY,this._normalShape.ptList] = GameUtil.MakeRegularBubble(radius,radius,radius);
        }
        this._tmpShape = this._tmpShape || new BubbleShape();
    }

    public set bubbleSize(value:number){
        if(this.bubbleSize == value) return;
        let deltaSize = value-this.bubbleSize;
        this._bubbleSize = value;
        this.size(value,value)
        let halfSize = value/2;
        this.pivot(halfSize,halfSize);
        this._shapeSp.size(value,value);
        this._shapeSp.pivot(halfSize,halfSize);
        this._shapeSp.pos(halfSize,halfSize);
        this.updateShape(value,deltaSize);
    }

    public get bubbleSize():number{
        return this._bubbleSize;
    }

    public set eatBeans(value:number){
        this._eatBeans = value;
        this.level = Math.floor(value/Bubble.AddLevelByBeans);
    }

    public get eatBeans():number{
        return this._eatBeans;
    }

    public set level(value:number){
        this._level = Math.min(value,this.maxLevel);
        this.bubbleSize = this._initBubbleSize+ 2*(Bubble.AddSizeByLevel*this.level+this.circleNums*(Bubble.AddSizeByCircle-Bubble.AddSizeByLevel));
    }

    public get level():number{
        return this._level;
    }

    public getSizeByCircleNum(circleNum:number){
        return this._initBubbleSize+ 2*(circleNum*Bubble.AddCircleByLevels*Bubble.AddSizeByLevel+circleNum*(Bubble.AddSizeByCircle-Bubble.AddSizeByLevel));
    }

    /**
     * 根据等级获得外圈数量
     */
    public get circleNums():number{
        let circleNum = Math.floor(this.level/Bubble.AddCircleByLevels);
        return circleNum;
    }

    public get maxCircleNum():number{
        return Bubble.SKIN_LIST.length-1;
    }

    public get maxLevel():number{
        return this.maxCircleNum*Bubble.AddCircleByLevels
    }

    private draw(shape:BubbleShape){
        this._shapeSp.graphics.clear();
        let circleNums = this.circleNums;
        let outerColorIdx = (this._skinIndex+circleNums)%Bubble.SKIN_LIST.length;
        this._shapeSp.graphics.drawPoly(shape.startX,shape.startY,shape.ptList,Bubble.SKIN_LIST[outerColorIdx]);
        for(let i=circleNums-1;i>=0;--i){
            let size = this.getSizeByCircleNum(i);
            let colorIdx = (this._skinIndex+i)%Bubble.SKIN_LIST.length;
            this._shapeSp.graphics.drawCircle(this.bubbleSize/2,this.bubbleSize/2,size/2,Bubble.SKIN_LIST[colorIdx]);
        }
        //let pt1 = this._shapeSp.localToGlobal(new Laya.Point(this.bubbleSize/2,this.bubbleSize/2));
        //let pt2 = this.localToGlobal(new Laya.Point(this.bubbleSize/2,this.bubbleSize/2));
        //console.log("draw pt1 pt2 "+pt1+" "+pt2)
        //console.log("bull pos "+this.x+" "+this.y)
    }

    public set State(value:BubbleState){
        if(this.State == value) return;
        if(this._state == BubbleState.INVALID && value == BubbleState.NORMAL){
            this._curShape = this._normalShape;
            this.draw(this._normalShape);    
        }else{
            this.checkTransformShape(this.getShape(this._state),this.getShape(value),Bubble.TransformTime,Laya.Ease.backOut);
        }
        this._state = value;
    }

    public get State():BubbleState{
        return this._state;
    }

    public getShape(state:BubbleState):BubbleShape{
        if(state == BubbleState.NORMAL){
            return this._normalShape;
        }else if(state == BubbleState.MOVE){
            return this._moveShape;
        }
        return null;
    }

    public get bubbleRotation():number{
        return this._shapeSp.rotation;
    }

    public set bubbleRotation(value:number){
        this._shapeSp.rotation = value;
    }

    public checkTransformShape(srcShape:BubbleShape,dstShape:BubbleShape,totalTime:number, easeFunc:Function,overrite:boolean=false){
        //如果正在变形中,下次变形放在延迟Handler里处理,等上一个变形完再接着执行下次变形,只延迟处理一次变形
        if(this._transformHandler) return;
        if(this._isTransforming){
            this._transformHandler = Laya.Handler.create(this,this.onTransformComplete,[dstShape,totalTime,easeFunc,overrite]);
        }else{
            this.transformShape(srcShape,dstShape,totalTime,easeFunc,overrite);
        }
    }

    private onTransformComplete(dstShape:BubbleShape,totalTime:number, easeFunc:Function,overrite:boolean=false,srcShape:BubbleShape){
        this.transformShape(srcShape,dstShape,totalTime,easeFunc,overrite);
    }

    public async transformShape(srcShape:BubbleShape,dstShape:BubbleShape,totalTime:number, easeFunc:Function,overrite:boolean=false){
        if(srcShape.ptList.length != dstShape.ptList.length){
            console.error("两个形状顶点数量不一致!");
            return;
        }
        if(this._isTransforming){
            console.warn("正在变形中,不能再次变形")
            return;
        }
        this._isTransforming=true;
        let step = 30;
        let startTime=0;
        let count = srcShape.ptList.length;
        let srcX = srcShape.startX;
        let srcY = srcShape.startY;
        let dstX = dstShape.startX;
        let dstY = dstShape.startY;
        while(this._isTransforming){
            await GameUtil.wait(step);
            startTime+= step;
            let startX = easeFunc(startTime,srcX,dstX-srcX,totalTime);
            let startY = easeFunc(startTime,srcY,dstY-srcY,totalTime);
            let list =[]
            for(let i=0;i<count;i+=2){
                let x = easeFunc(startTime,srcShape.ptList[i]+srcX,dstShape.ptList[i]+dstX-srcShape.ptList[i]-srcX,totalTime)-startX;
                let y = easeFunc(startTime,srcShape.ptList[i+1]+srcY,dstShape.ptList[i+1]+dstY-srcShape.ptList[i+1]-srcY,totalTime)-startY;
                list.push(x);
                list.push(y);
            }
            this._tmpShape.startX = startX;
            this._tmpShape.startY=startY;
            this._tmpShape.ptList = list;
            this.draw(this._tmpShape);
            if(startTime >= totalTime){
                if(overrite){
                    srcShape.startX = dstShape.startX;
                    srcShape.startY = dstShape.startY;
                    srcShape.ptList = dstShape.ptList;
                    this._curShape = srcShape;
                }else{
                    this._curShape = dstShape;
                }
                this._isTransforming=false;
                if(this._transformHandler){
                    this._transformHandler.runWith(this._curShape);
                    this._transformHandler=null;
                }
                break;
            }
        }
    }

    public startMove(targetX:number,targetY:number){
        this.State = BubbleState.MOVE;
        this.bubbleRotation= Math.atan2(targetY-this.y,targetX-this.x)*180/Math.PI;
    }

    public stopMove(){
        this.State = BubbleState.NORMAL;
    }

    public get isMoving():boolean{
        return this.State == BubbleState.MOVE;
    }
    // time:number=0;
    public update(){
        // if(this.time++ % 120 == 0){
        //     this.bubbleSize += 10;
        // }
        if(this.isMoving){
            this.updateMove();
        }
        //this.autoRotate();
    }

    private autoRotate(){
        this.rotation += 2;
    }

    private updateMove(){
        var radians = this.bubbleRotation*Math.PI/180;
        var xOffset = Math.cos(radians)*this._moveSpeed;
        var yOffset = Math.sin(radians)*this._moveSpeed;
        this.x += xOffset;
        this.y += yOffset;
    }

    private playEatAnim(){
        Laya.Tween.clearAll(this._shapeSp);
        this.scale(1,1);
        Laya.Tween.from(this._shapeSp,{scaleX:1.3,scaleY:0.7},500,Laya.Ease.backOut);
    }

}

export class BubbleFactory{
    public static SIGN_BUBBLE = "POOL_BUBBLE"; 
    public static Create(size:number,skin:number,isAI:boolean){
        let b = Laya.Pool.getItemByClass(this.SIGN_BUBBLE,Bubble);
        b.init(size,skin,isAI);
        return b;
    }
    public static Recycle(bubble:Bubble){
        Laya.Pool.recover(this.SIGN_BUBBLE,bubble);
    }

}

class BubbleShape{
    startX:number;
    startY:number;
    ptList:number[]
}

export enum BubbleState{
    INVALID,
    NORMAL,
    MOVE,
    SPIKE,//刺球形状
    SPIKE2 //边缘光滑的刺球
}