import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await fetchProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <p className="loading-text">Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        {/* Product Image */}
        <div className="product-detail-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <h2 className="product-detail-name">{product.name}</h2>

          <p className="product-detail-desc">{product.description}</p>

          <p className="product-detail-price">₹{product.price}</p>

          <p className="product-detail-stock">Stock: {product.countInStock}</p>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
