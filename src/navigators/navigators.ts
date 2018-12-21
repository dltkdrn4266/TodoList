import Login from '../UI/Login';
import TodoList from '../UI/TodoList';
import todoForm from "../UI/TodoForm";
import {
    createStackNavigator
} from "react-navigation";

export const RootStack = createStackNavigator({
    LoginScreen: { screen: Login },
    TodoScreen: { screen: TodoList },
    TodoFormScreen: { screen: todoForm }
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
});

