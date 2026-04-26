import React from 'react'
import './Product.css'
 

const Product = ({id,priceCents,stars,image,title,count}) => {
  return (<>
    <div className='product' key={id}>
        <div className="product-info">
            <p>{title}</p>
            <p className="product-prize"><small>Rs</small>
            <strong>{priceCents}</strong></p>
            <div className="product-rating">
               {Array(stars).fill().map((_,i)=>{
                  return  <p>star</p>
               }) }
            </div>
        </div>

        <img src={image} alt="" />
        <button>Add to Basket</button>
    </div>  

    
        </> 
  )
}

export default Product
