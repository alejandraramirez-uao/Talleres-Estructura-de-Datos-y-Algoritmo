
function ProductCard({ product, position }) {
  return (
    <article className="product-card">
      <div className="product-rank">
        {String(position).padStart(2, "0")}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Popularidad: {product.popularity.toLocaleString()}</p>
      </div>

      <div className="popularity-badge">
        <span>★</span> {product.popularity}
      </div>
    </article>
  );
}

export default ProductCard;
