import { _decorator, Component, Node } from 'cc';
import { SharedService } from '../services/SharedService';
import { GameManager } from '../core/GameManager';
import { GameStatus } from '../enum/GameStatus';
import { CharacterChanceCalculator } from '../utils/CharacterChanceCalculator';
const { ccclass, property } = _decorator;

@ccclass('OpenBoxSelectionViewModel')
export class OpenBoxSelectionViewModel {

    constructor() { }

    public openBox(boxAmount: 1 | 6) {
        if (boxAmount == 1) {
            let boxChanceCalculator = new CharacterChanceCalculator();
            const boxId = boxChanceCalculator.singleBoxOpen(GameManager.instance.currentCharacterPackId);
            SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_1_BOX, boxId);
        } else {
            SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_6_BOX,);
        }
    }

}


