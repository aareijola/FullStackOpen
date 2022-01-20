import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './BlogForm'

describe('test <NewBlogForm/>', () => {
  test('submitting form calls callbackfn with correct data', () => {
    const createBlog = jest.fn()
    const component = render(
      <NewBlogForm createBlog={createBlog}/>
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'This is a test title for the test blog' }
    })
    fireEvent.change(author, {
      target: { value: 'Test author' }
    })
    fireEvent.change(url, {
      target: { value: 'testUrl' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('This is a test title for the test blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Test author')
    expect(createBlog.mock.calls[0][0].url).toBe('testUrl')
  })
})