import React from 'react'

export default function Home() {
  return <div>
    <div skeletonx-module-id="1" style={{
      background: '#eee',
      padding: 16,
      margin: '6px 16px',
      borderRadius: 10
    }}>
      <p>
        <label>keywords</label>
        <input type="text" />
      </p>
      <p>
        <label>time</label>
        <input type="text" />
      </p>
    </div>

    <div skeletonx-module-id="2"
      style={{
        background: '#eee',
        padding: 16,
        margin: '16px 16px',
        borderRadius: 10
      }}>
      <ul>
        <li>11111111111</li>
        <li>22222222222</li>
        <li>33333333333</li>
        <li>44444444444</li>
        <li>55555555555</li>
      </ul>
    </div>
  </div>
}