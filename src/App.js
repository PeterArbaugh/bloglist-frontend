import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

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
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
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
      setMessage(`You posted ${title} by ${author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      setMessage('Bad post')
      console.log('error', error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }    
  }

  if (user === null) {
    return (
      <div>
        <h1>Blog app</h1>
        <Notification message={message} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={message} />

      <p><strong>{user.name}</strong> is logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel='Add a blog' ref={blogFormRef}>
        <BlogForm 
            onSubmit={handleBlogSubmit} 
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            titleValue={title}
            authorValue={author}
            urlValue={url}
          />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App