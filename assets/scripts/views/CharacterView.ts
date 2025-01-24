import { Collider, Collider2D, Color, Node, RigidBody2D, Sprite, SpriteFrame } from "cc";

export class CharacterView {
    private _node: Node;

    get node(): Node {
        return this._node
    }

    constructor(node: Node) {
        this._node = node;
    }

    public changePartColor(part: Node, color: Color){
        part.getComponent(Sprite).color = color;
    }

    public setPartSpriteFrame(part: Node, spriteFrame: SpriteFrame){
        part.getComponent(Sprite).spriteFrame = spriteFrame;
    }

    public enableCollider2D(part: Node) {
        part.getComponent(Collider2D).enabled = true
    }

    public disableCollider2D(part: Node) {
        part.getComponent(Collider2D).enabled = false;
    }

    public enableRigidBody2D(part: Node) {
        part.getComponent(RigidBody2D).enabled = true;
    }

    public disableRigidBody2D(part: Node) {
        part.getComponent(RigidBody2D).enabled = false;
    }
}