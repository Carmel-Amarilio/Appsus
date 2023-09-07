const { useNavigate } = ReactRouterDOM

export function EmailList({ emails, onStar, onRemove }) {
    const navigate = useNavigate()

    function onOpen(id) {
        navigate(`${id}`)
    }

    console.log(emails);
    if (!emails) return <div className="list-msg">loading...</div>
    if (!emails.length) return <div className="list-msg">No Emails</div>
    return (
        <section className="email-list" >
            <table>
                <tbody>
                    {emails.map(email => {
                        const { id, from, subject, body, sentAt, isRead, isStar } = email
                        return < tr className={isRead ? 'read' : ''} key={id} onClick={() => onOpen(id)}>
                            <td>
                                <button onClick={(e) =>{e.stopPropagation(); onStar(email)}} className={'star-btn ' + (isStar && 'starred')}>
                                    {isStar && <i className="fa-solid fa-star"></i>}
                                    {!isStar && <i className="fa-regular fa-star"></i>}
                                </button>
                            </td>
                            <td>{from}</td>
                            <td>{subject}</td>
                            <td>{body}</td>
                            <td>{sentAt}</td>
                            <td>
                                <button className="delete-btn" onClick={(e) =>{e.stopPropagation(); onRemove(email)}}>
                                    <img src="../../assets/icons/delete.png" />
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section >
    )
}

// id: '',
// subject: '',
// body: '',
// isRead: false,
// sentAt: null,
// removedAt: null,
// from: '',
// to: ''