import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSiteBar } from '../redux/actions/temp'
import { CNav, CNavItem, CNavGroup, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { NavLink } from 'react-router-dom'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { getAllDevice } from 'src/redux/actions/device'

const AppSidebar = () => {
  const dispatch = useDispatch()

  const devices = useSelector((state) => state.device.deviceList)

  useEffect(() => {
    dispatch(getAllDevice()).then(() => {})
  }, [dispatch])

  const unfoldable = useSelector((state) => state.temp.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.temp.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom justify-content-center">
        <CSidebarBrand to="/" className="justify-content-center">
          <h4 className="text-center">Aquamon</h4>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none test"
          dark
          onClick={() => dispatch(setSiteBar({ type: 'set', sidebarShow: false }))}
        />
      </CSidebarHeader>

      <CSidebarNav>
        <SimpleBar>
          <CNav>
            <CNavItem className="w-100 p-0px" to={'/dashboard'}>
              <NavLink to="/dashboard" className="nav-link">
                <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
                <span>Dashboard</span>
              </NavLink>
            </CNavItem>

            <CNavTitle className="w-100">Log Data</CNavTitle>
            <CNavGroup
              className="w-100"
              toggler={
                <>
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Devices
                </>
              }
            >
              {devices.map((dvc) => {
                return (
                  <CNavItem className="w-100 p-0px" key={dvc.code}>
                    <NavLink to={`/devices/${dvc.code}`} className="nav-link">
                      <span className="nav-icon">
                        <span className="nav-icon-bullet"></span>
                      </span>{' '}
                      {dvc.code}
                    </NavLink>
                  </CNavItem>
                )
              })}
            </CNavGroup>
          </CNav>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch(setSiteBar({ type: 'set', sidebarUnfoldable: !unfoldable }))}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
