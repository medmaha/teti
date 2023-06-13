let timeout: NodeJS.Timeout;

export type TargetLinkHref = 'home' | 'courses' | 'products' | 'basket';

export function changeActiveLink(href: TargetLinkHref, sleep: number | false = 500) {
	const nav = document.querySelector('nav');

	const currentLink = localStorage.getItem('activeLink') as TargetLinkHref;

	if (nav) {
		const activeLink = nav.querySelector('nav ul li.activeLink');

		if (activeLink && currentLink !== href) {
			activeLink.classList.remove('activeLink');
		}

		const _href = href.trim().replace(new RegExp('[#/]'), '');

		if (['basket'].includes(_href)) return;
		const selector = `ul [data-href="${_href}"]`;

		const targetLink = nav.querySelector(selector);

		if (targetLink) {
			if (sleep) {
				targetLink.classList.add('activeLink');
				// if (timeout) clearTimeout(timeout);

				// timeout = setTimeout(() => {
				// }, sleep);
			} else {
				targetLink.classList.add('activeLink');
			}
			localStorage.setItem('activeLink', _href);
		}
	}
}
