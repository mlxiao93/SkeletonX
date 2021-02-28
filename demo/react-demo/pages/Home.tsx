import React, { useEffect, useState } from 'react'
import SkeletonContainer from '../components/SkeletonContainer';

export default function Home() {

  const [formData, setFormData] = useState<any>();

  const [tableData, setTableData] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      setFormData({});
    }, 1000)
    setTimeout(() => {
      setTableData({});
    }, 2000)
  }, []);

  return <div>
    <SkeletonContainer
      showSkeleton={!formData}
      moduleId="1"
      style={{
      background: '#eee',
      padding: 16,
      margin: '6px 16px',
      borderRadius: 10,
      width: '220px'
    }}>
      <p>
        <label>keywords</label>
        <input type="text" />
      </p>
      <p>
        <label>time</label>
        <input type="text" />
      </p>
    </SkeletonContainer>

    <SkeletonContainer  
      showSkeleton={!tableData} 
      moduleId="2"
      style={{
        background: '#eee',
        padding: 16,
        margin: '16px 16px',
        borderRadius: 10,
      }}>
      <div>
        <p>11111111111</p>
        <p>22222222222</p>
        <p>33333333333</p>
        <p>44444444444</p>
        <p>55555555555</p>
      </div>
    </SkeletonContainer>
  </div>
}