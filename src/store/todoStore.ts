import {ITodoSerializer} from "../Serializers";
import RootStore from "./rootStore";
import {action, observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {ToastAndroid} from "react-native";

export default class TodoStore {
    @observable public todoList: ITodoSerializer[] = [];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    public getTodoList = async () => {
        try {
            await this.rootStore.axiosStore.instance.get<ITodoSerializer>('/todo/')
                .then((response: AxiosResponse) => {
                    this.rootStore.todoStore.setTodoList(response.data);
                    ToastAndroid.show('불러오기 성공', ToastAndroid.TOP);
                    this.rootStore.calculationTodoStore.setAllTodo();
                    this.rootStore.calculationTodoStore.setCompleteTodo();
                })
                .catch((error: AxiosError) => {
                    ToastAndroid.show('불러오기 실패', ToastAndroid.TOP);
                })
        } catch(error) {
        }
    }

    @action
    public setTodoList = (data: ITodoSerializer[]) => {
        this.rootStore.todoStore.todoList = data;
    }

    @action
    public addTodoList = async(data: string) => {
        try{
            const response = await this.rootStore.axiosStore.instance.post<ITodoSerializer>('/todo/', {
                content: data
            });
            const tempTodoList = [...this.rootStore.todoStore.todoList, response.data];
            this.rootStore.todoStore.setTodoList(tempTodoList);
            this.rootStore.calculationTodoStore.setAllTodo();
        } catch (error) {
        }

    }

    @action
    public deleteTodo = async (id: number, todo: ITodoSerializer) => {
        try{
            await this.rootStore.axiosStore.instance.delete('/todo/' + id + '/');
            const tempTodoList = [...this.rootStore.todoStore.todoList];
            tempTodoList.splice(tempTodoList.indexOf(todo), 1);
            this.rootStore.todoStore.setTodoList(tempTodoList);
            this.rootStore.calculationTodoStore.setCompleteTodo();
            this.rootStore.calculationTodoStore.setAllTodo();
        }catch (error) {
        }
    }

    @action
    public completeTodo = async (id: number, todo: ITodoSerializer) => {
        try{
            const response = await this.rootStore.axiosStore.instance.post<ITodoSerializer>('/todo/' + id + '/complete/');
            const tempTodoList = [...this.rootStore.todoStore.todoList];
            tempTodoList.splice(tempTodoList.indexOf(todo), 1, response.data);
            this.rootStore.todoStore.setTodoList(tempTodoList);
            this.rootStore.calculationTodoStore.setCompleteTodo();
        } catch (error) {
        }
    }

    @action
    public revertTodo = async (id: number, todo: ITodoSerializer) => {
        try{
            const response = await this.rootStore.axiosStore.instance.post<ITodoSerializer>('/todo/' + id + '/revert_complete/');
            const tempTodoList = [...this.rootStore.todoStore.todoList];
            tempTodoList.splice(tempTodoList.indexOf(todo), 1, response.data);
            this.rootStore.todoStore.setTodoList(tempTodoList);
            this.rootStore.calculationTodoStore.setCompleteTodo();
        } catch (error) {
        }
    }




}