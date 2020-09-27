
import { GameUtil } from "../common/GameUtil";
import Resize from "../common/Resize";
import { MatchPlayer } from "../data/MatchData";
import { ui } from "../ui/layaMaxUI";

export default class GameUI extends ui.bubble.GameRenderUI{
    constructor(){
        super();
    }

    onAwake(){
        this.img_bgRankList.alpha = 0.5;
        this.rankList.itemRender = ui.bubble.RankItemRenderUI;
        this.rankList.renderHandler = new Laya.Handler(this,this.onItemRender);
    }

    onEnable(){
        this.rankList.array=[];
        this.boxList.visible=false;
        this.groupKill.visible=false;
        this.groupMatch.visible=false;
    }

    onDisable(){
    }

    public async showMatch(list:MatchPlayer[]){
        this.groupMatch.visible=true;
        let originBox1Y = this.matchBox1.centerY;
        this.matchBox1.centerY = this.matchBox2.centerY;
        this.progress.value=0;
        let tweenTime = 200;
        let count=0;
        for(let i=-1;i<list.length;++i){
            if(i<4){
                let player = new ui.bubble.HeadRenderUI();
                player.labelName.text = i==-1?"我":list[i].name;
                this.matchBox1.addChild(player);
                if(i == 3){
                    Laya.Tween.to(this.matchBox1,{centerY:originBox1Y},tweenTime);
                }
            }else{
                let player = new ui.bubble.HeadRenderUI();
                player.labelName.text = list[i].name;
                this.matchBox2.addChild(player);
            }
            this.progress.value+=0.1;
            ++count;
            this.labelProgress.text = `已匹配:${count}/10`;
            await GameUtil.wait(tweenTime);
        }
        this.groupMatch.visible=false;
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
        this.boxList.visible= data.length>0;
        this.img_bgRankList.height = this.rankList.height+15;
    }

    showTotalScore(score:number){
        this.labelTotalScore.text = `得分:${score}`;
    }

    showLeftTime(time:number){
        this.labelTime.text =  GameUtil.fmtTime(time);
    }

    showKillTip(srcName:string,dstName:string,duration:number=2000){
        this.groupKill.visible=true;
        this.labelSrc.text = srcName;
        this.labelDst.text = dstName;
        Laya.timer.clearAll(this);
        Laya.timer.once(duration,this,this.hideKillTip);
    }

    hideKillTip(){
        this.groupKill.visible=false;
    }

    onResize(){
        this.groupMatch.scale(Resize.minScale,Resize.minScale);
    }



}