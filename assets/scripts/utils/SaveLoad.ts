import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SaveLoad')
export class SaveLoad extends Component {
    public static SaveData(key: string, data: any) : void {
        // console.log(`Save Data ::: ${JSON.stringify(data)}`);
        localStorage.setItem(key, JSON.stringify(data));
    }

    public static ReadData<T>(key: string): any {
        var data = JSON.parse(localStorage.getItem(key)) as T;
        // console.log(`Read Data ::: ${JSON.stringify(data)}`);
        return data;
    }
}


