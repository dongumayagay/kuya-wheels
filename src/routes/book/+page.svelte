<script>
	function submitHandler(event) {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		console.log(data);
	}
</script>

<h1>Book</h1>
<form on:submit|preventDefault={submitHandler}>
	<input type="text" name="fullname" placeholder="enter your full name" required />
	<input type="text" name="email" placeholder="enter your email address" required />
	<button>Submit</button>
</form>
