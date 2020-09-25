export default class SceneManager{
    /**加载场景最小时间,如果超过就会显示loading过渡场景,等目标场景加载完毕就隐藏loading场景 */
    public static MinLoadTime:number = 500;
    public static DefaultLoadScene:string = "bubble/LoadingScene.scene";
    private static _instance:SceneManager;
    private _loadingScene:Laya.Scene;
    constructor(){
        this.preLoad();
    }
    public static get Instance():SceneManager{
        if(this._instance == null){
            this._instance = new SceneManager();
        }
        return this._instance;
    }
    private preLoad(){
        Laya.Scene.load(SceneManager.DefaultLoadScene,Laya.Handler.create(this,(scene)=>{
            this._loadingScene = scene;
        }))
    }

    public async open(url:string,synPromise:Promise<any>=null,showLoadingView:boolean=false,closeOther:boolean=true,progressHandler:Laya.Handler=null,completeHandler:Laya.Handler=null){
        try {
            //如果加载场景需要显示loading,而loading场景还没初始化就延迟调用open
            if(showLoadingView && !this._loadingScene){
                Laya.timer.once(100,this,this.open,[url,closeOther,showLoadingView,synPromise,progressHandler,completeHandler]);
                return;
            }
            if(showLoadingView){
                Laya.Scene.setLoadingPage(this._loadingScene);
                Laya.Scene.showLoadingPage(null,0);
                progressHandler = progressHandler || Laya.Handler.create(this,this._doProgress,null,false);
            }
            synPromise = synPromise || this._getDefaultPromise();
            let loadPromise = this._doLoadScene(url,progressHandler);
            let res = await Promise.all([loadPromise,synPromise]);
            let newScene = res[0] as Laya.Scene;
            let data = res[1];
            completeHandler && completeHandler.runWith(newScene);
            progressHandler && progressHandler.recover();
            newScene.open(true,data);
            if(showLoadingView){
                Laya.Scene.setLoadingPage(this._loadingScene);
                Laya.Scene.hideLoadingPage(0);
            }
        } catch (error) {
            console.warn( `加载${url}出现异常:${error}`);
        }
    }

    private _doProgress(value:number){
        this._loadingScene.event(Laya.Event.PROGRESS,value);
    }

    private _doLoadScene(url:string,progressHandler:Laya.Handler){
        return new Promise((resolve,reject)=>{
            Laya.Scene.load(url,Laya.Handler.create(this,(scene)=>{
                //引擎内部加载场景完成,会自动移除loading,这里置空手动移除
                Laya.Scene.setLoadingPage(null);
                resolve(scene);
            }),progressHandler);
        })
    }

    private _getDefaultPromise(){
        return Promise.resolve();
        
    }

}