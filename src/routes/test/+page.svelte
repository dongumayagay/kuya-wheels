<script>
	import { sendEmail } from '$lib/utils';

	async function clickHandler() {
		const result = await sendEmail({
			to: 'kyleandradebasquena@gmail.com',
			subject: 'Test mail hello',
			html: '<h1>Hello World hello</ht>'
		});
		console.log(JSON.stringify(result))
		alert("Email Sent???")
	}
</script>

<button class="btn btn-info" on:click={clickHandler}> send email </button>
