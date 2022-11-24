<script>
	// function submitHandler(event) {
	// 	const formData = new FormData(event.target);
	// 	const data = Object.fromEntries(formData);
	// 	console.log(data);
	// }
	let name = "kyle"
	function submitHandler() {
		console.log(name)

	}
</script>

<h1>Book</h1>
<form on:submit|preventDefault={submitHandler}>
	<!-- <input type="text" name="name" placeholder="enter your full name" required />
	<input type="text" name="email" placeholder="enter your email address" required /> -->
	<input type="text" bind:value={name}>
	{#if name.length<5}
		<p>no no no</p>
	{/if}
	<button>Submit</button>
</form>
