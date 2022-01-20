import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Test <Blog />', () => {
  const blog = {
    title: 'A cool test blog',
    author: 'Tester Testington',
    url: 'www.testingtesting.com',
    likes: 0,
    user: {
      username:'test',
      name:'Testing User'
    }
  }
  const user = {
    name: 'Testing User',
    username: 'test',
    token: 'abcd1234'
  }
  test('renders content', () => {
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
  test('renders all info after pressing the show button', () => {
    const component = render(
      <Blog blog={blog} user={user}/>
    )
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })
})