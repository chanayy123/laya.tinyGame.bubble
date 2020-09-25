
import { ResData } from "../data/ResData";
import SoundHelper from "./SoundHelper";

export default class ScaleButton extends Laya.Script {
    /** @prop {name:scaleRatio, tips:"按钮缩放值", type:Number, default:1.1}*/
    public scaleRatio: number = 1.1;
    /** @prop {name:tweenTime, tips:"按钮缩放时间", type:Number, default:200}*/
    public tweenTime: number = 200;
    public clickHandler:Laya.Handler;
    private _btnOwner:Laya.UIComponent;
    constructor() { super(); }
    

    onAwake(){
        this._btnOwner = this.owner as Laya.UIComponent;
        this._btnOwner.anchorX = this._btnOwner.anchorY = 0.5;
    }

    onMouseDown(){
        Laya.Tween.clearAll(this._btnOwner);
        Laya.Tween.to(this._btnOwner,{scaleX:this.scaleRatio,scaleY:this.scaleRatio},this.tweenTime);
    }

    onMouseUp(){
        Laya.Tween.clearAll(this._btnOwner);
        Laya.Tween.to(this._btnOwner,{scaleX:1,scaleY:1},this.tweenTime);
    }

    onMouseOut(){
        Laya.Tween.clearAll(this._btnOwner);
        Laya.Tween.to(this._btnOwner,{scaleX:1,scaleY:1},this.tweenTime);
    }

    onClick(){
        this.clickHandler && this.clickHandler.run();
        SoundHelper.playAudio(ResData.RES_SOUND_CLICK);
    }

}