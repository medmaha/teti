function url_to_script(url) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.onload = () => {
			resolve();
		};
		script.onerror = () => {
			reject('Failed to load script');
		};
		script.src = url;
		script.defer = true;
		document.head.appendChild(script);
	});
}

function handle_close(_event) {
	_event.target.classList.contains('.alert').remove();
}
function handle_click(_event) {
	if (_event.target.classList.contains('ms-close')) {
		handle_close(_event);
	}
}

const script_sdk = 'https://www.paypal.com/sdk/js';
const clientID = 'Ac8Y26JD9Wu3rgUW7rsiPNtYFgSD7mgAq3KRXzK3cbxKY7jJ1KKQhsrMSshJPuz0SeRseQSdpvTpUFef';
const currency = 'GMD';
const INTENT = 'capture';

function main() {
	url_to_script(`
        ${script_sdk}?client-id=${clientID}&enable-funding=venmo&currency=${currency}&intent=${INTENT}
    `).then((error) => {
		if (error) {
			console.log(error.message || error);
			return;
		}
		// eslint-disable-next-line no-undef
		const paypal_buttons = paypal.Buttons({
			onClick: (data) => {
				console.log('pp btn clicked');
			},
			style: {},
			createOrder: (data, action) => {
				return fetch('/api/checkout?order=create', {
					method: 'post',
					headers: { 'content-type': 'application/json charset=utf-8' },
					body: JSON.stringify({ intent: INTENT })
				})
					.then((response) => response.json())
					.then((order) => order.id);
			},
			onApprove: (data, action) => {
				const order_id = data.orderID;
				return fetch('/api/checkout?order=capture', {
					method: 'post',
					headers: { 'content-type': 'application/json charset=utf-8' },
					body: JSON.stringify({ intent: INTENT, order_id })
				})
					.then((response) => response.json())
					.then((order_details) => console.table(order_details));
			}
		});
	});
}

export { main };
