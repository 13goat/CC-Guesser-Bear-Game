import { _decorator, Button, CCBoolean, Component, Enum, EventHandler, Node } from 'cc';
import { GameManager } from '../core/GameManager';
import { CharacterChanceCalculator } from '../utils/CharacterChanceCalculator';
import { OpenBoxSelectionViewModel } from '../viewModels/OpenBoxSelectionViewModel';
const { ccclass, property, requireComponent } = _decorator;

enum PackType {
    one,
    six
}

Enum(PackType);
@ccclass('OpenBoxSelectionView')
@requireComponent(Button)
export class OpenBoxSelectionView extends Component {

    @property({ type: PackType })
    packType: PackType = PackType.one;

    private _viewModel: OpenBoxSelectionViewModel

    protected onLoad(): void {
        this._viewModel = new OpenBoxSelectionViewModel();
        this._initButton();
    }

    private _initButton() {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'OpenBoxSelectionView';
        clickEventHandler.handler = (this.packType === PackType.one) ? '_openOneBox' : '_openPack';
        const button = this.node.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
    }

    private _openOneBox(): void {
        console.log('Single');

        const userComponent = GameManager.instance.userComponent;
        if (userComponent.getCoin() >= 10) {
            userComponent.onCoinDecreased(10)
            this._viewModel.openBox(1);
        }

        console.log(userComponent.getCoin());
    }

    private _openPack(): void {
        console.log('Pack');
        
        const userComponent = GameManager.instance.userComponent;
        if (userComponent.getCoin() >= 60) {
            userComponent.onCoinDecreased(60)
            this._viewModel.openBox(6);
        }
    }

}