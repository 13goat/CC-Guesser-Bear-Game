import { _decorator, Component, EventTarget } from 'cc';
import { GameStatus } from '../enum/GameStatus';
const { ccclass, property } = _decorator;

@ccclass('SharedService')
export class SharedService {

    private static _instance: SharedService;

    public static get instance(): SharedService {
        if (!this._instance) {
            this._instance = new SharedService();
        }
        return this._instance;
    }

    public eventTarget: EventTarget;

    constructor() {
        this.eventTarget = new EventTarget();
    }

    // Add Listener
    public on(event: string, callback: (status: GameStatus) => void, target?: any): void {
        this.eventTarget.on(event, callback, target);
    }

    // Emit Event
    public emit(event: string, status: GameStatus, eventData1?: any, eventData2?: any,eventData3?: any) {
        console.log(`event : ${event}, status: ${status}`);
        this.eventTarget.emit(event, status, eventData1, eventData2, eventData3);
    }

    // Remove Listener
    public off(event: string, callback: (status: GameStatus) => void, target?: any): void {
        this.eventTarget.off(event, callback, target);
    }
}