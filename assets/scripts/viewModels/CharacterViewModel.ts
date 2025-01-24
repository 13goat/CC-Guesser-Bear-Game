import { _decorator, Color, Sprite, Node, SpriteFrame, Material } from 'cc';
import { CharacterModel } from '../models/CharacterModel';
import { CharacterView } from '../views/CharacterView';
import { EffectAsset } from 'cc';

export class CharacterViewModel {
    private _model: CharacterModel;
    private _view: CharacterView;

    constructor(model: CharacterModel, view: CharacterView) {
        this._model = model;
        this._view = view;
    }

    public highlightPartColor(part: Node): void {
        this._view.changePartColor(part, Color.CYAN);
    }

    public shadowAllPartColor(): void {
        this._view.node.children.forEach((part) => {
            // const index = parseInt(part.getComponent(Sprite).spriteFrame.name.substring(0, 2)) - 1
            // const spriteFrame = this._model.white[index];
            // this._view.setPartSpriteFrame(part, spriteFrame);
            part.getComponent(Sprite).customMaterial = this._model.material;
            this.showPartShadow(part);
        });
    }

    public defaultAllPartColor(): void {
        this._view.node.children.forEach((part) => {

            // const customMaterial = part.getComponent(Sprite).customMaterial;

            
            part.getComponent(Sprite).customMaterial = null;
            // part.getComponent(Sprite).customMaterial = this._model.material;
            // console.log(`Material Name = ${customMaterial.name}`);

            this.showPartColor(part);
        });

    }

    public showPartShadow(part: Node): void {
        this._view.changePartColor(part, Color.BLACK);
    }

    public showPartColor(part: Node): void {
        try {
            // const index = parseInt(part.getComponent(Sprite).spriteFrame.name.substring(0, 2)) - 1
            // const spriteFrame = this._model.color[index];
            // this._view.setPartSpriteFrame(part, spriteFrame);
            part.getComponent(Sprite).customMaterial = null;
            this._view.changePartColor(part, Color.WHITE);
        } catch (error) {
            console.error(`Part Name = ${part.name}, error`);
        }
    }

    public toggleCollider2D(part: Node, enable: boolean): void {
        if (enable) {
            this._view.enableCollider2D(part);
        } else {
            this._view.disableCollider2D(part);
        }
    }

    public toggleRigidBody2D(part: Node, enable: boolean): void {
        if (enable) {
            this._view.enableRigidBody2D(part);
        } else {
            this._view.disableRigidBody2D(part);
        }
    }
}