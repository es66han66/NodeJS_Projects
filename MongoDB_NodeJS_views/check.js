db.source.aggregate([
  { $match: { year: { $gte: 1 } } },
  {
    $group: {
      _id: "$_id",
      field1: { $sum: "$sourcefield1" },
      field2: { $sum: "$sourcefield2" },
    },
  },
  { $merge: { into: "testView", whenMatched: "replace" } },
]);


db.source.aggregate([
    { $match: { year: { $gte: 1 } } },
    {
      $project: {
        result : { $subtract : [ "$sourcefield1", "$sourcefield2" ] }
      },
    },
    { $merge: { into: "testView", whenMatched: "replace" } },
  ]);
  
  db.createCollection("usersView",
  {
    viewOn: "source",
  pipeline: [
    {
      $project: {
        "year": 1
      },
    }
  ]
})