const express = require('express')
const app = express()
const port = 9000

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
