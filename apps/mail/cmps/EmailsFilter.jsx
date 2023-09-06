export function EmailsFilter({ onFilter }) {

    function onFilterBy(by) {
        onFilter(by)
    }

    return (
        <section className="email-filter flex column ">
            <button className="new-email flex align-center">
                <img src="../../assets/icons/pen.png" />
                <span className="text">Compose</span>
            </button>
            <button onClick={() => onFilterBy('inbox')} className="flex align-center">
                <img src="../../assets/icons/inbox.png" />
                <span className="text">Inbox</span>
            </button>
            <button onClick={() => onFilterBy('starred')} className="flex align-center">
                <img src="../../assets/icons/star.png" />
                <span className="text">Starred</span>
            </button>
            <button onClick={() => onFilterBy('send')} className="flex align-center">
                <img src="../../assets/icons/send.png" />
                <span className="text">Send</span>
            </button>
        </section>
    )
}
