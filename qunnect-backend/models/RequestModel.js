const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    following: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requestStatus: { type: String, default: "Pending" },
    followDate: { type: Date, default: Date.now },
  },
  { timestampes: true }
);

const Follow = mongoose.model("Follow", followSchema);
export default Follow;