import { GameManager } from "../core/GameManager";
import { PackChanceCalculator } from "../manager/pack/PackChanceCalculator";
import { SerieView } from "../views/SerieView";

export class PackModel {

    private _characterGroupId: string[][] = [];
    private _serieView: SerieView;

    constructor() {
        this._createPackGroup();
    }

    private _createPackGroup(): void {
        this._characterGroupId = new PackChanceCalculator().createPack();
    }

    public get characterGroupId(): string[][] {
        return this._characterGroupId;
    }

    public get serieView(): SerieView {
        this._serieView =
            GameManager.instance.serieRepository.currentSerieView
        return this._serieView;
    }

}