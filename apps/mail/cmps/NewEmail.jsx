const { useState, useEffect } = React

export function NewEmail({ onClose ,onSend}) {
    const [newEmail, setNewEmail] = useState({})
    const [isMinimize, setIsMinimize] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)

    function handleChange({ target }) {
        const field = target.name
        let val = target.value
        setNewEmail(prevEmail => ({ ...prevEmail, [field]: val }));
    }

    function toggleMinimize(){
        setIsMinimize(!isMinimize)
    }
    function toggleFullScreen(){
        setIsFullScreen(!isFullScreen)
    }

    return (
        <section className={`new-email flex column ${isMinimize? "minimize":"" } ${isFullScreen? "full-screen":""}`}>
            <section onClick={toggleMinimize} className="header flex align-center space-between">
                <p>New Message</p>
                <span >
                    <button onClick={toggleMinimize}><i className="fa-solid fa-minus"></i></button>
                    <button  onClick={toggleFullScreen}><i className="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                    <button onClick={onClose}><i className="fa-solid fa-x"></i></button>
                </span>
            </section>
            <div className="input-contener">
                <input onChange={handleChange} type="text" placeholder="To" id="txt" name="to" />
                <input onChange={handleChange} type="text" placeholder="Subject" id="tt" name="subject" />
                <textarea onChange={handleChange} name="body"></textarea>
            </div>
            <section className="footer">
                <button onClick={()=>onSend(newEmail)}>Send</button>
            </section>
        </section>
    )
}