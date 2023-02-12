<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, orderBy } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
    import { onDestroy } from "svelte"

    let sort
    let search 
    let searchValue 
    let searchLower 
    let sortStatus 
    let appointments = null
    let appointmentQuery = query(collection(db, "bookings"))
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
    $: getAppointments(appointmentQuery)
    // $:console.log(appointments)
</script>

<h1>Appointments</h1>
{#if listOfBooking === null}
    <h1>loading appointments</h1>
    {:else}
        <table cellspacing="3" bgcolor="#000000" style="margin-left: 10px; margin-right: 10px;">
            <tr bgcolor="#ffffff">
            <th>ID</th>
            <th>Date</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Payment Status</th>
            <th>Course</th>
            <th>Referrence No.</th>
            </tr>
            {#each listOfBooking as item}
                <tr bgcolor="#ffffff">
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.lastnameDisplay}</td>
                    <td>{item.firstnameDisplay}</td>
                    <td>{item.middlename}</td>
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
<div style="display: flex; flex-direction: row; margin: 20px;">
    <div class="functions">
        <label for="">Sort by: </label>
        <select name="" bind:value={sort} on:change={changeSortBy}>
            <option value="date">Date</option>
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
            <input type="date" bind:value={searchValue} on:change={searchByDate}
					min={new Intl.DateTimeFormat('fr-CA', {
						year: 'numeric',
						month: '2-digit',
						day: '2-digit'
					}).format(new Date(Date.now() + 3600 * 1000 * 24))}
					>
        {/if}
        {#if search === "firstname"}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>First Name: </label>
            <input type="text" bind:value={searchValue} on:input={searchByDate}>
        {/if}
        {#if search === "lastname"}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Last Name: </label>
            <input type="text" bind:value={searchValue} on:change={searchByDate}>
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
<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');

    h1{
        display: flex;
        justify-content: center;
    }

    .functions{
        margin: 10px;
    }
</style>