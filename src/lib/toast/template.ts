export const toastContainer = () => {
	const temp = `
        <div id='toastElementContainer' class="fixed z-[100] opacity-0 pointer-events-none transition p-1 w-max h-max">
            <div id='toastElementWrapper' class="flex flex-col flex-wrap max-w-[80vh] gap-4">
            </div>
        </div>     
    `;

	const _temp = document.createElement('template');
	_temp.innerHTML = temp.trim();

	return _temp.content.cloneNode(true);
};

export const toastTemplate = (text: string, close: boolean) => {
	const temp = `
        <div class="min-h-[35px] flex items-center">
            <p class="">
                ${text}
            </p>
        </div>
        ${
					close
						? `
        <div class="pl-8">
            <button class="close-btn w-8 h-8 rounded-full tt-error border-[2px] hover:opacity-100 opacity-90 text-lg transition active:scale-[.98]">
                &times;
            </button
            >
        </div>
        `
						: ''
				}
    `;

	const _temp = document.createElement('template');
	_temp.innerHTML = temp.trim();

	return _temp.content.cloneNode(true);
};
