const { Schema, model, connection } = require("mongoose");
var autoincrement = require("mongoose-auto-increment");
autoincrement.initialize(connection);

const categorySchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
});

categorySchema.plugin(require("mongoose-autopopulate"));
categorySchema.plugin(autoincrement.plugin, {
  model: "Category",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

categorySchema.plugin(findOrCreate);
const Category = model("Category", categorySchema);

module.exports = Category;
