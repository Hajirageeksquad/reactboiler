import React, {useEffect, useContext} from 'react';
import {Route, Switch} from 'react-router-dom';
import homePage from '../pages/homePage/homePage';
import Loader from '../atoms/loader';
import firebase from '../firebase'
import {GlobalContext} from '../context/GlobalState'
export default(props: any) => {
    let {history} = props;
    const {state}: any = useContext(GlobalContext);
    console.log("state",state)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: any) => {
            if (user && user.uid !== null) {
                state.loader = false;
                state.userDetail=user && user.uid;
                history.push("/")
            }
            else {
                state.loader = false;
                history.push('/login')
            }
        })
    }, [firebase]);
    return (
        <div>
            {!state.loader   ?
                <Switch>
                    <Route path="/" exact component={ homePage }/>
                </Switch> :
                <Switch>
                    <Route path="/" exact component={ Loader }/>
                </Switch>}
        </div>

    )
};

