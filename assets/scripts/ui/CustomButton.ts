import { _decorator, Component, director, Node } from 'cc';
import { GameManager } from '../core/GameManager';
import { GameStatus } from '../enum/GameStatus';
import { SharedService } from '../services/SharedService';
const { ccclass, property } = _decorator;

@ccclass('CustomButton')
export class CustomButton extends Component {

    private _eventTarget: EventTarget;

    public hideUi(): void {
        GameManager.instance.userComponent.activeLabel();
        // this.node.parent.active = false;
        this.node.parent.destroy();
    }

    public gotoMatchUp(): void {
        SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.GUESS_BEAR);
    }

    public gotoGallery(): void {
        SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_Gallery);
    }
    
    public gotoMain(): void {
        SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.START);
    }
}