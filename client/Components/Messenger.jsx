import React, { useState } from "react";

const Messenger = () => {
    const [text, setText] = useState('')

    const changeHandle = (e) => {
        setText(e.target.value)
    }

    // Soemthing to recieve messages we didnt send

    const clickHandle = async (e) => {
        e.preventDefault();
        try {
            // sending a message using websocket


            
           // await fetch();
            setText('');
        }

        catch (error) {
            console.error('An error occurred: sending yourmessage');
        }
    }


    return(
        <div>
            HI IM MESSENGER
            <div>
               message to eventually display
            </div>
            <form>
               
                <input type = 'text' name='msg' value={text} onChange={changeHandle}></input>
                <button onClick={clickHandle}>send</button>
            </form>
        </div>
    )

}

export default Messenger