import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from '../../components/Blog'
import localstorage from '../../utils/localstorage'
import blogService from '../../services/blogs'

const fakeLocalStorage = {
  user: {'username': 'brian', 'name': 'vule', 'id': '5eff4fc44dd7ca4e0b13ca2a'}
}

const lcGetItemSpy = jest.spyOn(localstorage, 'getItem').mockImplementation(key => fakeLocalStorage[key])

describe('blog component test', () => {
  beforeEach(() => {
    lcGetItemSpy.mockReset()
  })
  test('<Blog/> component: render content will show title but not author, url or likes', () => {
    const blog = {
      author: 'nodejs',
      id: '5eff6b3e0bc105554c1120df',
      likes: 67,
      title: 'samsung',
      url: 'https://google.com',
    }
    const fn = jest.fn()
    const component = render(<Blog blog={blog} onUpdateSuccess={fn}/>)
    expect(component.container.querySelector('.title')).toHaveTextContent('samsung')
    expect(component.container.querySelector('.blog-detail')).toHaveClass(`hide`)
    expect(fn.mock.calls.length).toBe(0)
    expect(lcGetItemSpy.mock.calls.length).toBe(1)
  })

  test('<Blog/>: render content will show title ,author, url or likes when click show button', () => {
    const blog = {
      author: 'nodejs',
      id: '5eff6b3e0bc105554c1120df',
      likes: 67,
      title: 'samsung',
      url: 'https://google.com',
    }
    const fn = jest.fn()

    const component = render(<Blog blog={blog} onUpdateSuccess={fn}/>)

    const showButton = component.container.querySelector('.show-more-btn')

    expect(component.container.querySelector('.blog-detail')).toHaveClass(`hide`)
    fireEvent.click(showButton)
    expect(component.container.querySelector('.blog-detail')).not.toHaveClass(`hide`)

    expect(fn.mock.calls.length).toBe(0)
    expect(lcGetItemSpy.mock.calls.length).toBe(1)
  })

  test('<Blog/>: ensure event handler calls twice when click like button twice', () => {
    const blog = {
      author: 'nodejs',
      id: '5eff6b3e0bc105554c1120df',
      likes: 67,
      title: 'samsung',
      url: 'https://google.com',
    }
    const fn = jest.fn()
    // const component = shallow(<Blog blog={blog} onUpdateSuccess={fn}/>);

    // const likeHandler = jest.spyOn(component, 'handleLike')
    const likeApiSpy = jest.spyOn(blogService, 'likeById')

    const component = render(<Blog blog={blog} onUpdateSuccess={fn}/>)

    const likeButton = component.container.querySelector('.like-btn')

    expect(likeApiSpy.mock.calls.length).toBe(0)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeApiSpy.mock.calls.length).toBe(2)

    expect(fn.mock.calls.length).toBe(0)
    expect(lcGetItemSpy.mock.calls.length).toBe(1)
  })

})
