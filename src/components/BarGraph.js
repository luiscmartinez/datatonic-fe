import React from 'react'
import { Bar } from 'react-chartjs-2'

const arbitraryStackKey = 'stack1'
const colors = {
  swiftCode: '#58B7E5',
  email: '#E97250',
  usBankAccountNumber: '#49A66B',
  phone: '#228FC2',
  ssn: '#6DC894',
  usPassport: '#ED8061',
  abaRouting: '#2086B6',
  dob: '#47A268',
  creditCard: '#CC502D',
}

const handleData = datasets => {
  const labels = []
  const results = {}
  for (const property in datasets) {
    labels.push(property)
    Object.keys(datasets[property]).forEach((entity, i) => {
      if (results[entity] === undefined) {
        results[entity] = {
          barThickness: 30,
          stack: arbitraryStackKey,
          label: entity,
          data: [datasets[property][entity]],
          backgroundColor: colors[entity],
        }
      } else {
        results[entity]['data'].push(datasets[property][entity])
      }
    })
  }

  return { labels, datasets: Object.keys(results).map(set => results[set]) }
}
export const BarGraph = props => {
  const { data, options } = props
  handleData(data)
  return (
    <div className='contain-bar'>
      <Bar
        data={handleData(props.data)}
        width={700}
        height={200}
        options={options}
      />
    </div>
  )
}
