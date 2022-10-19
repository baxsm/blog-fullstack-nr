import React from 'react'
import { Link } from 'react-router-dom'
import Menu from '../Components/Menu'

function Single() {
  return (
    <div className="single">
      <div className="content">
        <img src="https://images.pexels.com/photos/5925951/pexels-photo-5925951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className="user">
          <img src="https://images.pexels.com/photos/5925951/pexels-photo-5925951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src="https://cdn4.iconfinder.com/data/icons/eon-ecommerce-i-1/32/review_notes_pencil_pen-512.png" alt="" />
            </Link>
            <img src="https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Trash-512.png" alt="" />
          </div>
        </div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae amet consequatur esse culpa. Rerum sunt quasi animi quibusdam, libero similique delectus? Commodi perferendis ipsa beatae itaque, quas iusto minus!<br></br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae amet consequatur esse culpa. Rerum sunt quasi animi quibusdam, libero similique delectus? Commodi perferendis ipsa beatae itaque, quas iusto minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae amet consequatur esse culpa. Rerum sunt quasi animi quibusdam, libero similique delectus? Commodi perferendis ipsa beatae itaque, quas iusto minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae amet consequatur esse culpa. Rerum sunt quasi animi quibusdam, libero similique delectus? Commodi perferendis ipsa beatae itaque, quas iusto minus!<br></br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae amet consequatur esse culpa. Rerum sunt quasi animi quibusdam, libero similique delectus? Commodi perferendis ipsa beatae itaque, quas iusto minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quae amet consequatur esse culpa. Rerum sunt quasi animi quibusdam, libero similique delectus? Commodi perferendis ipsa beatae itaque, quas iusto minus!
        </p>
      </div>
      <Menu />
    </div>
  )
}

export default Single