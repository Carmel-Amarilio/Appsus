const { Link, NavLink } = ReactRouterDOM;
import { UserMsg } from "./UserMsg.jsx";

export function AppHeader() {
  return (
    <header className="app-header flex align-center">
      <Link to="/">
        <div className={"logo"}>
          <img src="assets/icons/horse (2).png" alt="" />
          <h3>APPSUS</h3>
        </div>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/email/inbox">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
      <UserMsg />
    </header>
  );
}
