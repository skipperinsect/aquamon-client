import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CModalFooter,
  CFormLabel,
  CFormFeedback,
  CFormInput,
} from '@coreui/react'

import { updateDevice } from 'src/redux/actions/device'
import { useDispatch } from 'react-redux'

const UpdateDeviceModal = ({ visible, setVisible, code, nameDevice, reload }) => {
  const [name, setName] = useState('')
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    setName(nameDevice)
  }, [nameDevice])

  const dispatch = useDispatch()

  const handleSubmit = useCallback(
    async (event) => {
      const form = event.currentTarget
      event.preventDefault()

      if (form.checkValidity() === false) {
        event.stopPropagation()
      } else {
        try {
          await dispatch(updateDevice(code, name))
          setVisible(false)
        } catch (error) {
          setVisible(true)
        } finally {
          setValidated(true)
          reload()
        }
      }
    },
    [setValidated, setVisible, code, name, dispatch, reload],
  )

  return (
    <div>
      <CModal
        alignment="center"
        backdrop="static"
        visible={visible}
        size="lg"
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Update device</CModalTitle>
        </CModalHeader>

        <CForm
          className="needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalBody>
            <CRow className="mb-3">
              <CFormLabel htmlFor="code" className="col-sm-2 col-form-label">
                Code
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="text" id="code" required value={code} disabled />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput
                  type="text"
                  id="name"
                  required
                  value={name}
                  onInput={(event) => {
                    setName(event.target.value)
                  }}
                />
                <CFormFeedback invalid>Please write the name.</CFormFeedback>
              </div>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </div>
  )
}

UpdateDeviceModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  nameDevice: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
}

export default UpdateDeviceModal
