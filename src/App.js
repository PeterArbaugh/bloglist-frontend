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
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
            setBlogs( sortedBlogs )
        })
    }, [blogs])

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

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload()
    }

    const createBlog = async (blogToPost, token) => {
        try {
            const blog = await blogService.postSingle(blogToPost, token)
            console.log('posted', blog)
            setMessage(`You posted ${blogToPost.title} by ${blogToPost.author}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)

            blogFormRef.current.toggleVisibility()

        } catch (error) {
            setMessage('Bad post')
            console.log('error', error)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const likeBlog = async (id, blog, token) => {
        try {
            const like = await blogService.likeSingle(id, blog, token)
            console.log('liked post', like)
            setMessage(`You liked ${blog.title}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (error) {
            setMessage('Bad post')
            console.log('error', error)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const deleteBlog = async (title, id, token) => {
        if (window.confirm(`You are about to delete ${title}. Click OK to proceed.`)) {
            try {

                const dBlog = await blogService.deleteSingle(id, token)
                console.log(dBlog)
                setMessage(`${title} was deleted.`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            } catch (error) {
                setMessage('Delete failed')
                console.log('error', error)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            }
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
                <BlogForm createBlog={createBlog} />
            </Togglable>

            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={likeBlog}
                    deleteBlog={deleteBlog}
                />
            )}
        </div>
    )
}

export default App