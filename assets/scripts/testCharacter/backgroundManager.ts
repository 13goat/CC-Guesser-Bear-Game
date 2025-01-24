import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('backgroundManager')
export class backgroundManager extends Component {

    @property(Node)
    background: Node = null;

    start() {
    }
}


