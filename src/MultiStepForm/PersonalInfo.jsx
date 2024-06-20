import Input from "./Input";

export default function PersonalInfo({ personalInfoInputs, onChange, personalInfoInputsErrors }) {

    return <div className="form__block form__block--personal">
        <h2 className="form__block__header">PERSONAL INFO</h2>
        <div>
            <Input
                id={"username"}
                label={"Username"}
                type={"text"}
                name={"username"}
                placeholder={"Username"}
                value={personalInfoInputs.username || ""}
                onChange={onChange}
                error={personalInfoInputsErrors.username}
                 />

            <Input
                id={"first-name"}
                label={"First Name"}
                type={"text"}
                name={"firstName"}
                placeholder={"First Name"}
                value={personalInfoInputs.firstName || ""}
                onChange={onChange}
                error={personalInfoInputsErrors.firstName}
                 />

            <Input
                id={"last-name"}
                label={"Last Name"}
                type={"text"}
                name={"lastName"}
                placeholder={"Last Name"}
                value={personalInfoInputs.lastName || ""}
                onChange={onChange}
                error={personalInfoInputsErrors.lastName}
                 />
        </div>
    </div>;

}