import React, { useState, useEffect } from 'react'
import axios from 'api'
import { Notifications } from './Notifications'
import { BarGraph } from './BarGraph'
import { Graphs } from './Graphs'
import { GraphCard } from './GraphCard'
import { handleOptions2 } from 'graphHelpers'
import { Overview } from './Overview'

export const Dashboard = () => {
  const [dataTonicJSON, setDataTonic] = useState(null)
  useEffect(() => {
    axios
      .get('/')
      .then(res => {
        if (typeof res.data !== "object") {
          setDataTonic('whoops')
          return
        }
        setDataTonic(res.data)
      })
      .catch(err => setDataTonic('whoops'))
  }, [])

  if (dataTonicJSON === null) {
    return <div>LOADING</div>
  }
  if (dataTonicJSON === 'whoops') {
    return <div>{'WHOOPS SOMETHING WENT WRONG 😷'}</div>
  }
  return (
    <div className='dashboard'>
      <Overview overview={dataTonicJSON.overview} />
      <div className='secondRow'>
        <GraphCard
          title='Sensitive Info By Catagory'
          filteredBy='Count of Data Sources'
          subInfo='(Sensitive Info Type)'
          classes='dashboardCard-extend'
          graph={
            <BarGraph
              data={dataTonicJSON.graphs.sensitiveDataDistributionByDataSource}
              title='Sensitive Data Distribution by Data Sources'
              options={handleOptions2('Total Info Type')}
            />
          }
        />
        <Notifications notifications={dataTonicJSON.notifications} />
      </div>
      <Graphs />
    </div>
  )
}
