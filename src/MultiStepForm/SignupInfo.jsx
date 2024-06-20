import Input from "./Input";

export default function SignupInfo({ signupInfoInputs, onChange, signupInputsErrors }) {

    return <div className="form__block form__block--signup">
        <h2 className="form__block__header">SIGNUP INFO</h2>
        <div>
            <Input
                id={"email"}
                label={"Email Adress"}
                type={"email"}
                name={"email"}
                placeholder={"Email Adress"}
                value={signupInfoInputs.email || ""}
                onChange={onChange}
                error={signupInputsErrors.email}
                 />

            <Input
                id={"password"}
                label={"Password"}
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                value={signupInfoInputs.password || ""}
                onChange={onChange}
                error={signupInputsErrors.password}
                 />

            <Input
                id={"confirm-password"}
                label={"Confirm Password"}
                type={"password"}
                name={"confirmPassword"}
                placeholder={"Confirm Password"}
                value={signupInfoInputs.confirmPassword || ""}
                onChange={onChange}
                error={signupInputsErrors.confirmPassword}
                 />
        </div>
    </div>;

}