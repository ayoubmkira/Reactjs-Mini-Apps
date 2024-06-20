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
        designation: ""
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
        const trimValue = value.trim();

        const commonLengthValidation = (value, minLength, fieldName) =>
            !value ? `${fieldName} should not be Empty!` :
                value.length < minLength ? `${fieldName} Length should be more than ${minLength - 1} characters!` :
                    "";

        const validations = {
            email: () =>
                !trimValue ? "Email should not be Empty!" :
                    !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(trimValue) ? "Email is not valid!" :
                        "",
            password: () =>
                !trimValue ? "Password should not be Empty!" :
                    trimValue.length < 8 ? "Password Length should be more than 7 characters!" :
                        "",
            confirmPassword: () =>
                !trimValue ? "Password confirmation should not be Empty!" :
                    trimValue.length < 8 ? "Password confirmation Length should be more than 7 characters!" :
                        trimValue !== signupInfoInputs.password ? "Passwords should be the Same!" :
                            "",
            username: () => commonLengthValidation(trimValue, 3, "Username"),
            firstName: () => commonLengthValidation(trimValue, 3, "First name"),
            lastName: () => commonLengthValidation(trimValue, 3, "Last name"),
            currentCompany: () => commonLengthValidation(trimValue, 3, "Company"),
            totalExperience: () => {
                const newValue = +trimValue;
                return isNaN(newValue) ? "Total Experience should be a number!" :
                    newValue < 1 || newValue >= 50 ? "Total Experience should be between 1 and 50!" :
                        "";
            },
            designation: () => commonLengthValidation(trimValue, 3, "Designation")
        };

        const message = validations[name] ? validations[name]() : "";
        setInputsErrors(currErrors => ({ ...currErrors, [name]: message }));

        return message;
    };

    // Check Inputs For Current Step:
    const validateCurrentStep = () => {
        let isValid = true;
        const errors = {}; // To store errors for each input
        let inputsToValidate = {};

        // Determine which inputs to validate based on currentStep
        switch (currentStep) {
            case 1: inputsToValidate = signupInfoInputs; break;
            case 2: inputsToValidate = personalInfoInputs; break;
            case 3: inputsToValidate = professionalInfoInputs; break;
            default: break;
        }

        // Validate inputs
        Object.keys(inputsToValidate).forEach((key) => {
            const value = inputsToValidate[key];
            const message = validateInput(key, value); // Call validateInput function
            if (message) {
                errors[key] = message;
                isValid = false;
            }
        });

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
                                <ul className="list__steps">
                                    {
                                        [...new Array(STEPS)].map((_, i) => {
                                            return <li className={`list__steps__item ${((i + 1) <= currentStep) ? "in" : ""}`} key={i}>{i + 1}</li>
                                        })
                                    }
                                    <div className="list__steps__progress">
                                        <div className="list__steps__progress__bar" style={{ width: (((currentStep - 1) * 100) / (STEPS - 1)) + "%" }}></div>
                                    </div>
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
                                            <button onClick={handleMoveNextStep} className="btn__step btn__step--next">Next</button> :
                                            <button onClick={handleSubmitForm} className="btn__step btn__step--next">Submit</button>
                                    }
                                </div>
                            </div>
                        </> : <div className="final-message">
                            <FaCheckCircle className="final-message__icon" />
                            <p className="final-message__text">Form is Submitted.</p>
                        </div>
                }
            </div>
        </div>
    </section>;

}