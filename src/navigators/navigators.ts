import Login from '../UI/Login';
import TodoList from '../UI/TodoList';
import {StackNavigator, DrawerNavigator, DrawerItems} from "react-navigation";

export const Switch = StackNavigator({
    LoginScreen: { screen: Login },
    TodoScreen: { screen: TodoList }
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none'
});

export const Drawer = DrawerNavigator({
    Stack: { screen: Switch }
});
