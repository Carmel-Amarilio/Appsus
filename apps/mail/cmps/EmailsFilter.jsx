const { Link } = ReactRouterDOM
export function EmailsFilter({ onNewEmail, filterBy, isOpen, emailsMap }) {

    const { unReadCount, draftCount } = emailsMap
    return (
        <section className={"email-filter flex column " + (isOpen && 'open')}>
            <button onClick={onNewEmail} className="new-email-icn flex align-center">
                <img src="../../assets/icons/pen.png" />
                <span className="text">Compose</span>
            </button>
            <button className={` ${filterBy === 'inbox' ? 'select' : ''} ${unReadCount > 0 ? 'sow-dot' : ''}`}>
                <Link to={`/email/inbox`} className="flex align-center">
                    <img src="../../assets/icons/inbox.png" />
                    <span className="text">Inbox
                        {unReadCount > 0 && <span className="unread-count">{unReadCount}</span>}
                    </span>
                </Link>
            </button>
            <button className={filterBy === 'starred' ? 'select' : ''}>
                <Link to={`/email/starred`} className="flex align-center">
                    <img src="../../assets/icons/star.png" />
                    <span className="text">Starred</span>
                </Link>
            </button>
            <button className={filterBy === 'send' ? 'select' : ''}>
                <Link to={`/email/send`} className="flex align-center">
                    <img src="../../assets/icons/send.png" />
                    <span className="text">Send</span>
                </Link>
            </button>
            <button className={` ${filterBy === 'draft' ? 'select' : ''} ${draftCount > 0 ? 'sow-dot' : ''}`}>
                <Link to={`/email/draft`} className="flex align-center">
                    <img src="../../assets/icons/draft.png" />
                    <span className="text">Draft
                        {draftCount > 0 && <span className="draft-count">{draftCount}</span>}
                    </span>
                </Link>
            </button>
            <button className={filterBy === 'remove' ? 'select' : ''}>
                <Link to={`/email/remove`} className="flex align-center">
                    <img src="../../assets/icons/delete.png" />
                    <span className="text">Trash</span>
                </Link>
            </button>
        </section>
    )
}
