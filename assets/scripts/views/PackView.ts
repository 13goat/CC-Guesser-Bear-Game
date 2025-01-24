import { _decorator, Button, Component, EventHandler, Node, Sprite } from 'cc';
import { PackViewModel } from '../viewModels/PackViewModel';
const { ccclass, property } = _decorator;

@ccclass('PackView')
export class PackView extends Component {
    @property(Node)
    private packs: Node[] = [];
    @property(Sprite)
    private bg: Sprite = null;

    private _viewModel: PackViewModel;

    protected onLoad(): void {
        this._viewModel = new PackViewModel();
        console.log(`Create PackView`);
        this._initialize();
    }

    protected onEnable(): void {
        if (this._viewModel) {
            this._initialize();
        }
    }

    private _initialize() {
        this.packs.forEach(pack => {
            const component = pack.getComponent(Button);
            if (component) {
                this._initialButtonEvent(pack)
            }
            this._viewModel.changePackSprite(pack);
        });
        this._viewModel.changeBG(this.bg);
    }

    private _initialButtonEvent(node: Node) {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'PackView';
        clickEventHandler.handler = '_onPackSelected';
        clickEventHandler.customEventData = node.name;

        const button = node.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
    }

    private _onPackSelected(event: Event, customEventData: string): void {
        console.log(`BoxIds ::: ${customEventData}`);
        this._viewModel.onPackSelected(customEventData);
    }
}