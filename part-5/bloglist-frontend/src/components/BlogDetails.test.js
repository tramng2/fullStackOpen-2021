import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogDetails from './BlogDetails'

describe('check content rendered', () => {
  let component
  const mockLikeHandler = jest.fn()

  beforeEach(() => {
    const user = {
      name: 'Test User',
      username: 'testUsername',
    }
    const blog = {
      author:'Tram Nguyen',
      title:'UXUI designer',
      url:'https://www.spellchecker.net/misspellings/automately',
      likes:'12',
      user: {
        username: 'testUsername',
      }
    }
    component = render(
      <BlogDetails blog={blog} user={user} handleAddLikes={mockLikeHandler} />
    )
  })
  test('renders authors and title', () => {
    const blogInfo = component.container.querySelector('.blogInfo')
    expect(blogInfo).toHaveTextContent('UXUI designer Tram Nguyen')
  })
  test('url and likes are invisible', () => {
    const blogInfoExpand = component.container.querySelector('.blogInfoExpand')
    expect(blogInfoExpand).toHaveStyle('display: none')
  })
  test('url and likes are shown', () => {
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
    const div = component.container.querySelector('.blogInfoExpand')
    expect(div).not.toHaveStyle('display: none')
  })
  test('press likes twice, props called twice', () => {
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
    const buttonLike= component.getByText('like')

    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
