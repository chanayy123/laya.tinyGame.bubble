export default class ScaleButton extends Laya.Script {
    /** @prop {name:scaleRatio, tips:"按钮缩放值", type:Number, default:1.1}*/
    public scaleRatio: number = 1.1;
    /** @prop {name:tweenTime, tips:"按钮缩放时间", type:Number, default:200}*/
    public tweenTime: number = 200;
    public clickHandler:Laya.Handler;
    private _btn:Laya.UIComponent;
    constructor() { super(); }
    

    onAwake(){
        this._btn = this.owner as Laya.UIComponent;
        this._btn.anchorX = this._btn.anchorY = 0.5;
    }

    onMouseDown(){
        Laya.Tween.clearAll(this._btn);
        Laya.Tween.to(this._btn,{scaleX:this.scaleRatio,scaleY:this.scaleRatio},this.tweenTime);
    }

    onMouseUp(){
        Laya.Tween.clearAll(this._btn);
        Laya.Tween.to(this._btn,{scaleX:1,scaleY:1},this.tweenTime);
    }

    onMouseOut(){
        Laya.Tween.clearAll(this._btn);
        Laya.Tween.to(this._btn,{scaleX:1,scaleY:1},this.tweenTime);
    }

    onClick(){
        this.clickHandler && this.clickHandler.run();
    }

}