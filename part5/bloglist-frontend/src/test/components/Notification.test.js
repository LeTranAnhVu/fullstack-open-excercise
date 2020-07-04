import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Notification from '../../components/Notification'

test('render content', () => {
  const noti = {message: 'this is test message', type: 'error'}
  const component = render(<Notification message={noti.message} type={noti.type}/>)
  expect(component.container).toHaveTextContent('this is test message')
})