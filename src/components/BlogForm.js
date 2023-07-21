import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogToPost = {
            title: title,
            author: author,
            url: url
        }

        console.log('posting', blogToPost)

        const token = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token
        console.log('token', token)

        createBlog(blogToPost, token)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                <label htmlFor='title'>title</label>
                <input
                    id='title'
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label htmlFor='author'>author</label>
                <input
                    id='author'
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label htmlFor='url'>url</label>
                <input
                    id='url'
                    type="text"
                    value={url}
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type='submit'>Create</button>
        </form>
    )
}

export default BlogForm