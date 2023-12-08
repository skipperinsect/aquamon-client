import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Log Data',
  },
  {
    component: CNavGroup,
    name: 'Devices',
    to: '/devices',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [],
  },
]

export default _nav
