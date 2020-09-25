export default class Resize extends Laya.Script {
    
    constructor() { super(); }
    
    onEnable(): void {
        Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);
        this.onResize();
    }

    onDisable(): void {
        Laya.stage.off(Laya.Event.RESIZE,this,this.onResize);
        
    }

    onResize(){
        (this.owner as Laya.Sprite).size(Laya.stage.width,Laya.stage.height);
        // console.log("适配最新舞台尺寸: "+Laya.stage.width+" "+Laya.stage.height);
    }

}