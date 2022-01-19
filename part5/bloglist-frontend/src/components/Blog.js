import React, { useState } from 'react'
const Blog = ({blog}) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
           likes {blog.likes} <button>like</button>
         </div>
         <div>
           {blog.user.name}
         </div>
       </div>:null}
    </div>
    
  )
}
 
export default Blog