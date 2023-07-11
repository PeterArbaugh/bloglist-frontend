import Togglable from "./Togglable"

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author} 
    <Togglable buttonLabel='View'>
      <ul>
        <li>{blog.url}</li>
        <li>Likes: {blog.likes}</li>
        <li>{blog.user[0].name}</li>
      </ul>
    </Togglable>
  </div>  
)

export default Blog