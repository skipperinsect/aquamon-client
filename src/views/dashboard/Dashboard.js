import React, { useCallback, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilOptions } from '@coreui/icons'

import { useDispatch, useSelector } from 'react-redux'
import {
  createDevice,
  getAllDeviceWithStatus,
  getAllDevice,
  deleteDevice,
} from 'src/redux/actions/device'
import DeleteDeviceModal from 'src/components/Devices/DeleteDeviceModal'
import UpdateDeviceModal from 'src/components/Devices/UpdateDeviceModal'

const Dashboard = () => {
  const dispatch = useDispatch()

  const [code, setCode] = useState('')
  const [name, setName] = useState('')

  const devices = useSelector((state) => state.device.deviceStatus)
  const auth = useSelector((state) => state.auth)

  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)

  useEffect(() => {
    dispatch(getAllDeviceWithStatus())
  }, [dispatch])

  const deleteDevices = useCallback(() => {
    dispatch(deleteDevice(code)).then(async (response) => {
      await dispatch(getAllDevice())
      await dispatch(getAllDeviceWithStatus())
      closeModal()
      window.location.reload()
    })
  }, [code, dispatch])

  const handleSubmit = useCallback(
    async (event) => {
      const form = event.currentTarget
      event.preventDefault()

      if (form.checkValidity() === false) {
        event.stopPropagation()
      } else {
        try {
          await dispatch(createDevice({ code, name }))
          setVisible(false)
          setCode('')
          setName('')
          await dispatch(getAllDevice())
          await dispatch(getAllDeviceWithStatus())
          window.location.reload()
        } catch (error) {
          setVisible(true)
        } finally {
          setValidated(true)
        }
      }
    },
    [setValidated, setVisible, code, name, dispatch],
  )

  const closeModal = useCallback(() => {
    setVisible(false)
    setVisibleDelete(false)
    setVisibleUpdate(false)
    setCode('')
    setName('')
  }, [setVisible, setVisibleDelete, setVisibleUpdate, setCode, setName])

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }

  return (
    <>
      <CRow className="mb-4">
        {auth.role === 1 && (
          <CCol sm={6} md={4} xl={3}>
            <CButton
              color="primary"
              className="px-3"
              onClick={() => {
                setVisible(true)
              }}
            >
              <CIcon icon={cilPlus} className="mr-2" /> Create New Device
            </CButton>
          </CCol>
        )}
      </CRow>
      {devices.map((dvc) => {
        return (
          <CCard className="mb-4" key={dvc.code}>
            <CCardBody>
              <CRow>
                <CCol xs={11} md={11} xl={11}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/devices/${dvc.code}`} style={linkStyle}>
                      <h4 id="traffic" className="card-title mb-0">
                        {dvc.name}
                      </h4>
                      <div className="small text-body-secondary">{dvc.code}</div>
                    </Link>
                    <Link to={`/devices/${dvc.code}`} style={{ marginLeft: '20px' }}>
                      <CButton color="primary" className="ml-2">
                        Go to Device
                      </CButton>
                    </Link>
                  </div>
                </CCol>
                {auth.role === 1 && (
                  <CCol xs={1} md={1} xl={1} className="d-md-block">
                    <CDropdown alignment="end" className="float-end">
                      <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                        <CIcon icon={cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          onClick={() => {
                            setVisibleUpdate(true)
                            setCode(dvc.code)
                            setName(dvc.name)
                          }}
                        >
                          Edit
                        </CDropdownItem>
                        <CDropdownItem
                          onClick={() => {
                            setVisibleDelete(true)
                            setCode(dvc.code)
                          }}
                        >
                          Delete
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                )}
              </CRow>
              <br />
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">
                          Total dissolved solids
                        </div>
                        <div className="fs-5 fw-semibold">
                          {dvc.status ? dvc.status.tds : 'No Data'}
                        </div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Temperature</div>
                        <div className="fs-5 fw-semibold">
                          {dvc.status ? dvc.status.temp : 'No Data'}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Status</div>
                        <div className="fs-5 fw-semibold">
                          {dvc.status ? (dvc.status.status === 1 ? 'Good' : 'Bad') : 'No Data'}
                        </div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Feeding Status
                        </div>
                        <div className="fs-5 fw-semibold">
                          {dvc.status ? (dvc.status.feeding ? 'Already' : 'Not Yet') : 'No Data'}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        )
      })}

      <DeleteDeviceModal
        visible={visibleDelete}
        setVisible={closeModal}
        deleteDevice={deleteDevices}
      ></DeleteDeviceModal>
      <UpdateDeviceModal
        visible={visibleUpdate}
        setVisible={closeModal}
        code={code}
        nameDevice={name}
        reload={() => {
          dispatch(getAllDeviceWithStatus())
        }}
      ></UpdateDeviceModal>

      <CModal
        alignment="center"
        backdrop="static"
        visible={visible}
        size="lg"
        onClose={() => closeModal()}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Add new device</CModalTitle>
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
                <CFormInput
                  type="text"
                  id="code"
                  required
                  value={code}
                  onInput={(event) => {
                    setCode(event.target.value)
                  }}
                />
                <CFormFeedback invalid>Please write the code.</CFormFeedback>
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
            <CButton color="secondary" onClick={() => closeModal()}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default Dashboard
