import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
function Registration(){
    const initialValues = {
        username : "",
        email : "",
        password : "",
    }



    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();



    function submitHandle(e) {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
      }



    function handleChange(e){
        const {name,value}= e.target;
        setFormValues({...formValues,[name]:value})
    }





    const { id } = useParams();
    useEffect(() => {
        console.log(isSubmit,"issubmit");
        if (Object.keys(formError).length === 0 && isSubmit) {
          if (localStorage.getItem("register") !== null) {
            const data = JSON.parse(localStorage.getItem("register"));
    
            if (id) {
              for (const e in data) {
                if (parseInt(data[e].id) === parseInt(id)) {
                  // console.log(data[e].id, id, "e:id");
                  formValues['id'] = id;
                  data[e] = formValues;
                  // console.log(data[e],formValues,"data[e]   :::::::: formvalues");
                }
              }
            } else {
              let previousId = data[data.length - 1].id;
              formValues['id']= previousId+1
              data.push(formValues);
            }
    
            localStorage.setItem("register", JSON.stringify(data));
          } else {
            formValues['id']= 1;
            localStorage.setItem("register", JSON.stringify([formValues]));
          }
          navigate("/login");
        }
        //eslint-disable-next-line
      }, [formError]);




    function validate(values){
        const errors = {}
        if(values.username === ""){
            errors.username = "username is required!"
        }

        if(values.email === ""){
            errors.email = "email is required!"
        }

        if(values.password === ""){
            errors.password = "password is required!"
        }

        const data = JSON.parse(localStorage.getItem("register"));
        for (const e in data) {
            if (data[e].email === values.email) {
              errors.email = "email already exists!"
            }
          }

        setIsSubmit(false)
        return errors;
    }
    return(
        <>
 <form onSubmit={submitHandle}>
 <section className="vh-100" style={{'background-color':'#DBDBDB'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" >
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Registration</h3>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="typeEmailX-2">Username</label>
              <input type="text" id="typeEmailX-2" className="form-control form-control-lg" name="username" onChange={handleChange}/>
              <div className="errorStyle">{formError.username}</div>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="typeEmailX-2">Email</label>
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" name="email" onChange={handleChange}/>
              <div className="errorStyle">{formError.email}</div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="typePasswordX-2">Password</label>
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name="password" onChange={handleChange}/>
              <div className="errorStyle">{formError.password}</div>
            </div>

            
           

            <button className="btn btn-primary btn-lg btn-block" type="submit">Register</button>

            <div>
              <p className="mb-0">Already have an account? <Link to={'/login'}>Login</Link>
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
    )
};
export default Registration