<script>
	import { db } from "$lib/firebase.js"
	import { addDoc, collection } from "firebase/firestore"
	// function submitHandler(event) 
	// 	const formData = new FormData(event.target);
	// 	const data = Object.fromEntries(formData);
	// 	console.log(data);
	// 
	let name = ""
	let email = ""
	async function submitHandler() {
		const booking = {
			fullname:name, 
			email:email
		}
		await addDoc(collection(db, "bookings"), booking)

		alert("success???")
	}
</script>

<h1>Book</h1>
<form on:submit|preventDefault={submitHandler}>
	<!-- <input type="text" name="name" placeholder="enter your full name" required />
	<input type="text" name="email" placeholder="enter your email address" required /> -->
	<label for="">Name</label>
	<input type="text" placeholder="Enter your Name" bind:value={name} required>
	<label for="">Email</label>
	<input type="email" placeholder="Enter your Email" bind:value={email} required>
	{#if name.length<5}
		<p>no no no</p>
	{/if}
	<button>Submit</button>
</form>
