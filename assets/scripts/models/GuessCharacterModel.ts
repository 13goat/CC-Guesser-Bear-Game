import { _decorator, Component } from 'cc';
import { SerieView } from '../views/SerieView';
const { ccclass, property } = _decorator;

@ccclass('GuessCharacterModel')
export class GuessCharacterModel {
    
    private _serieView: SerieView;

    constructor(serieView: SerieView) {
        this._serieView = serieView;
    }

    public get serieView(): SerieView {
        return this._serieView;
    }
}


