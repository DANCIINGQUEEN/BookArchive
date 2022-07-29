import React, {useContext, useState} from 'react';
import {Button, Field, Message} from "../ui";
import {useHistory} from "react-router-dom";
import {auth} from "../firebase";
import {ToasterContext} from "../ui/ToasterContext";

function SignIn() {


    // const [login, setLogin] =useState({
    //     email:'',
    //     password:'',
    // })
    //
    // const handleChange=(e)=>{
    //     setLogin({
    //         ...login,
    //         [e.target.name]:e.target.value
    //     })
    // }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()

    const {addToast} = useContext(ToasterContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await auth.signInWithEmailAndPassword(email, password)
            addToast({text: "Sing In Success", type: "success"})
            history.push(`/`)
        } catch (e) {
            console.error(e)
            setError(e.message)
            addToast({text: "Sing In Failed", type: "error"})
        }
        setLoading(false)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        // await auth.createUserWithEmailAndPassword(email, password).then((e)=>history.push(`/`)).catch((e)=>alert(e.message))
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            addToast({text: "Sing Up Success", type: "success"})
            history.push(`/`)
        } catch (e) {
            console.error(e)
            setError(e.message)
            addToast({text: "Sing Up Failed", type: "error"})
        }
    }

    return (
        <div className="signIn">
            <h2>Log In</h2>
            <form>
                <Field labelText="E-mail : &nbsp;">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field labelText="Password : &nbsp;">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}


                    />
                </Field>
                <Button
                    type="submit"
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>
                <Button
                    type="submit"
                    loading={loading}
                    onClick={handleRegister}
                >
                    Sign Up
                </Button>

                <Message type={error} text={error}/>
            </form>
        </div>
    );
}

export default SignIn;