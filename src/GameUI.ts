import Bubble, { BubbleState } from "./Bubble";
import { GameUtil } from "./GameUtil";
import { ui } from "./ui/layaMaxUI";

export default class GameUI extends ui.bubble.GameRenderUI{
    constructor(){
        super();
        this.initUI();
    }

    initUI(){
        this.img_bgRankList.alpha = 0.5;
        this.img_bgRankList.visible=false;
        this.rankList.itemRender = ui.bubble.RankItemRenderUI;
        this.rankList.renderHandler = new Laya.Handler(this,this.onItemRender);
        this.rankList.array=[];
    }

    private onItemRender(cell:ui.bubble.RankItemRenderUI,index:number){
        let data = cell.dataSource;
        // let color = Bubble.SKIN_LIST[data.skinIndex];
        cell.icon.graphics.clear();
        cell.icon.graphics.drawCircle(cell.icon.width/2,cell.icon.height/2,cell.icon.width/2,data.color);
        cell.icon.graphics.fillText(`${index+1}`,cell.icon.width/2,3,"14px Arial","#000000","center");
        cell.labelName.text = data.name;
        cell.labelScore.text = data.eatBeans.toString();
    }

    public updateRankList(...data:any[]){
        this.rankList.array =data;
        this.rankList.repeatY=data.length;
        this.img_bgRankList.visible= data.length>0;
        this.img_bgRankList.height = this.rankList.height+15;
    }

    showTotalScore(score:number){
        this.labelTotalScore.text = `得分:${score}`;
    }

    showLeftTime(time:number){
        this.labelTime.text =  GameUtil.fmtTime(time);
    }



}