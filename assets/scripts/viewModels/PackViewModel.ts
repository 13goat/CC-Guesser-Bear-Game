import { _decorator, Component, Node, Sprite } from 'cc';
import { PackModel } from '../models/PackModel';
import { GameManager } from '../core/GameManager';
import { GameStatus } from '../enum/GameStatus';
import { SharedService } from '../services/SharedService';

export class PackViewModel {

    private _model: PackModel;

    constructor() {
        this._model = new PackModel();
    }

    public onPackSelected(eventData: string): void {
        let packIndex: number = -1;

        switch (eventData) {
            case "Pack1": {
                packIndex = 1;
                break;
            }
            case "Pack2": {
                packIndex = 2;
                break;
            }
            case "Pack3": {
                packIndex = 3;
                break;
            }
            case "Pack4": {
                packIndex = 4;
                break;
            }
            case "Pack5": {
                packIndex = 5;
                break;
            }
            case "Pack6": {
                packIndex = 6;
                break;
            }
            case "Pack6": {
                packIndex = 6;
                break;
            }
        }

        if (packIndex >= 1) {

            this._showBoxPreview(this._model.characterGroupId[packIndex - 1]); // เพราะเป็น Array Index เลยให้ packIndex-1 
        }
    }

    public changeBG(bgSprite: Sprite): void {
        bgSprite.spriteFrame = this._model.serieView.background[0];
    }

    public changePackSprite(pack: Node): void {
        pack.getComponent(Sprite).spriteFrame = this._model.serieView.packSprite;
        console.log(`Sprite Name = ${this._model.serieView.packSprite.name}`)
    }

    private _showBoxPreview(characterGroupId: string[]): void {
        SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.BOX_SELECTION, characterGroupId);
    }
}