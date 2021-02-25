import React from 'react'

import moment from 'moment'

export default function Users() {
  return <div>
    <h3>Users</h3>
    
    <p>
      {moment(new Date).format('YYYY-MM-DD HH:mm:ss')}
    </p>

    <div style={{
      width: '20vw',
      background: '#ef9901'
    }}>
      hahahah
    </div>

  </div>
}