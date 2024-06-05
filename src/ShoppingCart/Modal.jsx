import Product from "./Product";

export default function Modal({ cart, setCart, setShowCart }) {

    return <div id="myModal" className="modal">
        <div className="modal__content">
            <div className="modal__content__head">
                <h2 className="modal__content__title">Shopping Cart</h2>
                <h3 className="modal__content__count">{cart.length} Items</h3>
            </div>
            <div className="modal__content__body">
                <div className="modal__content__body__list-products">
                    {
                        cart.map((product) => {
                            return <div key={product.id} className="products-list__column">
                                <Product
                                    product={product}
                                    setCart={setCart}
                                    zoneProduct={"cart"} />
                            </div>;
                        })
                    }
                    <div>
                        <h3 className="products-total">
                            <span className="products-total__text">Total: $ </span>
                            <span className="products-total__price">
                                {
                                    cart.reduce((total, product) => total + (product.price * product.user_quantity), 0).toFixed(2)
                                }
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
            <div className="modal__content__footer">
                <button className="btn modal__btn modal__btn--close" onClick={() => setShowCart(false)}>Close</button>
            </div>
        </div>
    </div>;

}