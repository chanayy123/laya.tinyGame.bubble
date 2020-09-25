export class ResData{
    public static RES_ATLAS_EMOTION = "res/atlas/chat/emoji.atlas";

    public static RES_SOUND_CLICK = "click";
    public static RES_SOUND_BG = "bg";
    public static RES_SOUND_EAT= "eat";
    public static RES_SOUND_WIN = "win";
    public static RES_SOUND_FAIL = "fail";
    public static RES_SOUND_RETURN = "return";

    public static RES_SCENE_LAUNCH = "bubble/LaunchScene.scene";
    public static RES_SCENE_SELECT = "bubble/SelectScene.scene";
    public static RES_SCENE_Main = "bubble/MainScene.scene";

    public static getMusicPath(name:string){
        return  `sound/music_${name}.mp3`;
    }

    public static getAudioPath(name:string){
        return  `sound/audio_${name}.mp3`;
    }
    
    public static getObstacleRes(index:number){
        return `gameSkin/bubble_${index}.png`;
    }

    public static getEmotionRes(id:number){
        return `chat/anim/emoji_${id}.ani`
    }
}