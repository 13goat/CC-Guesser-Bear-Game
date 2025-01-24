import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PitchTossModel')
export class PitchTossModel {
    private rewardSlots: number[];

    constructor() {
        this.rewardSlots = [1,2,3,4,5,6,7,8,9,10,60];
    }

    public getRewardForSlot(slotIndex: number): number {
        return this.rewardSlots[slotIndex] || 0;
    }
}