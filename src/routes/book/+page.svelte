<script>
	import { db } from "$lib/firebase.js"
	import { addDoc, collection, getDocs, where, query } from "firebase/firestore"
	// function submitHandler(event) 
	// 	const formData = new FormData(event.target);
	// 	const data = Object.fromEntries(formData);
	// 	console.log(data);
	// 
	let fname = ""
	let lname = ""
	let mname = ""
	let cnumber = ""
	let date = ""
	let email = ""
	// let courses = ["Practical Driving 2", "Truck Parking", "Bus Parking"]
	let coursetaken = ""
	async function submitHandler() {

		const bookingsCol = collection(db, "bookings")
		const q = query(bookingsCol, where("date", "==", date))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			const booking = {
			firstname:fname, 
			lastname:lname, 
			middlename:mname,
			contactnumber:cnumber,  
			course:coursetaken, 
			date:date, 
			email:email
			}
			await addDoc(bookingsCol, booking)

			alert("success???")
		} else {
			alert("The date has already been booked")
		}

	}
</script>


<form on:submit|preventDefault={submitHandler}>
	<!-- <input type="text" name="name" placeholder="enter your full name" required />
	<input type="text" name="email" placeholder="enter your email address" required /> -->
	<div class="courses">
		<h1>Course</h1>
		<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae exercitationem soluta cupiditate est. Vitae, vel! Enim magnam iste inventore ipsa et sapiente, recusandae aperiam. Nostrum inventore aperiam vero dolorum dolorem.</p>
		<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae exercitationem soluta cupiditate est. Vitae, vel! Enim magnam iste inventore ipsa et sapiente, recusandae aperiam. Nostrum inventore aperiam vero dolorum dolorem.</p>	
		<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae exercitationem soluta cupiditate est. Vitae, vel! Enim magnam iste inventore ipsa et sapiente, recusandae aperiam. Nostrum inventore aperiam vero dolorum dolorem.</p>	
		<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae exercitationem soluta cupiditate est. Vitae, vel! Enim magnam iste inventore ipsa et sapiente, recusandae aperiam. Nostrum inventore aperiam vero dolorum dolorem.</p>	
	</div>

	<div id="aform">
		
		<div id="uinput">
			<h1>Book Now!</h1>

			<div class="row-input">
				<div class="column-input">
					<label for="">First Name</label>
					<input type="text" placeholder="Enter your first name" bind:value={fname} required>
				</div>	
			
				<div class="column-input">
					<label for="">Last Name</label>
					<input type="text" placeholder="Enter your last name" bind:value={lname} required>
				</div>	
				
			</div>

			<div class="row-input">
				<div class="column-input">
					<label for="">Middle Name</label>
					<input type="text" placeholder="Enter your middle name" bind:value={mname} required>
				</div>
				<div class="column-input">
					<label for="">Contact Number</label>
					<input type="text" placeholder="Enter your contact number" bind:value={cnumber} required>
				</div>
			</div>

			<div class="row-input">
				<div class="column-input">
					<label for="cars">Courses:</label>
					<select name="course" bind:value={coursetaken}>
						<option value="Practical Driving 2">Practical Driving 2</option>
						<option value="Truck Parking">Truck Parking</option>
						<option value="Bus Parking">Bus Parking</option>
					</select>
				</div>
				<div class="column-input">
					<label for="">Date</label>
					<input type="date" bind:value={date} required>
				</div>
			</div>
			<div class="row-input">
				<div class="column-input">
					<label for="">Email</label>
					<input type="email" placeholder="Enter your Email" bind:value={email} required>
					
				</div>

			</div>
		</div>
		{#if fname.length<5}
		<p>no no no</p>
		{/if}
		<button>Submit</button>

	</div>
	
	
</form>

<style>
	form{
		
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 30px;

	}
	.courses{
		width: 40%;
		display: flex;
		flex-direction: column;
	}

	#aform {
		
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 40%;
		padding: 10px;
		
		border-radius: 10px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);

		/* margin: auto; */
		/* background-color: #DF362D; */
		
		/* margin-top: 30px;
		margin-bottom: 30px; */
	}
	#uinput {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		width: 90%;
		padding: 5px;
		/* font-family: Arial, Helvetica, sans-serif; */
		color: whitesmoke;
		/* background-color: #DF362D; */
		text-align: center;
	}
	.row-input{
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		margin-top: 10px;
	}
	.column-input{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	input::placeholder{
		font-family: 'Oswald';
		font-weight: 300;
	}
	input {
		height: 20px;
		padding: 8px;	
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