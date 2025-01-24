import { SpriteFrame } from "cc";
import { CharacterModel } from "./CharacterModel";

export class SerieModel {
    private _id: number;
    private _box: Node;
    private _packImage: SpriteFrame;
    private _characters: CharacterModel[] = [];
    private _charactePart: CharacterModel[] = [];

    constructor(id: number, character: CharacterModel[]) {
        this._id = id;
        this._characters = character;
    }
}