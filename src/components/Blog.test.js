import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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