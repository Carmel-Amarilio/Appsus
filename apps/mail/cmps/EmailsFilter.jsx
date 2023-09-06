export function EmailsFilter() {
    return (
        <section className="email-filter flex column ">
            <button className="new-email flex align-center">
                <img src="../../assets/icons/pen.png" />
                <span className="text">Compose</span>
            </button>
            <button className="flex align-center">
                <img src="../../assets/icons/inbox.png" />
                <span className="text">Inbox</span>
            </button>
            <button className="flex align-center">
                <img src="../../assets/icons/star.png" />
                <span className="text">Starred</span>
            </button>
            <button className="flex align-center">
                <img src="../../assets/icons/send.png" />
                <span className="text">Send</span>
            </button>
        </section>
    )
}
