const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const markerSchema = new Schema(
  {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
    message: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Marker = mongoose.model("marker", markerSchema);

module.exports = { Marker };

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const markerSchema = new Schema(
//   {
//     markup: [],
//   },
//   {
//     timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
//   }
// );

// const Marker = mongoose.model("marker", markerSchema);

// module.exports = { Marker };
