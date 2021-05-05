import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu({}) {
  // var isActive = this.context.router.route.location.pathname === this.props.to;
  // var className = isActive ? 'active' : '';
  const homeClass = window.location.pathname === "/" ? "active" : "";
  const addMovie = window.location.pathname === "/add_movie" ? "active" : "";
  // console.log(homeClass);

  return (
    <>
      <Nav as="ul" className="main-nav">
        <Nav.Item as="li" to="/">
          <Link to="/" className={`nav-link ${homeClass}`}>
            Homepage
          </Link>
        </Nav.Item>
        {localStorage.getItem("TOKEN") ? (
          <Nav.Item as="li" to="/add_movie">
            <Link to="/add_movie" className={`nav-link ${addMovie}`}>
              Add Movie
            </Link>
          </Nav.Item>
        ) : (
          ""
        )}
      </Nav>
    </>
  );
}

export default Menu;
