import React, { useCallback, useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { register } from 'src/redux/actions/auth'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate('/')
    }
  }, [auth, navigate])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')

  const [loading, setLoading] = useState(false)

  const handleRegister = useCallback(async () => {
    setLoading(true)
    dispatch(register(name, email, password, repassword))
      .then(() => {
        setLoading(false)

        setName('')
        setEmail('')
        setPassword('')
        setRePassword('')
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error during login:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch, name, email, password, repassword])

  const goToLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={repassword}
                      onChange={(event) => setRePassword(event.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton
                      color="primary"
                      className="px-4"
                      onClick={() => {
                        handleRegister()
                      }}
                    >
                      {loading ? <CSpinner color="danger" size="sm" /> : 'Create Account'}
                    </CButton>
                    <CButton
                      color="secondary"
                      className="px-4 mt-3"
                      onClick={() => {
                        goToLogin()
                      }}
                    >
                      back to Login
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
