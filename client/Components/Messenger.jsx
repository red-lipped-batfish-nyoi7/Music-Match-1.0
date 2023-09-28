import React, { useState, useEffect } from "react";

const Messenger = (props) => {
    const [messages, setMessages] = useState(['hi im a message', 'im anothermsg', 'yes another message'])
    const [text, setText] = useState('')
    const [socket, setSocket] = useState(null)
    
    console.log()
    //establishing connection
    useEffect(() => {
        if (props.user._id && props.match._id) {     
           console.log('this is user id it should always be truthy', props.user._id)
           console.log('this is match id it should always be truthy', props.match._id)

        const newSocket = new WebSocket('ws://localhost:3001', ['hi', 'bye']);

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(newSocket);
            console.log('THIS IS THE SOCKET', newSocket);
        };

        newSocket.onmessage = (event) => {
            console.log('WebSocket connection opened', event.data);
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            newSocket.close();
        };}
    }, [props.user]);

    if (socket) {
      socket.onmessage = async (e) => {
        const resp = await e.data;
        if (resp instanceof Blob){
        const msg = await resp.text();

        console.log('MESSAGE RECIEVED BY CLEINT', msg)
        setMessages([...messages, msg])
        }
      }
    }

    const changeHandle = (e) => {

        setText(e.target.value)
    }

    // Soemthing to recieve messages we didnt send

    const clickHandle = async (e) => {
        e.preventDefault();
        try {
            // sending a message using websocket
             
            socket.send(text)
            setMessages([...messages, text])

           // await fetch();
            setText('');
        }

        catch (error) {
            console.error('An error occurred: sending yourmessage');
        }
    }



    return(
        <div>
            HI IM THE MESSENGER
            <div>
               {messages.map((msg) =>  <p>{msg}</p>)}
            </div>
            <form>          
                <input type = 'text' name='msg' value={text} onChange={changeHandle}></input>
                <button onClick={clickHandle}>send</button>
            </form>
        </div>
    )

}

export default Messenger