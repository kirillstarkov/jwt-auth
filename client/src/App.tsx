import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/loginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/userService";

const App: FC = () => {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if(localStorage.getItem("token")){
            store.checkAuth()
        }
    }, [])

     async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            if(response.data) {
                console.log(response.data)
                setUsers(response.data)
            }
        } catch (e) {

        }
    }

    if(store.isLoading) {
        return <div>Loading...</div>
    }

    if(!store.isAuth) {
        return <LoginForm />
    }

    return (
        <div className="App">
            <h1>{store.isAuth ? `User authorized with email ${store.user.email}` : "Please login or register"}</h1>
            <h1>{store.user.isActivated ? `Account is activated` : "Please activate account with email link"}</h1>
            <button onClick={() => store.logout()}>Logout</button>
            <div>
                <button onClick={getUsers}>Get Users</button>
            </div>
            <div>
                {users.map((e) =>
                    <div key={e.email}>
                        <p>Email: {e.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default observer(App);
