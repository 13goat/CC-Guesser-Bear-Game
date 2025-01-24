import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UserView')
export class UserView {
    private _nameLabel: Label;
    private _coinLabel: Label;

    constructor(nameLabel: Label, coinLabel: Label) {
        this._nameLabel = nameLabel;
        this._coinLabel = coinLabel;
    }

    public initialize(name: string, coin: number): void {
        this.updateName(name);
        this.updateCoin(coin);
    }

    public updateName(newName: string): void {
        this._nameLabel.string = `Name: ${newName}`;
    }

    public updateCoin(newCoin: number): void {
        this._coinLabel.string = `${newCoin}`;
    }
}