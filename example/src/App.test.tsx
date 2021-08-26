import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
/* import AppWithTheme from './AppWithTheme' */
it('renders without crashing', () => {
  const div = document.createElement('div')
	ReactDOM.render(<App />, div)
/* 	ReactDOM.render(<AppWithTheme />, div) */
  ReactDOM.unmountComponentAtNode(div)
})
