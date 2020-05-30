import React from 'react'
import { hot } from 'react-hot-loader/root'

import { Header } from 'components'

const App: React.FC = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default hot(App)
