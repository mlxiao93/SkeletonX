import React from 'react'

import moment from 'moment'

export default function Users() {
  return <div>
    Users

    <p>
      {moment(new Date).format('YYYY-MM-DD HH:mm:ss')}
    </p>
  </div>
}