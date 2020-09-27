export default class Resize extends Laya.Script {
    /** @prop {name:isFitStageSize, tips:"是否适配舞台尺寸", type:boolean, default:true}*/
    public isFitStageSize: boolean = true;
    /** @prop {name:isReCalcScale, tips:"是否重新计算缩放比", type:boolean, default:true}*/
    public isReCalcScale: boolean = true;
    public static DesignWidth = 720;
    public static DesignHeight = 1280;
    private static _minScale:number;
    private static _maxScale:number;
    public static get minScale():number{
        return this._minScale || 1;
    }
    public static get maxScale():number{
        return this._maxScale || 1;
    }
    constructor() { super(); }
    
    onEnable(): void {
        Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);
        this.onResize();
    }

    onDisable(): void {
        Laya.stage.off(Laya.Event.RESIZE,this,this.onResize);        
    }

    onResize(){
        if(this.isReCalcScale){
            Resize._minScale = Math.min(Laya.stage.width/Resize.DesignWidth,Laya.stage.height/Resize.DesignHeight);
            Resize._maxScale = Math.max(Laya.stage.width/Resize.DesignWidth,Laya.stage.height/Resize.DesignHeight);
            console.log(`当前适配最小缩放/最大缩放:${Resize.minScale}/${Resize.maxScale}`)
        }
        if(this.isFitStageSize){
            (this.owner as Laya.Sprite).size(Laya.stage.width,Laya.stage.height);
        }
        //为了防止挂在脚本顺序导致先执行resize后初始化,这里延迟调用适配
        this. owner.callLater(this._doResize,[this]);
    }

    private _doResize(script:Laya.Script){
        let comps = script.owner.getComponents(Laya.Script);
        for(let key in comps){
            let comp =comps[key];
            if(comp != script){
                comp.onResize && comp.onResize();
            }
        }
        let owner:any = script.owner;
        owner.onResize && owner.onResize();
    }

}