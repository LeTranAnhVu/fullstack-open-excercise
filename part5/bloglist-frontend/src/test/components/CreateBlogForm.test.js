import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import CreateBlogForm from '../../components/CreateBlogForm'
import blogService from '../../services/blogs'
//
// const fakeLocalStorage = {
//   user: {'username': 'brian', 'name': 'vule', 'id': '5eff4fc44dd7ca4e0b13ca2a'}
// }

// const lcGetItemSpy = jest.spyOn(localstorage, 'getItem').mockImplementation(key => fakeLocalStorage[key])


describe('create blog form component test', () => {
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState])
  beforeEach(() => {

  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('<CreateBlogForm/>: ensure field will update when add value in field', () => {
    const onSuccessMock = jest.fn()

    const component = render(<CreateBlogForm onCreateSuccess={onSuccessMock}/>)

    const titleInput = component.container.querySelector('input[name=title]')
    const urlInput = component.container.querySelector('input[name=url]')
    const authorInput = component.container.querySelector('input[name=author]')

    expect(setState).not.toBeCalled();

    fireEvent.change(titleInput, {
      target: { value: 'add title' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'add url' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'add author' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'change author' }
    })
    expect(setState).toBeCalledTimes(4);
  })

})
