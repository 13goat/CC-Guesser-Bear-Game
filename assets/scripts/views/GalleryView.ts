import { _decorator, Component, Node, Sprite, ScrollView, Input, EventTouch } from 'cc';
import { CharacterComponent } from '../component/CharacterComponent';
import { GalleryViewModel } from '../viewModels/GalleryViewModel';
import { GameManager } from '../core/GameManager';
const { ccclass, property } = _decorator;

@ccclass('GalleryView')
export class GalleryView extends Component {

    @property([Node])
    public characterPositionNode: Node[] = [];
    @property(Sprite)
    private bg: Sprite = null;
    @property(Node)
    private serieSelectionArea: Node = null;

    private _viewModel: GalleryViewModel;

    start() {
        this._initialize();
        this.setInputActive(true);
    }

    private _initialize(): void {
        this._viewModel = new GalleryViewModel(this.getComponent(GalleryView),
            this.serieSelectionArea.getComponent(ScrollView).content.children);
            this._viewModel.onSeriesSelection(this.bg, GameManager.instance.currentSerieId);
        // this._viewModel.initializeCharacter();
        // this._viewModel.changeBG(this.bg);
    }

    public onSetupCharacterColor(character: Node, status: boolean = false): void {
        const characterComp = character.getComponent(CharacterComponent);

        if (status) {
            characterComp.onDefaultColor();
        } else {
            characterComp.onShadowColor();
        }
    }

    private setInputActive(active: boolean): void {
        if (active) {
            this.serieSelectionArea.getComponent(ScrollView).content.children.forEach(serie => {
                serie.on(Input.EventType.TOUCH_END, this._onTouchSerie, this);
            });
        } else {
            this.serieSelectionArea.getComponent(ScrollView).content.children.forEach(serie => {
                serie.off(Input.EventType.TOUCH_END, this._onTouchSerie, this);
            });
        }
    }

    private _onTouchSerie(event: EventTouch): void {
        const target = event.target as Node;
        const id = parseInt(target.name.substring(14, 16)); // Get ID from "SerieThumbnail1" Thumbnail name
        console.log(`target.name = ${target.name}, id = ${id}`);
        this._viewModel.onSeriesSelection(this.bg, id);
    }

    protected onDestroy(): void {
        this.setInputActive(false);
    }

}