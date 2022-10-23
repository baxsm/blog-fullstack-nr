import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { postData } from '../Components/postData'
import axios from "axios"

function Home() {

  const [posts, setPosts] = useState([])

  const category = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${category}`);
        setPosts(res.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [category])

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
        {
          posts.map(post => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`./uploads/${post.image}`} alt="" />
              </div>
              <div className="content">
                <Link className='link' to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                  <p>{getText(post.description)}</p>
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