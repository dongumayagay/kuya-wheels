<script>
	import { db } from "$lib/firebase.js"
	import { addDoc, collection, getDocs, where, query, getCountFromServer, serverTimestamp } from "firebase/firestore"
	import { generateString, sendEmail } from "$lib/utils.js"
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	let fname = ""
	let lname = ""
	let mname = ""
	let cnumber = ""
	let date = ""
	let email = ""
	let coursetaken = ""
	let randomcode
	let otpGuessinput
	let btnDisable = false

	const bookingsCol = collection(db, "bookings")

	async function cancelOtp() {
		btnDisable =  false
	}
	async function sendOtp() {
	
		// Generates and sends an OTP code to the email
		randomcode = generateString(6)
		await sendEmail({
			to: email,
			subject: 'Your OTP code',
			html: `<h2>Your Kuya Wheels Driving Course OTP is: <h1>${randomcode}</h1> </h2>`
		})
	}
	async function checkifDatebooked() {
		btnDisable = true		
		//Checking if data has already been booked
		const q = query(bookingsCol, where("date", "==", date), where("isDownpaymentPaid", "==", true))
		const snapshot = await getCountFromServer(q)
		if (snapshot.data().count >= 10) {
			alert("The date has already been fully booked")
			return
		} 
		await sendOtp()
	}
	async function checkOtp() {
		if (randomcode !== otpGuessinput){
			alert("Wrong OTP code")
			return
		}
		await createBooking()
		btnDisable = false
	}
	async function createBooking() {
		const booking = {
		firstname:fname.toLowerCase(),
		firstnameDisplay:fname, 
		lastname:lname.toLowerCase(),
		lastnameDisplay:lname, 
		middlename:mname,
		contactnumber:cnumber,  
		course:coursetaken, 
		date:date, 
		email:email,
		isDownpaymentPaid:false,
		paymentReferrencenumber:"",
		rescheduleCount:0,
		}
		const createdBooking = await addDoc(bookingsCol, booking)
		await sendEmail({
			to: email,
			subject: 'Appointment Status Link',
			html: `
			<h1>Hello,</h1>
			<h3>
				Your booking for Kuya Wheels Driving School has been confirmed. 
				You can check the status of your booking here: 
			</h3>
			<a href="${$page.url.origin}/book/${createdBooking.id}">Appointment Status</a>
			<br>
			<h3>
				Once enrolled, you will benefit from a comprehensive curriculum that covers both theoretical knowledge 
				and practical training. Our experienced instructors will guide you through essential topics such as traffic 
				rules and regulations, defensive driving strategies, vehicle maintenance, and road safety. 
				Through hands-on practice, you will gain confidence in handling specific vehicle categories, mastering advanced 
				maneuvers, and navigating various road conditions.
			</h3>
			<br>
			<h4>
				If you have any questions or require further information, please don't hesitate to reach out to kuyawheelsmain@gmail.com. 
				<br>
				We are here to assist you throughout the application process and address any concerns you may have.
			</h4>
			`
		})
		goto("/book/"+createdBooking.id)
		// alert("Your reservation was booked successfully!")
		
	}
</script>


<form on:submit|preventDefault={checkifDatebooked}>
	<div class="courses">
		
		<h1 style="margin-bottom: 10px;">Available Course/s:</h1>
		<div>
			<select style="width: 100%;">
				<option value="Practical Driving Course 3" selected>Practical Driving Course 3</option>
			</select> 
		</div>
		<h2> Practical Driving Course (PDC) Restriction 3 - refers to vehicles used for the carriage of goods and having a maximum gross vehicle weight exceeding 
			3,500kg but not exceeding 12,000kg.
			<br>
		</h2>
		<p>
			The PDC 3 program <b>(which costs ₱5,000.00)</b> is designed to equip you with advanced driving skills and techniques necessary for operating vehicles such as trucks, buses, or motorcycles. With a comprehensive curriculum comprising both theoretical knowledge and practical training, we ensure you develop the expertise needed to navigate Philippine roads safely and responsibly.
			<br>
			<br>
			During the theoretical component of the course, you will delve into essential topics such as traffic rules and regulations, defensive driving strategies, vehicle maintenance, and road safety. The practical training component is where our experienced instructors will guide you through real-life scenarios, both in controlled environments and on actual roads. You will learn advanced driving maneuvers tailored to specific vehicle categories, including handling various road conditions, navigating complex intersections, and mastering vehicle-specific tasks.
			<br>
			<br>
			Completing the Practical Driving Course 3 is a mandatory step in the process of obtaining a professional driver's license for your desired vehicle category. Our goal is to ensure that you have the necessary skills and knowledge to operate vehicles safely, not only for your personal well-being but also for the safety of others on the road.
			<br>
		</p>
		<h2>
			Requirements to bring:<br>
			- Ballpen<br>
			- Notebook<br>
			- 1pc 2x2 picture<br>
			- 1 Photocopy of Professional Drivers License with RC 2 or 4 for a 
			period of at least one (1) year prior to the application
		</h2>
	</div>

	<div id="aform">
		
		<div id="uinput">
			<h1>Book Now!</h1>

			<div class="row-input">
				<div class="column-input">
					<label for="">First Name</label>
					<input type="text" onkeypress='return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))' placeholder="Enter your first name" bind:value={fname} required>
				</div>	
			
				<div class="column-input">
					<label for="">Last Name</label>
					<input type="text" onkeypress='return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))' placeholder="Enter your last name" bind:value={lname} required>
				</div>	
				
			</div>

			<div class="row-input">
				<div class="column-input">
					<label for="">Middle Name (Optional)</label>
					<input type="text" onkeypress='return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))' placeholder="Enter your middle name" bind:value={mname}>
				</div>
				<div class="column-input">
					<label for="">Contact Number</label>
					<input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" minlength="11" maxlength="11" placeholder="09123456789" pattern={String.raw`^(09)\d{9}$`} bind:value={cnumber} required >
				</div>
			</div>

			<div class="row-input">
				<div class="column-input">
					<label for="">Email Address</label>
					<input type="email" placeholder="Enter your Email" bind:value={email} required>
				</div>
				
			</div>
			<div class="row-input">
				<div class="column-input">
					<label for="">Appointment Date</label>
					<input type="date" bind:value={date} required 
					min={new Intl.DateTimeFormat('fr-CA', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit'
					}).format(new Date(Date.now() + 3600 * 1000 * 24))}
					>
				</div>
				<div class="column-input">
					<label for="cars">Course to take:</label>
					<select name="course" bind:value={coursetaken} required>
						<option value="PDC 3">Practical Driving Course 3</option>
					</select>
				</div>
			</div>
		</div>
		<div id="dataPrivacyRow">
			<input type="checkbox" required>
			<label for=""> By checking this box, you are agreeing to our <a href="/dataprivacy" target="_blank" rel="noopener noreferrer">Data Privacy Policy</a>. </label><br>
		</div>
		<br>
		<button disabled={btnDisable}>Submit</button>
		<p id="disclaimer">
			Disclaimer: You will need to make a down payment of ₱500 for your booking to be finalized.
		</p>
	</div>
</form>
{#if btnDisable === true}
<div id="blur">
	<div id="otpDialog">
		<p>Please input the OTP code sent to your provided Email</p>
		<div style="width: 100%;">
			<form on:submit|preventDefault={checkOtp}>
				<input type="text" bind:value={otpGuessinput} required>
				<button id="otpBtn">Confirm</button>
				<button on:click={cancelOtp} id="cancelBtn">Cancel</button>
			</form>
		</div>
	</div>
</div>
{/if}

<style>
	form{
		
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 20px 10px 20px 10px;

	}
	h1{
		font-size: 35px;
	}
	h2{
		font-size: 20px;
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
		height: 100%;

		padding: 10px;
		
		border-radius: 10px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
	}
	#uinput {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		width: 100%;
		padding: 5px;
		color: whitesmoke;
		text-align: center;
	}
	#uinput input, select{
		width: 100%;
	}
	.row-input{
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		margin-top: 10px;
	}
	#dataPrivacyRow{
		display: flex;
		flex-direction: row;
		text-align: center;
	}
	#disclaimer{
		text-align: center;
		margin-left: 15%;
		margin-right: 15%;
	}
	.column-input{
		margin-left: 15px;
		margin-right: 15px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input::placeholder{
		font-family: 'Oswald';
		font-weight: 300;
	}
	select, input {
		margin: 5px;
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
	#cancelBtn {
        color: whitesmoke;
		background-color: #f44336;
    }
    #cancelBtn:hover {
        background-color: #f02113;
	}
	#blur {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0,0,0,0.5);
	}
	#otpDialog{
		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: #ff944d;
		border: 4px solid rgba(70, 28, 0, 0.8);
		border-radius: 10px;

		padding: 20px;
	}
	#otpDialog p {
		font-size: 17px;
		margin-bottom: 0;
	}
	#otpBtn {
		width: auto;
	}

	@media only screen and (min-width: 320px) and (max-width: 700px) {
		form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 30px 10px 30px 10px;
		}
		.courses{
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		.courses h1 {
			margin-top: 0;
			font-size: 20px;
		}
		.courses h2 {
			font-size: 15px;
		}
		#aform {
			margin-top: 30px;
			width: 100%;
		}
		#aform h1 {
			font-size: 20px;
		}
		#aform label {
			font-size: 15px;
		}
		#uinput input, select{
			width: 100%;
		}
		.row-input {
			flex-direction: column;
			padding: 0;
		}
	}
	@media only screen and (min-width: 701px) and (max-width: 1240px) {
		form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 30px 10px 30px 10px;
		}
		.courses{
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		.courses h1 {
			margin-top: 0;
			font-size: 30px;
		}
		.courses h2 {
			font-size: 25px;
		}
		#aform {
			margin-top: 30px;
			width: 100%;
		}
		#aform h1 {
			font-size: 30px;
		}
		#aform label {
			font-size: 20px;
		}
		#uinput input, select{
			width: 100%;
		}
	}
</style>