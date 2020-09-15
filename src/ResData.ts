export class ResData{

    public static RES_ATLAS_GAME = "res/atlas/game.atlas";

    public static getObstacleRes(index:number){
        return `game/bubble_${index}.png`;
    }
}