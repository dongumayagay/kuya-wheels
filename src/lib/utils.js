
export const sendEmail = async (
	mailOptions = {
		to: 'dngumayagay@gmail.com',
		subject: 'Email Subject',
		html: '<h1>Hello World</h1>'
	}
) =>
	await (
		await fetch('/api/send-email', {
			method: 'POST',
			body: JSON.stringify({ mailOptions })
		})
	).json();

	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	export function generateString(length) {
		let result = '';
		const charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
	
		return result;
	}