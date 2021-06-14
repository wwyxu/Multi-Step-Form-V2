import React from "react";
import fetch from "../../../../utils/fetch";
import { toast } from "react-toastify";

const step2 = ({
  inputs,
  step,
  maxSteps,
  onChange,
  prevStep,
  nextStep,
  clearForm,
  loading,
  setLoad,
}) => {
  const checkValidity = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.checkValidity() ? checkPassword() : e.stopPropagation();
  };

  const checkPassword = () => {
    inputs.password1 !== inputs.password2 ? toast.error("Password must match") : submitForm();
  };

  const submitForm = async () => {
    try {
      setLoad(true);

      const body = {
        name: inputs.name,
        email: inputs.email,
        password1: inputs.password1,
        password2: inputs.password2,
      };

      const response = await fetch(
        "http://localhost:5000/users/register",
        "",
        body
      );

      response ? next() : toast.error(response);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoad(false);
    }
  };

  const next = () => {
    clearForm();
    nextStep();
  }

  return (
    <div className="container reg-container">
      <div className="d-flex justify-content-center h-100">
        <div className="card reg-card card-body shadow-sm">
          <form onSubmit={checkValidity}>
            <h2 className="text-center mt-3">Register</h2>
            <div className="text-center text-secondary mb-4">
              Step {step} of {maxSteps}
            </div>
            <div className="form-group">
              <label for="password1">Password</label>
              <input
                type="password"
                required
                id="password1"
                name="password1"
                defaultValue={inputs.password1}
                placeholder="Password"
                onChange={onChange("password1")}
                className="form-control my-1"
              />
              <label for="password2">Password</label>
              <input
                type="password"
                required
                id="password2"
                name="password2"
                defaultValue={inputs.password2}
                placeholder="Confirm Password"
                onChange={onChange("password2")}
                className="form-control my-1"
              />
            </div>
            {loading ? (
              <button className="btn btn-success btn-block">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </button>
            ) : (
              <button className="btn btn-success btn-block" type="submit">
                Register
              </button>
            )}
            <button className="btn btn-primary btn-block" onClick={prevStep}>
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default step2;