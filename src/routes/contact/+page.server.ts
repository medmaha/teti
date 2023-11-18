import {
	MEDLUXE_SMTP_HOST_LOCAL,
	MEDLUXE_SMTP_HOST_REMOTE,
	TETI_EMAIL_HOST
} from '$env/static/private';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	contact: async ({ request, fetch }) => {
		const data = await request.formData();
		const name = data.get('name')?.valueOf() as string;
		const email = data.get('email')?.valueOf() as string;
		const subject = data.get('subject')?.valueOf() as string;
		const message = data.get('message')?.valueOf() as string;

		const emailRegExTester = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		if (!emailRegExTester.test(email))
			return fail(400, { message: 'Please provide a valid email address.' });

		if (!name) return fail(400, { message: 'Your full name field is required' });
		if (!message || message.length < 15)
			return fail(400, { message: `Your message can be longer than ${message.length} characters` });

		interface IHtml {
			heading?: string;
			subHeading?: string;
			email: string;
			name: string;
			message: string;
		}

		const html = ({ heading, subHeading, email, name, message }: IHtml) => {
			// prettier-ignore
			return `<html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Document</title><style>*{ font-family: Verdana, Geneva, Tahoma, sans-serif; margin: 0;} body{ padding: 10px; margin: 0; padding-top: 25px;} .cols-items{ display: flex; flex-direction: column; gap: 1em; align-items: center; justify-content: center;} div.information{ margin-top: 20px; width: 100%; border-radius: 1em; padding: 1em; background: white; box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1), 0 5px 3px 0 rgba(0, 0, 0, 0.3); max-width: 550px;} .info{ text-align: left; gap:1em display: flex; justify-content: space-between; align-items: center; margin-top: 1em; width: max-content; gap: 1em; max-width: 300px} .info .i{ font-weight: lighter; color: #474646;} .message{ padding-top: 0.5em; letter-spacing: 1px; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;} </style></head><body class="cols-items"><h1>${heading || 'New Message From Website'}</h1><div class="information"><h2>${subHeading || 'Message Information'}</h2><ul><li><div class="info"><b>Name:</b><span class="i">${name}</span></div></li><li><div class="info"><b>Email:</b ><span class="i" style="color: rgba(0, 128, 0, 0.904)" >${email}</span ></div></li><li><div class="info"><b>Subject:</b><span class="i">${subject}</span></div></li></ul><div class="info" style="width: 100%; max-width: 500px"><div style="margin-top: 1em"><b>Message:</b><p class="message">${message}</p></div></div></div></body></html>`;
		};
		try {
			const resp = await fetch(MEDLUXE_SMTP_HOST_LOCAL || MEDLUXE_SMTP_HOST_REMOTE, {
				method: 'post',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					mailType: 'contact',
					subject,
					to_mail: TETI_EMAIL_HOST,
					html: html({
						name,
						email,
						message
					})
				})
			});
			const { success, error } = await resp.json();

			if (!success) return fail(400, { message: error });
		} catch (error: any) {
			console.error(error.message);
		}

		return { name };
	}
} satisfies Actions;
