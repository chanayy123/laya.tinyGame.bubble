import { ResData } from "../data/ResData";


export default class SoundHelper{
    private static _useGesture:boolean=false;
    /**
     * 使用手势播放只会播放一次
     * @param name 
     * @param useGesture 
     */
    public static playMusic(name:string,useGesture=false){
        let path = ResData.getMusicPath(name);
        if(useGesture){
            if(!this._useGesture){
                Laya.SoundManager.playMusic(path,0);
                this._useGesture=true;
            }
        }else{
            Laya.SoundManager.playMusic(path,0);
        }
    }

    public static playAudio(name:string){
        let path = ResData.getAudioPath(name);
        Laya.SoundManager.playSound(path,1);
    }
}