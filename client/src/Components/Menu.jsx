import React from 'react'
import { postData } from './postData'

function Menu() {
  return (
    <div className="menu">
        <h1>Other posts you may like</h1>
        {
            postData.map(post => (
                <div className="post" key={post.id}>
                    <img src={post.imageSrc} alt="" />
                    <h2>{post.title}</h2>
                    <button>Read More</button>
                </div>
            ))
        }
    </div>
  )
}

export default Menu