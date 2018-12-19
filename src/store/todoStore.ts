import {ITodoSerializer} from "../Serializers";
import RootStore from "./rootStore";
import {action, observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {ToastAndroid} from "react-native";

export default class TodoStore {
    @observable public todoList: ITodoSerializer[];
    private rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        this.todoList = [];
    }

    @action
    public getTodoList = async () => {
        await this.rootStore.axiosStore.instance.get<ITodoSerializer>('/todo/')
            .then((response: AxiosResponse) => {
                this.rootStore.todoStore.setTodoList(response.data);
                ToastAndroid.show('불러오기 성공', ToastAndroid.TOP);
                this.rootStore.calculationTodoStore.setAllTodo();
                this.rootStore.calculationTodoStore.setCompleteTodo();
                console.log(response);
            })
            .catch((error: AxiosError) => {
                console.log(error);
                console.log('불러오기 실패');
                ToastAndroid.show('불러오기 실패', ToastAndroid.TOP);
            })
    }

    @action
    public setTodoList = (data: ITodoSerializer[]) => {
        this.rootStore.todoStore.todoList = data;
    }

    @action
    public addTodoList = async(data: string) => {
        try{
            await this.rootStore.axiosStore.instance.post<ITodoSerializer>('/todo/', {
                content: data
            })
                .then(response => {
                    const tempTodoList = this.rootStore.todoStore.todoList;
                    tempTodoList.push(response.data);
                    this.rootStore.todoStore.todoList = tempTodoList;
                    this.rootStore.calculationTodoStore.setAllTodo();
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (e) {
            console.log('axiosStore.instance.post Error');
        }

    }

    @action
    public deleteTodo = async (id: number, todo: ITodoSerializer) => {
        try{
            const response = await this.rootStore.axiosStore.instance.delete('/todo/' + id + '/');
            const tempTodoList = this.rootStore.todoStore.todoList;
            tempTodoList.splice(tempTodoList.indexOf(todo), 1);
            this.rootStore.todoStore.todoList = tempTodoList;
            this.rootStore.calculationTodoStore.setCompleteTodo();
            this.rootStore.calculationTodoStore.setAllTodo();
        }catch (error) {
            console.log(error);
        }
    }


    public completeTodo = async (id: number, todo: ITodoSerializer) => {
        try{
            const response = await this.rootStore.axiosStore.instance.post<ITodoSerializer>('/todo/' + id + '/complete/');
            const tempTodoList = this.rootStore.todoStore.todoList;
            console.log('response.data');
            console.log(response.data);
            tempTodoList.splice(tempTodoList.indexOf(todo), 1, response.data);
            this.rootStore.calculationTodoStore.setCompleteTodo();
        } catch (error) {
            console.log(error);
        }
    }


    public revertTodo = async (id: number, todo: ITodoSerializer) => {
        try{
            const response = await this.rootStore.axiosStore.instance.post<ITodoSerializer>('/todo/' + id + '/revert_complete/');
            const tempTodoList = this.rootStore.todoStore.todoList;
            tempTodoList.splice(tempTodoList.indexOf(todo), 1, response.data);
            this.rootStore.calculationTodoStore.setCompleteTodo();
        } catch (error) {
            console.log(error);
        }
    }




}