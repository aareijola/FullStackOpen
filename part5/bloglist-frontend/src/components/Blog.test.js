import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Test <Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'A cool test blog',
      author: 'Tester Testington',
      url: 'www.testingtesting.com',
      likes: 0,
      user: 'abcd'
    }
    const component = render(
      <Blog blog={blog}/>
    )
    expect(component.container).toHaveTextContent(
      blog.title
    )
    expect(component.container).toHaveTextContent(
      blog.author
    )
    expect(component.container).not.toHaveTextContent(
      blog.url
    )
    expect(component.container).not.toHaveTextContent(
      blog.likes
    )
  })
})