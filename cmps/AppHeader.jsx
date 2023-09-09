const { Link, NavLink } = ReactRouterDOM;
import { UserMsg } from "./UserMsg.jsx";

const { useState, useEffect } = React
export function AppHeader() {
  const [openNav, setOpenNav] = useState(false)

  function onToggleMenu() {
    setOpenNav(prev => !prev)
  }

  function onCloseMenu() {
    setOpenNav(false)
  }

  return (
    <header className="app-header flex justify-start align-center">
      <Link to="/">
        <div className={"logo"}>
          <img src="assets/icons/horse (2).png" alt="" />
          <h3>APPSUS</h3>
        </div>
      </Link>
      <nav>
        <section className={"main-nav-container "+ (openNav? 'open':'')}>
          <NavLink to="/" onClick={onCloseMenu}>Home</NavLink>
          <NavLink to="/about" onClick={onCloseMenu}>About</NavLink>
          <NavLink to="/email/inbox" onClick={onCloseMenu}>Mail</NavLink>
          <NavLink to="/note" onClick={onCloseMenu}>Note</NavLink>
          <NavLink to="/book" onClick={onCloseMenu}>Book</NavLink>
        </section>
        <button className="menu-icone" onClick={onToggleMenu}>☰</button>
      </nav>
      <UserMsg />
    </header>
  );
}
