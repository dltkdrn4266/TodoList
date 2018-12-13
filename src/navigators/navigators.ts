import Login from '../UI/Login';
import TodoList from '../UI/TodoList';
import addTodoScreen from "../UI/addTodoScreen";
import {
    StackNavigator,
    DrawerNavigator,
    DrawerItems,
    createStackNavigator,
    createDrawerNavigator
} from "react-navigation";
import TodoForm from "../UI/TodoForm";

export const Switch = createStackNavigator({
    LoginScreen: { screen: Login },
    TodoScreen: { screen: TodoList },
    addTodoScreen: { screen: addTodoScreen },
    todoFormScreen: { screen: TodoForm }
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
});

export const Drawer = createDrawerNavigator({
    Stack: { screen: Switch }
});
