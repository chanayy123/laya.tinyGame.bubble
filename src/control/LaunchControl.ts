import { GameUtil } from "../common/GameUtil";
import SceneManager from "../common/SceneManager";
import SoundHelper from "../common/SoundHelper";
import { ResData } from "../data/ResData";

export default class LaunchControl extends Laya.Script {
    public static MinLoadTime:number = 1000;
    private _progress:Laya.ProgressBar;
    constructor() {
         super(); 
    }
    
    onAwake(){
        (this.owner as Laya.Scene).autoDestroyAtClosed=true;
        this._progress = this.owner.getChildByName("progress") as Laya.ProgressBar;
    }

    onEnable(): void {
        this._progress.value =0;
        SceneManager.Instance.open(ResData.RES_SCENE_SELECT,GameUtil.wait(LaunchControl.MinLoadTime),false,true,Laya.Handler.create(this,this.onProgress,null,false));
    }

    onProgress(value:number){
        this._progress.value = value;
    }

    onClick(e:Laya.Event){
        //新版chrome加了安全限制:第一次播放声音必须用户手动点击才可以,不然会抛异常,但是cocos creator做的泡泡大作战好像没有这问题
        SoundHelper.playMusic(ResData.RES_SOUND_BG,true);
    }

    onDisable(): void {
    }
}