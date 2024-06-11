import { useState } from "react";
import Input from "./Input";
import "./style.css";

export default function FormValidation () {

    const [inputs, setInputs] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setInputs(currValues => ({ ...currValues, [inputName]: inputValue }));
        validateInput(inputName, inputValue);
    };

    const validateInput = (name, value) => {
        let error = "";
        if(name === "fullname") {
            if(!value.trim()) {
                error = "Full Name is required.";
            } else if (value.trim().length < 4) {
                error = "Full Name must be at least 3 characters.";
            }
        } else if(name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!value.trim()) {
                error = "Email is required.";
            } else if (!emailPattern.test(value)) {
                error = "Invalid email format.";
            }
        } else if(name === "password") {
            if(!value.trim()) {
                error = "Password is required.";
            } else if (value.trim().length < 8) {
                error = "Password must be at least 8 characters.";
            }
        } else if(name === "confirmPassword") {
            if(!value.trim()) {
                error = "Password Confirm is required.";
            } else if (value.trim().length < 8) {
                error = "Password Confirm must be at least 8 characters.";
            } else if (value.trim() !== inputs.password) {
                error = "Passwords must be the same.";
            }
        }
        setErrors(currErrors => ({ ...currErrors, [name]: error }))
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        Object.keys(inputs).forEach(name => validateInput(name, inputs[name]));
        const noErrors = Object.values(errors).every(error => !error);

        // Fom Submission:
        if (noErrors) {
            console.log(inputs);
        } else {
            console.log("Form has errors");
        }
    };

    return <section className="section-from-validation">
        <h2 className="section-from-validation__title">Form Validation</h2>
        <div className="section-from-validation__container">
            <form className="section-from-validation__form" onSubmit={handleFormSubmit}>
                <Input
                    type={"text"}
                    label={"Full Name"}
                    id={"full-name"}
                    name={"fullname"}
                    placeholder={"Full Name"}
                    value={inputs.fullname || ""}
                    onChange={handleChange}
                    error={errors.fullname} />

                <Input
                    type={"email"}
                    label={"Email"}
                    id={"email"}
                    name={"email"}
                    placeholder={"Email"}
                    value={inputs.email || ""}
                    onChange={handleChange}
                    error={errors.email} />

                <Input
                    type={"password"}
                    label={"Password"}
                    id={"password"}
                    name={"password"}
                    placeholder={"Password"}
                    value={inputs.password || ""}
                    onChange={handleChange}
                    error={errors.password} />

                <Input
                    type={"password"}
                    label={"Confirm Password"}
                    id={"confirm-password"}
                    name={"confirmPassword"}
                    placeholder={"Password"}
                    value={inputs.confirmPassword || ""}
                    onChange={handleChange}
                    error={errors.confirmPassword} />

                    <button className="btn__form" type="submit">Send</button>
            </form>
        </div>
    </section>

}