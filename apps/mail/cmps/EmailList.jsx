export function EmailList({emails}) {
    return (
        <section className="email-list" >
            <ul>
                {emails.map(email =>
                    <li className ="flex space-between" key ={email.id}>
                        <p>{email.from}</p>
                        <p>{email.subject}</p>
                        <p>{email.body}</p>
                    </li>)}
            </ul>
        </section>
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