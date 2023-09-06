export function EmailList({ emails }) {

    return (
        <section className="email-list" >
            <table>
                <tbody>
                    {emails.map(email => {
                        const { id, from, subject, body, sentAt, isRead, isStar } = email
                        return < tr className={isRead ? 'read' : ''} key={id} >
                            <td>
                                <button className={'star-btn ' + (isStar&&'starred')}>
                                    {isStar && <i className="fa-solid fa-star"></i>}
                                    {!isStar && <i className="fa-regular fa-star"></i>}
                                </button>
                            </td>
                            <td>{from}</td>
                            <td>{subject}</td>
                            <td>{body}</td>
                            <td>{sentAt}</td>
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