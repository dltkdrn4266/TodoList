import Login from '../UI/Login';
import TodoList from '../UI/TodoList';
import addTodoScreen from "../UI/AddTodoScreen";
import {
    createStackNavigator
} from "react-navigation";

export const Stack = createStackNavigator({
    LoginScreen: { screen: Login },
    TodoScreen: { screen: TodoList },
    AddTodoScreen: { screen: addTodoScreen }
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
});

