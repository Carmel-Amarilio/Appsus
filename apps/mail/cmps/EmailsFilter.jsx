const { Link } = ReactRouterDOM
export function EmailsFilter({onNewEmail, filterBy, isOpen }) {
    return (
        <section onClick={onNewEmail} className={"email-filter flex column " + (isOpen && 'open')}>
            <button className="new-email-icn flex align-center">
                    <img src="../../assets/icons/pen.png" />
                    <span className="text">Compose</span>
            </button>
            <button className={"flex align-center " + (filterBy === 'inbox' && 'select')}>
                <Link to={`/email/inbox`}>
                    <img src="../../assets/icons/inbox.png" />
                    <span className="text">Inbox</span>
                </Link>
            </button>
            <button className={"flex align-center " + (filterBy === 'starred' && 'select')}>
                <Link to={`/email/starred`}>
                    <img src="../../assets/icons/star.png" />
                    <span className="text">Starred</span>
                </Link>
            </button>
            <button className={"flex align-center " + (filterBy === 'send' && 'select')}>
                <Link to={`/email/send`}>
                    <img src="../../assets/icons/send.png" />
                    <span className="text">Send</span>
                </Link>
            </button>
        </section>
    )
}
