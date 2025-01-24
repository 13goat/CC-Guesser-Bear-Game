import { _decorator, Component, Node, Vec2 } from 'cc';
import { PitchTossModel } from '../model/PitchTossModel';
const { ccclass, property } = _decorator;

@ccclass('PitchTossViewModel')
export class PitchTossViewModel {
    private pitchTossModel: PitchTossModel;

    constructor() {
        this.pitchTossModel = new PitchTossModel
    }

    public calculateTossDistance(start: Vec2, end: Vec2): number {
        const distance = end.subtract(start).length();
        const maxDistance = 500;
        const minDistance = 50;
        return Math.min(Math.max(distance, minDistance), maxDistance) * 5;
    }

    public getReward(slotIndex: number): number {
        return this.pitchTossModel.getRewardForSlot(slotIndex);
    }
}


