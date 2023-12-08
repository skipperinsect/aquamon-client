import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        Aquamon
        <span className="ms-1">&copy; 2023 Oktaryza Sativa.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
