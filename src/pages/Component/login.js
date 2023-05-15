import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  function submitHandle(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }
console.log(isSubmit,"after submit");
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  useEffect(() => {
    const errorlength = Object.values(formError).filter(
      (items) => items !== ""
    );
    if (errorlength.length === 0 && isSubmit) {
      const register = JSON.parse(localStorage.getItem("register"));

      for (const e in register) {
        if (
          register[e].email === formValues.email &&
          register[e].password === formValues.password
        ) {
          let characters = "abcdefghikl1234567890mnopqrstuvwxyz";
          let randomstring = "";
          for (var i = 0; i < 16; i++) {
            var rnum = Math.floor(Math.random() * characters.length);
            randomstring += characters.substring(rnum, rnum + 1);
          }
          formValues["token"] = randomstring;
          console.log(formValues, "login values");
          localStorage.setItem("login", JSON.stringify([formValues]));
          console.log("Login Successfull");
          navigate("/showTable");
          break;
        } else if (
          register[e].email !== formValues.email &&
          register[e].password !== formValues.password
        ) {
       
          navigate("/login");
        }
      }
    }
    //eslint-disable-next-line
  }, [formError,isSubmit]);

  function validate(values) {
    let flag = 0 ;
    console.log(values);
    const errors = {};

    if (values.email === "") {
      errors.email = "email is required!";
    }

    if (values.password === "") {
      errors.password = "password is required!";
    }
    const register = JSON.parse(localStorage.getItem("register"));
    for (const e in register) {
      if (
        register[e].email === values.email &&
        register[e].password === values.password
      ) {
   flag=1;
        
  }

    }
    if(flag===0){
      errors.password = "Wrong email or password";
    }
    setIsSubmit(false);
    return errors;
  }
  console.log(isSubmit,"after validate");
  return (
    <>
      <form onSubmit={submitHandle}>
        <section className="vh-100" style={{'background-color':'#DBDBDB'}}>
          <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Login</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        name="email"
                        onChange={handleChange}
                      />
                      <div className="errorStyle">{formError.email}</div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        name="password"
                        onChange={handleChange}
                      />
                      <div className="errorStyle">{formError.password}</div>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>

                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Link to={"/registration"}>Register</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
export default Login;
