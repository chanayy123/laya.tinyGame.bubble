import Bubble, { BubbleFactory, BubbleState } from "./Bubble";
import { GameUtil } from "./GameUtil";
import { Obstacle, ObstacleFactory } from "./Obstacle";

export class GameMap extends Laya.Sprite{
    public static GridSize =30;
    public static LineColor = '#000000';
    public static MAP_WIDTH = 2048;
    public static MAP_HEIGHT = 2048;
    private _bubbleHero:Bubble;
    private _obstacleList:Obstacle[];
    private _delObstacleList:Obstacle[];
    private _bubbleList:Bubble[]=[];
    private _maxPoint:Laya.Point;
    private _emotionAnim:Laya.Animation;
    constructor(){
        super()
    }

    public init(w:number,h:number){
        Laya.stage.addChild(this);
        this.size(w,h);
        this._maxPoint = new Laya.Point();
        this._maxPoint.x = Math.ceil(this.width/GameMap.GridSize)*GameMap.GridSize;
        this._maxPoint.y = Math.ceil(this.height/GameMap.GridSize)*GameMap.GridSize;
        this._emotionAnim = new Laya.Animation();
        this.draw();
        this.initPlayers();
        this.initObstacles();
    }

    public addHero(b:Bubble){
        this._bubbleHero = b;
        this.add(b);
    }

    public add(b:Bubble){
        this.addChild(b);
        this._bubbleList.push(b);
    }

    public update(){
        let [deltaX,deltaY] = this.checkUpdate();
        let stageX = this.x+this._bubbleHero.x;
        let stageY = this.y+this._bubbleHero.y;
        if( deltaX>0 && stageX > Laya.stage.width/2 && (Laya.stage.width+Math.abs(this.x) < this._maxPoint.x)){
            this.x -= deltaX;
        }else if(deltaX < 0 && stageX< Laya.stage.width/2 && this._bubbleHero.x>Laya.stage.width/2){
            this.x -= deltaX;
        }
        if( deltaY>0 && stageY > Laya.stage.height/2 && (Laya.stage.height+Math.abs(this.y) < this._maxPoint.y)){
            this.y -= deltaY;
        }else if(deltaY < 0 && stageY< Laya.stage.height/2 && this._bubbleHero.y>Laya.stage.height/2){
            this.y -= deltaY;
        }
        this.checkCollider();
    }
    /**
     * 泡泡移动到地图边界位置修正
     */
    private checkUpdate(){
        let preX = this._bubbleHero.x;
        let preY = this._bubbleHero.y;
        this._bubbleHero.update();
        let nowX = this._bubbleHero.x;
        let nowY = this._bubbleHero.y;
        if(nowX+this._bubbleHero.bubbleSize/2 > this._maxPoint.x){
            nowX= this._bubbleHero.x = this._maxPoint.x-this._bubbleHero.bubbleSize/2;
        }else if(nowX < this._bubbleHero.bubbleSize/2){
            nowX = this._bubbleHero.x = this._bubbleHero.bubbleSize/2;
        }
        if(nowY+this._bubbleHero.bubbleSize/2 > this._maxPoint.y){
            nowY = this._bubbleHero.y = this._maxPoint.y-this._bubbleHero.bubbleSize/2;
        }else if(nowY < this._bubbleHero.bubbleSize/2){
            nowY = this._bubbleHero.y = this._bubbleHero.bubbleSize/2;
        }
        let deltaX = nowX-preX;
        let deltaY = nowY -preY;
        return [deltaX,deltaY];
    }

    private checkCollider(){
        this._delObstacleList.length=0;
        let count = this._obstacleList.length;
        for(let i=0;i<count;++i){
            let obs = this._obstacleList[i];
            if(GameUtil.powerDistance(this._bubbleHero.x,this._bubbleHero.y,obs.x,obs.y) <= Math.pow(this._bubbleHero.width/2+obs.width/2+5,2)){
                this._bubbleHero.eat(obs.beansNum);
                this.playEmotionAnim();
                this._delObstacleList.push(obs);
                ObstacleFactory.Recycle(obs);
            }
        }
        this._obstacleList= this._obstacleList.filter((ele,index,array)=>{
            return this._delObstacleList.indexOf(ele) == -1;
        })
    }    

    initPlayers(){
    }

    initObstacles(){
        this._obstacleList = [];
        this._delObstacleList=[];
        for(let i=0;i<100;++i){
            let size = GameMap.GridSize+Math.floor(Math.random()*GameMap.GridSize)
            let skinIdx = Math.floor(Math.random()*8)
            let x =  size/2+ Math.random()*(this._maxPoint.x-size/2);
            let y = size/2+ Math.random()*(this._maxPoint.y-size/2);
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
        this._emotionAnim.loadAnimation(`chat/anim/emoji_${list[idx]}.ani`,Laya.Handler.create(this,()=>{
            let bound = this._emotionAnim.getGraphicBounds();
            Laya.stage.addChild(this._emotionAnim); 
            this._emotionAnim.pivot(bound.x+bound.width/2,bound.y+bound.height/2)
            // let scale = Math.min(50/bound.width,50/bound.height);
            // this._emotionAnim.scale(0.3,0.3);
            this._emotionAnim.pos(Laya.stage.width/2,100);
            this._emotionAnim.autoPlay=true;
            Laya.timer.once(1500,this,this.stopEmotionAnim)
        }),"res/atlas/chat/emoji.atlas"); 
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
            let x1 = this._maxPoint.x;
            let y1 = y0;
            this.graphics.drawLine(x0,y0,x1,y1,GameMap.LineColor,1);
        }
        for(let i=0;i<=col;++i){
            let x0= (i)*GameMap.GridSize;
            let y0= 0;
            let x1 = x0;
            let y1 = this._maxPoint.y;
            this.graphics.drawLine(x0,y0,x1,y1,GameMap.LineColor,1);
        }

    }

}