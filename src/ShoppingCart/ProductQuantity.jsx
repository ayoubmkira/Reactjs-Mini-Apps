import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function ProductQuantity({ product, setCart }) {

    const [value, setValue] = useState(product.user_quantity || 1);
    const subtractQuantity = () => {
        setValue(v => (v === 1)? 1: v - 1);
    };
    const addQuantity = () => {
        setValue(v => v + 1);
    };

    useEffect(() => {
        setCart(currCart => currCart.map(
            _prod => _prod.id === product.id ? { ..._prod, user_quantity: value } : _prod
        ));
    }, [value]);

    return <div className="product-quantity">
        <button className="btn product-quantity__btn product-quantity__btn--minus" onClick={subtractQuantity}><FaMinus /></button>
        <input className="product-quantity__input" type="text" value={value} disabled={true} />
        <button className="btn product-quantity__btn product-quantity__btn--plus" onClick={addQuantity}><FaPlus /></button>
    </div>;

}