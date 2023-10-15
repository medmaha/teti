import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';

import Courses from '$db/courses';

export const load = (async ({ params }) => {
	const { slug } = params;

	const query = slug.replace('-', ' ');
	const course = await Courses.findOne(
		{ name: { $regex: new RegExp(query, 'ig') } },
		{ levels: 0, _id: 0 }
	);

	if (course) {
		course['_id'] = course.id;
		return { payload: JSON.stringify(course.toJSON()) };
	}

	throw redirect(302, '/');
}) satisfies PageServerLoad;

export const actions = {
	buyForm: async ({ cookies, request }) => {
		return { success: true };
	}
} satisfies Actions;
