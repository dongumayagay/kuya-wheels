<script>
	import { db } from "$lib/firebase.js"
	import { addDoc, collection, getDocs, where, query, getCountFromServer } from "firebase/firestore"
	import { generateString, sendEmail } from "$lib/utils.js"
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
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
	let showOtpInput = false
	let randomcode
	let otpGuessinput

	const bookingsCol = collection(db, "bookings")

	async function sendOtp() {
	
		// Generates and sends an OTP code to the email
		randomcode = generateString(6)
		await sendEmail({
			to: email,
			subject: 'Your OTP code',
			html: `<h1>Your Kuya Wheels Driving Course OTP is: ${randomcode} </h1>`
		})
	}
	async function checkifDatebooked() {

		//Checking if data has already been booked
		const q = query(bookingsCol, where("date", "==", date))
		const snapshot = await getCountFromServer(q)
		if (snapshot.data().count >= 10) {
			alert("The date has already been fully booked")
			return
		} 
		await sendOtp()
		showOtpInput = true
	}
	async function checkOtp() {
		if (randomcode !== otpGuessinput){
			alert("Wrong OTP code")
			return
		}
		await createBooking()
	}
	async function createBooking() {
		const booking = {
		firstname:fname, 
		lastname:lname, 
		middlename:mname,
		contactnumber:cnumber,  
		course:coursetaken, 
		date:date, 
		email:email,
		isDownpaymentPaid:false,
		paymentReferrencenumber:""
		}
		const createdBooking = await addDoc(bookingsCol, booking)
		await sendEmail({
			to: email,
			subject: 'Appointment Status Link',
			html: `<a href="${$page.url.origin}/book/${createdBooking.id}">Click Here</a>`
		})
		goto("/book/"+createdBooking.id)
		// alert("Your reservation was booked successfully!")
		
	}
</script>


<form on:submit|preventDefault={checkifDatebooked}>
	<!-- <input type="text" name="name" placeholder="enter your full name" required />;
	<input type="text" name="email" placeholder="enter your email address" required /> -->
	<div class="courses">
		<h1>Available Course/s:</h1>
		<h2> Practical Driving Course (PDC) Restriction 3 - refers to vehicles used for the carriage of goods and having a maximum gross vehicle weight exceeding 
			3,500kg but not exceeding 12,000kg.<br><br>
			Requirements to bring:<br>
			- Ballpen<br>- Notebook<br>- 1pc 2x2 picture<br>- 1 Photocopy of Professional Drivers License with RC 2 or 4 for a period of at least one (1) year prior to the application<br><br>
			More courses coming soon so stay tuned!
			</h2>
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
					<label for="">Middle Name (Optional)</label>
					<input type="text" placeholder="Enter your middle name" bind:value={mname}>
				</div>
				<div class="column-input">
					<label for="">Contact Number</label>
					<input type="text" placeholder="Enter your contact number" bind:value={cnumber} required>
				</div>
			</div>

			<div class="row-input">
				<div class="column-input">
					<label for="">Email Address</label>
					<input type="email" placeholder="Enter your Email" bind:value={email} required>
				</div>
				<div class="column-input">
					<label for="">Appointment Date</label>
					<input type="date" bind:value={date} required style="width:168px;">
				</div>
				
			</div>
			<div class="row-input">
				<div class="column-input">
					<label for="cars">Course to take:</label>
					<select name="course" bind:value={coursetaken} required style="width:189px;height:36px;">
						<option value="Practical Driving 2">Practical Driving 2</option>
						<option value="Truck Parking">Truck Parking</option>
						<option value="Bus Parking">Bus Parking</option>
					</select>
				</div>

			</div>
		</div>
		<!-- {#if fname.length<5}
		<p>no no no</p>
		{/if} -->
		<br>
		<button>Submit</button>

	</div>
	
	
</form>

<dialog open={showOtpInput}>
	<h1>
		hellow world
	</h1>
	<form on:submit|preventDefault={checkOtp}>
		<input type="text" bind:value={otpGuessinput} required>
		<button>submit</button>
	</form>
</dialog>

<style>
	form{
		
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 30px;

	}
	h1{
		font-size: 3em;
	}
	h2{
		font-size: 1.3em;
	}
	.courses{
		width: 50%;
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
		justify-content: flex-start;
		margin-top: 10px;
	}
	.column-input{
		margin-right: 15px;
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