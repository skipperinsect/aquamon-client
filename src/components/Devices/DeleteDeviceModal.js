import React from 'react'
import PropTypes from 'prop-types'
import { CButton, CCol, CRow, CModal, CModalBody, CImage } from '@coreui/react'

import deleteIcon from '../../assets/images/ic-delete-event.svg'

const DeleteDeviceModal = ({ visible, setVisible, deleteDevice }) => {
  return (
    <div>
      <CModal
        visible={visible}
        alignment="center"
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalBody>
          <div className="clearfix">
            <CImage align="center" rounded src={deleteIcon} width={200} height={200} />
          </div>
          <p className="text-body-secondary text-center m-3 ft-20">
            Are you sure to delete this device?
          </p>
          <CRow className="justify-content-center mt-2">
            <CCol md={6} lg={6} xl={6} sm={6} xs={6} align="center" className="px-1">
              <CButton
                color="primary"
                variant="outline"
                className="w-100"
                onClick={() => setVisible(false)}
              >
                Back
              </CButton>
            </CCol>
            <CCol md={6} lg={6} xl={6} sm={6} xs={6} align="center" className="px-1">
              <CButton color="primary" className="w-100" onClick={() => deleteDevice()}>
                Yes, Delete
              </CButton>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  )
}

DeleteDeviceModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
}

export default DeleteDeviceModal
