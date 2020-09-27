import { GameUtil } from "../common/GameUtil";
import Resize from "../common/Resize";
import SceneManager from "../common/SceneManager";
import SoundHelper from "../common/SoundHelper";
import { ResData } from "../data/ResData";
import { ui } from "../ui/layaMaxUI";


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
        this.mouseEnabled=true;
    }

    onAwake(){
        this.initUI();
    }

    onEnable(){
        this.on(Laya.Event.CLICK,this,this.onBtnClick);
    }

    onDisable(){
        this.off(Laya.Event.CLICK,this,this.onBtnClick);
    }
    

    private onBtnClick(e:Laya.Event){
        if(e.target == this.btnGet){
            SceneManager.Instance.open(ResData.RES_SCENE_SELECT);
            SoundHelper.playAudio(ResData.RES_SOUND_RETURN);
        }
    }

    public show(rank:number,score:number,energy:number ,attackName:string){
        this.visible=true;
        this.labelRank.text = `第${rank}名`;
        this.labelScore.text = `积分: ${score}`;
        this.htmlTxt.innerHTML = attackName?`<span color='#ffffff'>被</span><span color='#e0c4c4'>${attackName}</span><span color='#ffffff'>吃掉了</span>`:"";
        this.labelEnergy.text = `${energy}`;
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

    onResize(){
        this.uiGroup.scale(Resize.minScale,Resize.minScale);
    }

}