import { Sprite } from 'cc';
import { SpriteFrame } from 'cc';
import { _decorator, Button, CCFloat, CCInteger, Component, EventTouch, input, Input, Layout, Node, ScrollView, tween, UITransform, Vec2, Vec3 } from 'cc';
import { GameManager } from '../core/GameManager';
import { SerieView } from '../views/SerieView';
import { Color } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('ScrollViewSwipe')
@requireComponent(ScrollView)
export class ScrollViewSwipe extends Component {

    @property(CCFloat)
    private snapSpeed: number = 0.3;
    @property(CCInteger)
    private swipeThreshold: number = 50;
    @property(Node)
    private bg: Node = null;

    private _scrollView: ScrollView;
    private _targetIndex: number = 0;
    private _itemPositions: number[] = [];
    private _spacing: number;
    private _startTouch: Vec2 = new Vec2(0, 0);

    protected start(): void {
        this._addTouchListener();
        this._initializeSnapPositions();
    }

    private _addTouchListener() {
        this.node.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);

    }

    private _onTouchStart(event: EventTouch) {
        console.log(`----- ${event.target.name}`);
        this._startTouch = event.getLocation();
    }

    private _onTouchEnd(event: EventTouch) {
        const delta = event.getLocation().subtract(this._startTouch);

        this._scrollView.content.children.forEach(serie => {
            serie.getComponent(Button).enabled = true;
        });

        if (Math.abs(delta.x) > Math.abs(delta.y) && Math.abs(delta.x) > this.swipeThreshold) {
            delta.x > 0 ? this._onSwipeRight() : this._onSwipeLeft();
        }
        // else {
        //     this._snapToNearest();
        // }
    }

    private _onSwipeLeft() {
        console.log('Swiped Left');
        this._snapToNearest(140);
    }

    private _onSwipeRight() {
        console.log('Swiped Right');
        this._snapToNearest(-140);
    }

    public onNextButtonPressed() {
        this._snapToItem(this._targetIndex + 1);
    }

    public onPreviousButtonPressed() {
        this._snapToItem(this._targetIndex - 1);
    }

    private _initializeSnapPositions() {
        this._scrollView = this.node.getComponent(ScrollView);
        const content = this._scrollView.content!;
        const itemNodes = content.children;

        this._spacing = this.node.children[1].children[0].getComponent(Layout).spacingX;
        let itemWidth: number = 0;

        if (itemNodes.length > 0) {
            itemWidth = itemNodes[0].getComponent(UITransform)!.width * itemNodes[0].scale.x + this._spacing
            this._itemPositions = itemNodes.map((_, index) => (-index * itemWidth) + content.position.x);
            console.log(`Item width : ${itemWidth}`);
        }

        // this._itemPositions.forEach((item, index) => {
        //     console.log(`position: ${item}, (-index * itemWidth) + content.position.x = (${-index} * ${itemWidth}) -=+ ${content.position.x} = ${(-index * itemWidth) + content.position.x}`);
        // });

        // console.log(`Content PosX : ${this._scrollView.content!.position.x}`);
    }

    private _snapToNearest(threshold: number) {
        const contentX = this._scrollView.content!.position.x;
        console.log(`contentX posX = ${contentX}`);

        let closestIndex = 0;
        let minDistance = Infinity;

        for (let i = 0; i < this._itemPositions.length; i++) {
            const distance = Math.abs(contentX - this._itemPositions[i] - threshold);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }
        // console.log(`minDistance : ${minDistance}`);

        // Snap to the closest item
        this._snapToItem(closestIndex);
    }

    private _snapToItem(index: number) {

        if (index < 0 || index >= this._itemPositions.length) return;

        this._targetIndex = index;
        const targetPosX = this._itemPositions[index] + this._spacing / 2;

        // this._scrollView.content.position = new Vec3(targetPosX, this._scrollView.content!.position.y, 0);

        tween(this._scrollView.content)
            .to(this.snapSpeed,
                { position: new Vec3(targetPosX, this._scrollView.content!.position.y, 0) },
                { easing: 'smooth' })
            .call(() => {
                this._scrollView.content!.setPosition(new Vec3(targetPosX, this._scrollView.content!.position.y, 0));
                console.log(`Snapped to index : ${this._targetIndex}`);
                console.log(`Move to ${targetPosX}`);
                // currentSerieId เริ่มที่ 1 แต่ targetIndex เริ่มที่ 0
                GameManager.instance.currentSerieId = this._targetIndex + 1;
            })
            .start();

        this._transitionBackground(this._targetIndex);
    }

    private _transitionBackground(index: number) {
        const sprite = this.node.getComponent(Sprite);
        const bgSprite = this.bg.getComponent(Sprite);
        sprite.spriteFrame = this.bg.getComponent(Sprite).spriteFrame;
        const targetSpriteFrame = GameManager.instance.serieRepository.seriesData[index].getComponent(SerieView).background[0];

        class BindTarget {
            color: Color;
            alpha: number
        }

        let bindTarget = new BindTarget();
        bindTarget.color = Color.WHITE;
        bindTarget.alpha = 255;

        tween(bindTarget)
            .to(0.1, { color: Color.WHITE, alpha: 0 }, {
                onUpdate(tar: BindTarget) {
                    bgSprite.color = new Color(tar.color.r, tar.color.g, tar.color.b, tar.alpha);
                }
            },)
            .call(() => {
                // Change the SpriteFrame after the color transition to black
                bgSprite.spriteFrame = targetSpriteFrame;

                // Tween to change color from black to white
                tween(bindTarget)
                    .delay(0.05)
                    .to(0.1, { color: Color.WHITE, alpha: 255 }, {
                        onUpdate(tar: BindTarget) {
                            bgSprite.color = new Color(tar.color.r, tar.color.g, tar.color.b, tar.alpha);  // Set the sprite to the color inside the 'BindTarget'
                        }
                    })
                    .start();
            })
            .start();
    }
}