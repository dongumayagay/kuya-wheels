<script>
	import { db } from "$lib/firebase.js"
	import { addDoc, collection } from "firebase/firestore"
	// function submitHandler(event) 
	// 	const formData = new FormData(event.target);
	// 	const data = Object.fromEntries(formData);
	// 	console.log(data);
	// 
	let fname = ""
	let lname = ""
	let mname = ""
	let cnumber = ""
	let email = ""
	// let courses = ["Practical Driving 2", "Truck Parking", "Bus Parking"]
	let coursetaken = ""
	async function submitHandler() {
		const booking = {
			firstname:fname, 
			lastname:lname, 
			middlename:mname,
			contactnumber:cnumber,  
			course:coursetaken, 
			email:email
		}
		await addDoc(collection(db, "bookings"), booking)

		alert("success???")
	}
</script>


<form on:submit|preventDefault={submitHandler}>
	<!-- <input type="text" name="name" placeholder="enter your full name" required />
	<input type="text" name="email" placeholder="enter your email address" required /> -->


	<div id="aform">
		<h1>Book</h1>
		<div id="uinput">
			<label for="">First Name</label>
			<input type="text" placeholder="Enter your first name" bind:value={fname} required>
			<label for="">Last Name</label>
			<input type="text" placeholder="Enter your last name" bind:value={lname} required>
			<label for="">Middle Name</label>
			<input type="text" placeholder="Enter your middle name" bind:value={mname} required>
			<label for="">Contact Number</label>
			<input type="text" placeholder="Enter your contact number" bind:value={cnumber} required>
			<label for="cars">Courses:</label>
			<select name="course" bind:value={coursetaken}>
			<option value="Practical Driving 2">Practical Driving 2</option>
			<option value="Truck Parking">Truck Parking</option>
			<option value="Bus Parking">Bus Parking</option>
			</select>
			<label for="">Date</label>
			<input type="date">
			<label for="">Email</label>
			<input type="email" placeholder="Enter your Email" bind:value={email} required>
		</div>
		{#if fname.length<5}
		<p>no no no</p>
		{/if}
		<button>Submit</button>

	</div>
	
	
</form>

<style>
	#aform {
		background-color: #DF362D;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		width: 40%;
		margin-top: 30px;
		margin-bottom: 30px;
		padding: 10px;
		border: solid 2px gainsboro;
		border-radius: 10px;
		color: whitesmoke;
	}
	#uinput {
		display: flex;
		flex-direction: column;
		width: 80%;
		padding: 5px;
		font-family: Arial, Helvetica, sans-serif;
		color: whitesmoke;
		/* background-color: #DF362D; */
		
		text-align: center;
	}
	input {
		margin-top: 2px;
	}
	button{
		width: 20%;
		padding: 10px;
		color: whitesmoke;
		background-color: #4CAF50;
		border: solid 0px black;
		border-radius: 4px;
	}
	button:hover {
		background-color: #36a83a;
	}
</style>