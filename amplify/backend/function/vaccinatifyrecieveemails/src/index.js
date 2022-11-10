

/**
 * 
 *
 * 
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * 
 */


const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const candidateName = streamedItem.dynamodb.NewImage.name.S
      const candidateEmail = streamedItem.dynamodb.NewImage.email.S
      const candidateDescription = streamedItem.dynamodb.NewImage.description.S

      await ses
          .sendEmail({
            Destination: {
              ToAddresses: [process.env.SES_EMAIL],
            },
            Source: process.env.SES_EMAIL,
            Message: {
              Subject: { Data: 'VaxWin: Ask a Doctor Question' },
              Body: {
                Text: { Data: `My name is ${candidateName}.  ${candidateDescription} Reach me at ${candidateEmail}`  },
              },
            },
          })
          .promise()
    }
  }
  return { status: 'done' }
}