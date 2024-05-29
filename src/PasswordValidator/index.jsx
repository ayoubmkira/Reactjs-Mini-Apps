import { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import "./style.css";

export default function PasswordValidator() {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [validationRules, setValidationRules] = useState([]);

    const checkPassword = (password) => {
        setValidationRules([
            {
                message: "At least 8 characters Long.",
                condition: password.length >= 8
            }, {
                message: "At least 1 uppercase letter (A-Z).",
                condition: /[A-Z]/.test(password)
            }, {
                message: "At least 1 lowercase letter (a-z).",
                condition: /[a-z]/.test(password)
            }, {
                message: "At least 1 number (0-9).",
                condition: /[0-9]/.test(password)
            }, {
                message: "At least 1 special character (!$&?).",
                condition: /[!@#$%^&*]/.test(password)
            }
        ])
    };
    
    const passwordInputChange = (e) => {
        setPassword(e.target.value);
    };
    const showPasswordChange = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        checkPassword(password);
    }, [password]);


    return <section className="password-validator-section">
        <h2 className="section-title">Password Validator</h2>
        <div className="password-validator-container">
            <div className="input-password-container">
                <input
                    type={showPassword? "input": "password"}
                    className="input-password"
                    value={password}
                    onChange={passwordInputChange} />
                <span className="show-password-icon" onClick={showPasswordChange}>
                    {showPassword? <IoIosEyeOff />: <IoMdEye /> }
                </span>
            </div>

            <div className="bottom">
                <h3>Password must contains:</h3>
                <ul className="list-validation-rules">
                    {
                        validationRules.map((test, i) => {
                            return <li key={i} className="validation-rule">
                                <span className="icon">{test.condition? <FaRegCircleCheck color="green" />: <FaRegTimesCircle color="red" />}</span>
                                <span className="message">{test.message}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    </section>;

}