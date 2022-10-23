import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../Components/Menu'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from "moment"
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

function Single() {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [post, setPost] = useState([])

  const location = useLocation()

  const postId = location.pathname.split("/")[2];

  const navigate  = useNavigate();

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts/${postId}`);
        setPost(res.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`);
      navigate("/")
    }
    catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.image} alt="" />
        <div className="user">
          <img src={post?.userImage} alt="" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {
            currentUser?.username === post.username ?
              (
                <div className="edit">
                  <Link to={`/write?edit=2`} state={post}>
                    <img src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/review_notes_pencil_pen-512.png" alt="" />
                  </Link>
                  <img onClick={handleDelete} src="https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Trash-512.png" alt="" />
                </div>
              ) : (<></>)
          }
        </div>
        <h1>
          {post.title}
        </h1>
        { getText(post.description) }
      </div>
      <Menu category={post.category}/>
    </div>
  )
}

export default Single