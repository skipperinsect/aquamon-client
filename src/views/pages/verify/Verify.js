import React, { useCallback, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
  CSpinner,
  CModal,
  CModalBody,
  CImage,
} from '@coreui/react'

import tokenImage from '../../../assets/images/tokensuccess.png'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { VerifEmail } from 'src/redux/actions/auth'
import 'react-toastify/dist/ReactToastify.css'

const Verify = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { token } = useParams()

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleVerify = useCallback(async () => {
    setLoading(true)
    dispatch(VerifEmail(token))
      .then(() => {
        setVisible(true)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error during verify:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch, token])

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
                  <h1 className="text-center">Verify your email</h1>
                  <p className="text-body-secondary text-center">
                    Thank you for signing up with Aquamon. To complete your registration, please
                    click the button below to verify your email:
                  </p>
                  <div className="d-grid">
                    <CButton color="primary" className="px-4" onClick={() => handleVerify()}>
                      {loading ? <CSpinner color="danger" size="sm" /> : 'Verify Email'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <CModal
        visible={visible}
        alignment="center"
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalBody>
          <div className="clearfix">
            <CImage align="center" rounded src={tokenImage} width={200} height={200} />
          </div>
          <p className="text-body-secondary text-center m-3 ft-20">
            Verify Success, please login first!
          </p>
          <CRow className="justify-content-center mt-2">
            <CCol md={5} lg={4} xl={4} align="center">
              <CButton color="primary" onClick={() => goToLogin()}>
                Go to Login
              </CButton>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default Verify
