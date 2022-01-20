import React, { useState } from 'react'
const Blog = ({ blog, user, like, remove }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeButtonStyle = {
    'backgroundColor': 'blue',
    color: 'white',
    'borderRadius': '4px'
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide':'show'}</button>
      {showAll ?
        <div>
          <div>
            {blog.url}
          </div>
          <div>
           likes {blog.likes} <button onClick={() => like(blog)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {blog.user.username === user.username ? <button style={removeButtonStyle} onClick={() => remove(blog)}>remove</button>: null}
        </div>:null}
    </div>

  )
}

export default Blog