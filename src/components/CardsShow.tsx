import React from 'react'
import Button from './ui/Button'
import styles from './CardsShow.module.css'




const Data=[ 
    {
      "id": 1,
      "title": "Wireless Bluetooth Headphones dfgdfgdfdfgdf ge",
      "price": 1999,
      "discountPrice": 1499,
      "category": "Electronics",
      "brand": "Sony",
      "rating": 4.5,
      "stock": 25,
      "thumbnail": "/2img.jpg",
      "images": [
        "https://images.unsplash.com/photo-1518444028785-8fb0d3e0d3cf",
        "https://images.unsplash.com/photo-1580894908361-967195033215"
      ],
      "description": "Samsung Galaxy M56 5G Mobile (Light Green,8GB RAM,128GB Storage)| Segment's Slimmest|Gorilla Glass Victus+| 10 Bit HDR Video| 50MP Camera| AI | Vapour Cooling Chamber| Lag-free Gaming| Without Charger"
    },
    {
      "id": 2,
      "title": "Smart Watch Series 7",
      "price": 12999,
      "discountPrice": 10999,
      "category": "Electronics",
      "brand": "Apple",
      "rating": 4.7,
      "stock": 15,
      "thumbnail": "/5img.jpg",
      "images": [
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        "https://images.unsplash.com/photo-1511732351157-1865efcb7b7b"
      ],
      "description": "Track your fitness, notifications, and health with this premium smartwatch."
    },
    {
      "id": 3,
      "title": "Men's Casual T-Shirt",
      "price": 799,
      "discountPrice": 499,
      "category": "Fashion",
      "brand": "H&M",
      "rating": 4.2,
      "stock": 50,
      "thumbnail": "/4img.jpg",
      "images": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"
      ],
      "description": "Comfortable cotton t-shirt perfect for daily weadescriptionComfortable cotton t-shirt perfect for daily wear..descriptionComfortable cotton t-shirt perfect for daily wear"
    },
    {
      "id": 4,
      "title": "Women's Handbag",
      "price": 2499,
      "discountPrice": 1799,
      "category": "Fashion",
      "brand": "Zara",
      "rating": 4.6,
      "stock": 20,
      "thumbnail": "/3img.jpg",
      "images": [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        "https://images.unsplash.com/photo-1593032465175-481ac7f401a0"
      ],
      "description": "Stylish handbag for all occasions with premium finish."
    },
    {
      "id": 5,
      "title": "Gaming Laptop",
      "price": 85000,
      "discountPrice": 79999,
      "category": "Electronics",
      "brand": "Dell",
      "rating": 4.8,
      "stock": 10,
      "thumbnail": "/img1.jpg",
      "images": [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
      ],
      "description": "Powerful."
    }
  
  ]


const CardsShow = () => {



  return (
  <div>
  <h1 className={styles.heading}>Product Cards</h1>

  <div className={styles.container}>
    {Data.map((product) => (
      <div key={product.id} className={styles.card}>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h3 className={styles.title}>{product.title}</h3>

          <div className={styles.innerFlex}>
            
            {/* Description */}
            <div className={styles.descriptionBox}>
              <p className={styles.description}>
                {product.description}
              </p>
            </div>

            {/* Bottom Section */}
            <div className={styles.bottomSection}>
              <p>Rating: {product.rating}</p>

              <div
                className={styles.Stars}
                style={
                  {
                    "--rating": product.rating,
                    "--star-size": "2rem",
                    "--star-background": "#ffd700",
                    "--star-color": "#ddd",
                  } as React.CSSProperties
                }
              ></div>

              <p>Brand: {product.brand}</p>

              <p className={styles.price}>
                Discount Price: ${product.discountPrice}
                <span className={styles.oldPrice}>
                  ${product.price}
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* Button */}
        <Button type="button" variant="filled" className={styles.button}>
          Buy: ${product.price}
        </Button>

      </div>
    ))}
  </div>
</div>
  )
}

export default CardsShow