import { _decorator, Button, Component, EventHandler, instantiate, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowCharacterPackView')
export class ShowCharacterPackView extends Component {

    @property([Node])
    public boxes: Node[] = [];

    @property(Node)
    private mainMenuButton: Node = null;

    private _showHomeButton(previews: string[]): void {
        for (let index = 0; index < previews.length; index++) {
            if (previews[index] == "box") {
                this.mainMenuButton.active = false;
                break;
            }
        }
    }

    private _setupBoxSprite(dataListPreview: string[], packGroupSelected: string[]): void {
        for (let index = 0; index < dataListPreview.length; index++) {
            if (dataListPreview[index] == "bear") {
                GameManager.instance.userComponent.onCoinIncreased(8);
                let bearIndex = boxUtil.convertIdToIndex(packGroupSelected[index]);
                let bear = instantiate(GameManager.instance.bears[bearIndex]);
                bear.parent = this.boxes[index];
                bear.setPosition(new Vec3(0, 40, 0)); 
                bear.setScale(new Vec3(0.5, 0.5, 0.5));
            } else {
                let box = instantiate(GameManager.instance.currentSerie.getComponent(Serie).box);
                box.parent = this.boxes[index];
                box.setPosition(new Vec3(0, 0, 0));
                box.setScale(new Vec3(0.36, 0.36, 0.36));

                this._initButton(box.parent, packGroupSelected[index]);

                console.log(box.parent.name);

                // box.getChildByName("Box").getComponent(Box).id = GameManager.instance.packGroupSelected[index];
            }
        }
    }

    private _initButton(boxNode: Node, id: string): void {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'BoxManager';
        clickEventHandler.handler = '_showOpenBox';
        clickEventHandler.customEventData = id;

        const button = boxNode.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
    }

    private _showOpenBox(event: Event, customEventData: string): void {
        GameManager.instance.eventTarget.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.SHOW_1_BOX, customEventData);
        console.log(`Open 1 Box : ${customEventData}`);
    }
}


