import { NavLink } from "react-router-dom";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <aside className='sidebar'>
      <nav>
        <NavLink
          to='/sales'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Sales Analytics
        </NavLink>
        <NavLink
          to='/engagement'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          User Engagement
        </NavLink>
      </nav>
    </aside>
  );
}
