import { _decorator, Collider2D, Component, Contact2DType, EventTouch, IPhysics2DContact, Node, tween, UITransform, v2, Vec2, Vec3 } from 'cc';
import { PitchTossViewModel } from '../viewModel/PitchTossViewModel';
const { ccclass, property } = _decorator;

@ccclass('PitchTossView')
export class PitchTossView extends Component {

    @property(Node)
    tossArea: Node = null;

    @property(Node)
    coin: Node = null;

    @property([Node])
    slots: Node[] = [];

    private _viewModel: PitchTossViewModel;
    private _swipeStart: Vec2;
    private _isTossing: boolean = false;

    private _initCoinPosition: Vec3;

    protected onLoad(): void {
        this._initCoinPosition = this.coin.getPosition();
        console.log(this._initCoinPosition);
        this._viewModel = new PitchTossViewModel();
        this.tossArea.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.tossArea.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
    }

    private _resetCoinPosition(): void{
        this.coin.setPosition(this._initCoinPosition);
    }

    private _onTouchStart(event: EventTouch): void {
        if (this._isTossing) return;

        this._swipeStart = event.getLocation();
        console.log(`Touch Coin Start`);
    }

    private _onTouchEnd(event: EventTouch): void {
        if (this._isTossing) return;

        this._resetCoinPosition();

        const swipeEnd = event.getLocation();

        if (this._swipeStart < swipeEnd ) return;
        const tossDistance = this._viewModel.calculateTossDistance(this._swipeStart, swipeEnd);
        this._tossCoin(tossDistance);
        console.log(`Touch Coin Ended --- Distance = ${tossDistance}`);
    }

    private _tossCoin(distance: number): void {
        this._isTossing = true;

        const startPosition = new Vec3(0, -550, 0);
        const targetPosition = startPosition.add(new Vec3(0, distance, 0));

        tween(this.coin)
            .to(0.6 , { position: targetPosition })
            .call(() => {
                this._onCoinFall();
                this._isTossing = false;
            })
            .start();

        console.log(`Toss Coin`);
    }

    private _onCoinFall(): void {
        console.log(`Coin Fall`);
        const landedSlot = this._detectSlot();
        if (landedSlot >= 0) {
            const reward = this._viewModel.getReward(landedSlot);
            console.log(`You landed on slot ${landedSlot} and won ${reward} points!`);
        } else {
            console.log("No reward, try again.");
        }
    }

    private _detectSlot(): number {
        for (let i = 0; i < this.slots.length; i++) {
            const slot = this.slots[i];
            if (this.coin.getComponent(UITransform).getBoundingBox().intersects(slot.getComponent(UITransform).getBoundingBox())) {
                return i;
            }
        }
        return -1;
    }
}


