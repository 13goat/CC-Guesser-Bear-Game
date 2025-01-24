import { _decorator, Component, EventTarget, Node } from 'cc';
import { UserModel } from '../models/UserModel';
import { UserEvent } from '../enum/UserEvent';
import { SaveLoad } from '../utils/SaveLoad';
import { StorageKey } from '../enum/StorageKey';
const { ccclass, property } = _decorator;

@ccclass('UserViewModel')
export class UserViewModel {
    private _user: UserModel;
    private _eventTarget: EventTarget;

    constructor(name: string, initialCoin: number) {
        this._user = {
            name: name,
            coin: initialCoin,
            registerDate: Date.now()
        };
        this._eventTarget = new EventTarget();
        this._user = SaveLoad.ReadData(StorageKey.USER_DATA);
    }

    public get eventTarget(): EventTarget{
        return this._eventTarget;
    }

    public set setName(newName: string) {
        if (this._user.name !== newName) {
            this._user.name = newName;
            
            SaveLoad.SaveData(StorageKey.USER_DATA, this._user);
            this._eventTarget.emit(UserEvent.NAME_CHANGE, newName);
        }
    }

    public set setCoin(newCoinCount: number) {
        if (this._user.coin !== newCoinCount) {
            this._user.coin = newCoinCount;

            SaveLoad.SaveData(StorageKey.USER_DATA, this._user);
            this._eventTarget.emit(UserEvent.COIN_CHANGE, newCoinCount);
        }
    }

    public get user(): UserModel {
        return this._user;
    }

    public get name(): string {
        return this._user.name;
    }

    public get coin(): number {
        return this._user.coin;
    }
}