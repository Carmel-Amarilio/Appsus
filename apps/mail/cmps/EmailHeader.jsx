const { Link } = ReactRouterDOM

const { useState } = React
export function EmailHeader({ onToggleFilter, onSearch, onSort }) {
    const [sort, setSort] = useState({ from: false, date: false, unread: false })

    function handleSearch({ target }) {
        let val = target.value
        onSearch(val)
    }

    function handleSort({ target }) {
        const field = target.name
        let val = target.checked
        setSort(prevSort => {
            const sort = { ...prevSort, [field]: val }
            onSort(sort)
            return sort
        })
    }

    const { from, date, unread } = sort
    return (
        <section className="email-header flex align-center">
            <section className="flex align-center">
                <button onClick={onToggleFilter}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <section className="logo flex align-center">
                    <Link to={`/email/inbox`} className="logo flex align-center">
                        <img src={"assets/icons/gmail.png"} />
                        <span>ilesus</span>
                    </Link>
                </section>

                <label htmlFor="txt" className="search-sec flex align-center">
                    <button><img src={"assets/icons/search.png"} /></button>
                    <input onChange={handleSearch} type="text" placeholder="Search mail" />
                </label>
            </section>

            <section onChange={handleSort} className="sort">
                <input type="checkbox" name="from" id="fromBox" />
                <label htmlFor="fromBox" >
                    {from && <i className="fa-solid fa-caret-up"></i>}
                    {!from && <i className="fa-solid fa-caret-down"></i>}
                    <span>From</span>
                </label>

                <input type="checkbox" name="date" id="dateBox" />
                <label htmlFor="dateBox" >
                    {date && <i className="fa-solid fa-caret-up"></i>}
                    {!date && <i className="fa-solid fa-caret-down"></i>}
                    <span>Date</span>
                </label>

                <input type="checkbox" name="unread" id="unreadBox" />
                <label htmlFor="unreadBox" >
                    {unread && <i className="fa-solid fa-caret-up"></i>}
                    {!unread && <i className="fa-solid fa-caret-down"></i>}
                    <span>Unread</span>
                </label>
            </section>

        </section>
    )
}