import { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div className="home-container">
      <h2 className="page-title">Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>

            <Link to={`/product/${product._id}`} className="product-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
