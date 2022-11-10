var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
    let date = new Date()
    if (event.request.userAttributes.sub) {
        let params = {
            Item: {
                'id': {S: event.request.userAttributes.sub},
                '__typename': {S: 'User'},
                'username': {S: event.userName},
                'email': {S: event.request.userAttributes.email},
                'name': {S: event.request.userAttributes.name},
                'phone_number': {S: event.request.userAttributes.phone_number},
                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
        }

        try {
            await ddb.putItem(params).promise()
            console.log("Success")
        } catch (err) {
            console.log("Error", err)
        }

        console.log("Success: Everything executed correctly")
        context.done(null, event)

    } else {
        console.log("Error: Nothing was written to DynamoDB")
        context.done(null, event)
    }
};

/*
GraphQL Schema
type User @model
  @auth(rules: [
    { allow: groups, groups: ["Admin"] },
    { allow: owner, ownerField: "username", operations: [read] }
  ]) {
  id: ID!
  username: String!
  email: String! 
}
*/

/*
IAM permissions
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem"
            ],
            "Resource": "arn:aws:dynamodb:region:id:table/name-env"
        }
    ]
}
*/
