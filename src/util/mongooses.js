module.exports = {
  multipleMongooseToObject: (mongoosesArr) => {
    return mongoosesArr.map((mongooses) => mongooses.toObject());
  },
  mongooseToObject: (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
