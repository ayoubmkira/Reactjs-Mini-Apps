import { useState } from "react";
import SignupInfo from "./SignupInfo";
import PersonalInfo from "./PersonalInfo";
import ProfessionalInfo from "./ProfessionalInfo";
import { FaCheckCircle } from "react-icons/fa";
import "./style.css";

export default function MultiStepForm() {

    const STEPS = 3;
    /* States where to put each input name with its own value. */
    const [signupInfoInputs, setSignupInfoInputs] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [personalInfoInputs, setPersonalInfoInputs] = useState({
        username: "",
        firstName: "",
        lastName: ""
    });
    const [professionalInfoInputs, setProfessionalInfoInputs] = useState({
        currentCompany: "",
        totalExperience: "",
        designiation: ""
    });
    /* State for specifying the current State. */
    const [currentStep, setCurrentStep] = useState(1);
    /* State for input name and a message error if exists. */
    const [inputsErrors, setInputsErrors] = useState({});

    /* Function to control inputs change inside Every Form, and validate input */
    const handleInputChange = (e, setInputs) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((currInputs) => {
            return { ...currInputs, [name]: value };
        });
        validateInput(name, value);
    };

    /* Function to validate each input, and put it inside. */
    const validateInput = (name, value) => {
        let message = "";

        // Check Signup Inputs:
        if (name === "email") {
            if (!value.trim()) {
                message = "Email should not be Empty!";
            } else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value)) {
                message = "Email is not valid!";
            }
        }
        if (name === "password") {
            if (!value.trim()) {
                message = "Password should not be Empty!";
            } else if (value.length < 8) {
                message = "Password Length should be more than 7 characters!";
            }
        }
        if (name === "confirmPassword") {
            if (!value.trim()) {
                message = "Password confirmation should not be Empty!";
            } else if (value.length < 8) {
                message = "Password confirmation Length should be more than 7 characters!";
            } else if (value !== signupInfoInputs.password) {
                message = "Passwords should be the Same!";
            }
        }

        // Check Personal Info:
        if (name === "username") {
            if (!value.trim()) {
                message = "Username should not be Empty!";
            } else if (value.length < 3) {
                message = "Username Length should be more than 2 characters!";
            }
        }
        if (name === "firstName") {
            if (!value.trim()) {
                message = "First name should not be Empty!";
            } else if (value.length < 3) {
                message = "First name Length should be more than 2 characters!";
            }
        }
        if (name === "lastName") {
            if (!value.trim()) {
                message = "Last name should not be Empty!";
            } else if (value.length < 3) {
                message = "Last name Length should be more than 2 characters!";
            }
        }

        // Check Professional Infos:
        if (name === "currentCompany") {
            if (!value.trim()) {
                message = "Company should not be Empty!";
            } else if (value.length < 3) {
                message = "Company Length should be more than 2 characters!";
            }
        }
        if (name === "totalExperience") {
            const newValue = +value.trim();
            if (isNaN(newValue)) {
                message = "Total Experience should be a number!";
            } else if (newValue < 1 || newValue >= 50) {
                message = "Total Experience should be between 1 and 50!";
            }
        }
        if (name === "designiation") {
            if (!value.trim()) {
                message = "Designiation should not be Empty!";
            } else if (value.length < 3) {
                message = "Designiation Length should be more than 2 characters!";
            }
        }

        setInputsErrors(currErrors => {
            return { ...currErrors, [name]: message };
        });

        return message;
    };

    const validateCurrentStep = () => {
        let isValid = true;
        const errors = {}; // To store errors for each input

        if (currentStep === 1) {
            // Validate signup inputs:
            Object.keys(signupInfoInputs).forEach((key) => {
                const value = signupInfoInputs[key];
                const message = validateInput(key, value); // Call validateInput function
                if (message) {
                    errors[key] = message;
                    isValid = false;
                }
            });
        } else if (currentStep === 2) {
            // Validate personalInfo inputs:
            Object.keys(personalInfoInputs).forEach((key) => {
                const value = personalInfoInputs[key];
                const message = validateInput(key, value); // Call validateInput function
                if (message) {
                    errors[key] = message;
                    isValid = false;
                }
            });
        } else if (currentStep === 3) {
            // Validate professionalInfo inputs:
            Object.keys(professionalInfoInputs).forEach((key) => {
                const value = professionalInfoInputs[key];
                const message = validateInput(key, value); // Call validateInput function
                if (message) {
                    errors[key] = message;
                    isValid = false;
                }
            });
        }

        setInputsErrors(errors); // Update errors state
        return isValid;
    };

    const handleMoveNextStep = () => {
        if (validateCurrentStep()) {
            setCurrentStep(v => v + 1);
        }
    };
    const handleMoveBackStep = () => {
        setCurrentStep(v => v - 1);

    };
    const handleSubmitForm = () => {
        if (validateCurrentStep()) {
            setCurrentStep(v => v + 1);
            const formData = {
                signupInfoInputs,
                personalInfoInputs,
                professionalInfoInputs
            };
            console.table(formData);
        }
    };

    return <section className="section-mutistep-form">
        <div className="section-mutistep-form__container">

            <div className="form__container">
                {
                    (currentStep <= STEPS) ?
                        <>
                            <div className="form__steps">
                                <ul className="list__steps" data-steps={STEPS} data-current-step={currentStep}>
                                    {
                                        [...new Array(STEPS)].map((_, i) => {
                                            return <li className={`list__steps__item ${((i + 1) <= currentStep) ? "in" : ""}`} key={i}>{i + 1}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <form>
                                {
                                    (currentStep === 1) ?
                                        <SignupInfo
                                            signupInfoInputs={signupInfoInputs}
                                            onChange={(e) => handleInputChange(e, setSignupInfoInputs)}
                                            signupInputsErrors={inputsErrors} /> :
                                        (currentStep === 2) ?
                                            <PersonalInfo
                                                personalInfoInputs={personalInfoInputs}
                                                onChange={(e) => handleInputChange(e, setPersonalInfoInputs)}
                                                personalInfoInputsErrors={inputsErrors} /> :
                                            (currentStep === 3) ?
                                                <ProfessionalInfo
                                                    professionalInfoInputs={professionalInfoInputs}
                                                    onChange={(e) => handleInputChange(e, setProfessionalInfoInputs)}
                                                    professionalInfoInputsErrors={inputsErrors} /> : null
                                }
                            </form>
                            <div className="steps__control">
                                <div>
                                    {
                                        (currentStep !== 1) &&
                                            <button onClick={handleMoveBackStep} className="btn__step btn__step--back">Back</button>
                                    }
                                </div>
                                <div>
                                    {
                                        (currentStep !== STEPS) ?
                                            <button onClick={handleMoveNextStep} className="btn__step btn__step--next">Next</button>:
                                            <button onClick={handleSubmitForm} className="btn__step btn__step--next">Submit</button>
                                    }      
                                </div>
                            </div>
                        </>: <div className="final-message">
                            <FaCheckCircle className="final-message__icon" />
                            <p className="final-message__text">Form is Submitted.</p>
                        </div>
                }
            </div>
        </div>
    </section>;

}