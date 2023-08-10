import type { Document } from 'mongoose';

import mongoose from 'mongoose';

export interface CoursePrice {
	amount: number;
	durable: string;
}
export interface CourseDuration {
	time: string;
	lessons: string;
}

export interface CourseInterface extends Document {
	name: string;
	imgUrl: string;
	price: CoursePrice[];
	description: string;
	objectives: string[];
	certification: string[];
	prerequisites: string[];
	formPrice: number;
	duration: CourseDuration[];
}

const SCHEMA = new mongoose.Schema<CourseInterface>({
	name: { type: String },
	imgUrl: { type: String },
	price: { type: [{ amount: Number, durable: String }] },
	description: { type: String },
	objectives: { type: [String] },
	formPrice: { type: Number },
	certification: { type: [String] },
	prerequisites: { type: [String] },
	duration: { type: [{ time: String, lessons: String }] }
});

const Courses = mongoose.model('Courses', SCHEMA, undefined, {
	overwriteModels: true
});

export default Courses;
