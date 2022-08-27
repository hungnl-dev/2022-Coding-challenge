const express = require('express')
const app = express()
const port = 9000

const officerList = []
const incidentList = []

app.get('/api/v1/state', (req, res) => {
  const responseData = {
    data: {
      incidents: [
        {
          id: 1,
          codeName: "Incident A",
          loc: {
            x: 18,
            y: 8
          },
          officerId: 1
        }
      ],
      officers: [
        {
          id: 1,
          badgeName: "Minh 1",
          loc: {
            x: 50,
            y: 35
          }
        },
        {
          id: 2,
          badgeName: "Minh 2",
          loc: {
            x: 10,
            y: 20
          }
        }
      ]
    },
    error: null
  }
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function calculateDistance(point1, point2) {
  return Math.sqrt(((point2.x - point1.x) ** 2) + ((point2.y - point1.y) ** 2))
}

function officerActive(officer) {
  officerList.push(officer)
}

function officerDeactive(officer) {
  officerList.splice(officerList.find(officer), 1)
}

function incidentResolved(incident) {

}