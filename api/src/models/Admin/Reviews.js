const { Schema, model, connection } = require("mongoose");
var autoincrement = require("mongoose-auto-increment");
const { default: mongooseAutoPopulate } = require("mongoose-autopopulate");
autoincrement.initialize(connection);

const reviewSchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  review: {
    type: String,
    required: true,
  },
  client_code: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

reviewSchema.plugin(require("mongoose-autopopulate"));
reviewSchema.plugin(autoincrement.plugin, {
  model: "Review",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

reviewSchema.plugin(findOrCreate);
const Review = model("Review", reviewSchema);

module.exports = Review;
