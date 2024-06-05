import ProductQuantity from "./ProductQuantity";

export default function Product({ product, cart, setCart, zoneProduct }) {

    const handleAddToCart = (product) => {
        setCart(currProducts => {
            const idxProduct = currProducts.findIndex(_prod => _prod.id === product.id);
            return (idxProduct === -1) ? [...currProducts, product] : [...currProducts];
        });
    };
    const handleRemoveFromCart = (product) => {
        setCart(currProducts => {
            return currProducts.filter(_prod => _prod.id !== product.id);
        });
    };

    return <div className="product">
        <div className="product__head">
            <img className="product__head__image" src={product.images[0]} alt="Product Image" />
        </div>
        <div className="product__body">
            <h3 className="product__body__title">{product.title}</h3>
            <h2 className="product__body__price">$ {product.price}</h2>
            {
                (zoneProduct === "cart") ?
                    <ProductQuantity
                        product={product}
                        setCart={setCart} />: null
            }
        </div>
        <div className="product__footer">
            {
                (zoneProduct === "cart") ?
                    <button
                        className="btn product__footer__btn product__footer__btn--remove-from-cart"
                        onClick={() => handleRemoveFromCart(product)} >Remove</button> :
                    <>
                        <button
                            className="btn product__footer__btn product__footer__btn--add-to-cart"
                            disabled={cart.findIndex(prod => prod.id === product.id) !== -1}
                            onClick={() => handleAddToCart(product)} >Add to Cart</button>
                        {/* <button
                            className="btn product__footer__btn product__footer__btn--details"
                            onClick={() => null} >Details</button> */}
                    </>
            }
        </div>
    </div>;

}