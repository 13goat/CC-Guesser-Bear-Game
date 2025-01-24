import { _decorator, Enum, sp, Vec3 } from 'cc';
import { GameManager } from '../core/GameManager';
import { BoxModel } from '../models/BoxModel';
import { CharacterStatus } from '../enum/CharacterStatus';
import { BoxUtil } from '../utils/BoxUtil';
import { CharacterComponent } from '../component/CharacterComponent';
import { SharedService } from '../services/SharedService';
import { GameStatus } from '../enum/GameStatus';
import { BoxView } from '../views/BoxView';
import { CharacterUtil } from '../utils/CharacterUtil';
import { Sprite } from 'cc';
const { ccclass, property } = _decorator;

export enum BoxOpenState {
    Close = "Close",
    Peeling = "Peeling",
    Peeled = "Peeled",
    Opening = "Opening",
    Opened = "Opened",
    Selection = "Selection"
}
Enum(BoxOpenState)
export class BoxViewModel {

    private _model: BoxModel;
    private _view: BoxView;
    private _boxOpenStatus: BoxOpenState = BoxOpenState.Close;
    private readonly _fixTimeDelay: number = 150;
    private readonly _defautCharacterScale: Vec3 = new Vec3(0.001, 0.001, 0.001);

    constructor(view: BoxView) {
        this._view = view;
        const serieRePository = GameManager.instance.serieRepository;
        this._model = new BoxModel(
            serieRePository.loadCurrentCharacterCollectedSerie(GameManager.instance.currentSerieId),
            serieRePository.loadCharacterPackIdPlayingSerie(),
            serieRePository.currentSerieView);
    }
    public changeBG(bgSprite: Sprite): void {
        bgSprite.spriteFrame = this._model.serieView.background[0];
    }

    // เปิด 1 กล่อง ได้จะมี 1 ตำแหน่ง เปิด 6 กล่อง จะมี 6 ตำแหน่ง
    public initializeBoxes(): void {
        console.log(`----- ${this._model.characterPackId}`);
        let isCharacterCollected: boolean = true;
        if (this._model.characterPackId.length === 1) {
            isCharacterCollected = CharacterUtil.checkCharacterCollected(this._model.characterPackId[0], this._model.characterCollected);
            console.log(`Is a Character Collected : ${isCharacterCollected}`);
        } else {
            isCharacterCollected = this._checkAllCharacterCollected();
            console.log(`Is All Character Collected : ${isCharacterCollected}`);
        }

        const boxPrefab = this._model.serieView.box;
        for (let index = 0; index < this._model.characterPackId.length; index++) {

            const characterIndex = BoxUtil.convertIdToIndex(this._model.characterPackId[index]);
            const characterPrefab = this._model.serieView.characters[characterIndex];

            this._view.boxes[index] = BoxUtil.instantiatedBox(boxPrefab, this._view.boxesPosition[index], this._getDefaultBoxScale());
            this._view.characters[index] = CharacterUtil.instantiateCharacter(characterPrefab, this._view.boxesPosition[index], this._defautCharacterScale);

            const characterId = this._model.characterPackId[index];
            const isCollected = CharacterUtil.checkCharacterCollected(characterId, this._model.characterCollected);
            this._view.characters[index].getComponent(CharacterComponent)[isCollected ? "onDefaultColor" : "onShadowColor"]();
        }

        const characterLength = this._model.characterPackId.length;
        this._view.setSpineEventListener(this._view.boxes[characterLength - 1].getComponent(sp.Skeleton), this._boxOpenStatus, (status: BoxOpenState) => {
            if (status == null) {
                status = this._boxOpenStatus
            } else {
                this._boxOpenStatus = status;
            }

            if (status === BoxOpenState.Opened) {
                this._getCoinFromCollectedCharacter();
                this._boxOpenStatus = BoxOpenState.Selection
                SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.OPEN_BOX_FINISHED, this._model.characterPackId, isCharacterCollected);
            }
        });
    }

    public handleBoxTouch(boxId: number = -1): void {
        console.log(`Status Change to == ${this._boxOpenStatus}`);

        switch (this._boxOpenStatus) {
            case BoxOpenState.Close: {
                this._boxOpenStatus = BoxOpenState.Peeling
                this._peelCover();
            } break;
            case BoxOpenState.Peeled: {
                this._boxOpenStatus = BoxOpenState.Opening
                this._boxOpen();
                this._boxMoveToBottom(1);
                this._characterAppear(1);
            } break;
            case BoxOpenState.Selection: {
                this._checkGameState(boxId);
            } break;
        }
    }

    private _getCoinFromCollectedCharacter(): void {
        let coin: number = 0;

        const collectedCharacters = this._model.characterCollected.filter(
            character => character.status === CharacterStatus.COLLECTED);

        for (let index = 0; index < this._model.characterPackId.length; index++) {
            if (collectedCharacters.find(collectedCharacter => collectedCharacter.id === this._model.characterPackId[index])) {
                coin += 8;
            }
        }

        GameManager.instance.userComponent.onCoinIncreased(coin);
    }

    private _checkAllCharacterCollected(): boolean {
        let isCharacterCollected: boolean = true;
        for (let index = 0; index < this._model.characterPackId.length; index++) {
            if (CharacterUtil.checkCharacterCollected(this._model.characterPackId[index], this._model.characterCollected)) {
                isCharacterCollected = false;
                break;
            }
        }
        return isCharacterCollected;
    }

    private _checkGameState(boxId: number): void {
        const index = boxId == 0 ? boxId : boxId - 1;
        const characterId = this._model.characterPackId[index];

        console.log(`Id is `, boxId);

        // if (this._checkCharacterCollected(characterId)) {
        //     SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.START);
        // } else {
        SharedService.instance.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.GUESS_BEAR, characterId, this._view.characters[index]);
        // }
    }

    private _peelCover(): void {
        // console.log(`PeelOff`);
        this._view.boxes.forEach((box, index) => {
            setTimeout(() =>
                this._view.playSpineAnimation(box, 'PeelOff', false), this._fixTimeDelay * index);
        });
    }

    private _boxOpen(): void {
        // console.log(`BoxOpen`);
        this._view.boxes.forEach((box, index) => {
            setTimeout(() =>
                this._view.playSpineAnimation(box, 'BoxOpen', false), this._fixTimeDelay * index);
        });
    }

    private _boxMoveToBottom(time: number = 1): void {
        for (let index = 0; index < this._view.boxes.length; index++) {
            this._view.boxes.forEach(box => {
                this._view.moveBoxToPosition(box, new Vec3(0, box.position.y, 0), this._getNewBoxScale(), time);
            });
        }
    }

    private _characterAppear(time: number = 1): void {
        this._view.characters.forEach((character, index) => {
            character.setPosition(new Vec3(0, this._view.boxes[index].position.y + 100, 0));
            this._view.animateCharacterAppearance(character, this._getNewCharacterScale(), time);
        });

    }

    private _getDefaultBoxScale(): Vec3 {
        if (this._model.characterPackId.length > 1) {
            return new Vec3(0.3, 0.3, 0.3);
        } else return new Vec3(0.5, 0.5, 0.5);
    }

    private _getNewBoxScale(): Vec3 {
        if (this._model.characterPackId.length > 1) {
            return new Vec3(0.15, 0.15, 0.15);
        } else return new Vec3(0.3, 0.3, 0.3);
    }

    private _getNewCharacterScale(): Vec3 {
        if (this._model.characterPackId.length > 1) {
            return new Vec3(0.4, 0.4, 0.4);
        } else return new Vec3(0.7, 0.7, 0.7);
    }

}