import Input from "./Input";

export default function professionalInfo({ professionalInfoInputs, onChange, professionalInfoInputsErrors }) {

    return <div className="form__block form__block--professional">
        <h2 className="form__block__header">PROFESSIONAL INFO</h2>
        <div>
            <Input
                id={"current-company"}
                label={"Current Company"}
                type={"text"}
                name={"currentCompany"}
                placeholder={"Current Company"}
                value={professionalInfoInputs.currentCompany || ""}
                onChange={onChange}
                error={professionalInfoInputsErrors.currentCompany}
                 />

            <Input
                id={"total-experience"}
                label={"Total Experience"}
                type={"text"}
                name={"totalExperience"}
                placeholder={"Total Experience"}
                value={professionalInfoInputs.totalExperience || ""}
                onChange={onChange}
                error={professionalInfoInputsErrors.totalExperience}
                 />

            <Input
                id={"designation"}
                label={"Designation"}
                type={"text"}
                name={"designation"}
                placeholder={"Designation"}
                value={professionalInfoInputs.designation || ""}
                onChange={onChange}
                error={professionalInfoInputsErrors.designation}
                 />
        </div>
    </div>;

}