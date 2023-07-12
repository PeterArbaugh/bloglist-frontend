import Togglable from "./Togglable"

const Blog = ({ blog, likeBlog }) => {
  
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

  return (
  <div>
    {blog.title} {blog.author} 
    <Togglable buttonLabel='View'>
      <ul>
        <li>{blog.url}</li>
        <li>Likes: {blog.likes} <button onClick={addLike}>Like</button></li>
        <li>{blog.user[0].name}</li>
      </ul>
    </Togglable>
  </div>  
)
}

export default Blog