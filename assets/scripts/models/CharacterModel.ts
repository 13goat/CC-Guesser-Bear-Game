import { Material } from "cc";
import { SpriteFrame } from "cc";

export class CharacterModel {
    private _id: number;
    private _isCollected: boolean = false;
    private _isTargetShadow: boolean = false;
    private _color: SpriteFrame[] = [];
    private _material: Material = null;

    constructor(id: number, color: SpriteFrame[], material: Material) {
        this._id = id;
        this._color = color;
        this._material = material;
    }

    public get isCollected(): boolean {
        return this._isCollected;
    }

    public set isCollected(isCollected: boolean) {
        this._isCollected = isCollected;
    }

    public get isTargetShadow(): boolean {
        return this._isTargetShadow;
    }

    public set isTargetShadow(isShadow: boolean) {
        this._isTargetShadow = isShadow;
    }

    public get color(): SpriteFrame[] {
        return this._color;
    }

    public get material(): Material {
        return  this._material;
     }

}