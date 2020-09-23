import { BubbleFactory } from "./Bubble";
import ScaleButton from "./common/ScaleButton";

export default class Launch extends Laya.Script {
    /** @prop {name:btnStart, type:Node}*/
    public btnStart:Laya.Node;
    constructor() {
         super(); 
    }
    
    onAwake(){
        (this.owner as Laya.Scene).autoDestroyAtClosed=true;
        this.btnStart.getComponent(ScaleButton).clickHandler = Laya.Handler.create(this,this.onBtnClick);
    }

    onEnable(): void {
    }

    onBtnClick(e:any){
        Laya.Scene.open("bubble/MainScene.scene");
    }

    onDisable(): void {
    }
}