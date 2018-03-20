const MongoDBInstance = require('mongodb');
const MongoClient = MongoDBInstance.MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blogger';

class MongoDB {
    constructor() {
        this.db = null;
        // Use connect method to connect to the server
        MongoClient.connect(url, (err, client) => {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            this.db = client.db(dbName);
        });
    }

    insertDocuments(collection, arrayOfData, callback) {
        collection = this.db.collection(collection);
        collection.insertMany(arrayOfData, function (err, result) {
            assert.equal(err, null);
            callback(result)
        });
    }

    findAllDocuments(collection, callback) {
        collection = this.db.collection(collection);
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            callback(docs);
        });
    }

    findFillteredDocuments(collection, filters, callback) {
        collection = this.db.collection(collection);
        collection.find(filters).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            callback(docs);
        });
    }

    updateDocument(collection, documentID, newData, callback) {
        collection = this.db.collection(collection);
        let o_id = new MongoDB.ObjectID(documentID);
        collection.updateOne({'_id': o_id}
            , {$set: newData}, function (err, result) {
                assert.equal(err, null);
                console.log("Updated the document with the field a equal to 2");
                callback(result);
            });
    }

    removeDocument(collection, documentID, callback) {
        collection = this.db.collection(collection);
        let o_id = new MongoDB.ObjectID(documentID);
        collection.deleteOne({'_id': o_id}, function (err, result) {
            assert.equal(err, null);
            console.log("Removed the document with the field a equal to 3");
            callback(result);
        });
    }
}

module.exports = MongoDB;