import {observable} from "mobx";
import axios from "./axiosStore";
import {observer} from "mobx-react";

@observer
class loginStore {
    @observable id: string = '';
    @observable pw: string = '';
    @observable islogined: boolean = false;

    public logined = (id: string, pw: string) => {
        axios.post('/users/login',{
            username: id,
            password: pw
        })
        this.islogined = true;
    }
}

const LoginStore = new loginStore();

export default LoginStore;