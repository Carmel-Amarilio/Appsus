const { Link } = ReactRouterDOM

export function EmailHeader({ onToggleFilter }) {
    return (
        <section className="email-header flex align-center">
            <button onClick={onToggleFilter}><img src="../../assets/icons/hamburger.png" /></button>
            <div className="logo flex align-center">
                <Link to={`/email/inbox`} className="logo flex align-center">
                    <img src="../../assets/icons/gmail.png" />
                    <span>logo</span>
                </Link>
            </div>
            <label htmlFor="txt" className="search-sec flex align-center">
                <button><img src="../../assets/icons/search.png" /></button>
                <input type="text" placeholder="Search mail" id="txt" name="txt" />
            </label>
        </section>
    )
}