import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logged in as', user)

    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    
    const blogToPost = {
      title: title,
      author: author,
      url: url
    }

    console.log('posting', blogToPost);

    const token = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token
    console.log('token', token)

    try {
      const blog = await blogService.postSingle(blogToPost, token)
      console.log('posted', blog)

    } catch (error) {
      setErrorMessage('Bad post')
      console.log('error', error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    
  }

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
      <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
      </div>
      <div>
        password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
      </div>
      <button type='submit'>Login</button>
    </form>
      </div>
      
    )
  }

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={errorMessage} />

      <p><strong>{user.name}</strong> is logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleBlogSubmit}>
      <div>
        title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            />
      </div>
      <div>
        author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            />
      </div>
      <div>
        url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
      </div>
      <button type='submit'>Create</button>
    </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App