import { GuessCharacterModel } from '../models/GuessCharacterModel';
import { GameManager } from '../core/GameManager';
import { GuessCharacterView } from '../views/GuessCharacterView';
import { SharedService } from '../services/SharedService';
import { CharacterUtil } from '../utils/CharacterUtil';
import { Sprite } from 'cc';
import { SaveLoad } from '../utils/SaveLoad';
import { StorageKey } from '../enum/StorageKey';

export class GuessCharacterViewModel {

    private _view: GuessCharacterView;
    private _model: GuessCharacterModel;
    public isColliderMatch: boolean = false;

    constructor(view: GuessCharacterView) {
        const serieRePository = GameManager.instance.serieRepository;
        this._model = new GuessCharacterModel(serieRePository.currentSerieView);
        this._view = view;
    }
    
    public changeBG(bgSprite: Sprite): void {
        const isRareCharacter = CharacterUtil.checkRareCharacter(GameManager.instance.selectedCharacterId);
        bgSprite.spriteFrame = isRareCharacter ? this._model.serieView.background[2] : this._model.serieView.background[1];
    }

    public IsCharacterCollected(): boolean {
        const characterCollected = GameManager.instance.serieRepository.loadCurrentCharacterCollectedSerie(GameManager.instance.currentSerieId);
        const isCharacterCollected = CharacterUtil.checkCharacterCollected(GameManager.instance.selectedCharacterId, characterCollected);
        // console.log(`Is a Character Collected : ${isCharacterCollected}`);
        return isCharacterCollected;
    }

    public onSetupCharacter(): void {
        this._view.setupCharacter(GameManager.instance.character);
    }

    public onInstantiatePart(): void {
        // console.log(`Index : ${index}, characterID : ${GameManager.instance.selectedCharacterId}`);
        this._view.instantiatePart(GameManager.instance.character);
    }

    public onShareService(eventData1: any, eventData2: any): void {
        SharedService.instance.emit("share-part-data", null, eventData1, eventData2);
        // console.log(`Share Service Emit : eventData1 = ${eventData1.name}, eventData2 = ${eventData2.name}`);
    }

    public onSharePartsDataServiceListener(): void {
        SharedService.instance.on("check-all-parts-completed", this._onAllPartsCompleted, this);
        console.log(`Share Service Listener : check-all-parts-completed`);
    }

    private _onAllPartsCompleted(): void {
        console.log(`All Parts Completed`);
        const serieId = GameManager.instance.currentSerieId;
        // SaveLoad.SaveData(StorageKey.CHARACTER_COLLECTED_SERIE + serieId, //CharacterCollectedData//);
        this._view.onAllPartsCompleted();
    }
}