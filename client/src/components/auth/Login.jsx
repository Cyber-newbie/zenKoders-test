import { useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { CLEAR_ERROR } from "../../type";
const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ ...props.errors });
  const { isAuthenticated } = props.auth;

  //on logging, check if the user is authenticated then navigate to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  //set redux errors to component state to show input error fields
  useEffect(() => {
    if (props.errors) {
      setErrors((prevErrors) => ({ ...prevErrors, ...props.errors }));
    }
  }, [props.errors]);

  //as component renders, clear up the component error state and redux error state
  useEffect(() => {
    dispatch({
      type: CLEAR_ERROR,
      payload: {},
    });
    setErrors({});
  }, []);

  const emailInput = useRef(null);
  const pswInput = useRef(null);

  const emailHandler = (e) => {
    emailInput.current.value = e.target.value;
  };

  const pswdHandler = (e) => {
    pswInput.current.value = e.target.value;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: emailInput.current.value,
      password: pswInput.current.value,
    };

    props.loginUser(userData);
    setErrors({});
    emailInput.current.value = "";
    pswInput.current.value = "";
  };

  return (
    <div className="login">
      <div className="container mt-20">
        <div className="mx-auto max-w-md">
          <h1 className="text-4xl font-bold text-center mb-4">Log In</h1>
          <p className="text-lg text-center">Sign into your NewsRead account</p>
          <form onSubmit={submitHandler} className="text-center">
            <TextFieldGroup
              type="email"
              name="email"
              placeholder="Email"
              ref={emailInput}
              onChange={emailHandler}
              error={errors.email}
            />

            <TextFieldGroup
              type="password"
              name="password"
              placeholder="Password"
              ref={pswInput}
              onChange={pswdHandler}
              error={errors.password}
            />

            <button
              type="submit"
              className="bg-gray-700 text-white font-bold py-3 px-4 w-30 rounded mt-4"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
