import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Product from "./Product";
import Modal from "./Modal";
import "./style.css";

export default function ShoppingCart() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const response = await fetch("https://dummyjson.com/products?limit=10");
                if (!response.ok) {
                    throw new Error("Error when fetching Data.");
                }
                const data = await response.json();
                setData(data.products);
            } catch (err) {
                setErrors(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const hanldeShowCart = () => {
        setShowCart(true);
    };

    if (loading)
        return <h2>On loading...</h2>;
    if (errors)
        return <h2>{errors.message}</h2>;

    return <section className="section-shopping-cart">
        <div className="section-shopping-cart__container">
            <div className="section-shopping-cart__head">
                <h2 className="section-shopping-cart__title">Products</h2>
                <a href="#" className="section-shopping-cart__link" onClick={hanldeShowCart}>
                    <FaShoppingCart className="section-shopping-cart__link__icon" />
                    <span className="section-shopping-cart__link__count">{cart.length}</span>
                </a>
            </div>
            <div className="products-list">
                {
                    data.map(product => {
                        return <div key={product.id} className="products-list__column">
                            <Product
                                product={product}
                                cart={cart}
                                setCart={setCart} />
                        </div>;
                    })
                }
            </div>
            {
                showCart &&
                <Modal
                    cart={cart}
                    setCart={setCart}
                    setShowCart={setShowCart} />
            }
        </div>
    </section>;

}
