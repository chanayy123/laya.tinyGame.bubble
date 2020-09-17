export class ResData{

    public static RES_ATLAS_GAME = "res/atlas/game.atlas";
    public static RES_ATLAS_EMOTION = "res/atlas/chat/emoji.atlas";

    public static getObstacleRes(index:number){
        return `game/bubble_${index}.png`;
    }

    public static getEmotionRes(id:number){
        return `chat/anim/emoji_${id}.ani`
    }
}