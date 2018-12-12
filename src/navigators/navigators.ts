import Login from '../UI/Login';
import TodoList from '../UI/TodoList';
import addTodoScreen from "../UI/addTodoScreen";
import {StackNavigator, DrawerNavigator, DrawerItems} from "react-navigation";
import TodoForm from "../UI/TodoForm";

export const Switch = StackNavigator({
    LoginScreen: { screen: Login },
    TodoScreen: { screen: TodoList },
    addTodoScreen: { screen: addTodoScreen },
    todoFormScreen: { screen: TodoForm }
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
});

export const Drawer = DrawerNavigator({
    Stack: { screen: Switch }
});
