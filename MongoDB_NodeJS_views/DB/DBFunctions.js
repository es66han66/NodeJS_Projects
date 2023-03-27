import { v4 } from "uuid";

export default class DBFunction {
  constructor(DBClient, database) {
    this.db = DBClient.db(database);
    console.log(`Database ${database} has been instantiated`)
  }

  async DBQuery(
    collection = "",
    method = "",
    query = {},
    options = {},
    handler = null
  ) {
    if (collection) {
      switch (method) {
        case "findOne": {
          return await this.findOne(collection, query, options, handler);
        }
        case "insertOne": {
          return await this.insertOne(collection, query, options, handler);
        }
        case "updateOne": {
          return await this.updateOne(collection, query, options, handler);
        }
        case "delete": {
          return await this.delete(collection, query, options, handler);
        }
        case "findInView": {
          return await this.findInView(collection, query, options, handler);
        }
      }
    }
  }

  async findOne(collection = "", query = {}, options = {}, handler = null) {
    return await this.db.collection(collection).findOne(query);
  }

  async findInView(collection = "", query = {}, options = {}, handler = null) {
    await this.db.createCollection(collection, {
      viewOn: "student",
      pipeline: [
        {
          $project: {
            differenceInMaxAndMinMarks : { $subtract : [ "$maxMarks", "$minMarks" ] },
            id: 1,
            name: 1,
            phone: 1
          },
        }
      ]
    })
    return await this.db.collection(collection).findOne(query);
  }

  async insertOne(collection = "", query = {}, options = {}, handler = null) {
    const id = v4();
    query["id"] = id;
    await this.db.collection(collection).insertOne(query);
    return id;
  }

  async updateOne(collection = "", query = {}, options = {}, handler = null) {
    return await this.db.collection(collection).updateOne(query, {
      $set: options,
    });
  }

  async delete(collection = "", query = {}, options = {}, handler = null) {
    return await this.db.collection(collection).deleteOne(query);
  }
}
