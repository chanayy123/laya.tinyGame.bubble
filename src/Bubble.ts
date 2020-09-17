
import { GameUtil } from "./GameUtil";
import { Obstacle, ObstacleFactory } from "./Obstacle";

export default class Bubble extends Laya.Sprite{
    public static EMOTION_IDLIST=[1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
    public static SKIN_LIST= ['#ff0000','#ff7d00','#ffff00','#00ff00','0000ff','00ffff','ff00ff'];
    public static TransformTime = 250;
    public static AddCircleByLevels = 10;
    public static AddLevelByBeans=1;
    public static AddSizeByCircle=2;
    public static AddSizeByLevel=1;
    public static InitSize=50;
    private _shapeSp:Laya.Sprite;
    //移动形状顶点列表
    private _moveShape:BubbleShape;
    //空闲形状顶点列表
    private _normalShape:BubbleShape;
    //击杀对方形状顶点列表
    private _killShape:BubbleShape;
    //临时缓存形状顶点列表
    private _tmpShape:BubbleShape;
    //当前形状
    private _curShape:BubbleShape;
    private _initBubbleSize:number;
    private _bubbleSize:number;
    private _isAI:boolean;
    //视野范围
    private _visionRange:number;
    private _visionBubbleList:Bubble[];
    private _visionObsList:Obstacle[];
    //移动速度
    private _moveSpeed:number=10;
    //移动范围
    private _moveBoundary:Laya.Point;
    //距上一帧的移动偏移量
    private _moveDelta:Laya.Point;
    //泡泡状态
    private _state:BubbleState=BubbleState.INVALID;
    //皮肤索引
    private _skinIndex:number;
    //形状变换标志位
    private _isTransforming:boolean;
    private _level:number;
    private _eatBeans:number;
    private _starShapeSp:Laya.Sprite;
    //AI泡泡追踪目标
    private _aimTarget:Laya.Sprite;
    
    constructor(){
        super();
    }
    
    init(size:number,skin:number,isAI:boolean){
        this._shapeSp =  this._shapeSp || new Laya.Sprite();
        this.addChild(this._shapeSp);
        this.initStar(skin);
        this._initBubbleSize = size;
        this._visionRange = Laya.stage.width;
        this._skinIndex =skin;
        this._isAI = isAI;
        this._eatBeans=0;
        this.level=0;
        this.setMoveDelta(0,0);
        this.State = BubbleState.NORMAL;
    }

    initStar(skinIdx:number){
        this._starShapeSp = this._starShapeSp || new Laya.Sprite();
        let size = 260;
        let halfSize = size/2;
        let path= [];
        path.push(0, -130);//五角星A点坐标
        path.push(33, -33);//五角星B点坐标
        path.push(130, -30);//五角星C点坐标
        path.push(55, 32);//五角星D点坐标
        path.push(85, 130);//五角星E点坐标
        path.push(0, 73);//五角星F点坐标
        path.push(-85, 130);//五角星G点坐标
        path.push(-55, 32);//五角星H点坐标
        path.push(-130, -30);//五角星I点坐标
        path.push(-33, -33);//五角星J点坐标
        this._starShapeSp.graphics.clear();
        this._starShapeSp.size(size,size);
        this._starShapeSp.pivot(halfSize,halfSize+10);
        let idx = (skinIdx+1)%Bubble.SKIN_LIST.length;
        this._starShapeSp.graphics.drawPoly(halfSize,halfSize,path,Bubble.SKIN_LIST[2]);
    }

    showStar(centerX,centerY,size){
        this.addChild(this._starShapeSp);
        this._starShapeSp.pos(centerX,centerY);
        this._starShapeSp.scale(size/320,size/320);
    }

    private updateShape(size:number,deltaSize:number){
        let radius = size/2;
        this._killShape = this._killShape || new BubbleShape(BubbleState.SPIKE,radius,radius,radius);
        if(this._normalShape == null){
            this._normalShape = new BubbleShape(BubbleState.NORMAL,radius,radius,radius);
            [this._normalShape.startX,this._normalShape.startY,this._normalShape.ptList] = GameUtil.MakeRegularBubble(radius,radius,radius);
        }else if(this.State == BubbleState.NORMAL){
            //为了保持原形状居中,新尺寸下需要重新绘制
            this._normalShape.startX += deltaSize/2;
            this._normalShape.startY += deltaSize/2;
            this.draw(this._normalShape);
            let oldShape = this._normalShape;
            let newShape = new BubbleShape(BubbleState.NORMAL,radius,radius,radius);
            [newShape.startX,newShape.startY,newShape.ptList] = GameUtil.MakeRegularBubble(radius,radius,radius);
            this.checkTransformShape(oldShape,newShape,Bubble.TransformTime,this.getEaseFun(this.State,this.State));
            //不用等动画完成,直接更新形状数据
            this._normalShape = newShape;
            this._moveShape.centerX = this._moveShape.centerY = this._moveShape.radius = radius;
            [this._moveShape.startX,this._moveShape.startY,this._moveShape.ptList] = GameUtil.MakeBezierBubble(radius,radius,radius);
            this._killShape.centerY = this._killShape.centerY = this._killShape.radius = radius;
            [this._killShape.startX,this._killShape.startY,this._killShape.ptList] = GameUtil.MakeRRBubble(radius,radius,radius,radius+radius*0.2);
        }
        if(this._moveShape == null){
            this._moveShape =  new BubbleShape(BubbleState.MOVE,radius,radius,radius);
            [this._moveShape.startX,this._moveShape.startY,this._moveShape.ptList] = GameUtil.MakeBezierBubble(radius,radius,radius) //GameUtil.MakeBezierBubble(radius,radius,radius);
        }else if(this.State == BubbleState.MOVE){
            //为了保持原形状居中,新尺寸下需要重新绘制
            this._moveShape.startX += deltaSize/2;
            this._moveShape.startY += deltaSize/2;
            this.draw(this._moveShape);
            let oldShape = this._moveShape;
            let newShape = new BubbleShape(BubbleState.MOVE,radius,radius,radius);
            [newShape.startX,newShape.startY,newShape.ptList] = GameUtil.MakeBezierBubble(radius,radius,radius);
            this.checkTransformShape(oldShape,newShape,Bubble.TransformTime,this.getEaseFun(this.State,this.State));
            //不用等动画完成,直接更新形状数据
            this._moveShape = newShape;
            this._normalShape.centerX = this._normalShape.centerY = this._normalShape.radius = radius;
            [this._normalShape.startX,this._normalShape.startY,this._normalShape.ptList] = GameUtil.MakeRegularBubble(radius,radius,radius);
            this._killShape.centerY = this._killShape.centerY = this._killShape.radius = radius;
            [this._killShape.startX,this._killShape.startY,this._killShape.ptList] = GameUtil.MakeRRBubble(radius,radius,radius,radius+radius*0.2);
        }
        this._tmpShape = this._tmpShape || new BubbleShape(BubbleState.TMP,radius,radius,radius);
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

    public get visionRange():number{
        return this._visionRange;
    }

    public set aimTarget(value:Laya.Sprite){
        this._aimTarget = value;
        if(value){
            this.bubbleRotation = Math.atan2(value.y-this.y,value.x-this.x)*180/Math.PI;
            if(this.State == BubbleState.NORMAL){
                this.State = BubbleState.MOVE;
            }
        }
    }

    public get aimTarget():Laya.Sprite{
        return this._aimTarget;
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

    public clearVisions(){
        this._visionObsList && (this._visionObsList.length=0);
        this._visionBubbleList && (this._visionBubbleList.length=0);
    }

    public addVisionBubble(target:Bubble){
        this._visionBubbleList = this._visionBubbleList || [];
        this._visionBubbleList.push(target);
    }

    public addVisionObs(target:Obstacle){
        this._visionObsList = this._visionObsList || [];
        this._visionObsList.push(target);
    }

    public isInVision(target:Laya.Sprite):boolean{
        if(this._visionBubbleList && this._visionBubbleList.indexOf(target as Bubble) != -1){
            return true;
        }
        if(this._visionObsList && this._visionObsList.indexOf(target as Obstacle) != -1){
            return true;
        }
        return false;
    }

    private draw(shape:BubbleShape){
        this._shapeSp.graphics.clear();
        let circleNums = this.circleNums;
        let outerColorIdx = (this._skinIndex+circleNums)%Bubble.SKIN_LIST.length;
        let lineColorIdx = (this._skinIndex+1+circleNums)%Bubble.SKIN_LIST.length;
        this._shapeSp.graphics.drawPoly(shape.startX,shape.startY,shape.ptList,Bubble.SKIN_LIST[outerColorIdx],Bubble.SKIN_LIST[lineColorIdx],3);
        if(circleNums >= 1){
            for(let i=circleNums-1;i>=0;--i){
                let size = this.getSizeByCircleNum(i);
                let colorIdx = (this._skinIndex+i)%Bubble.SKIN_LIST.length;
                this._shapeSp.graphics.drawCircle(this.bubbleSize/2,this.bubbleSize/2,size/2,Bubble.SKIN_LIST[colorIdx]);
                if(i == 0){
                    this.showStar(this.bubbleSize/2,this.bubbleSize/2,size);
                }
            }
        }else{
            this.showStar(this._normalShape.centerX,this._normalShape.centerY,this._normalShape.radius*2);
        }
    }

    public set State(value:BubbleState){
        if(this.State == value) return;
        if(this._state == BubbleState.INVALID && value == BubbleState.NORMAL){
            this._curShape = this._normalShape;
            this.draw(this._normalShape);    
        }else{
            this.checkTransformShape(this.getShape(this._state),this.getShape(value),Bubble.TransformTime,this.getEaseFun(this._state,value));
        }
        this.onStateChange(this.State,value);
        this._state = value;
    }

    public get State():BubbleState{
        return this._state;
    }

    private onStateChange(lastState:BubbleState,nowState:BubbleState){
        if(nowState == BubbleState.DEAD){
            BubbleFactory.Recycle(this);
        }
    }

    public getEaseFun(srcState:BubbleState,dstState:BubbleState):Function{
        if(srcState == BubbleState.NORMAL && dstState == BubbleState.MOVE){
            return Laya.Ease.backOut;
        }else if(srcState == BubbleState.MOVE && dstState == BubbleState.NORMAL){
            return Laya.Ease.backOut;
        }else{
            return Laya.Ease.bounceOut;
        }
    }

    public getShape(state:BubbleState):BubbleShape{
        if(state == BubbleState.NORMAL){
            return this._normalShape;
        }else if(state == BubbleState.MOVE){
            return this._moveShape;
        }else if(state == BubbleState.SPIKE){
            return this._killShape;
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
        if(srcShape == null || dstShape == null) return;
        if(!this._isTransforming){
            this.transformShape(srcShape,dstShape,totalTime,easeFunc,overrite);
        }
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
                this._curShape = dstShape;
                this._isTransforming=false;
                this.checkStateShape();
                break;
            }
        }
    }
    /**
     * 形状变换完毕,校验当前形状是否和状态匹配
     */
    private checkStateShape(){
        if(this.State == BubbleState.NORMAL){
            if(this._curShape != this._normalShape){
                this.transformShape(this._curShape,this._normalShape,Bubble.TransformTime,this.getEaseFun(this._curShape.state,this.State));
            }
        }else if(this.State == BubbleState.MOVE){
            if(this._curShape != this._moveShape){
                this.transformShape(this._curShape,this._moveShape,Bubble.TransformTime,this.getEaseFun(this._curShape.state,this.State));
            }
        }else if(this.State == BubbleState.SPIKE){
            if(this._curShape != this._killShape){
                this.transformShape(this._curShape,this._killShape,Bubble.TransformTime,this.getEaseFun(this._curShape.state,this.State));
            }
        }
    }

    public startMove(targetX:number,targetY:number){
        if(this.State == BubbleState.NORMAL){
            this.State = BubbleState.MOVE;
            this.bubbleRotation= Math.atan2(targetY-this.y,targetX-this.x)*180/Math.PI;
        }
    }

    public stopMove(){
        if(this.isMoving)
            this.State = BubbleState.NORMAL;
    }

    public get isMoving():boolean{
        return this.State == BubbleState.MOVE;
    }

    public get isAlive():boolean{
        return this.State != BubbleState.DEAD;
    }

    public set moveSpeed(value:number){
        this._moveSpeed = value;
    }
    
    public get moveSpeed():number{
        return this._moveSpeed;
    }

    public setMoveDelta(deltaX:number,deltaY:number){
        this._moveDelta = this._moveDelta || new Laya.Point();
        this._moveDelta.x = deltaX;
        this._moveDelta.y = deltaY;
    }

    public get moveDelta():Laya.Point{
        return this._moveDelta;
    }

    public setMoveBoundary(x:number,y:number){
        this._moveBoundary = this._moveBoundary || new Laya.Point();
        this._moveBoundary.x= x;
        this._moveBoundary.y=y;
    }

    public get moveBoundary():Laya.Point{
        return this._moveBoundary;
    }

    public update(){
        if(!this.isAlive) return;
        if(this.isMoving){
            this.updateMove();
        }else{
            this.setMoveDelta(0,0);
        }
        this.autoRotateStar();
    }

    private autoRotateStar(){
        this._starShapeSp.rotation += 0.5;
    }

    private updateMove(){
        var radians = this.bubbleRotation*Math.PI/180;
        var xOffset = Math.cos(radians)*this._moveSpeed;
        var yOffset = Math.sin(radians)*this._moveSpeed;
        let preX = this.x;
        let preY = this.y;
        this.x =  GameUtil.clamp(this.x+xOffset,this.bubbleSize/2,this.moveBoundary.x-this.bubbleSize/2);
        this.y=  GameUtil.clamp(this.y+yOffset,this.bubbleSize/2,this.moveBoundary.y-this.bubbleSize/2);
        this.setMoveDelta(this.x-preX,this.y-preY);
    }

    public get isOnBoundary():boolean{
        if(this.x <= this.width/2 || this.x >= this.moveBoundary.x-this.width/2)
            return true;
        if(this.y <= this.width/2 || this.y >= this.moveBoundary.y-this.width/2)
            return true;
        return false;
    }

    public async startAILogic(){
        if(!this._isAI) return;
        //当泡泡移除舞台就结束协程
        while (this.displayedInStage) {
            let baseTime =0;
            if(this.isOnBoundary){
                this.bubbleRotation = Math.floor(Math.random()*360);
                this.State = BubbleState.MOVE;
                baseTime = 500;
            }else{
                //先只抢吃豆子
                if(this._visionObsList && this._visionObsList.length > 0){
                    if(this.aimTarget == null){
                        let idx = Math.floor(Math.random()*this._visionObsList.length);
                        this.aimTarget = this._visionObsList[idx];
                    }else if(!this.isInVision(this.aimTarget)){//之前的目标不在视野里,可能被其他吃掉了,就重新再找目标
                        let idx = Math.floor(Math.random()*this._visionObsList.length);
                        this.aimTarget = this._visionObsList[idx];
                    }  
                    baseTime = 500;         
                }else{//没有豆子就随机方向
                    this.aimTarget = null;
                    let rand = Math.random()*100;
                    if(rand <= 50){
                        this.bubbleRotation = Math.floor(Math.random()*360);
                        this.State = BubbleState.MOVE;
                    }else if(rand <=60){
                        this.State = BubbleState.NORMAL;
                    }else{
                        this.State = BubbleState.MOVE;
                    }
                    baseTime = 1000;
                }
            }
            let time = baseTime + Math.floor(Math.random()*500);
            await GameUtil.wait(time);
        }
    }

    private playEatAnim(){
        Laya.Tween.clearAll(this._shapeSp);
        this._shapeSp.scale(1,1);
        Laya.Tween.from(this._shapeSp,{scaleX:1.3,scaleY:0.7},500,Laya.Ease.bounceOut);
    }

    private playKillAnim(){
        console.log('播放击杀动画');
        //在播放动画期间停止移动,播放完毕恢复到normal状态
        this.State = BubbleState.SPIKE;
        Laya.timer.once(300,this,this.resumeState,[BubbleState.NORMAL]);
    }

    private resumeState(state:BubbleState){
        this.State = state;
        console.log("击杀动画播放完毕,恢复到待机状态")
    }

    public eat(obs:Obstacle){
        this.eatBeans += obs.beansNum;
        this.playEatAnim();
        this.aimTarget = this.aimTarget == obs?null:this.aimTarget;
        ObstacleFactory.Recycle(obs);
    }

    public kill(b:Bubble){
        console.log(`玩家【${this.name}】击杀了玩家【${b.name}】`)
        b.State = BubbleState.DEAD;
        this.playKillAnim();
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
        bubble.removeSelf();
        Laya.Pool.recover(this.SIGN_BUBBLE,bubble);
    }

}

class BubbleShape{
    state:BubbleState;
    centerX:number;
    centerY:number;
    radius:number;
    startX:number;
    startY:number;
    ptList:number[]
    constructor(state:BubbleState,centerX:number,centerY:number,radius:number){
        this.state = state;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }
}

export enum BubbleState{
    INVALID,
    TMP,
    NORMAL,
    MOVE,
    SPIKE,//刺球形状
    SPIKE2, //边缘光滑的刺球
    DEAD
}

export enum AIType{
    Ordinary, //
    Risk, //碰到低等级的就一直追杀
    Coward //碰到高等级的就逃跑
}