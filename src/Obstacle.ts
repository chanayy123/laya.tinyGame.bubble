import { ResData } from "./ResData";

export class Obstacle extends Laya.Sprite{
    private _skinIndex:number;
    private _obsSize:number;
    private _beansNum:number;
    constructor(){
        super()
    }
    public init(skinIdx:number,size:number,beansNum:number){
        this.skinIndex = skinIdx;
        this.obsSize = size;
        this._beansNum = beansNum;
    }

    public get beansNum():number{
        return this._beansNum;
    }

    public set skinIndex(value:number){
        let res = ResData.getObstacleRes(value);
        this.loadImage(res)
        this._skinIndex = value;
    }

    public get skinIndex():number{
        return this._skinIndex;
    }

    public set obsSize(value:number){
        this._obsSize = value;
        this.width=this.height=value;
        this.pivot(value/2,value/2);
    }

    public get obsSize():number{
        return this._obsSize;
    }

}

export class ObstacleFactory{
    public static POOL_SIGN= "POOL_OBSTACLE";
    public static Create(skinIdx:number,size:number=0,beansNum:number=1){
        let obs = Laya.Pool.getItemByClass(this.POOL_SIGN,Obstacle);
        obs.init(skinIdx,size,beansNum);
        return obs;
    }

    public static Recycle(obs:Obstacle){
        obs.removeSelf();
        Laya.Pool.recover(this.POOL_SIGN,obs);
    }
}