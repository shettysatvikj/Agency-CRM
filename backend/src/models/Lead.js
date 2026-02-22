import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    source: {
      type: String,
      enum: ['Google', 'Meta', 'Organic', 'Referral', 'Other'],
      default: 'Organic',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Closed', 'Lost'],
      default: 'New',
      index: true,
    },
    budget: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1 });
leadSchema.index({ name: 'text', email: 'text' });

export const Lead = mongoose.model('Lead', leadSchema);