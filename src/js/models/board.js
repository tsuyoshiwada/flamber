import _ from "lodash";
import mongoose, { Schema } from "mongoose";
import Item from "./item";

const BoardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
}, {
  versionKey: false
});

BoardSchema.set("toJSON", { virtuals: true });
BoardSchema.set("toObject", { virtuals: true });


// Static methods
BoardSchema.statics.findAllByUser = function(user, query = {}) {
  const params = {
    ...query,
    user
  };

  return this.find(params).populate("items");
};

BoardSchema.statics.removeByUserAndId = function(user, id) {
  return this.findOne({ _id: id, user })
    .then(entity => entity.remove().then(() => entity))
    .then(entity => this.populate(entity, { path: "items" }));
};

BoardSchema.statics.updateByUserAndIdFromObject = function(user, id, newProps) {
  const fields = _.keys(this.schema.paths);

  return this.findOne({ _id: id, user })
    .then(entity => {
      fields.forEach(key => {
        if (newProps.hasOwnProperty(key)) {
          entity[key] = newProps[key];
        }
      });

      entity.modified = new Date();

      return entity.save();
    });
};

BoardSchema.statics.addItemByUserAndId = function(user, id, itemId) {
  return this.findOne({ _id: id, user })
    .then(entity => entity.addItem(itemId));
};

BoardSchema.statics.removeItemByUserAndId = function(user, id, itemId) {
  return this.findOne({ _id: id, user })
    .then(entity => entity.removeItem(itemId));
};


// Instance methods
BoardSchema.methods.addItem = function(itemId) {
  this.items = [...this.items, itemId];
  return this.save();
};

BoardSchema.methods.removeItem = function(itemId) {
  this.items = this.items.filter(id => id.toString() !== itemId);
  return this.save();
};


// Middleware
BoardSchema.pre("remove", function(next) {
  Promise.all(this.items.map(id => Item.removeByUserAndId(this.user, id)))
    .then(() => {
      next();
    })
    .catch(() => {
      next();
    });
});


export default mongoose.model("Board", BoardSchema);
