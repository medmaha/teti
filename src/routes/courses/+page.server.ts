import Courses from '$db/courses';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const courses = (await Courses.find({}, { _id: 0, levels: 0 }))?.flatMap((course) => {
		const __data = course.toJSON();
		__data._id = course.id;
		return __data;
	});
	return { courses };
}) satisfies PageServerLoad;
