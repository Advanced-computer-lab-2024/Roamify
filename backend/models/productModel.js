    const mongoose = require("mongoose");

    const productSchema = new mongoose.Schema(
        {
          picture: [
            {
              url: {
                type: String,
                required: true // The Cloudinary URL for displaying the image
              },
              publicId: {
                type: String,
                required: true // The Cloudinary public ID for deletion
              }
            }
          ],
          sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          rating: {
            type: Number,
            default: 0,
          },
          reviews: [
            {
              userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
              },
              review: String,
              rating: Number,
            },
          ],
          isArchived: {
            type: Boolean,
            default: false // Initially set to active (not archived)
          }
        },
           { timestamps: true }
    );

    const productModel = mongoose.model("product", productSchema);
    module.exports = productModel;
