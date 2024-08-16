import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
