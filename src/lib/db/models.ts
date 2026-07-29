import mongoose, { Schema, Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: string;
  isBlocked: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  phoneNumber?: string;
  googleId?: string;
  lastLogin?: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: { type: String, default: 'User' },
  isBlocked: { type: Boolean, default: false },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
  phoneNumber: { type: String },
  googleId: { type: String },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// Report Schema
export interface IReport extends Document {
  reportId: string;
  verificationCode: string;
  calculatorTitle: string;
  calculatorSlug: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  userRole: string;
  inputs: Array<{ label: string; value: string | number; unit?: string }>;
  results: Array<{ label: string; value: string | number; unit?: string }>;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>({
  reportId: { type: String, required: true, unique: true },
  verificationCode: { type: String, required: true, unique: true },
  calculatorTitle: { type: String, required: true },
  calculatorSlug: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userMobile: { type: String, required: true },
  userRole: { type: String, required: true },
  inputs: [{ label: String, value: Schema.Types.Mixed, unit: String }],
  results: [{ label: String, value: Schema.Types.Mixed, unit: String }],
  createdAt: { type: Date, default: Date.now },
});

// Blog Schema
export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: Date;
}

const BlogSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: 'IndustrialCalc Editorial Team' },
  imageUrl: { type: String, required: true },
  tags: [String],
  isPublished: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
});

// Media Schema
export interface IMedia extends Document {
  filename: string;
  url: string;
  mimeType: string;
  size: string;
  uploadedAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

// Site & Theme Settings Schema
export interface ISiteSetting extends Document {
  key: string;
  value: Record<string, any>;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Report = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogSchema);
export const Media = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);
export const SiteSetting = mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
