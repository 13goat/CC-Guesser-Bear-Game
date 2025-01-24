import { _decorator, Component, Node } from 'cc';
import { SharedService } from '../services/SharedService';
import { GameStatus } from '../enum/GameStatus';
import { GameManager } from '../core/GameManager';
const { ccclass, property } = _decorator;

@ccclass('SerieViewModel')
export class SerieViewModel  {

    constructor(){
    }

    public onSerieSelected(id: string) {
        SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_PACK, id);
    }

}