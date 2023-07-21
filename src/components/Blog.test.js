import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import * as userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blog = {
        title: 'Blog title for test',
        user: '649a2020f0c7f5299853f508',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
        author: 'Author for test'
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText('Blog title for test')
    expect(title).toBeDefined()
    const author = screen.getByText('Author for test')
    expect(author).toBeDefined()
})

describe('togglable content', () => {
    // eslint-disable-next-line no-unused-vars
    let container

    const blog = {
        title: 'Blog title for test',
        user: '649a2020f0c7f5299853f508',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
        author: 'Author for test'
    }

    beforeEach(() => {
        container = render(<Blog blog={blog} />)
    })

    test('no children at start', () => {
        const div = document.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('children display on click', async () => {
        const user = userEvent.default.setup()
        const button = screen.getByText('View')
        await user.click(button)

        const url = screen.getByText('https://reactpatterns.com/')
        expect(url).toBeDefined()
        const likes = screen.getByText('Likes: 7')
        expect(likes).toBeDefined()
    })
})

test('2 clicks on like button', async () => {

    const userObject = {
        token: 'mock-token',
        username: 'jest-test-user',
        name: 'jest name'
    }

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userObject))

    const blog = {
        title: 'Blog title for test',
        user: '649a2020f0c7f5299853f508',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
        author: 'Author for test'
    }

    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()

    render(
        <Blog
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
        />
    )

    const user = userEvent.default.setup()
    const toggleButton = screen.getByText('View')
    await user.click(toggleButton)

    const likeButton = screen.getByText('Like')
    await user.dblClick(likeButton)

    expect(likeBlog).toHaveBeenCalledTimes(2)
})

test('Fill and submit new blog form', async () => {
    const createBlog = jest.fn()
    const user = userEvent.default.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const button = screen.getByText('Create')

    await user.type(titleInput, 'test blog title')
    await user.type(authorInput, 'test author input')
    await user.type(urlInput, 'test url input')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toEqual('test blog title')
})