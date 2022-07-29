import './App.css';
import React, {useEffect} from "react";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import './styles.css'
import {ToasterProvider} from "./ui/ToasterContext";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import SignIn from "./components/SignIn";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";
import Header from "./ui/Header";

function App() {


    const [{}, dispatch]=useStateValue()

    useEffect(()=>{
        auth.onAuthStateChanged(authUser=>{
            console.log(authUser)

            if(authUser){
                //유저가 방금 로그인하거나 이미 한 상태
                dispatch({
                    type:'SET_USER',
                    user:authUser
                })
            }
            else{
                //사용자가 로그아웃상태
                dispatch({
                    type:'SET_USER',
                    user:null
                })
            }
        })
    },[])

    return (
        <Router>

            <ToasterProvider>

                {/*컴포넌트 전역에 Toast 값을 전해줌*/}
                <div className="App">
                    {/*<h1>*/}
                    {/*    <Link to="/">Park's Book Archive</Link>*/}
                    {/*</h1>*/}
                    <Header/>
                    <Switch>
                        <Route exact path="/"> {/*홈페이지*/}
                            <BookList/>
                            {/*<AddBook/>*/}
                            {/*AddBook 컴포넌트에서 toast 정보를 받아와서 */}
                            {/*{error&&(<p className="error">{error}</p>)}*/}
                        </Route>

                        <Route path="/book/:id">
                            <BookDetails/>
                        </Route>

                        <Route path="/login">
                            <SignIn/>
                        </Route>

                    </Switch>
                </div>
            </ToasterProvider>
        </Router>

    );
}

export default App;
