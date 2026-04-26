import React from 'react'
import './Home.css'

/* import Product from './Product' */
import Product1 from './Product1'

const Home = () => {
    return (
        <div className='home'>
            <div className="home-container">
                {/*  <img className ="home-image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" /> */}
                <img className="home-image" src="https://wallpapers.com/images/hd/amazon-e-commerce-company-csw7ypxppsqd7yyr.jpg" alt="" />

                <div className="home-row">
                    <Product1 Id="e43638ce-6aa0-4b85-b27f-e1d07eb678c6" 
                    image="images/products/athletic-cotton-socks-6-pairs.jpg"
                        title="Black and Gray Athletic Cotton Socks - 6 Pairs"
                        stars={4}
                        count={87}
                        priceCents={2999} />
                    <Product1 Id="c2a82c5e-aff4-435f-9975-517cfaba2ece"
                     image="images/products/electric-glass-and-steel-hot-water-kettle.webp"
                        title="Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter"
                        stars={5}
                        count={846}
                        priceCents={3074} />

                </div>
                <div className="home-row">
                    <Product1 Id="a82c6bac-3067-4e68-a5ba-d827ac0be010" image="images/products/straw-sunhat.webp"
                        title="Straw Lifeguard Sun Hat"
                        stars={4}
                        count={215}
                        priceCents={2200} />

                    <Product1 Id="aad29d11-ea98-41ee-9285-b916638cac4a"
                     image="images/products/round-sunglasses-black.jpg"
                        title="Round Sunglasses"
                        stars={4}
                        count={87}
                        priceCents={1560} />


                    <Product1 Id="8b5a2ee1-6055-422a-a666-b34ba28b76d4"
                     image="images/products/men-golf-polo-t-shirt-blue.jpg"
                        title="Men's Regular-Fit Quick-Dry Golf Polo Shirt"
                        stars={4.5}
                        count={2556}
                        priceCents={1599} />


                </div>
                <div className="home-row">
                    <Product1 Id="ee1f7c56-f977-40a4-9642-12ba5072e2b0"
                     image="images/products/men-chino-pants-beige.jpg"
                        title="Men's Classic-fit Pleated Chino Pants"
                        stars={4.5}
                        count={9017}
                        priceCents={2290} />
                    <Product1 Id="1c079479-8586-494f-ab53-219325432536"
                     image="images/products/men-athletic-shoes-green.jpg"
                        title="Men's Athletic Sneaker"
                        stars={4}
                        count={229}
                        priceCents={3890} />


                </div>
                <div className="home-row">
                    <Product1 Id="4df68c27-fd59-4a6a-bbd1-e754ddb6d53c"
                     image="images/products/men-navigator-sunglasses-brown.jpg"
                        title="Men's Navigator Sunglasses Pilot"
                        stars={3.5}
                        count={42}
                        priceCents={1690} />
                    <Product1 Id="a45cfa0a-66d6-4dc7-9475-e2b01595f7d7"
                     image="images/products/women-french-terry-fleece-jogger-camo.jpg"
                        title="Women's Fleece Jogger Sweatpant"
                        stars={4.5}
                        count={248}
                        priceCents={2400} />

                    <Product1 Id="10ed8504-57db-433c-b0a3-fc71a35c88a1"
                     image="images/products/knit-athletic-sneakers-pink.webp"
                        title="Waterproof Knit Athletic Sneakers - Pink"
                        stars={4}
                        count={89}
                        priceCents={3390} />


                </div>
            </div>

        </div>
    )
}

export default Home
