import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import menuData from "./menu";
import "./style.css";

export default function RecursiveNavigationMenu() {

    return <section className="section-navigation-menu">
        <h2 className="section-navigation-menu__title">Navigation Menu</h2>
        <div className="section-navigation-menu__container">
            <div className="section-navigation-menu__box">
                <ul className="menu">
                    {
                        menuData.map((item) => {
                            return <MenuItem key={item.id} menu={item} />;
                        })
                    }
                </ul>
                <div className="content">
                    {/* Put your content here. */}
                </div>
            </div>
        </div>
    </section>;

}

function MenuItem({ menu }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return <li className="menu-item">
            <div onClick={toggleOpen} className="menu-item-name">
                <span>{menu.label}</span>
                {
                    menu.children && (
                        isOpen? <FaChevronUp size={10} />: <FaChevronDown size={10} />
                    )
                }
            </div>
            {
                (isOpen && menu.children) &&
                    <ul className="submenu">
                        {
                            menu.children.map(_item => <MenuItem key={_item.id} menu={_item} />)
                        }
                    </ul>
            }
        </li>;

}