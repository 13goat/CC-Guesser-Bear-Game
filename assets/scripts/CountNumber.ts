import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CountNumber')
export class CountNumber extends Component {

    public static count: number = 0;

    start() {
        console.info("Count Start");
        this.schedule(function () {
            console.log("END");
            // UIManager.Instance.refresh();
            this.node.emit("game-state-change");
        }, 3);
    }

}


