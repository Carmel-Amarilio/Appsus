import { utilService } from '../../../services/util.service.js'

const { useState, useEffect, useRef } = React

export function NewEmail({ onClose, onSend, saveDraft, draft }) {
    const [newEmail, setNewEmail] = useState({ subject: draft.subject||'', body: draft.body||'', to: draft.to||'' })
    const [isMinimize, setIsMinimize] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [draftId, setDraftId] = useState(null)
    const intervalIdDraft = useRef()

    useEffect(() => {
        const draftId = draft.id ? draft.id : utilService.makeId()
        setDraftId(draftId)
        intervalIdDraft.current = setInterval(() => {
            setNewEmail(prev => {
                saveDraft(prev, draftId)
                return prev
            })

        }, 5000);
        return () => {
            clearInterval(intervalIdDraft.current)
        }
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let val = target.value
        setNewEmail(prevEmail => ({ ...prevEmail, [field]: val }));
    }

    function toggleMinimize() {
        setIsMinimize(!isMinimize)
    }
    function toggleFullScreen() {
        setIsFullScreen(!isFullScreen)
    }

    const { subject, body, to } = newEmail
    return (
        <section className={`new-email flex column ${isMinimize ? "minimize" : ""} ${isFullScreen ? "full-screen" : ""}`}>
            <section onClick={toggleMinimize} className="header flex align-center space-between">
                <p>New Message</p>
                <span >
                    <button onClick={toggleMinimize}><i className="fa-solid fa-minus"></i></button>
                    <button onClick={toggleFullScreen}><i className="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                    <button onClick={onClose}><i className="fa-solid fa-x"></i></button>
                </span>
            </section>
            <div className="input-container">
                <input onChange={handleChange} value={to} type="email" placeholder="To" id="txt" name="to" />
                <input onChange={handleChange} value={subject} type="text" placeholder="Subject" id="tt" name="subject" />
                <textarea onChange={handleChange} value={body} name="body"></textarea>
            </div>
            <section className="footer">
                <button onClick={() => onSend(newEmail, draftId)}>Send</button>
            </section>
        </section>
    )
}