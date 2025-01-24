import { _decorator, director, EventTarget, Node } from "cc";
import { UserComponent } from "../component/UserComponent";
import { GameStatus } from "../enum/GameStatus";
import { UIManager } from "./UIManager";
import { SharedService } from "../services/SharedService";
import { SerieRepository } from "../repository/SerieRepository";
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager {
    private static _instance: GameManager;
    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    public eventTarget: EventTarget = new EventTarget();

    private _userComponent: UserComponent;
    private _uiManager: UIManager;
    public serieRepository: SerieRepository; // ใช้สำหรับเก็บข้อมูล Serie ที่มีทั้งหมด
    public currentSerieId: number = 1; // ใช้สำหรับเก็บ Serie ที่กำลังเล่นอยู่
    public currentCharacterPackId: string[] = [];
    public selectedCharacterId: string;
    public character: Node = null;

    public GAME_STATE_CHANGED: string = "game-state-changed";
    public ACTIVE_USER_LABEL: string = "active-userComponent-label";

    public get userComponent(): UserComponent {
        return this._userComponent;
    }

    constructor() {
        director.on('applicationQuite', this._saveUserData, this);
    }

    public initialize(userComponent: UserComponent, uiManager: UIManager, serieRepository: SerieRepository): void {   
        SharedService.instance.on(this.GAME_STATE_CHANGED, this._updateGameState, this); 
        this.eventTarget.on(this.ACTIVE_USER_LABEL, this._onActiveInfoPanel, this);

        this._userComponent = userComponent;
        this._uiManager = uiManager;
        this.serieRepository = serieRepository;
        this.serieRepository.setupDefaultCharacterCollectData();

        this._loadCollection();

        console.log(`GameManager Initialize`);
    }

    public initCoin(coin: number) {
        this._userComponent.onCoinIncreased(coin);
    }

    private _updateGameState(status: GameStatus, eventData1?: any, eventData2?: any, eventData3?: any) {
        this._uiManager.updateUI(status, eventData1, eventData2, eventData3);
    }

    private _onActiveInfoPanel(active: boolean = true): void {
        this._userComponent.activeLabel(active);
    }

    public collectCharacter(characterId: number): void {

    }

    private _saveCollection(): void {

    }

    private _loadCollection(): void {

    }

    private _saveUserData() {

    }

    protected onDestroy(): void {
        this.eventTarget.off(this.GAME_STATE_CHANGED, this._updateGameState, this);
        this.eventTarget.off(this.ACTIVE_USER_LABEL, this._onActiveInfoPanel, this);
    }

}