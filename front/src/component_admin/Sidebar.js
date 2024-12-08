import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height: "100%" }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">CatCoffe</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/admin/menu" className="nav-link text-white">
            Menu
          </Link>
        </li>
        <li>
          <Link to="/admin/cats" className="nav-link text-white">
            Cats
          </Link>
        </li>
        <li>
          <Link to="/admin/reservation" className="nav-link text-white">
            Reservation
          </Link>
        </li>
        <li>
          <Link to="/admin/customers" className="nav-link text-white">
            Customers
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width={32}
            height={32}
            className="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li>
            <Link className="dropdown-item" to="/">
              Home Page
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/auth">
              Exit
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
