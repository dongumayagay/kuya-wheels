<script>
    import { db } from "$lib/firebase.js"
	import { addDoc, collection, getDocs, where, query, getCountFromServer, serverTimestamp } from "firebase/firestore"
	import { generateString, sendEmail } from "$lib/utils.js"
	import { page } from '$app/stores'
	let fname = ""
	let lname = ""
	let mname = ""
	let cnumber = ""
	let date = ""
	let email = ""
	let coursetaken = ""
    let btnDisable = false

	const bookingsCol = collection(db, "bookings")

    async function checkifDatebooked() {
        btnDisable = true
		//Checking if data has already been fully booked
		const q = query(bookingsCol, where("date", "==", date), where("isDownpaymentPaid","==", true))
		const snapshot = await getCountFromServer(q)
		if (snapshot.data().count >= 10) {
			alert("The date has already been fully booked")
			return
		} 
        await createBooking()
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
			<h4>
				For more inquiries, please do contact us at kuyawheelsmain@gmail.com
			</h4>
			`
		})
		alert("Booking successful!")
        fname = ""
	    lname = ""
	    mname = ""
	    cnumber = ""
	    date = ""
	    email = ""
	    coursetaken = ""
		btnDisable = false
	}
</script>

<h1 style="margin:5px 0 5px 0;text-align:center;">Create Booking</h1>
<hr style="border: 1px solid rgba(20, 20, 20, 0.7);width: 99%;">

<form on:submit|preventDefault={checkifDatebooked}>
    <div style="margin:20px;padding:10px; background-color:rgba(0,0,0,0.5);border-radius:8px;">
        <div>
            <h1 style="text-align: center;color:whitesmoke;">Create Booking for Walk-In Clients</h1>
        </div>
        <div style="display: flex;">
            <div class="inputPanel">
                <div style="display: flex;flex-direction:row;margin:10px 0px 10px 0px;">
                    <label for="" class="functionLabel">First Name</label>
                    <input type="text" placeholder="Enter First Name" bind:value={fname} class="uInput" required>
                </div>
                <div style="display: flex;flex-direction:row; margin:10px 0px 10px 0px;">
                    <label for="" class="functionLabel">Last Name</label>
                    <input type="text" placeholder="Enter Last Name" bind:value={lname} class="uInput" required>
                </div>
                <div style="display: flex;flex-direction:row;margin:10px 0px 10px 0px;">
                    <label for="" class="functionLabel">Middle Name</label>
                    <input type="text" placeholder="Enter Middle Name (Optional)" bind:value={mname} class="uInput">
                </div>
                <div style="display: flex;flex-direction:row;margin:10px 0px 10px 0px;">
                    <label for="" class="functionLabel">Course</label>
                    <select name="course" bind:value={coursetaken} class="uSelect" required>
                        <option value="PDC 3">Practical Driving Course 3</option>
                    </select>
                </div>
            </div>
            <div class="inputPanel">
                <div style="display: flex;flex-direction:row;margin:10px 0px 10px 0px;">
                    <label for="" class="functionLabel">Contact number</label>
                    <input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" minlength="11" maxlength="11" placeholder="09123456789" pattern={String.raw`^(09)\d{9}$`} bind:value={cnumber} class="uInput" required>
                </div>
                <div style="display: flex;flex-direction:row;margin:10px 0px 10px 0px;">
                    <label for="" class="functionLabel">Email</label>
                    <input type="email" placeholder="Enter Email" bind:value={email} class="uInput" required>
                </div>
                <div style="display: flex;flex-direction:row;margin:10px 0px 10px 0px;">
                    <label for="" class="functionLabel">Date</label>
                    <input type="date" bind:value={date} class="uInput" required
                    min={new Intl.DateTimeFormat('fr-CA', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit'
					}).format(new Date(Date.now() + 3600 * 1000 * 24))}
                    >
                </div>
                <button id="submitBtn" disabled={btnDisable}>Submit Booking</button>
            </div>
        </div>
        
    </div>
</form>


<style>
    .uInput {
        border: rgba(0,0,0,0.46);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        width: 300px;
        height: 20px;
        padding: 10px;
        box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
        -webkit-box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
        -moz-box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
    }
    .uSelect {
        border: rgba(0,0,0,0.46);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        width: 320px;
        height: 40px;
        padding: 10px;
        box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
        -webkit-box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
        -moz-box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
    }
    .functionLabel {
        background-color: #2b2b2b;
        color: whitesmoke;
        text-align: center;

        font-size: 18px;
        width: 130px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;

        padding: 5px;
    }
    .inputPanel{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0;
    }
    #submitBtn {
        height: 40px;
		padding: 10px;
		color: whitesmoke;
		background-color: #4CAF50;
		border: solid 0px black;
		border-radius: 4px;
        margin:10px 0px 10px 0px;
    }
    #submitBtn:hover {
        background-color: #36a83a;
    }
</style>