import { LongTxt } from "../../../cmps/LongTxt.jsx";
import { utilService } from '../../../services/util.service.js'

const { useNavigate } = ReactRouterDOM
const { useState, useEffect } = React


export function EmailList({ emails, onStar, onShare, onRemove, onToggleRead, onDraft, isDisplayTo }) {
    const navigate = useNavigate()
    const [bodeSize, setBodeSize] = useState(null)

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize()
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    function onOpen(id) {
        navigate(`${id}`)
    }

    function handleResize() {
        const screenWidth = window.innerWidth
        setBodeSize((screenWidth - 840) / 6)
    }


    if (!emails) return <div className="list-msg">loading...</div>
    if (!emails.length) return <div className="list-msg">No Emails</div>
    return (
        <section className="email-list" >
            <table>
                <tbody>
                    {emails.map(email => {
                        const { id, from, to, subject, body, sentAt, isRead, isStar, isDraft } = email
                        return < tr className={isRead ? 'read' : ''} key={id} onClick={() => isDraft ? onDraft(email) : onOpen(id)}>
                            <td>
                                <button onClick={(e) => { e.stopPropagation(); onStar(email) }} className={'star-btn ' + (isStar && 'starred')}>
                                    {isStar && <i className="fa-solid fa-star"></i>}
                                    {!isStar && <i className="fa-regular fa-star"></i>}
                                </button>
                            </td>
                            <td>{isDisplayTo ? to : from}</td>
                            <td>{subject}</td>
                            <td>
                                {body && <LongTxt txt={body} length={bodeSize} showMore={false}></LongTxt>}
                            </td>
                            <td>
                                {utilService.convertDate(sentAt)}
                            </td>
                            <td className="tool-tr flex ">
                                <button className="share-btn" onClick={(e) => { e.stopPropagation(); onShare(email) }}>
                                    <i className="fa-regular fa-note-sticky"></i>
                                </button>
                                <button className="read-btn" onClick={(e) => { e.stopPropagation(); onToggleRead(email) }}>
                                    {!isRead && <i className="fa-regular fa-envelope-open"></i>}
                                    {isRead && <i className="fa-regular fa-envelope"></i>}
                                </button>
                                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onRemove(email) }}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section >
    )
}
