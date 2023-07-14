import Togglable from "./Togglable"

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  
  const addLike = () => {
    const blogToLike = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes += 1
    }

    const token = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token

    likeBlog(blog.id, blogToLike, token)
  }

  const removeBlog = () => {
    const token = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token
    deleteBlog( blog.title, blog.id, token)
  }

  return (
  <div>
    {blog.title} {blog.author} 
    <Togglable buttonLabel='View'>
      <ul>
        <li>{blog.url}</li>
        <li>Likes: {blog.likes} <button onClick={addLike}>Like</button></li>
        <li>{blog.user[0].name}</li>
      </ul>
      <button onClick={removeBlog}>Remove</button>
    </Togglable>
  </div>  
)
}

export default Blog