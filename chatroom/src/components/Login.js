import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState } from 'react';


function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginButton (){
    
        firebase.auth().signInWithEmailAndPassword(email, password)

    }

    return(
        <div style={{ display: 'flex', flex: 1, height: '100vh' }}>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', minWidth: 300 }}>
                <input onChange={event => setEmail(event.target.value)} type="text" placeholder="Email" style={{marginRight: 20, paddingTop: 2, paddingBottom: 2, paddingRight: 24 }}></input>
                <input onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" style={{marginRight: 20, paddingTop: 2, paddingBottom: 2, paddingRight: 24 }}></input>
                <button style={{ backgroundColor: 'black', borderRadius: 5, borderWidth: 0, paddingTop: 2, paddingBottom: 2, paddingLeft: 24, paddingRight: 24, 
                 color: 'white', fontSize: 18, fontWeight: 'bold',}}
                 onClick={loginButton}>Login</button>
            </div>
        </div>
        
    )
}

export default Login;