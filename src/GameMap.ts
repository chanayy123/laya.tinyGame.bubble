import Bubble, { BubbleFactory, BubbleState } from "./Bubble";
import { GameUtil } from "./GameUtil";
import { Obstacle, ObstacleFactory } from "./Obstacle";
import { ResData } from "./ResData";

export class GameMap extends Laya.Sprite{
    private static _instance:GameMap;
    public static GridSize =30;
    public static IconSize = 20;
    public static LineColor = '#000000';
    public static MAP_WIDTH = 2048;
    public static MAP_HEIGHT = 2048;
    public static AI_NUM=10;
    public static OBS_NUM=100;
    private _bubbleHero:Bubble;
    private _bubbleAIList:Bubble[];
    private _bubbleIconMap:Map<Bubble,Laya.Sprite>;
    private _delBubbleList:BubbleFactory[];
    private _obstacleList:Obstacle[];
    private _delObstacleList:Obstacle[];
    private _bubbleList:Bubble[]=[];
    private _boundary:Laya.Point;
    private _emotionAnim:Laya.Animation;
    //玩家击杀回调
    public KillHandler:Laya.Handler;
    //玩家等级排行刷新回调
    public UpdateRankHandler:Laya.Handler;
    private constructor(){
        super()
    }

    public static get Instance():GameMap{
        if(GameMap._instance == null){
            GameMap._instance = new GameMap();
        }
        return this._instance;
    }

    public init(w:number,h:number){
        Laya.stage.addChild(this);
        this.size(w,h);
        this._boundary = new Laya.Point();
        this._boundary.x = Math.ceil(this.width/GameMap.GridSize)*GameMap.GridSize;
        this._boundary.y = Math.ceil(this.height/GameMap.GridSize)*GameMap.GridSize;
        this._emotionAnim = new Laya.Animation();
        this.draw();
        this.initPlayers();
        this.initObstacles();
    }

    public addHero(b:Bubble){
        this._bubbleHero = b;
        b.setMoveBoundary(this._boundary.x,this._boundary.y);
        this.addChild(b);
    }

    public update(){
        this.checkUpdate();
        this.checkScrollMap(this._bubbleHero.moveDelta.x,this._bubbleHero.moveDelta.y);
        this.checkCollider();
        this.checkOutOfStage();
    }

    /**
     * 处理显示视窗之外的泡泡
     */
    private checkOutOfStage(){
        let count = this._bubbleAIList.length;
        for(let i=0;i<count;++i){
            let b = this._bubbleAIList[i];
            if(!this.isInStage(b)){
                let icon = this._bubbleIconMap.get(b);
                if(b.x+this.x < 0){
                    icon.x = -this.x+icon.width/2;
                }else if(b.x + this.x > Laya.stage.width){
                    icon.x = Laya.stage.width-this.x-icon.width/2;
                }else{
                    icon.x = b.x;
                }
                if(b.y+this.y < 0){
                    icon.y = -this.y+icon.height/2;
                }else if(b.y + this.y > Laya.stage.height){
                    icon.y = Laya.stage.height-this.y-icon.height/2;
                }else{
                    icon.y = b.y;
                }
                this.addChild(icon);
            }else{
                let icon = this._bubbleIconMap.get(b);
                icon.removeSelf();
            }
        }
    }

    /**
     * 泡泡移动到地图边界位置修正,返回英雄实际移动偏移量
     */
    private checkUpdate(){
        this._bubbleHero.update();
        let count = this._bubbleAIList.length;
        for(let i=0;i<count;++i){
            let ai = this._bubbleAIList[i];
            ai.update();  
        }
    }

    /**
     * 对象是否在地图边界
     * @param obj 
     */
    public  isOnBorder(obj:Laya.Sprite):boolean{
        if(obj.x <= obj.width/2 || obj.x >= this._boundary.x-obj.width/2)
            return true;
        if(obj.y <= obj.width/2 || obj.y >= this._boundary.y-obj.width/2)
            return true;
        return false;
    }
    /**
     * 对象是否在舞台里面显示
     * @param obj 要求轴心点居中
     */
    public isInStage(obj:Laya.Sprite):boolean{
        if(obj.x+this.x<= -obj.width/2 || obj.x+this.x >= Laya.stage.width+obj.width/2)
            return false;
        if(obj.y+this.y<= -obj.height/2 || obj.y+this.y >= Laya.stage.height+obj.height/2)
            return false;
        return true;
    }

    /**
     * 根据玩家位置和移动方向处理地图滚屏
     * @param deltaX 
     * @param deltaY 
     */
    private checkScrollMap(deltaX:number,deltaY:number){
        let stageX = this.x+this._bubbleHero.x;
        let stageY = this.y+this._bubbleHero.y;
        if( deltaX>0 && stageX > Laya.stage.width/2 && (Laya.stage.width+Math.abs(this.x) < this._boundary.x)){
            this.x -= deltaX;
        }else if(deltaX < 0 && stageX< Laya.stage.width/2 && this._bubbleHero.x>Laya.stage.width/2){
            this.x -= deltaX;
        }
        if( deltaY>0 && stageY > Laya.stage.height/2 && (Laya.stage.height+Math.abs(this.y) < this._boundary.y)){
            this.y -= deltaY;
        }else if(deltaY < 0 && stageY< Laya.stage.height/2 && this._bubbleHero.y>Laya.stage.height/2){
            this.y -= deltaY;
        }
    }
    /**
     * 处理所有泡泡和障碍物之间碰撞
     */
    private checkCollider(){
        let bCount = this._bubbleAIList.length;
        //重置每个ai泡泡的视野目标列表
        for(let i=0;i<bCount;++i){
            let b = this._bubbleAIList[i];
            b.clearVisions();
        }
        this._delBubbleList.length=0;
        //英雄和其他泡泡碰撞处理
        for(let i=0;i<bCount;++i){
            if(!this._bubbleHero.isAlive) break;
            let b = this._bubbleAIList[i];
            if(!b.isAlive) continue;
            if(GameUtil.powerDistance(this._bubbleHero.x,this._bubbleHero.y,b.x,b.y) <= Math.pow(this._bubbleHero.bubbleSize/2+b.bubbleSize/2,2)){
                if(this._bubbleHero.level >  b.level){
                    this._bubbleHero.kill(b);
                    this._delBubbleList.push(b);
                    this.delBubbleIcon(b);
                }else if(this._bubbleHero.level < b.level){
                    b.kill(this._bubbleHero);
                    console.log('游戏结束');
                    break;
                }
            }
        }
        //泡泡之间碰撞处理
        for(let i=0;i<bCount;++i){
            let b = this._bubbleAIList[i];
            for(let j=i+1;j<bCount;++j){
                if(!b.isAlive) break;
                let b2 = this._bubbleAIList[j];
                if(!b2.isAlive) continue;
                if(GameUtil.powerDistance(b.x,b.y,b2.x,b2.y) <= Math.pow(b.bubbleSize/2+b2.bubbleSize/2,2)){
                    if(b.level > b2.level){
                        b.kill(b2);
                        this._delBubbleList.push(b2);
                        this.delBubbleIcon(b2);
                    }else if(b.level < b2.level){
                        b2.kill(b);
                        this._delBubbleList.push(b);
                        this.delBubbleIcon(b);
                    }
                }else if(GameUtil.powerDistance(b.x,b.y,b2.x,b2.y) <= Math.pow(b.visionRange/2+b2.width/2,2)){
                    b.addVisionBubble(b2);
                    b2.addVisionBubble(b);
                }
            }
        }
        this._bubbleAIList= this._delBubbleList.length>0? this._bubbleAIList.filter((ele,index,array)=>{
            return this._delBubbleList.indexOf(ele) == -1;
        }):this._bubbleAIList;

        this._delObstacleList.length=0;
        let count = this._obstacleList.length;
        bCount = this._bubbleAIList.length;
        for(let i=0;i<count;++i){
            let obs = this._obstacleList[i];
            if(!obs.displayedInStage) continue;
            if(this._bubbleHero.isAlive && GameUtil.powerDistance(this._bubbleHero.x,this._bubbleHero.y,obs.x,obs.y) <= Math.pow(this._bubbleHero.bubbleSize/2+obs.obsSize/2+5,2)){
                this._bubbleHero.eat(obs);
                this.playEmotionAnim();
                this._delObstacleList.push(obs);
            }
            for(let j=0;j<bCount;++j){
                let b = this._bubbleAIList[j];
                if(GameUtil.powerDistance(b.x,b.y,obs.x,obs.y) <= Math.pow(b.bubbleSize/2+obs.obsSize/2+5,2)){
                    b.eat(obs);
                    this._delObstacleList.push(obs);
                }else if(GameUtil.powerDistance(b.x,b.y,obs.x,obs.y) <= Math.pow(b.visionRange/2+obs.obsSize/2,2)){
                    b.addVisionObs(obs);
                }
            }
        }
        this._obstacleList= this._delObstacleList.length>0? this._obstacleList.filter((ele,index,array)=>{
            return this._delObstacleList.indexOf(ele) == -1;
        }):this._obstacleList;
    }    

    delBubbleIcon(b:Bubble){
        this._bubbleIconMap.get(b).removeSelf();
        this._bubbleIconMap.delete(b);
    }

    initPlayers(){
        this._bubbleAIList = [];
        this._delBubbleList=[];
        this._bubbleIconMap= new Map<Bubble,Laya.Sprite>();
        for(let i=0;i<GameMap.AI_NUM;++i){
            let idx = Math.floor(Math.random()*Bubble.SKIN_LIST.length);
            let posX = Bubble.InitSize+ Math.floor(Math.random()*(this._boundary.x-2*Bubble.InitSize));
            let posY = Bubble.InitSize+ Math.floor(Math.random()*(this._boundary.y-2*Bubble.InitSize));
            let rotation = Math.floor(Math.random()*360)
            let ai = BubbleFactory.Create(Bubble.InitSize,idx,true);
            ai.name = `路人${i}号`;
            ai.bubbleRotation = rotation;
            ai.pos(posX,posY);
            ai.setMoveBoundary(this._boundary.x,this._boundary.y);
            this._bubbleAIList.push(ai);
            this.addChild(ai);
            ai.startAILogic();
            //每个泡泡AI对应一个圆形icon,在出舞台时以icon表现位置动向
            let icon = new Laya.Sprite();
            icon.size(GameMap.IconSize,GameMap.IconSize);
            icon.pivot(icon.width/2,icon.height/2);
            icon.graphics.drawCircle(icon.width/2,icon.height/2,icon.width/2,Bubble.SKIN_LIST[idx]);
            icon.graphics.fillText(`${i+1}`,icon.width/2,3,'14px Arial','#000000','center');
            this._bubbleIconMap.set(ai,icon);
        }
    }

    initObstacles(){
        this._obstacleList = [];
        this._delObstacleList=[];
        for(let i=0;i<GameMap.OBS_NUM;++i){
            let size = GameMap.GridSize+Math.floor(Math.random()*GameMap.GridSize)
            let skinIdx = Math.floor(Math.random()*8)
            let x =  size+ Math.random()*(this._boundary.x-2*size);
            let y = size+ Math.random()*(this._boundary.y-2*size);
            let obs = ObstacleFactory.Create(skinIdx,size,1);
            this._obstacleList.push(obs);
            obs.pos(x,y);
            this.addChild(obs);
        }
    }

    private playEmotionAnim(){
        //随机切换动画
        if(Math.random()*100 > 30) return;
        let list= [1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
        let idx = Math.floor(Math.random()*list.length);
        this._emotionAnim.loadAnimation(ResData.getEmotionRes(list[idx]),Laya.Handler.create(this,this.onLoadAnimComplete),ResData.RES_ATLAS_EMOTION); 
    }

    private onLoadAnimComplete(){
        let bound = this._emotionAnim.getGraphicBounds();
        Laya.stage.addChild(this._emotionAnim); 
        this._emotionAnim.pivot(bound.x+bound.width/2,bound.y+bound.height/2)
        this._emotionAnim.pos(Laya.stage.width/2,100);
        this._emotionAnim.autoPlay=true;
        Laya.timer.once(1500,this,this.stopEmotionAnim)
    }


    private stopEmotionAnim(){
        this._emotionAnim.clear();
        this._emotionAnim.removeSelf();
    }

    private draw(){
        this.graphics.clear();
        let row = Math.ceil(this.height/GameMap.GridSize);
        let col = Math.ceil(this.width/GameMap.GridSize);
        for(let i=0;i<=row;++i){
            let x0= 0;
            let y0= (i)*GameMap.GridSize;
            let x1 = this._boundary.x;
            let y1 = y0;
            this.graphics.drawLine(x0,y0,x1,y1,GameMap.LineColor,1);
        }
        for(let i=0;i<=col;++i){
            let x0= (i)*GameMap.GridSize;
            let y0= 0;
            let x1 = x0;
            let y1 = this._boundary.y;
            this.graphics.drawLine(x0,y0,x1,y1,GameMap.LineColor,1);
        }

    }

}