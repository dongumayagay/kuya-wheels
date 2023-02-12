<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, getCountFromServer } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
	import { onDestroy } from "svelte";
    
    var date =  new Date();
    var dd = String(date.getDate()).padStart(2, '0'); 
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear(); 
    var newDate = yyyy + "-" + mm + "-" +dd;

    let appointmentQuery = query(collection(db, "bookings"), where("date", "==", newDate))
    let listOfBooking = []
    let appointments = null
    let bookingCount = ""

    export let statusNP = "No payment";
    export let statusP = "Paid"

    async function getBookingcount() {
        const countQuery = query(collection(db, "bookings"))
        const countSnapshot = await getCountFromServer(countQuery)
        bookingCount = countSnapshot.data().count
    }
    async function getAppointments() {
        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            listOfBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()}))
        })
        onDestroy(() => unsubscribe())
    }
    getBookingcount()
    $: getAppointments(appointmentQuery)
    // console.log(getAppointments())
</script>

<h1>Welcome, Admin!</h1>
<hr>
<div id="panel">
    <div class="panelDisplay">
        <h2>Appointment Date (Today)</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{newDate}</p>
    </div>
    <div class="panelDisplay">
        <h2>Number of booked client</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{bookingCount}</p>
    </div>
    <div class="panelDisplay">
        <h2>Paid clients</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>sample</p>
    </div>
</div>
<div>
    <div>
        {#if listOfBooking === null}
        <h1>loading appointments</h1>
            {:else}
                <table cellspacing="3" bgcolor="#000000" style="margin-left: 30px; margin-right: 10px;">
                    <tr bgcolor="#ffffff">
                    <th>ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Payment Status</th>
                    <th>Course</th>
                    <th>Referrence No.</th>
                    </tr>
                    {#each listOfBooking as item}
                        <tr bgcolor="#ffffff">
                            <td>{item.id}</td>
                            <td>{item.lastname}</td>
                            <td>{item.firstname}</td>
                            <td>{item.middlename}</td>
                            {#if item.isDownpaymentPaid === false}
                                <td style="background-color: red;">{statusNP}</td>
                            {/if}
                            {#if item.isDownpaymentPaid !== false}
                            <td style="background-color: green;">{statusP}</td>
                            {/if}
                            <!-- <td>
                                {#if item.isDownpaymentPaid === false}
                                    {statusNP}
                                {/if}
                                {#if item.isDownpaymentPaid !== false}
                                    {statusP}
                                {/if}
                            </td> -->
                            <td>{item.course}</td>
                            <td>
                                {#if item.paymentReferrencenumber === ""}
                                    UNPAID
                                {/if}
                                {#if item.paymentReferrencenumber !== ""}
                                    {item.paymentReferrencenumber}
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </table>
        {/if}
    </div>
</div>
<div style="margin: 20px;">
    <div id="printPdf">
        <button id="print">Print as PDF</button>
    </div>
</div>

<style>
    table{
        flex: 1;
        font-size: 20px;
    }
    hr{
        border: 1px solid rgba(20, 20, 20, 0.7);
		border-radius: 5px;

        width: 98%;
    }
    h1{
        margin-left: 20px;
    }
    h2{
        margin-left: 10px;
        margin-bottom: 0;
    }
    #panel{
        display: flex;
        flex-direction: row;

        margin-left: 20px;
    }
    .panelDisplay{
        display: flex;
        justify-content: center;
        flex-direction: column;

		width: 300px;
		padding: 10px;
        margin: 5px;
        margin-top: 20px;
        margin-bottom: 20px;
		
		border-radius: 10px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
    }
    #print{
        font-family: 'Oswald';
        font-weight: 400;
        font-size: 30px;
        color: whitesmoke;

        background-color: rgb(143, 0, 0);
        border: 1px solid rgb(54, 26, 26);
        border-radius: 5px;

        margin-left: 10px;
    }
	#print:hover {
		background-color: #c70000;
	}
</style>