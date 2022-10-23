import React from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import moment from 'moment'

function Write() {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const state = useLocation().state

  const [value, setValue] = useState(state?.description || "") //editor
  const [title, setTitle] = useState(state?.title || "")
  const [category, setCategory] = useState(state?.category || "")
  const [file, setFile] = useState(null)


  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${BASE_URL}/upload`, formData);
      return res.data
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    const imageUrl = await upload();
    try {
      state
        ? await axios.put(`${BASE_URL}/posts/${state.id}`, {
          title,
          description: value,
          category,
          image: file ? imageUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        })
        : await axios.post(`${BASE_URL}/posts/`, {
          title,
          description: value,
          category,
          image: file ? imageUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Title' onChange={e => setTitle(e.target.value)} value={title} />
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none" }} type="file" id='file' name='file' onChange={e => setFile(e.target.files[0])} />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={category === "art"} name="cat" value="art" id="art" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "science"} name="cat" value="science" id="science" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "technology"} name="cat" value="technology" id="technology" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "cinema"} name="cat" value="cinema" id="cinema" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "design"} name="cat" value="design" id="design" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === "food"} name="cat" value="food" id="food" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write