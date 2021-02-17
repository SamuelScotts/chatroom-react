import React, { useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


function Chatroom(){

    const [text, setText] = useState('');
    const [userId, setUserId] = useState('');
    const [localMessage, setLocalMessages] = useState([])

    const firestore = firebase.firestore();
    useEffect(async () => {
        setUserId(firebase.auth().currentUser.uid)
        let query = firestore.collection('chats').orderBy('timestamp', 'asc');
        query.onSnapshot({
            next: (querySnapshot) => {
                let messages = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, '=>', doc.data());
                    messages.push(doc.data());
                });
                setLocalMessages(messages);
            },
        });
    }, []);

    function saveMessage(){
        const timestamp = Date.now();
        const content = text;
        const uid = userId;
        const message = { content, timestamp, uid };

        firestore.collection('chats').add(message)
        .then(() => {
            setText("");
        });
    };
    
    function logout(){
        firebase.auth().signOut()
    }

    return(
        <div>
            <div style={{ display: 'flex', flex: 1, height: '100vh', flexDirection: 'column' }}>
                <div style={{ flex: 1, marginLeft: 24, marginRight: 24, overflow: 'auto', marginBottom: 24 }}>
                {localMessage.map((localMessage) => (
                    <div style={{ display: 'flex', flex: 1, justifyContent: userId === localMessage.uid ? 'flex-end' : 'flex-start' }}>
                        <div style={{ minHeight: 52, width: 600, backgroundColor: userId === localMessage.uid ? 'blue' : 'red', marginTop: 24, paddingLeft: 24, PaddingRight: 24, borderRadius: 12 }}>
                            <p style={{ fontWeight: 'bold', color: 'white' }}>{localMessage.content}</p>
                        </div>
                    </div>)
                )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 24 }}>
                    <input onChange={event => setText(event.target.value)} type="text" style={{ flex: 11, height: 32, fontSize: 28 }} />
                    <button onClick={saveMessage} style={{ flex: 1, backgroundColor: 'blue', color: 'white', fontWeight: 'bold', fontSize: 18, borderWidth: 0 }}>
                        Send
                    </button>
                    <buton onClick={logout} style={{ flex: 1, backgroundColor: 'black', color: 'white', fontWeight: 'bold', fontSize: 18, borderWidth: 0, paddingTop: 7 }}>
                        Logout
                    </buton>
                </div>
            </div>
        </div>
    )
}

export default Chatroom;