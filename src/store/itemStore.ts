import RootStore from "./rootStore";
import {action, observable} from "mobx";
import {ITodoSerializer} from "../Serializers";

export default class itemStore {
    private rootStore: RootStore;
    public createTime: string = '';
    @observable public like: number = 0;
    @observable public completeTime: string = '';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    public setCreateTime = (todo: ITodoSerializer) => {
        const createDate = new Date(todo.createdAt);
        const createYear = createDate.getFullYear();
        const createMonth = createDate.getMonth();
        const createDay =  createDate.getDate();
        const createHour = createDate.getHours();
        const createMinute = createDate.getMinutes();

        let tempCreateTime = createYear + '년' + createMonth + '월' + createDay + '일' +  ' ' +
            createHour + '시' + createMinute + '분';

        this.rootStore.itemStore.createTime = tempCreateTime;
    }

    @action
    public setCompleteTime = (todo: ITodoSerializer) => {
        let tempCompleteTime = '완료되지 않았음';
        if(todo.completedAt !== null) {
            const completeDate = new Date(todo.completedAt);
            const completeYear = completeDate.getFullYear();
            const completeMonth = completeDate.getMonth();
            const completeDay = completeDate.getDate();
            const completeHour = completeDate.getHours();
            const completeMinute = completeDate.getMinutes();

            tempCompleteTime = completeYear + '년' + completeMonth + '월' + completeDay + '일' + ' ' +
                completeHour + '시' + completeMinute + '분';

            this.rootStore.itemStore.completeTime = tempCompleteTime;

        }else {
            this.rootStore.itemStore.completeTime = tempCompleteTime;
        }
    }

}