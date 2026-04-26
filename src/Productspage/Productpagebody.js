import {React,useContext} from 'react'

import {products} from '../data/products'
import {formatCurrency} from '../utils/money'

import './Productpagebody.css'
import { Checkoutcontext } from '../Contexts/Checkoutcontext';


const Productpagebody = () => {
  
   
    
    const {addToCart} = useContext(Checkoutcontext);
    

    const handleAddToCart = (productId) => {

      /* if(user){ */
      addToCart(productId);
     /*  } */
     /*  else{
        alert('Please sign in');
        
      } */
      
    };
      
    
      return (
        <div className="main">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image} alt={product.name} />
                </div>
    
                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>
    
                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    alt={`${product.rating.stars} stars`}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>
    
                <div className="product-price">
                  ${formatCurrency(product.priceCents)}
                </div>
    
                <div className="product-quantity-container">
                  <select>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
    
                <div className="product-spacer"></div>
    
                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" alt="Checkmark" />
                  Added
                </div>
    
                <button
                  className="add-to-cart-button button-primary"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
    
          
        </div>
      );
  
}

export default Productpagebody
