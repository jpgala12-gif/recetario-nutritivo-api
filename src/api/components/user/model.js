import { Schema, model, Document } from 'mongoose';
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true, versionKey: false });
export const UserModel = model('User', userSchema);
//# sourceMappingURL=model.js.map