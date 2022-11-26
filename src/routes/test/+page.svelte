<script>
	import { sendEmail } from '$lib/utils';

	async function clickHandler() {
		await sendEmail({
			to: 'dngumayagay@gmail.com',
			subject: 'Test 1',
			html: '<h1>Hello World</ht>'
		});
	}
</script>

<button class="btn btn-info" on:click={clickHandler}> send email </button>
