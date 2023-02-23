<script>
	import { db } from '$lib/firebase'
    import { updateDoc, doc, getDoc } from 'firebase/firestore'

    /** @type {import('./$types').PageData} */
    export let data;
    export let statusNP = "No payment";
    export let statusP = "Paid"
    let resched = false

    async function reschedDialog() {
        if (resched == false) {
            resched = true
            return
        }
        if (resched == true) {
            resched = false
            return
        }
    }
    async function gotoPayment() {
            const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfdGVzdF84cGozc3RFRlkydHhDenFTUnduSzJmelg6'
    },
    body: JSON.stringify({
        data: {
        attributes: {amount: 10000, description: 'Kuya wheels Down payment', remarks: data.booking.id}
        }
    })
    };
    try {
        const response = await fetch('https://api.paymongo.com/v1/links', options)
        const paymentLink = (await response.json()).data
        const docRef = doc(db, "bookings", data.booking.id)
        await updateDoc(docRef, {paymentReferrencenumber:paymentLink.attributes.reference_number})
        const docSnapshot = await getDoc(docRef)
        data.booking = {...docSnapshot.data(), id:docSnapshot.id}
        open(paymentLink.attributes.checkout_url)
    } catch (error) {
        console.log(error)
    }
    }

</script>

<!-- <pre>
    {JSON.stringify(data.booking, null, 2)}
    {data.booking.firstname}
</pre> -->
<main id=statusForm>
    <h1>Appointment Status</h1>
    <div class="row">
        <div class="column"><label for="" style="display: flex;justify-content: center;">Last name: </label></div>
        <div class="column"><input type="text" bind:value={data.booking.lastnameDisplay} readonly></div>
    </div>
    <div class="row">
        <div class="column"><label for="" style="display: flex;justify-content: center;">First name: </label></div>
        <div class="column"><input type="text" bind:value={data.booking.firstnameDisplay} readonly></div>
    </div>
    <div class="row">
        {#if data.booking.middlename !== ""}
            <div class="column"><label for="" style="display: flex;justify-content: center;">Middle name: </label></div>
            <div class="column"><input type="text" bind:value={data.booking.middlename} readonly></div>
        {/if}
    </div>
    <div class="row">
        <div class="column"><label for="" style="display: flex;justify-content: center;">Email: </label></div>
        <div class="column"><input type="text" bind:value={data.booking.email} readonly></div>
    </div>
    <div class="row">
        <div class="column"><label for="" style="display: flex;justify-content: center;">Contact Number: </label></div>
        <div class="column"><input type="text" bind:value={data.booking.contactnumber} readonly></div>
    </div>
    <br>
    <hr>
    <br>
    <div class="row">
        <div class="column"><label for="" style="display: flex;justify-content: center;">Chosen Course: </label></div>
        <div class="column"><input type="text" bind:value={data.booking.course} readonly></div>
    </div>
    <div class="row">
        <div class="column"><label for="" style="display: flex;justify-content: center;">Date of Appointment: </label></div>
        <div class="column"><input type="text" bind:value={data.booking.date} readonly><p>YYYY/MM/DD</p></div>
    </div>
    <hr>
    <br>
    <div class="row">
        <div class="column"><label for="" style="display: flex;justify-content: center;">
            <label for="">Payment Status: </label>
        </div>
        <div class="column">
            {#if data.booking.isDownpaymentPaid === false}
                <input type="text" bind:value={statusNP} readonly>
            {/if}
            {#if data.booking.isDownpaymentPaid !== false}
                <input type="text" bind:value={statusP} readonly>
            {/if}
        </div>
    </div>

    {#if data.booking.isDownpaymentPaid === false && data.booking.paymentReferrencenumber === ""}
        <button on:click={gotoPayment}>Go to Down Payment</button>
        <button id="cancelBtn">Cancel Booking</button>
    {/if}
    {#if data.booking.isDownpaymentPaid === false && data.booking.paymentReferrencenumber !== ""}
        <h1>
            Reload to see update to payment status
        </h1>
        <h2>or</h2>
        <button on:click={gotoPayment}>Generate payment link again</button>
    {/if}
    {#if data.booking.isDownpaymentPaid === true}
        <p style="text-align: center;border: 1.5px solid rgb(102, 87, 0);background-color: rgba(0,0,0,0.8);color: whitesmoke;">You're paid and expected to come at the Date of Appointment</p>
        <button id="reschedBtn" on:click={reschedDialog}>Reschedule</button>
    {/if}
</main>
{#if resched == true}
    <div id="blur">
        <div id="reschedTab">
            <div class="rPanel" style="background-color: rgba(0,0,0,0.8);margin: 0px;color: whitesmoke;"> 
                <h1>Please choose a date to Reschedule</h1>
                <p>Note: You're only given 2 attempts at rescheduling</p>
            </div>
            <div class="rPanel">
                <label for="">Date:</label>
                <input type="date">
                <div style="width: 100%;display:flex;flex-direction:row;">
                    <button id="cancelRBtn" on:click={reschedDialog}>Cancel</button>
                    <button id="submitRBtn">Submit</button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');
    
    *{
        font-family: 'Oswald';
        font-weight: 400;
    }

    #statusForm {
        display: flex;
        justify-content: center;
        flex-direction: column;

		width: 500px;
		padding: 10px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
		
		border-radius: 10px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
    }
    h1{
        text-align: center;
    }
    h2{
        text-align: center;
    }
    p{
        width: auto;
        margin-left: 5px;

        font-size: 25px;
    }
    input{
        border: 1.5px solid rgb(102, 87, 0);
        background-color: rgba(0,0,0,0.8);
        color: whitesmoke;

        width: auto;
        margin-left: 5px;

        font-size: 25px;
    }
    label{
        color: whitesmoke;

        font-size: 25px;
    }
    hr{
        width: 95%;
        border: 1px solid rgba(230, 85, 1, 0.7);
		border-radius: 5px;
    }
    button{
		/* width: 20%; */
        margin-top: 5px;
        height: 90%;
		padding: 10px;
		color: whitesmoke;
		background-color: #4CAF50;
		border: solid 0px black;
		border-radius: 4px;
	}
	button:hover {
		background-color: #11ac16;
	}
    #cancelBtn {
        color: whitesmoke;
		background-color: #f44336;
    }
    #cancelBtn:hover {
        background-color: #f02113;
    }
    #reschedBtn {
        color: whitesmoke;
		background-color: #008CBA;
    }
    #reschedBtn:hover {
        background-color: #0066b9;
    }

    .column {
        /* border: 1px solid blue; */
        width: 50%;
    }
    .row {
        /* border: 1px solid rebeccapurple; */
        display: flex;
        justify-content: center;

        margin-bottom: 5px;
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
    #reschedTab {
        display: flex;
		flex-direction: row;
		align-items: center;

		background-color: #ff944d;
		border: 4px solid rgba(70, 28, 0, 0.8);
		border-radius: 10px;

    }
    #reschedTab p {
        font-size: 20px;
    }
    .rPanel input {
        background-color: rgb(228, 228, 228);
        color: black;
        margin: 5px 0px 5px 0px;
    }
    .rPanel label {
        color: black;
    }
    .rPanel {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 15px;

        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
    }
    #cancelRBtn, #submitRBtn{
        width: 100%;
        margin: 1px;
        font-size: 20px;
        margin-top: 10px;
    }
    #cancelRBtn {
        background-color: #f44336;
    }
    #cancelRBtn:hover {
        background-color: #f02113;
    }
    #submitRBtn {
        background-color: #4CAF50;
    }
	#submitRBtn:hover {
		background-color: #11ac16;
	}
</style>