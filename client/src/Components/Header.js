import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SiteSetting from "../Constant/SiteSetting";
import Menu from "./Menu";
import Search from "./Search";
import { useHistory } from "react-router-dom";
import Autocomplete from "react-autocomplete";
import AutoCompleteSearch from "./AutoCompleteSearch";

function Header(props) {
  const history = useHistory();

  return (
    <>
      <header id="header-content">
        <Container>
          <Row>
            <Col lg={6} md={6} xs={12}>
              <Row>
                <Col lg={5} md={5} xs={12}>
                  <h2 className="logo-heading">
                    {SiteSetting.SiteSetting[0].LogoSlogan}
                  </h2>
                </Col>
                <Col lg={7} md={7} xs={12}>
                  <Menu />
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <Row>
                <Col lg={8} md={8} xs={12}>
                  {/* <Search
                    placeholder="Search Movies..."
                    inputClass=""
                    buttonClass="p-0"
                  /> */}
                  <AutoCompleteSearch/>
                </Col>
                <Col lg={4} md={4} xs={12} className="justify-content-end">
                  <div className="end">
                    {localStorage.getItem("TOKEN") ? (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            title="Log Out"
                            onClick={() => {
                              localStorage.removeItem("TOKEN");
                              history.push("/");
                            }}
                          >
                            <i class="fa fa-sign-out" aria-hidden="true"></i>{" "}
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Link to="/admin_login" className="btn btn-sign">
                        Sign in
                      </Link>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
}

export default Header;
