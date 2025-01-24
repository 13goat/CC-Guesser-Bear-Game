import { _decorator, Component, Node } from 'cc';
import { CharacterCollectedData } from '../data/CharacterCollectedData';
import { SerieView } from '../views/SerieView';
const { ccclass, property } = _decorator;

@ccclass('GalleryModel')
export class GalleryModel {
    private _characterCollected: CharacterCollectedData[] = [];
    private _serieView: SerieView;
    private _serieNode: Node[] = [];

    constructor(characterCollected: CharacterCollectedData[], serieView: SerieView, serieNodes: Node[]) {
        this._characterCollected = characterCollected;
        this._serieView = serieView;
        this._serieNode = serieNodes;
    }

    public get characterCollected(): CharacterCollectedData[] {
        return this._characterCollected;
    }    

    public get serieView(): SerieView {
        return this._serieView;
    }

    public set characterCollected(value: CharacterCollectedData[]) {
        this._characterCollected = value;
    }

    public get serieNode(): Node[] {
        return this._serieNode;
    }
    
    public set serieView(value: SerieView) {
        this._serieView = value;
    }
}


