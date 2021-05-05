import { Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import InputField from "../Components/InputField";
import Layout from "../Components/Layout";
import { postRequestForm } from "../api/Helper";
import { useHistory } from "react-router-dom";

function SignIn(props) {
  const history = useHistory();

  return (
    <>
      <Layout>
        <section className="login-area">
          <Container>
            <h1 className="login-heading">Login</h1>
            <Formik
              enableReinitialize={true}
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={async (values) => {
                console.log(values);

                try {
                  const response = await postRequestForm(
                    "/api/auth/login",
                    "",
                    values
                  );
                  localStorage.setItem("TOKEN", response.result.data.token);
                  // console.log('TOKEN', response.result .data.token);
                  console.log("status", response.result.status);
                  if (response.result.status === 200) {
                    console.log("logged in!");
                    history.push("/add_movie");
                  }
                } catch (error) {
                  console.log("Login APi error", error.message);
                }
              }}
            >
              {(props) => (
                <Form>
                  <InputField
                    element="input"
                    name="username"
                    type="username"
                    placeholder="Username"
                    className=""
                    onChange={props.handleChange}
                    value={props.values.username}
                  />
                  <InputField
                    element="input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className=""
                    onChange={props.handleChange}
                    value={props.values.password}
                  />
                  <div className="text-center">
                    <InputField
                      element="button"
                      name=""
                      type=""
                      placeholder=""
                      className=""
                      btnType="submit"
                      btnText="<i class='fa fa-arrow-right'></i>"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export default SignIn;
