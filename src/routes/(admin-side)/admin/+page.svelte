<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, getCountFromServer } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
	import { onDestroy } from "svelte";
    
    var date =  new Date();
    var dd = String(date.getDate()).padStart(2, '0'); 
    var ddt = String(date.getDate() + 1).padStart(2, '0'); 
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear(); 
    var newDate = yyyy + "-" + mm + "-" +dd;
    var tomDate = yyyy + "-" + mm + "-" +ddt; 

    let appointmentQuery = query(collection(db, "bookings"), where("date", "==", newDate))
    let listOfBooking = []
    let appointments = null
    let bookingCount = ""
    let todayBookingCount = ""
    let paidBookingCount 

    export let statusNP = "No payment";
    export let statusP = "Paid"

    async function getBookingcount() {
        const countQuery = query(collection(db, "bookings"))
        const countSnapshot = await getCountFromServer(countQuery)
        bookingCount = countSnapshot.data().count
    }
    async function getCurrentBookingcount() {
        const countQuery = query(collection(db, "bookings"), where("date", "==", newDate))
        const countSnapshot = await getCountFromServer(countQuery)
        todayBookingCount = countSnapshot.data().count
    }
    async function getPaidBookingcount() {
        const countQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", "==", true), where("date", "==", newDate))
        const countSnapshot = await getCountFromServer(countQuery)
        paidBookingCount = countSnapshot.data().count
    }
    async function getAppointments() {
        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            listOfBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()}))
        })
        onDestroy(() => unsubscribe())
    }
    getCurrentBookingcount()
    getPaidBookingcount()
    getBookingcount()
    $: getAppointments(appointmentQuery)
    // console.log(getAppointments())
</script>

<h1>Welcome, Admin!</h1>
<hr>
<div style="align-items: center; margin-top:20px;margin-left:30px;">
    <label for="">Bookings for Course: </label>
    <select>
        <option value="Practical Driving 2">Practical Driving 2</option>
    </select> 
</div>

<div id="panel">
    <div class="panelDisplay">
        <h2>Appointment Date (Today)</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{newDate}</p>
    </div>
    <div class="panelDisplay">
        <h2>Booked clients</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{todayBookingCount}</p>
    </div>
    <div class="panelDisplay">
        <h2>Paid clients</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{paidBookingCount}</p>
    </div>
    <div class="panelDisplay">
        <h2>Total number of Bookings</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{bookingCount}</p>
    </div>
</div>
<div style="display: flex; flex-direction: row;">
    <div>
        {#if listOfBooking === null}
        <h1>loading appointments</h1>
            {:else}
                {#if todayBookingCount === 0}
                <h1>There is Currently no Booking scheduled for this day</h1>
                {:else}
                <table id="appointmentTableToday">
                    <tr id="fieldname">
                    <th>ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Payment Status</th>
                    <th>Course</th>
                    </tr>
                    {#each listOfBooking as item}
                        <tr id="fields">
                            <td>{item.id}</td>
                            <td>{item.lastnameDisplay}</td>
                            <td>{item.firstnameDisplay}</td>
                            {#if item.middlename == ""}
                                <td>N/A</td>
                                {:else}
                                <td>{item.middlename}</td>
                            {/if}
                            {#if item.isDownpaymentPaid === false}
                                <td style="background-color: red;">{statusNP}</td>
                            {/if}
                            {#if item.isDownpaymentPaid !== false}
                            <td style="background-color: green;">{statusP}</td>
                            {/if}
                            <td>{item.course}</td>
                        </tr>
                    {/each}
                </table>
                <div style="margin: 20px;">
                    <div id="printPdf">
                        <button id="print">Print as PDF</button>
                    </div>
                </div>
                {/if}
                
        {/if}
    </div>
    <!-- <div style="display: flex; flex-direction: column;width:100%;">
        <div class="legendPanel">
            <h2>Legend</h2>
            <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
            <div style="display: flex; flex-direction: column;">
                <div class="legends">
                    <span style='background:red;'></span>
                    <p>Unpaid</p>
                </div>
                <div class="legends">
                    <span style='background:green;'></span>
                    <p>Paid</p>
                </div>
            </div>
        </div>
        <div style="margin: 20px;">
            <div id="printPdf">
                <button id="print">Print as PDF</button>
            </div>
        </div>
    </div> -->
    <!-- <div style="margin: 20px;">
        <div id="printPdf">
            <button id="print">Print as PDF</button>
        </div>
    </div> -->
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Lato');

    hr{
        border: 1px solid rgba(20, 20, 20, 0.7);
		border-radius: 5px;

        width: 98%;
    }
    p{
        font-size: 20px;
        margin-left: 10px;
    }
    h1{
        margin-left: 20px;
    }
    h2{
        margin-left: 10px;
        margin-bottom: 0;
    }
    select{
        width: 150px;
    }
    #panel{
        display: flex;
        flex-direction: row;

        margin-left: 20px;
        margin-right: 20px;
    }
    .panelDisplay{
        display: flex;
        justify-content: center;
        flex-direction: column;

		width: 100%;
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
    /* .legendPanel{
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        margin-right: 30px;

        padding: 10px;
        border-radius: 10px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
    }
    .legends{
        display: flex; 
        flex-direction: row;
        align-items: center;
        margin-left: 40px;
    }
    span {
        height: 16px;
        width: 30px;
        margin-right: 5px;
        margin-left: 0;
        border: 1px solid #999;
    } */
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

    #appointmentTableToday{
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        display: table;

        border-spacing: 0;

        width: 1000px;
        margin-left: 30px; 
        margin-right: 30px;
    }
    #fieldname{
        /* font-family: 'Helvetica Neue', Helvetica, Arial; */
        font-family: "lato", sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
        color: whitesmoke;
        background: #2b2b2b;

        letter-spacing: 0.03em;
    }
    #fields {
        display: table-row;
        background: #f6f6f6;
        line-height: 30px;
    }
    #fields:nth-of-type(odd) {
        background: #e9e9e9;
    }
    table tr:first-child th:first-child {
        border-top-left-radius: 7px;
    }  
    table tr:first-child th:last-child {
        border-top-right-radius: 7px;
    }
    table tr:last-child td:first-child {
        border-bottom-left-radius: 7px;
    }
    table tr:last-child td:last-child {
        border-bottom-right-radius: 7px;
    }
    td {
        font-family: "Helvetica Neue", Helvetica, Arial;
        text-align: center;
        padding: 6px 12px;
    }
</style>