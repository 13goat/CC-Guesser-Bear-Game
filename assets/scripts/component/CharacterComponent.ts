import { _decorator, Component, Node, SpriteFrame, Material } from 'cc';
import { CharacterViewModel } from '../viewModels/CharacterViewModel';
import { CharacterModel } from '../models/CharacterModel';
import { CharacterView } from '../views/CharacterView';
const { ccclass, property } = _decorator;

@ccclass('CharacterComponent')
export class CharacterComponent extends Component {
    @property
    private id: number;
    @property(SpriteFrame)
    private color: SpriteFrame[] = [];
    @property(Material)
    private whiteMaterial: Material = null;


    private _viewModel: CharacterViewModel;

    protected onLoad(): void {
        const model = new CharacterModel(this.id, this.color, this.whiteMaterial);
        const view = new CharacterView(this.node);
        this._viewModel = new CharacterViewModel(model, view);
    }

    public onDefaultColor(): void {
        this._viewModel.defaultAllPartColor();
    }   
    
    public onShadowColor(): void {
        this._viewModel.shadowAllPartColor();
    }

    public onChangePartColor(part: Node): void{
        this._viewModel.showPartColor(part);
    }    
    
    public onChangePartShadow(part: Node): void{
        this._viewModel.showPartShadow(part);
    }

    public onHighLightPartColor(part: Node): void{
        this._viewModel.highlightPartColor(part);
    }

    public onToggleCollider2D(part: Node, enable: boolean): void{
        this._viewModel.toggleCollider2D(part, enable);
    }

    public onToggleRigidBody2D(part: Node, enable: boolean): void{
        this._viewModel.toggleRigidBody2D(part, enable);
    }

    public getPartSprite(): SpriteFrame[] {
        return this.color
    }
}