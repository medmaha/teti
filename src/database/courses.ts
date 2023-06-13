import type { Document } from 'mongoose';

import mongoose from 'mongoose';

export interface AssignmentsInterface extends Document {
	title: string;
	description: string;
}
export interface Levels {
	price: number;
	topics: string[];
	duration: number;
	materials: string[];
	objectives: string[];
	prerequisites: string[];
	assignments: AssignmentsInterface[];
}

export interface CourseLevels extends Document {
	category: Levels;
	diploma: Levels;
	advance: Levels;
}

export interface CourseInterface extends Document {
	name: string;
	description: string;
	objectives: string[];
	imgUrl: string;
	levels: CourseLevels;
}

const AssignmentSchema = new mongoose.Schema<AssignmentsInterface>({
	title: { type: String },
	description: { type: String }
});

const Levels = new mongoose.Schema<Levels>({
	price: { type: Number },
	topics: { type: [String] },
	duration: { type: Number },
	materials: { type: [String] },
	objectives: { type: [String] },
	prerequisites: { type: [String] },
	assignments: { type: [AssignmentSchema] }
});

const CourseLevels = new mongoose.Schema<CourseLevels>({
	category: { type: Levels },
	diploma: { type: Levels },
	advance: { type: Levels }
});

const SCHEMA = new mongoose.Schema<CourseInterface>({
	name: { type: String },
	description: { type: String },
	objectives: { type: [String] },
	imgUrl: { type: String },
	levels: {
		type: CourseLevels
	}
});

const Courses = mongoose.model('Courses', SCHEMA, undefined, {
	overwriteModels: true
});

export default Courses;
