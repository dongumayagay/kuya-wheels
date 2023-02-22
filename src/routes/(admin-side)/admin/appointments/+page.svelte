<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, orderBy, limit, getDoc } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
    import { onDestroy } from "svelte"
    import { jsPDF } from 'jspdf'

    let sort
    let search 
    let searchValue 
    let searchLower 
    let sortStatus 
    let appointments = null
    let appointmentQuery = query(collection(db, "bookings"), limit(15), orderBy("date", 'asc'))
    let listOfBooking = []

    export let statusNP = "No payment";
    export let statusP = "Paid"

    async function getAppointments() {
        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            listOfBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()}))
        })
        onDestroy(() => unsubscribe())
    }
    async function changeSortBy() {
        appointmentQuery = query(collection(db, "bookings"), orderBy(sort, 'asc'))
    }
    async function searchByDate() {
        searchLower = searchValue.toLowerCase() 
        appointmentQuery = query(collection(db, "bookings"), where(search, '>=', searchLower),  where(search, '<=', searchLower + '~'))
    }
    async function sortByPayment() {
        
        if (sortStatus === "true") {
            appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', true), orderBy("date", 'asc'))
        }else{
            appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', false), orderBy("date", 'asc'))
        }
    }
    async function createReport(){
        const pdf = new jsPDF()
        const reportQuery =  query(collection(db, "bookings"))
        const reportSnapshot = await getDocs(reportQuery)
        let text = ""
        reportSnapshot.forEach(bookings => {
            text += `id: ${bookings.id}\n`
            text += `first: ${bookings.data().firstnameDisplay}\n\n`
        })

        pdf.text(text, 10, 18)
        pdf.save("test.pdf")

        pdf.table()
    }
    $: getAppointments(appointmentQuery)
    // $:console.log(appointments)
</script>

<h1 style="margin:5px 0 5px 0;">Appointments</h1>
<hr style="border: 1px solid rgba(20, 20, 20, 0.7);width: 99%;">
<div style="align-items: center; margin-top:20px;margin-left:30px;">
    <label for="">Appointments for Course: </label>
    <select>
        <option value="Practical Driving 2" selected>Practical Driving 2</option>
    </select> 
</div>
<br>
<div style="display: flex; flex-direction: row; margin: 20px;">
    <div class="functions">
        <label for="">Sort by: </label>
        <select name="" bind:value={sort} on:change={changeSortBy}>
            <option value="date" selected>Date</option>
			<option value="firstname">First Name</option>
			<option value="lastname">Last Name</option>
        </select>   
    </div>
    <div class="functions">
        <label for="">Search by:</label>
        <select name="" bind:value={search}>
            <option value="date">Date</option>
			<option value="firstname">First Name</option>
			<option value="lastname">Last Name</option>
        </select>
        {#if search === "date"}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Date: </label>
            <input type="date" bind:value={searchValue} on:change={searchByDate}>
        {/if}
        {#if search === "firstname"}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>First Name: </label>
            <input type="text" bind:value={searchValue} on:input={searchByDate}>
        {/if}
        {#if search === "lastname"}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Last Name: </label>
            <input type="text" bind:value={searchValue} on:input={searchByDate}>
        {/if}
    </div>
    <div class="functions">
        <label for="">Show Payment status: </label>
        <select name="" bind:value={sortStatus} on:change={sortByPayment} id="">
            <option value="true">Paid</option>
			<option value="false" selected>No Payment</option>
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
                </tr>
            {/each}
        </table>
        <div style="margin: 20px;">
            <div id="printPdf">
                <button id="print" on:click={createReport}>Print as PDF</button>
            </div>
        </div>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Lato');
    h1{
        display: flex;
        justify-content: center;
    }

    .functions{
        margin: 10px;
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