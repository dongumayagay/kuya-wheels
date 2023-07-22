<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, orderBy, limit, getDoc, documentId } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
    import { sendEmail } from "$lib/utils.js"
    import { onDestroy } from "svelte"
    import { page } from '$app/stores'
    // import { jsPDF } from 'jspdf'

    let search 
    let searchValue 
    let searchLower 
    let sortStatus = ""
    let appointments = null
    let appointmentQuery = query(collection(db, "bookings"), orderBy("date", 'asc'))
    let listOfBooking = []

    let currentPage = 1;
	let pageSize = 10;
	let totalRecords = 1;
	let totalPages = 0;

    export let statusNP = "No payment";
    export let statusP = "Paid"

    async function getAppointments(appointmentQuery, page, pageSize) {
        const startIndex = (page - 1) * pageSize;
	    const endIndex = startIndex + pageSize;

        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            listOfBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()})).slice(startIndex, endIndex)
        })
        onDestroy(() => unsubscribe())
    }
    async function resendEmail(email, id) {
        const choice = confirm("Resend Email to " + email + "?")
		console.log(choice)

		if (choice) {
			await sendEmail({
                to: email,
                subject: 'Appointment Status Link',
                html: `
                <h1>Hello Applicant!</h1>
                <h3>
                    (This is a Reminder from the Admin of Kuya Wheels Driving School)
                    <br>
                    Your booking for Kuya Wheels Driving School has been confirmed. 
                    You can check the status of your booking here:
                </h3>
                <a href="${$page.url.origin}/book/${id}"><h1>Appointment Status</h1></a>
                <br>
                <h3>
				Thank you for showing interest in our program, which is designed to equip individuals like yourself with
				advanced driving skills and techniques for specific vehicle categories.
				<br>
				The PDC 3 is an excellent opportunity for you
				to enhance your driving abilities and obtain a professional driver's license in the Philippines.
				<br>
				Once enrolled, you will benefit from a comprehensive curriculum that covers both theoretical knowledge 
				and practical training. 
				<br>
				Our experienced instructors will guide you through essential and important topics such as traffic 
				rules and regulations, defensive driving strategies, vehicle maintenance, and road safety.
				<br>
				Through hands-on practice, you will gain confidence in handling specific vehicle categories, mastering advanced 
				maneuvers, and navigating various road conditions.
			</h3>
			<br>
			<h4>
				We are here to assist you throughout the application process and address any concerns you may have.
				<br>
				If you have any questions or require further information, please don't hesitate to reach out to kuyawheelsmain@gmail.com. 
			</h4>
                `
            })
            alert("Email sent successfully")
		}
        
    }
    async function clearFilter() {
        appointmentQuery = query(collection(db, "bookings"), orderBy("date", 'asc'))
        searchValue = null
        search = "date"
        sortStatus = ""
    }
    async function searchByDate() {
        searchLower = searchValue.toLowerCase()      
        appointmentQuery = query(collection(db, "bookings"), where(search, '>=', searchLower),  where(search, '<=', searchLower + '~'), orderBy(search, 'asc'))
    }
    async function sortByPayment() {
        
        if (sortStatus === "true") {
            appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', true), orderBy("date", 'asc'))
        }else{
            appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', false), orderBy("date", 'asc'))
        }
    }
    $: {getAppointments(appointmentQuery, currentPage, pageSize)
        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            totalRecords = querySnapshot.docs.length
            totalPages = Math.ceil(totalRecords / pageSize)
        })
        onDestroy(() => unsubscribe())
    }
    function gotoPages(page) {
        currentPage = page
    }

</script>

<h1 style="margin:5px 0 5px 0;text-align:center;">Appointments</h1>
<hr style="border: 1px solid rgba(20, 20, 20, 0.7);width: 99%;">
<br>
<div style="display:flex;justify-content:space-between;flex-direction: row;align-items: center;margin:0 20px 0 20px;">
    <div class="functions" style="display:flex;flex-direction: row;">
        <label for="" class="functionLabel">Search by:</label>
        <select name="" bind:value={search} class="functionSelect">
            <option value="date" selected>Date</option>
            <option value="firstname">First Name</option>
            <option value="lastname">Last Name</option>
        </select>
        {#if search === "date"}
            <input type="date" bind:value={searchValue} on:change={searchByDate} class="uInput">
        {/if}
        {#if search === "firstname"}
            <input type="text" bind:value={searchValue} placeholder="Input First Name" on:input={searchByDate} class="uInput">
        {/if}
        {#if search === "lastname"}
            <input type="text" bind:value={searchValue} placeholder="Input Last Name" on:input={searchByDate} class="uInput">
        {/if}
    </div>
    <button on:click={clearFilter} style="padding:5px;">Clear Filter</button>
    <div class="functions" style="display:flex;flex-direction: row;">
        <label for=""  class="functionLabel">Show Payment status:</label>
        <select name="" bind:value={sortStatus} on:change={sortByPayment}  class="functionSelect">
            <option value="true">Paid</option>
            <option value="false">No Payment</option>
        </select> 
    </div>
</div>

{#if listOfBooking === null}
    <h1>loading appointments</h1>
    {:else}
    <!-- cellspacing="3" bgcolor="#000000" -->
        <table id="appointmentTable">
            <tr id="fieldname">
            <th>ID</th>
            <th>Date</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Payment Status</th>
            <th>Course</th>
            <th></th>
            </tr>
            {#each listOfBooking as item}
                <tr id="fields">
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.lastnameDisplay}</td>
                    <td>{item.firstnameDisplay}</td>
                    {#if item.middlename == ""}
                        <td>N/A</td>
                        {:else}
                        <td>{item.middlename}</td>
                    {/if}
                    <td>{item.email}</td>
                    <td>{item.contactnumber}</td>
                    <td>
                        {#if item.isDownpaymentPaid === false}
                            {statusNP}
                        {/if}
                        {#if item.isDownpaymentPaid !== false}
                            {statusP}
                        {/if}
                    </td>
                    <td>{item.course}</td>
                    <td><button on:click={resendEmail(item.email, item.id)} id="resendEmailBtn">Resend</button></td>
                </tr>
            {/each}
        </table>
{/if}
<div id="paginationBase">
    {#if currentPage > 1}
        <button class="directBtn" on:click={() => gotoPages(currentPage - 1)}>
            Previous
        </button>
	{/if}

	{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
		{#if page === currentPage}
            <button class="currentBtn">{page}</button>
		{:else if (page >= currentPage - 2 && page <= currentPage + 2) || page === totalPages || page === 1}
            <button class="numBtn" on:click={() => gotoPages(page)}>
                {page}
            </button>
		{:else if page === currentPage - 3 || page === currentPage + 3}
            <span class="dotdotdot">...</span>
		{/if}
	{/each}

	{#if currentPage < totalPages}
        <button class="directBtn" on:click={() => gotoPages(currentPage + 1)}>
            Next
        </button>
	{/if}
</div>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Lato');

    .functions{
        margin: 10px;
    }
    .uInput {
        border: rgba(0,0,0,0.46);
        border-radius: 8px;
        width: 200px;
        height: 20px;
        padding: 10px;
        margin-left: 10px;
        box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
        -webkit-box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
        -moz-box-shadow: -1px 1px 6px 0px rgba(0,0,0,0.46);
    }
    .functionLabel {
        background-color: #2b2b2b;
        color: whitesmoke;

        font-size: 18px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;

        padding: 5px;
    }
    .functionSelect {
        border: rgba(0,0,0,0.46);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;

        width: 170px;
        height: 40px;
        padding: 10px;
        box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.46);
        -webkit-box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.46);
        -moz-box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.46);
    }

    #appointmentTable{
        border-spacing: 0;

        margin: 10px;
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
        padding: 20px
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
    #resendEmailBtn {
        border: 0;
        border-radius: 5px;
        color: whitesmoke;
        padding: 5px;
        background-color: #4CAF50;
    }
    #resendEmailBtn:hover{
        background-color: #11ac16;
        cursor: pointer;
    }

    .currentBtn, .numBtn, .directBtn {
        cursor: pointer;
        padding: 5px 10px 5px 10px;
        border: 1px solid rgba(0,0,0,0.46);
        border-radius: 5px;
        margin-left: 3px;
        margin-right: 3px;
    }
    #paginationBase {
        margin: 10px auto 20px auto;
        display: flex;
    }
    .directBtn {
        cursor: pointer;
        border: 0;
        background-color: rgba(0,0,0,0.6);
        border-radius: 5px;
        margin-left: 10px;
        margin-right: 10px;
        color: whitesmoke;
    }
    .currentBtn {
        color: whitesmoke;
        background-color: rgba(0,0,0,0.6);
        border: 0;
    }
    .dotdotdot {
        padding: 5px;
        margin-left: 3px;
        margin-right: 3px;
    }
</style>