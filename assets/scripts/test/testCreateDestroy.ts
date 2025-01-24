import { _decorator, Canvas, Component, director, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('testCreateDestroy')
export class testCreateDestroy extends Component {

    public static Instace: testCreateDestroy = null;

    @property(Node)
    canvas: Node = null;

    @property(Prefab)
    prefab: Prefab = null;

    _myNode: Node = null;

    public _createInstance(): void {
        if (testCreateDestroy.Instace != null && testCreateDestroy.Instace != this) {
            this.node.destroy(); 
            return;
        }
        if (testCreateDestroy.Instace == null) {
            testCreateDestroy.Instace = this;
            director.addPersistRootNode(this.node);
        }

    }

    createNode(): void {
        this._createInstance();

        console.log(`1 Node == null ???  ${this._myNode == null}`);
        if (this._myNode == null) {
            console.log("Create");
            this._myNode = instantiate(this.prefab);
            this._myNode.setPosition(new Vec3(200, 100, 0));
            this._myNode.parent = this.canvas;
        } else {

            console.log(`2 Node == null ???  ${this._myNode == null}`);
            // this._myNode = instantiate(this.prefab);
            // this._myNode.setPosition(new Vec3(200,100,0));
            // this._myNode.parent = this.canvas;
        }

        console.log(`this._myNode == Instance._myNode ::: ${this._myNode === testCreateDestroy.Instace._myNode}`);

    }

    destroyNode(): void {
        if (this._myNode != null) {
            console.log("Destroy");
            this._myNode.destroy();
            this._myNode = null;
        }
    }
}


