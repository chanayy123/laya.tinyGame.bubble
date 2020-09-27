export default class MatchData{
    private static _instance:MatchData;
    private _matchList:MatchPlayer[];

    public static get Instance():MatchData{
        if(this._instance == null){
            this._instance = new MatchData();
        }
        return this._instance;
    }

    public constructor(){
        this.makeFakeData();
    }

    public makeFakeData(){
        this._matchList = [];
        for(let i=0;i<9;++i){
          this._matchList.push(new MatchPlayer(`路人${i}号`));  
        }
        this._matchList.sort((l,r)=>Math.random()-0.5);
    }

    public get matchList(){
        return this._matchList;
    }

}

export class MatchPlayer{
    public head:number;
    public name:string;
    public constructor(name:string,head:number=-1){
        this.name =name;
        this.head =head;
    }
}