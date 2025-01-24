import { _decorator, Component, input, Input, Node, EventMouse, EventTouch, instantiate, Vec3, tween, find, sp, Prefab, Sprite } from 'cc';
import { BoxOpenState, BoxViewModel } from '../viewModels/BoxViewModel';
const { ccclass, property } = _decorator;
const { spine } = sp;
const { TrackEntry } = spine;


@ccclass('BoxView')
export class BoxView extends Component {

    @property(Node)
    private boxTouchArea: Node = null;
    @property(Node)
    public boxesPosition: Node[] = [];
    @property(Sprite)
    private bg: Sprite = null;

    public boxes: Node[] = [];
    public characters: Node[] = [];
    private _viewModel: BoxViewModel;

    start() {
        this._init();
        this._setInputActive(true);
    }

    private _init(): void {
        this._viewModel = new BoxViewModel(this.getComponent(BoxView));
        this._viewModel.initializeBoxes();
        this._viewModel.changeBG(this.bg);
        console.log(`BoxArea name = ${this.boxTouchArea.name}`);
    }

    public playSpineAnimation(node: Node, animationName: string, loop: boolean): void {
        const spine = node.getComponent(sp.Skeleton);
        if (spine) {
            spine.setAnimation(0, animationName, loop);
        }
    }

    public moveBoxToPosition(box: Node, position: Vec3, scale: Vec3, duration: number): void {
        tween(box)
            .to(duration, { position: position, scale: scale }, { easing: 'cubicOut' })
            .start();
    }

    public animateCharacterAppearance(character: Node, scale: Vec3, duration: number): void {
        tween(character)
            .delay(0.8)
            .to(duration, { scale: scale }, {
                easing: 'cubicOut',
                // onComplete: () => {
                //     console.log(`Bear info : position - (${character.position}, scale - (${character.scale}))`);
                // }
            },)
            .start();
    }

    public setSpineEventListener(spine: sp.Skeleton, status: BoxOpenState, callback: (status: BoxOpenState) => void): void {
        spine.setCompleteListener(trackEntry => {
            let state: BoxOpenState;
            if (trackEntry.animation.name == "PeelOff") {
                state = BoxOpenState.Peeled
            } else if (trackEntry.animation.name == "BoxOpen") {
                state = BoxOpenState.Opened
            }
            callback(state);
        });
    }

    private _setInputActive(active: boolean): void {
        if (active) {
            // For PC
            input.on(Input.EventType.MOUSE_UP, this._onMouseUp, this);
            // For Mobile
            this.boxesPosition.forEach(box => {
                box.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
            });

        } else {
            // For PC
            input.off(Input.EventType.MOUSE_UP, this._onMouseUp, this);
            // For Mobile

            this.boxesPosition.forEach(box => {
                box.off(Input.EventType.TOUCH_START, this._onTouchStart, this);
            });
        }
    }

    private _onMouseUp(event: EventMouse): void {

        const target = event.target as Node;
        console.log(`Click +++ ${target?.name}`);

        if (event.getButton() === 0 && target?.name.includes("BoxGroup")) {
            const id = parseInt(target.name.substring(8, 9));
            this._viewModel.handleBoxTouch(id);
        }

    }

    private _onTouchStart(event: EventTouch): void {

        const target = event.target as Node;

        if (target?.name.includes("BoxGroup")) {
            const id = parseInt(target.name.substring(8, 10));
            // console.log(`Click +++ name: ${target?.name}, Id: ${id}`);
            this._viewModel.handleBoxTouch(id); // Get Array id from name ${BoxGroup1} // Single Box open id = -1
        }

    }
}


