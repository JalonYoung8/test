import { Col, Container, Row } from "react-bootstrap";
import SiteSetting from "../Constant/SiteSetting";

function Footer(props) {
  return (
    <>
      <footer id="footer-content">
        <div className="copyright">
          <Container>
            <Row>
              <Col
                lg="6"
                md="6"
                xs="12"
                dangerouslySetInnerHTML={{
                  __html: SiteSetting.SiteSetting[0].Design_by,
                }}
              />
              <Col lg="6" md="6" xs="12"
                className="text-right">
                {SiteSetting.SiteSetting[0].Copyright_text}
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
}

export default Footer;
