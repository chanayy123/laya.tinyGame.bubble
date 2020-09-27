import Resize from "../common/Resize";
import SceneManager from "../common/SceneManager";
import SoundHelper from "../common/SoundHelper";
import { ResData } from "../data/ResData";
import UserData from "../data/UserData";


export default class SelectControl extends Laya.Script {
    public static GridSize =50;
    /** @prop {name:btnStart, type:Node}*/
    public btnStart:Laya.Node;   
    /** @prop {name:labelEnergy, type:Node}*/
    public labelEnergy:Laya.Node;    
    /** @prop {name:uiGroup, type:Node}*/
    public uiGroup:Laya.Node;
    private _ownerScene:Laya.Scene;
    constructor() { super(); }
    
    onAwake():void{
        this._ownerScene = this.owner as Laya.Scene;
        this._ownerScene.autoDestroyAtClosed=true;
        this.drawBg();
    }

    onEnable(): void {
        (this.labelEnergy as Laya.Label).text = UserData.Instance.energy.toString();
    }

    onDisable(): void {
    }

    onResize(){
        this.drawBg();
        (this.uiGroup as Laya.Sprite).scale(Resize.minScale,Resize.minScale);
    }

    onClick(e:Laya.Event){
        //新版chrome加了安全限制:第一次播放声音必须用户手动点击才可以,不然会抛异常,但是cocos creator做的泡泡大作战好像没有这问题
        SoundHelper.playMusic(ResData.RES_SOUND_BG,true);
        if(e.target == this.btnStart){
            SceneManager.Instance.open(ResData.RES_SCENE_Main);
        }
    }

    private drawBg(){
        this._ownerScene.graphics.clear();
        let row = Math.ceil(Laya.stage.height/SelectControl.GridSize);
        let col = Math.ceil(Laya.stage.width/SelectControl.GridSize);
        for(let i=0;i<=row;++i){
            let x0= 0;
            let y0= (i)*SelectControl.GridSize;
            let x1 = Laya.stage.width;
            let y1 = y0;
            this._ownerScene.graphics.drawLine(x0,y0,x1,y1,'#000000',1);
        }
        for(let i=0;i<=col;++i){
            let x0= (i)*SelectControl.GridSize;
            let y0= 0;
            let x1 = x0;
            let y1 = Laya.stage.height;
            this._ownerScene.graphics.drawLine(x0,y0,x1,y1,'#000000',1);
        }
    }

}