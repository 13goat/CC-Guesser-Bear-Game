import { _decorator, CCString, Component, director } from "cc";
import { GameStatus } from "../enum/GameStatus";
import { GameManager } from "./GameManager";
import { UIManager } from "./UIManager";
import { UserComponent } from "../component/UserComponent";
import { SharedService } from "../services/SharedService";
import { SerieRepository } from "../repository/SerieRepository";
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    private _gameManager: GameManager;

    @property(CCString)
    public serieContentPath: string;

    protected onLoad(): void {
        this._gameManager = GameManager.instance;
        this._gameManager.initialize(this.getComponent(UserComponent), this.getComponent(UIManager), this.getComponent(SerieRepository));
        this._setupSerieRepository();
        SharedService.instance.emit(this._gameManager.GAME_STATE_CHANGED, GameStatus.START);

    }

    private _setupSerieRepository(): void {
        const serieRepository = this.getComponent(SerieRepository);
        const series = this.getComponent(UIManager).uiGroup.getChildByPath(this.serieContentPath).children;

        serieRepository.seriesData = series;
    }
}