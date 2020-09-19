import GameConfig from "./GameConfig";
import GameUI from "./GameUI";
import { GameUtil } from "./GameUtil";
import { ui } from "./ui/layaMaxUI";

export default class GameResultUI extends ui.bubble.GameResultRenderUI{
    constructor(){
        super()
        this.initUI();
    }
    initUI(){
        this.htmlTxt.style.fontSize = 45;
        this.htmlTxt.style.wordWrap = true;
        this.htmlTxt.style.align = Laya.HTMLStyle.ALIGN_CENTER;
        this.htmlTxt.style.width = this.boxHtmlTxt.width;
        this.htmlTxt.style.height = this.boxHtmlTxt.height;
        this.btnGet.on(Laya.Event.CLICK,this,this.onClick);
        this.mouseEnabled=true;
    }

    private onClick(){
        console.log("刷新界面重新开始游戏");
        window.location.reload();
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
            this.img_star.rotation += 2;
        }
    }

    public hide(){
        this.visible=false;
    }

}