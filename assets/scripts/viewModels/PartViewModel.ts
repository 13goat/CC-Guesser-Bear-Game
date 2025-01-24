import { _decorator, Component, Node } from 'cc';
import { PartView } from '../views/PartView';
import { SharedService } from '../services/SharedService';
import { PartModel } from '../models/PartModel';
import { GameStatus } from '../enum/GameStatus';
const { ccclass, property } = _decorator;

@ccclass('PartViewModel')
export class PartViewModel {

    private _model: PartModel;
    private _view: PartView;

    constructor(view: PartView) {
        this._view = view;
        // console.log(`PartViewModel Initialize`);
    }

    public onShareServiceListener(): void {
        SharedService.instance.on("share-part-data", this._onShareService, this);
        // console.log(`Share Service Listener`);
    }

    private _onShareService(status: GameStatus, eventData1?: any, eventData2?: any): void {
        this._view.onSetupData(eventData1, eventData2);
        // console.log(`eventData1 : ${eventData1.name}, eventData2 : ${eventData2.name}`);
    }

    public onAllPartsCompletedShareService(eventData1?: any): void {
        SharedService.instance.emit("check-all-parts-completed", null, eventData1);
        // console.log(`Share Service Emit : eventData1 = ${eventData1.name}, eventData2 = ${eventData2.name}`);
    }
}


