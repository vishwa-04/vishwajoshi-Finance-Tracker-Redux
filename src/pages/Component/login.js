import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(["mycookie"]);

  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(3).max(6),
    // .test("passInvalid", "Wrong email or password", (value) => {
    //   let flag = 0;
    //   for (const e in user_redux) {
    //     if (
    //       user_redux[e].email === this.parent.email &&
    //       user_redux[e].password === value.password
    //     ) {
    //       flag = 1;
    //     }
    //   }
    //   if (flag === 0) {
    //     errors.password = "Wrong email or password";
    //   }
    // }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  const onSubmit = async (data) => {
    console.log("in submit");
    if (data) {
      setFormValues(data);
      setIsSubmit(true);
    }
  };
  console.log(isSubmit, "after submit");
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const user_redux = useSelector((state) => state.user);
  useEffect(() => {
    if (isSubmit) {
      console.log(user_redux);
      for (const e in user_redux) {
        if (
          user_redux[0][e].email === formValues.email &&
          user_redux[0][e].password === formValues.password
        ) {
          let characters = "abcdefghikl1234567890mnopqrstuvwxyz";
          let randomstring = "";
          for (var i = 0; i < 16; i++) {
            var rnum = Math.floor(Math.random() * characters.length);
            randomstring += characters.substring(rnum, rnum + 1);
          }
          formValues["token"] = randomstring;
          console.log(formValues, "login values");
          setCookie("mycookie", formValues, { maxAge: 3600 });
          console.log("Login Successfull");
          navigate("/showTable");
        } else if (
          user_redux[0][e].email !== formValues.email &&
          user_redux[0][e].password !== formValues.password
        ) {
          navigate("/login");
        }
      }
    }
    //eslint-disable-next-line
  }, [isSubmit]);

  console.log(isSubmit, "after validate");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="vh-100" style={{ "background-color": "#DBDBDB" }}>
          <div className="container py-5 h-100">
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
                        {...register("email")}
                      />
                      <div className="errors">{errors.email?.message}</div>
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
                        {...register("password")}
                      />
                      <div className="errors">{errors.password?.message}</div>
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
