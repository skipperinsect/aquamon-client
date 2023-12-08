import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSiteBar } from '../redux/actions/temp'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { getAllDevice } from 'src/redux/actions/device'

import { CNavItem } from '@coreui/react'

const AppSidebar = () => {
  const dispatch = useDispatch()

  const devices = useSelector((state) => state.device.deviceList)

  useEffect(() => {
    dispatch(setSiteBar({ type: 'set', sidebarShow: false }))
    dispatch(getAllDevice()).then(() => {
      dispatch(setSiteBar({ type: 'set', sidebarShow: true }))
    })
  }, [dispatch])

  useEffect(() => {
    navigation[2].items = devices.map((dvc) => {
      return {
        component: CNavItem,
        name: dvc.code,
        to: `/devices/${dvc.code}`,
      }
    })
  }, [devices])

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
          <AppSidebarNav items={navigation} />
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
