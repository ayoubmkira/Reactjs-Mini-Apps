import { useState, useId } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import data from "./data.js";
import "./style.css";

export default function Accordion() {

    const [checkbox, setCheckbox] = useState(false);
    const [accordions, setAccordions] = useState({});

    const handleToggleAccordion = (id) => {
        setAccordions(currData => {
            return checkbox? { [id]: !accordions[id] }: { ...currData, [id]: !accordions[id] }
        });
    };

    const idCheckbox = useId();

    return <section className="accordion-section">
        <h2 className="section-title">Accordion</h2>
        <div className="accordion-container">
            <div className="option-container">
                <input id={idCheckbox} type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
                <label htmlFor={idCheckbox}>Open only one Accordion at a Time.</label>
            </div>

            <div className="accordion-list">
                {
                    (data && data.length > 0) &&
                        data.map(accordion => {
                            return <div key={accordion.id} className="accordion-item" onClick={() => handleToggleAccordion(accordion.id)}>
                                <div className="accordion-header">
                                    <h2 className="title">{accordion.title}</h2>
                                    <span className="icon">{ accordions[accordion.id]? <GoChevronUp />: <GoChevronDown />}</span>
                                </div>
                                {
                                    accordions[accordion.id] &&
                                        <div className="accordion-body">
                                            <p className="content">{accordion.content}</p>
                                        </div>
                                }
                            </div>
                        })
                }
            </div>
        </div>
    </section>;

}