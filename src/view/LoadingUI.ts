export default class LoadingUI extends Laya.Script {   
    private _progress:Laya.ProgressBar;
    constructor() {
         super(); 
    }
    
    onAwake():void{
        this._progress = this.owner.getChildByName("progress") as Laya.ProgressBar;
    }

    onEnable(): void {
        this._progress.value=0;
        this.owner.on(Laya.Event.PROGRESS,this,this.onProgress);
    }

    onProgress(value:number){
        let time = new Date().getTime();
        console.log(time+" 加载进度:"+value);
        this._progress.value = value;
    }

    onDisable(): void {
        this.owner.off(Laya.Event.PROGRESS,this,this.onProgress);
    }
}