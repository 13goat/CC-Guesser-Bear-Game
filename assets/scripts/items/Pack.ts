import { _decorator, Button, CCString, Component, EventHandler, find, Node } from 'cc';
import { PackManager } from '../manager/pack/PackManager';
const { ccclass, property } = _decorator;

@ccclass('Pack')
export class Pack extends Component {

    @property
    private id: string = "-"

    public packManager: Node = null;

    protected start(): void {
        this.id = this.name;
        this._initButton();
    }

    private _initButton(): void {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'Pack';
        clickEventHandler.handler = '_showBoxPreview';
        clickEventHandler.customEventData = this.name;

        const button = this.node.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
    }

    private _showBoxPreview(event: Event, customEventData: string): void {
        console.log(`BoxIds ::: ${customEventData}`);

        this.packManager.getComponent(PackManager).showBoxPreview(customEventData);
    }
}