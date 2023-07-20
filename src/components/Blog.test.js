import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
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