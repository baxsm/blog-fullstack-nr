import React from 'react'
import { Link } from 'react-router-dom'
import { postData } from '../Components/postData'

function Home() {

  return (
    <div className="home">
      <div className="posts">
        {
          postData.map(post => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.imageSrc} alt="" />
              </div>
              <div className="content">
                <Link className='link' to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                  <p>{post.description}</p>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home