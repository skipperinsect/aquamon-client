import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { logout } from 'src/redux/actions/auth'

const DefaultLayout = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login')
    }
  }, [auth, navigate])

  useEffect(() => {
    if (!auth.user) {
      return navigate('/login')
    }

    if (new Date(Date.now()) > auth.user.expiresIn) {
      dispatch(logout())
    }
  }, [dispatch, auth, navigate])

  return (
    <div>
      <ToastContainer />
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
