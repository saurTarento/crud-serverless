const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient()

exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: "table_name",
    Item: {
      id: data.id,
      name: data.name,
    },
  }

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error("Could not create the item."))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    }
    callback(null, response)
  })
}

exports.read = (event, context, callback) => {
  const params = {
    TableName: "table_name",
    Key: {
      id: event.pathParameters.id,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error("Could not retrieve the item."))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    }
    callback(null, response)
  })
}

exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body)

  const params = {
    TableName: "table_name",
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: "SET name = :name",
    ExpressionAttributeValues: {
      ":name": data.name,
    },
    ReturnValues: "ALL_NEW",
  }

  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error("Could not update the item."))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    }
    callback(null, response)
  })
}

exports.delete = (event, context, callback) => {
  const params = {
    TableName: "table_name",
    Key: {
      id: event.pathParameters.id,
    },
  }

  dynamoDb.delete(params, (error) => {
    if (error) {
      console.error(error)
      callback(new Error("Could not delete the item."))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
    }
    callback(null, response)
  })
}
