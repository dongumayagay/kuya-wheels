<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, orderBy, limit, getDoc, documentId } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
    import { onDestroy } from "svelte"
    // import { jsPDF } from 'jspdf'

    let sort
    let search 
    let searchValue 
    let searchLower 
    // let searchId
    let sortStatus = ""
    let appointments = null
    let appointmentQuery = query(collection(db, "bookings"), orderBy("date", 'asc'))
    let listOfBooking = []

    export let statusNP = "No payment";
    export let statusP = "Paid"

    async function getAppointments() {
        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            listOfBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()}))
        })
        onDestroy(() => unsubscribe())
    }
    async function clearFilter() {
        appointmentQuery = query(collection(db, "bookings"), orderBy("date", 'asc'))
        searchValue = null
        search = "date"
        sort = "date"
        sortStatus = ""
    }
    async function changeSortBy() {
        appointmentQuery = query(collection(db, "bookings"), orderBy(sort, 'asc'))
    }
    async function searchByDate() {
        searchLower = searchValue.toLowerCase() 
        appointmentQuery = query(collection(db, "bookings"), where(search, '>=', searchLower),  where(search, '<=', searchLower + '~'))
    }
    // async function searchById() {
    //     appointmentQuery = query(collection(db, "bookings"), where(searchId, '==', "id"))
    // }
    async function sortByPayment() {
        
        if (sortStatus === "true") {
            appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', true), orderBy("date", 'asc'))
        }else{
            appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', false), orderBy("date", 'asc'))
        }
    }
    // async function createReport(){
    //     const pdf = new jsPDF()
    //     const reportQuery =  query(collection(db, "bookings"))
    //     const reportSnapshot = await getDocs(reportQuery)
    //     let text = ""
    //     reportSnapshot.forEach(bookings => {
    //         text += `id: ${bookings.id}\n`
    //         text += `first: ${bookings.data().firstnameDisplay}\n\n`
    //     })

    //     pdf.text(text, 10, 18)
    //     pdf.save("test.pdf")

    //     pdf.table()
    // }
    $: getAppointments(appointmentQuery)
    // $:console.log(appointments)
</script>

<h1 style="margin:5px 0 5px 0;text-align:center;">Appointments</h1>
<hr style="border: 1px solid rgba(20, 20, 20, 0.7);width: 99%;">
<div style="align-items: center; margin-top:20px;margin-left:30px;">
    <label for="">Appointments for Course: </label>
    <select>
        <option value="Practical Driving 3" selected>Practical Driving Course 3</option>
    </select> 
</div>
<br>
<div style="display:flex;justify-content:space-between;flex-direction: row;align-items: center;margin:0 20px 0 20px;">
    <div class="functions" style="display:flex;flex-direction: row;">
        <label for="" class="functionLabel">Sort by:</label>
        <select name="" bind:value={sort} on:change={changeSortBy} class="functionSelect">
            <option value="date" selected>Date</option>
            <option value="firstname">First Name</option>
            <option value="lastname">Last Name</option>
        </select>
        <label for="" class="functionLabel" style="margin-left: 10px;">Search by:</label>
        <select name="" bind:value={search} class="functionSelect">
            <option value="date" selected>Date</option>
            <option value="firstname">First Name</option>
            <option value="lastname">Last Name</option>
            <option value="id">ID</option>
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
        {#if search === "id"}
            <input type="text" placeholder="ID" class="uInput">
        {/if}
    </div>
    <button on:click={clearFilter}>Clear Filter</button>
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
{/if}

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
</style>