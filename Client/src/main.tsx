import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import googleAuth from './components/common/google'
import store from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <GoogleOAuthProvider clientId='550849310987-7ldblcs20utp0hrsqk819p4tqp590ram.apps.googleusercontent.com'>

    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>

  </React.StrictMode>
)
