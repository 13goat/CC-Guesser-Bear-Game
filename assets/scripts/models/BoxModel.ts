import { _decorator, Component, Enum, Node } from 'cc';
import { CharacterCollectedData } from '../data/CharacterCollectedData';
import { SerieView } from '../views/SerieView';

export class BoxModel {
    
    private _characterCollected: CharacterCollectedData[] = [];
    private _characterPackId: string[] = [];
    private _serieView: SerieView;

    constructor(characterCollected: CharacterCollectedData[], characterPackId: string[], serieNode: SerieView) {
        this._characterCollected = characterCollected;
        this._characterPackId = characterPackId;
        this._serieView = serieNode;
    }

    public get characterCollected(): CharacterCollectedData[] {
        return this._characterCollected;
    }    

    public get characterPackId(): string[] {
        return this._characterPackId;
    }

    public get serieView(): SerieView {
        return this._serieView;
    }

    public set characterCollected(value: CharacterCollectedData[]) {
        this._characterCollected = value;
    }

    public set characterPackId(value: string[]) {
        this._characterPackId = value;
    }  
    
} 