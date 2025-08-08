import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, default: '' },
  },
  { timestamps: true }
);

const styleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    reviews: { type: [reviewSchema], default: [] },
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

styleSchema.methods.recalculateAverageRating = function recalculateAverageRating() {
  if (!this.reviews || this.reviews.length === 0) {
    this.averageRating = 0;
    return this.averageRating;
  }
  const total = this.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
  this.averageRating = Math.round((total / this.reviews.length) * 10) / 10;
  return this.averageRating;
};

export default mongoose.model('Style', styleSchema);


