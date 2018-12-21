import Login from '../screen/Login';
import TodoList from '../screen/TodoList';
import todoForm from "../screen/TodoForm";
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

