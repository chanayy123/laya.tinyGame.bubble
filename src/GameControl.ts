import Bubble, { BubbleFactory, BubbleState } from "./Bubble";
import { GameMap } from "./GameMap";
import { GameUtil } from "./GameUtil";
import { Obstacle, ObstacleFactory } from "./Obstacle";

export default class GameControl extends Laya.Script {
    /** @prop {name:lastMousePosX, tips:"整数类型示例",default:0}*/
    private _lastMousePosX:number;
    /** @prop {name:lastMousePosY, tips:"整数类型示例",default:0}*/
    private _lastMousePosY:number;    
    private _map:GameMap;
    private _bubbleHero:Bubble;
    private _obstacleList:Obstacle[];
    private _delObstacleList:Obstacle[];
    //触摸滑动距离控制缩放阀值
    public static TouchThreshold:number=8;
    constructor() { super(); }
    
    onEnable(): void {
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onTouchDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onTouchUp);
        Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);
        this.initMap();
    }

    onDisable(): void {
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onTouchDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onTouchUp);
        Laya.stage.off(Laya.Event.RESIZE,this,this.onResize);
    }

    onResize():void{
        console.log("舞台宽高: "+Laya.stage.width+" "+Laya.stage.height);
        // let scene = this.owner as Laya.Scene;
        // console.log("游戏场景位置尺寸: "+scene.x+" "+scene.y+" "+scene.width+" "+scene.height);
    }

    onMouseMove():void{
        //console.log("鼠标舞台坐标: "+Laya.stage.mouseX+" "+Laya.stage.mouseY);
    }

    onTouchDown():void{
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        this._lastMousePosX=this._map.mouseX;;
        this._lastMousePosY=this._map.mouseY;
        this._bubbleHero.startMove(this._lastMousePosX,this._lastMousePosY);
    }

    // onRightClick():void{
    //     this._bubbleHero.eatBeans+=1;
    // }

    onTouchMove():void{
        let curMouseX = this._map.mouseX;
        let curMouseY = this._map.mouseY;
        let deltaX =curMouseX-this._lastMousePosX;
        let deltaY = curMouseY-this._lastMousePosY;
        let len = Math.pow(deltaX,2)+Math.pow(deltaY,2);  
        //为了防止抖动:设置距离阀门,小于设定值的直接忽略 
        if(len<= Math.pow(GameControl.TouchThreshold,2)) return;
        let targetRotation = Math.atan2(deltaY,deltaX)*180/Math.PI;
        let targetR = Math.floor(targetRotation*10)*0.1;
        this._bubbleHero.bubbleRotation = targetR;
        this._lastMousePosX =curMouseX;
        this._lastMousePosY = curMouseY;
    }
    onTouchUp():void{
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        this._bubbleHero.stopMove();
    }

    onUpdate():void{
        this._map.update();
    }

    private checkCollider(){
        this._delObstacleList.length=0;
        let count = this._obstacleList.length;
        for(let i=0;i<count;++i){
            let obs = this._obstacleList[i];
            if(GameUtil.powerDistance(this._bubbleHero.x,this._bubbleHero.y,obs.x,obs.y) <= Math.pow(this._bubbleHero.width/2+obs.width/2+5,2)){
                this._bubbleHero.eat(obs.beansNum);
                this._delObstacleList.push(obs);
                ObstacleFactory.Recycle(obs);
            }
        }
        this._obstacleList= this._obstacleList.filter((ele,index,array)=>{
            return this._delObstacleList.indexOf(ele) == -1;
        })
    }    

    initMap(){
        this._map = new GameMap();
        this._map.init(GameMap.MAP_WIDTH,GameMap.MAP_HEIGHT);
        this._bubbleHero = BubbleFactory.Create(Bubble.InitSize,0,false);
        this._bubbleHero.pos(Laya.stage.width/2,Laya.stage.height/2);      
        this._map.addHero(this._bubbleHero);
    }


}