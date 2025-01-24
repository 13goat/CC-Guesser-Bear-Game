import { Collider2D, RigidBody2D, Node } from "cc";

export class PartModel {
    
    private _id: number;
    private _collider: Collider2D;
    private _rigid: RigidBody2D;
    private _shadowMatch: Node = null;
    private _clonePart: Node = null;

    public character: Node = null;
    public parts: Node[] = [];

    constructor(id: number, shadowMatch: Node, clonePart: Node) {
        this._id = id;
        this._shadowMatch = shadowMatch;
        this._clonePart = clonePart;
    }

    public get collider(): Collider2D {
        return this._collider; 
    }

    public set collider(enable: boolean) {
        this._collider.enabled = enable; 
    }

    public get rigid(): RigidBody2D {
        return this._rigid; 
    }

    public set rigid(enable: boolean) {
        this._rigid.enabled = enable; 
    }


}