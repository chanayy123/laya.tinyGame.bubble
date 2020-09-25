import { GameUtil } from "../common/GameUtil";
import SoundHelper from "../common/SoundHelper";
import { ResData } from "../data/ResData";
import UserData from "../data/UserData";
import Bubble, { BubbleFactory } from "../object/Bubble";
import { GameMap } from "../object/GameMap";
import { Obstacle } from "../object/Obstacle";
import GameResultUI from "../view/GameResultUI";
import GameUI from "../view/GameUI";


export default class GameControl extends Laya.Script {
    //触摸滑动距离控制缩放阀值
    public static TouchThreshold:number=10;
    //游戏总时间:单位s
    public static TotalTime:number =1*60;
    /** @prop {name:lastMousePosX, tips:"整数类型示例",default:0}*/
    private _lastMousePosX:number;
    /** @prop {name:lastMousePosY, tips:"整数类型示例",default:0}*/
    private _lastMousePosY:number;    
    private _map:GameMap;
    private _bubbleHero:Bubble;
    private _gameUI:GameUI;
    private _gameResultUI:GameResultUI;
    private _emotionAnim:Laya.Animation;
    private _leftTime:number=0;
    private _gameState:GameState;
    constructor() { super(); }
    
    onAwake():void{
        this.initMap();
        this.initUI();
        this.initEffect();
        (this.owner as Laya.Scene).autoDestroyAtClosed=true;
    }

    onEnable(): void {
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onTouchDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onTouchUp);
        Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);
        this.gameState = GameState.START;
    }

    onDisable(): void {
        Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.onTouchDown);
        Laya.stage.off(Laya.Event.MOUSE_UP,this,this.onTouchUp);
        Laya.stage.off(Laya.Event.RESIZE,this,this.onResize);
    }

    onResize():void{
        console.log("舞台宽高: "+Laya.stage.width+" "+Laya.stage.height);
    }

    onMouseMove():void{
        //console.log("鼠标舞台坐标: "+Laya.stage.mouseX+" "+Laya.stage.mouseY);
    }

    onTouchDown():void{
        if(this.gameState != GameState.START) return;
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        this._lastMousePosX=Laya.stage.mouseX;;
        this._lastMousePosY=Laya.stage.mouseY;
        this._bubbleHero.startMove(this._map.mouseX,this._map.mouseY);
    }

    onTouchMove():void{
        if(this.gameState != GameState.START) return;
        let curMouseX = Laya.stage.mouseX;
        let curMouseY = Laya.stage.mouseY;
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
        if(this.gameState != GameState.START) return;
        Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onTouchMove);
        this._bubbleHero.stopMove();
    }

    onUpdate():void{
        if(this.gameState != GameState.START) return;
        this._map.update();
    } 

    initMap(){
        this._map = GameMap.Instance;
        this._map.init(GameMap.MAP_WIDTH,GameMap.MAP_HEIGHT);
        this.owner.addChildAt(this._map,0);
        this._bubbleHero = BubbleFactory.Create(Bubble.InitSize,0,false);
        this._bubbleHero.bubbleName = "我";
        this._bubbleHero.pos(Laya.stage.width/2,Laya.stage.height/2);      
        this._map.addHero(this._bubbleHero);
        this._map.eatHandler = Laya.Handler.create(this,this.onEat,null,false);
        this._map.killHandler = Laya.Handler.create(this,this.onKill,null,false);
        this._map.updateRankHandler = Laya.Handler.create(this,this.onRefreshRankList,null,false);
    }

    initUI(){
        this._gameUI = this.owner.getChildByName("gameUI") as GameUI;
        this._gameUI.showTotalScore(this._bubbleHero.eatBeans);
        this._gameUI.showLeftTime(this._leftTime);
        this._gameResultUI = this.owner.getChildByName("gameResultUI") as GameResultUI;
        this._gameResultUI.hide();
    }

    initEffect(){
        this._emotionAnim = new Laya.Animation();
        this.owner.addChild(this._emotionAnim);
    }

    private onKill(src:Bubble, dst:Bubble){
        console.log(`玩家【${src.name}】击杀了玩家【${dst.name}】`)
        if(dst == this._bubbleHero){
            this.gameState = GameState.END;
        }else if(src == this._bubbleHero){
            this._gameUI.showKillTip(src.name,dst.name);
            this.playEmotionAnim();
        }else{
            this._gameUI.showKillTip(src.name,dst.name);
        }
    }

    private onRefreshRankList(...data:any[]){
        this._gameUI.updateRankList(...data);
    }

    private onEat(src:Bubble,dst:Obstacle){
        if(src == this._bubbleHero){
            this._gameUI.showTotalScore(this._bubbleHero.eatBeans);
            SoundHelper.playAudio(ResData.RES_SOUND_EAT);
        }
    }

    startMatch(){
        console.log("开始匹配玩家");
    }

    async startCountDown(){
        this.leftTime = GameControl.TotalTime;
        while(this.leftTime > 0 && this.gameState == GameState.START){
            await GameUtil.wait(1000);
            if(!this.enabled) break;
            this.leftTime -=1;
        }
        this.gameState = GameState.END;
    }

    showGameResult(){
        UserData.Instance.energy += this._bubbleHero.eatBeans*10;
        let attacker = this._bubbleHero.attacker? this._bubbleHero.attacker.bubbleName:null;
        this._gameResultUI.show(this._bubbleHero.rank,this._bubbleHero.eatBeans,this._bubbleHero.eatBeans*10,attacker);
        SoundHelper.playAudio(attacker?ResData.RES_SOUND_FAIL:ResData.RES_SOUND_WIN);
    }


    public set leftTime(value:number){
        this._leftTime = Math.max(value,0);
        this._gameUI.labelTime.text =  GameUtil.fmtTime(this._leftTime);
    }

    public get leftTime():number{
        return this._leftTime;
    }

    public set gameState(value:GameState){
        if(this._gameState == value) return;
        let preState = this._gameState;
        this._gameState = value;
        this.onGameStateChange(preState,value);
    }

    public get gameState():GameState{
        return this._gameState;
    }

    private onGameStateChange(pre:GameState,now:GameState){
        if(now == GameState.MATCH){
            this.startMatch();
        }else if(now == GameState.START){
            this.startCountDown();
        }else if(now == GameState.END){
            this.showGameResult();
        }
    }

    private playEmotionAnim(){
        //随机切换动画
        if(Math.random()*100 > 30) return;
        console.log("播放表情动画")
        let list= [1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
        let idx = Math.floor(Math.random()*list.length);
        this._emotionAnim.loadAnimation(ResData.getEmotionRes(list[idx]),Laya.Handler.create(this,this.onLoadAnimComplete),ResData.RES_ATLAS_EMOTION); 
    }

    private onLoadAnimComplete(){
        let bound = this._emotionAnim.getGraphicBounds();
        this.owner.addChild(this._emotionAnim); 
        this._emotionAnim.pivot(bound.x+bound.width/2,bound.y+bound.height/2)
        this._emotionAnim.pos(Laya.stage.width/2,100);
        this._emotionAnim.autoPlay=true;
        Laya.timer.once(1500,this,this.stopEmotionAnim)
    }


    private stopEmotionAnim(){
        this._emotionAnim.clear();
        this._emotionAnim.removeSelf();
    }

}

export enum GameState{
    MATCH,
    START,
    END
}