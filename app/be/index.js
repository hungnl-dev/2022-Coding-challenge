const express = require('express')
const app = express()
const port = 9000

const officerList = []
const incidentList = []

// rabbitmq
var amqp = require('amqplib/callback_api')

const RABBIT_MQ_HOST = "amqp://localhost:5672"
const QUEUE_NAME="events"

amqp.connect(RABBIT_MQ_HOST, function(error0, connection) {
    console.log("AOH7","Set up Rabbitmq connection...")
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        //var queue = 'hello';

        channel.assertQueue(QUEUE_NAME, {
        durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE_NAME);
        channel.consume(QUEUE_NAME, function(msg) {

                console.log(" [x] Received %s", msg.content.toString());

            }, {
            noAck: true
        })
    })

})

//endpoint
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
  res.status(200).json(responseData)
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