export default class UserData{
    public static KEY_ENERGY = "energy";
    public static KEY_FIRSTPLAY = "firstPlay";
    private static _instance:UserData;
    private _energy:number;
    private _isFirstPlay:boolean;

    public static get Instance():UserData{
        if(this._instance == null){
            this._instance = new UserData();
        }
        return this._instance
    }

    constructor(){
        let energy= Laya.LocalStorage.getItem(UserData.KEY_ENERGY) || "0";
        this.energy = parseInt(energy);
        let firstPlay = Laya.LocalStorage.getItem(UserData.KEY_FIRSTPLAY) || "0";
        this._isFirstPlay = parseInt(firstPlay) == 1;
        Laya.LocalStorage.setItem(UserData.KEY_FIRSTPLAY,"1");
    }

    public set energy(value:number){
        this._energy = value;
        Laya.LocalStorage.setItem(UserData.KEY_ENERGY,value.toString());
    }

    public get energy():number{
        return this._energy;
    }

    public get isFirstPlay():boolean{
        return this._isFirstPlay;
    }




}