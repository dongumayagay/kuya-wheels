<script>
	import { sendEmail } from '$lib/utils';

	async function clickHandler() {
		const result = await sendEmail({
			to: 'emmanuelcalaycay17@gmail.com',
			subject: 'To calaycers',
			html: '<h1>pogi mo</ht>'
		});
		console.log(JSON.stringify(result))
		alert("Email Sent???")
	}
</script>

<button class="btn btn-info" on:click={clickHandler}> send email </button>


