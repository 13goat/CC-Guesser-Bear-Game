import { _decorator, Button, CCInteger, Component, Enum, EventHandler, Node, Prefab, SpriteFrame } from 'cc';
import { SerieViewModel } from '../viewModels/SerieViewModel';
import { SerieStatus } from '../enum/SerieStatus';
const { ccclass, property, requireComponent } = _decorator;

Enum(SerieStatus)
@ccclass('SerieView')
@requireComponent(Button)
export class SerieView extends Component {

    @property(CCInteger)
    private id: number;
    @property(Prefab)
    public box: Prefab | null = null;
    @property(SpriteFrame)
    public packSprite: SpriteFrame | null = null;
    @property([SpriteFrame]) 
    public background: SpriteFrame[] = [];
    @property({type: SerieStatus})
    public status: SerieStatus = SerieStatus.EMPTY;
    @property(Prefab)
    public characters: Prefab[] = [];

    private _viewModel: SerieViewModel;

    protected onLoad(): void {
        this._viewModel = new SerieViewModel();
        this._initButton();
    }

    private _initButton(): void {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'SerieView';
        clickEventHandler.handler = '_showPack';
        clickEventHandler.customEventData = this.id.toString();
        const button = this.node.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
    }

    private _showPack(event: Event, customEventData: string): void {
        this._viewModel.onSerieSelected(customEventData);
    }
}


