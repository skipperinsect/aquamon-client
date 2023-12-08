import React, { useCallback, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CBadge,
} from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllLogDatas } from 'src/redux/actions/device'

const formatDate = (dateString) => {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  return new Date(dateString).toLocaleString('en-US', options)
}

const Devices = () => {
  const dispatch = useDispatch()

  const { code } = useParams()
  const devices = useSelector((state) => state.device.logDatas)

  useEffect(() => {
    dispatch(getAllLogDatas(code, { page: 1, pageSize: 10 }))
  }, [code, dispatch])

  const getLogs = useCallback(
    (page) => {
      dispatch(getAllLogDatas(code, { page, pageSize: 10 }))
    },
    [dispatch, code],
  )

  const maxVisiblePages = 3

  const renderPaginationItems = (totalPages, currentPage) => {
    const items = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= maxVisiblePages ||
        i > totalPages - maxVisiblePages ||
        Math.abs(currentPage - i) < maxVisiblePages / 2
      ) {
        items.push(
          <CPaginationItem key={i} active={parseInt(currentPage) === i} onClick={() => getLogs(i)}>
            {i}
          </CPaginationItem>,
        )
      } else if (items[items.length - 1] !== '...') {
        items.push('...')
      }
    }

    return items
  }

  return (
    <>
      {devices && (
        <CCard className="mb-4" key={devices.content.code}>
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  {devices.content.name}
                </h4>
                <div className="small text-body-secondary">{devices.content.code}</div>
              </CCol>
            </CRow>
            <br />
            {devices.content.LogDatas.length >= 1 && (
              <>
                <CRow>
                  <CCol xs={12} md={6} xl={6}>
                    <CRow>
                      <CCol xs={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3">
                          <div className="text-body-secondary text-truncate small">
                            Total dissolved solids
                          </div>
                          <div className="fs-5 fw-semibold">
                            {devices.status ? devices.status.tds : 'NULL'}
                          </div>
                        </div>
                      </CCol>
                      <CCol xs={6}>
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="text-body-secondary text-truncate small">Temperature</div>
                          <div className="fs-5 fw-semibold">
                            {devices.status ? devices.status.temp : 'NULL'}
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
                            {devices.status
                              ? devices.status.status === 1
                                ? 'Good'
                                : 'Bad'
                              : 'NULL'}
                          </div>
                        </div>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <br />
              </>
            )}
            <CRow>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">No</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      TDS
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Temperature
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Status
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {devices.content.LogDatas.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{(devices.page - 1) * 10 + index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{formatDate(item.createdAt)}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.tds}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.temp}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>
                          {item.status === 1 ? (
                            <CBadge className="px-4 py-2" color="success">
                              Good
                            </CBadge>
                          ) : (
                            <CBadge className="px-4 py-2" color="danger">
                              Bad
                            </CBadge>
                          )}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CRow className="mt-3">
                <CPagination aria-label="Page navigation example" align="end">
                  <CPaginationItem
                    disabled={parseInt(devices.page) === 1}
                    onClick={() => getLogs(parseInt(devices.page) - 1)}
                  >
                    Previous
                  </CPaginationItem>
                  {renderPaginationItems(devices.totalPages, devices.page)}
                  <CPaginationItem
                    disabled={parseInt(devices.page) === devices.totalPages}
                    onClick={() => getLogs(parseInt(devices.page) + 1)}
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              </CRow>
            </CRow>
          </CCardBody>
        </CCard>
      )}
    </>
  )
}

export default Devices
