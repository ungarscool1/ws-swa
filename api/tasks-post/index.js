const mongoClient = require("mongodb").MongoClient;

module.exports = async function(context, req) {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const user = JSON.parse(decoded);

    const client = await mongoClient.connect("mongodb://beautiful-dbname:NH5dveNPyMaPXz6z0BkLcuxZJWAXpQbcLxphG82ywobOXTQ3MgX28qZrA1OWWAo9hWoCPUQRZgHBncumxesvkg%3D%3D@beautiful-dbname.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@beautiful-dbname@");
    const database = client.db("tasks");

    const response = await database.collection("tasks").insertOne({
        userId: user.userId,
        label: req.body.label,
        checked: false,
    });
    const task = await database.collection("tasks").findOne({ _id: response.insertedId });

    context.res = {
        body: task
    };
}