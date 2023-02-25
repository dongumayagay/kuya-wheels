<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, orderBy, limit, getDoc } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
    import { onDestroy } from "svelte"

    let appointments = null
    let appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', true), orderBy("date", 'asc'))
    let listOfBooking = []

    let search 
    let searchValue 
    let searchLower 

    async function clearFilter() {
        appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', true), orderBy("date", 'asc'))
        searchValue = null
        search = "date"
    }
    async function searchByDate() {
        searchLower = searchValue.toLowerCase()      
        appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", "==", true), where(search, '>=', searchLower),  where(search, '<=', searchLower + '~'), orderBy(search, 'asc'))
    }
    async function getAppointments() {
        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            listOfBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()}))
        })
        onDestroy(() => unsubscribe())
    }
    $: getAppointments(appointmentQuery)
</script>

<h1 style="margin:5px 0 5px 0;text-align:center;">Payments</h1>
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
    <button on:click={clearFilter} id="clearBtn">Clear Filter</button>
</div>    
{#if listOfBooking === null}
    <h1>loading appointments</h1>
    {:else}
    <!-- cellspacing="3" bgcolor="#000000" -->
        <table id="paymentTable">
            <tr id="fieldname">
            <th>ID</th>
            <th>Date</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Date Paid</th>
            <th>Amount</th>
            <th>Payment Method</th>
            </tr>
            {#each listOfBooking as item}
                <tr id="fields">
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.lastnameDisplay}</td>
                    <td>{item.firstnameDisplay}</td>
                    <td>
                        {#if item.middlename == ""}
                        N/A
                        {:else}
                        {item.middlename}
                        {/if}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.contactnumber}</td>
                    <td>{item.datePaid}</td>
                    <td>{"P"+item.amount}</td>
                    <td>{item.payMethod}</td>
                </tr>
            {/each}
        </table>
{/if}

<style>
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
    #clearBtn {
        padding: 5px;
    }
    #paymentTable{
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