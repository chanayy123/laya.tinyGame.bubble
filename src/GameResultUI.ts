import Bubble, { BubbleFactory } from "./Bubble";
import ScaleButton from "./common/ScaleButton";
import GameConfig from "./GameConfig";
import GameUI from "./GameUI";
import { GameUtil } from "./GameUtil";
import { ui } from "./ui/layaMaxUI";

export default class GameResultUI extends ui.bubble.GameResultRenderUI{
    constructor(){
        super()
    }
    initUI(){
        this.htmlTxt.style.fontSize = 45;
        this.htmlTxt.style.wordWrap = true;
        this.htmlTxt.style.align = Laya.HTMLStyle.ALIGN_CENTER;
        this.htmlTxt.style.width = this.boxHtmlTxt.width;
        this.htmlTxt.style.height = this.boxHtmlTxt.height;
        this.btnGet.getComponent(ScaleButton).clickHandler = Laya.Handler.create(this,this.onClick);
        this.mouseEnabled=true;
    }

    onAwake(){
        this.initUI();
    }

    private onClick(){
        Laya.Scene.open("bubble/LaunchScene.scene");
    }

    public show(rank:number,score:number,attackName:string){
        this.visible=true;
        this.labelRank.text = `第${rank}名`;
        this.labelScore.text = `积分: ${score}`;
        this.htmlTxt.innerHTML = attackName?`<span color='#ffffff'>被</span><span color='#e0c4c4'>${attackName}</span><span color='#ffffff'>吃掉了</span>`:"";
        this.labelEnergy.text = `${score*10}`;
        this.startAutoRotate();
    }
    
    async startAutoRotate(){
        while(true){
            await GameUtil.wait(100);
            if(!this.activeInHierarchy) break;
            this.img_star.rotation += 2;
        }
    }

    public hide(){
        this.visible=false;
    }

}