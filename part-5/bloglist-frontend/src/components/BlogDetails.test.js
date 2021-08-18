import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogDetails from './BlogDetails'

describe('check content rendered', () => {
  let component
  beforeEach(() => {
    const blog = {
      author:'Tram Nguyen',
      title:'UXUI designer',
      url:'https://www.spellchecker.net/misspellings/automately',
      likes:'12'
    }
    component = render(
      <BlogDetails blog={blog}  />
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

})
