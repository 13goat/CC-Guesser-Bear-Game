import { _decorator, Component, find, Label, Node } from 'cc';
import { UserViewModel } from '../viewModels/UserViewModel';
import { UserView } from '../views/UserView';
import { UserEvent } from '../enum/UserEvent';
import { UserModel } from '../models/UserModel';
const { ccclass, property } = _decorator;

@ccclass('UserComponent')
export class UserComponent extends Component {
    private _userVM: UserViewModel;
    private _userView: UserView;

    @property(Label)
    public nameText: Label = null;
    @property(Label)
    public coinText: Label = null;
    @property(Node)
    public uiCanvas: Node = null;

    protected onLoad(): void {
        this._userVM = new UserViewModel('TestUser', 100);
        this._userView = new UserView(this.nameText, this.coinText);

        const eventTarget = this._userVM.eventTarget;
        eventTarget.on(UserEvent.NAME_CHANGE, this._onNameChanged, this);
        eventTarget.on(UserEvent.COIN_CHANGE, this._onCoinChanged, this);

        const userData = this._userVM.user;
        this._userView.initialize(userData.name, userData.coin);

        this.onCoinIncreased(60);
    }

    protected onDestroy(): void {
        const eventTarget = this._userVM.eventTarget;
        eventTarget.off(UserEvent.NAME_CHANGE, this._onNameChanged, this);
        eventTarget.off(UserEvent.COIN_CHANGE, this._onCoinChanged, this);
    }

    private _onNameChanged(newName: string): void {
        this._userView.updateName(newName);
    }

    public onNameUpdate(newName: string): void {
        this._userVM.setName = newName;
    }

    private _onCoinChanged(newCoin: number): void {
        this._userView.updateCoin(newCoin);
    }

    public onCoinUpdate(newCoinCount: number): void {
        this._userVM.setCoin = newCoinCount;
    }

    public onCoinIncreased(coind: number): void {
        this._userVM.setCoin = this._userVM.coin + coind;
    }

    public onCoinDecreased(coin: number): void {
        this._userVM.setCoin = this._userVM.coin - coin;
    }

    public activeLabel(active: boolean = true): void {
        this.uiCanvas.active = active;
    }

    public getUser(): UserModel {
        return this._userVM.user;
    }

    public getName(): string {
        return this._userVM.name;
    }

    public getCoin(): number {
        return this._userVM.coin;
    }
}