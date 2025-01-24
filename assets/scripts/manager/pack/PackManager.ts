import { _decorator, Component, director, find, Node } from 'cc';
import { PackChanceCalculator } from './PackChanceCalculator';
import { Pack } from '../../items/Pack';
import { GameStatus } from '../../enum/GameStatus';
import { GameManager } from '../../core/GameManager';
const { ccclass, property, requireComponent } = _decorator;


//MVVM View
@ccclass('PackManager')
@requireComponent(PackChanceCalculator)
export class PackManager extends Component {

    public packGroupId: string[][]
    private _packGroupSelected: string[] = [];
    public eventData: string;

    @property(Node)
    private packs: Pack[] = [];

    packChanceCalculator: PackChanceCalculator;

    protected onEnable(): void {
        this._initPack();
        this.packChanceCalculator = new PackChanceCalculator;
        this.packGroupId = this.packChanceCalculator.createPack();
    }

    private _initPack(): void {
        this.packs.forEach(pack => {
            pack.getComponent(Pack).packManager = this.node;
        });
    }
   
    public showBoxPreview(eventData: string): void {
        this.eventData = eventData; 

        console.log(eventData)
        // console.log(this.packGroupId.length)

        switch (eventData) {
            case "Pack1<Pack>": {
                this._packGroupSelected = this.packGroupId[0];
                break;
            }
            case "Pack2<Pack>": {
                this._packGroupSelected = this.packGroupId[1];
                break;
            }
            case "Pack3<Pack>": {
                this._packGroupSelected = this.packGroupId[2];
                break;
            }
            case "Pack4<Pack>": {
                this._packGroupSelected = this.packGroupId[3];
                break;
            }
            case "Pack5<Pack>": {
                this._packGroupSelected = this.packGroupId[4];
                break;
            }
            case "Pack6<Pack>": {
                this._packGroupSelected = this.packGroupId[5];
                break;
            }
        }

        GameManager.instance.eventTarget.emit(GameManager.instance.GAME_STATE_CHANGED, GameStatus.BOX_SELECTION,  this._packGroupSelected);
    }

}

