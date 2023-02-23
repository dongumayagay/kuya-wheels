<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, orderBy, limit, getDoc } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
    import { onDestroy } from "svelte"

    let appointments = null
    let appointmentQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", '==', true))
    let paymentQuery = query(collection(db, "payments"))
    let listOfBooking = []
    let listOfPayment = []
    let amount = "sample"
    let finalAmount = "P" + amount

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
<div style="align-items: center; margin-top:20px;margin-left:30px;">
    <label for="">Payments for Course: </label>
    <select>
        <option value="Practical Driving 3" selected>Practical Driving Course 3</option>
    </select> 
</div>
<br>
{#if listOfBooking === null}
    <h1>loading appointments</h1>
    {:else}
    <!-- cellspacing="3" bgcolor="#000000" -->
        <table id="paymentTable">
            <tr id="fieldname">
            <th>ID</th>
            <th>Date Paid</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Course</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            </tr>
            {#each listOfBooking as item}
                <tr id="fields">
                    <td>{item.id}</td>
                    <td>sample</td>
                    <td>{finalAmount}</td>
                    <td>sample</td>
                    <td>{item.course}</td>
                    <td>{item.lastnameDisplay}</td>
                    <td>{item.firstnameDisplay}</td>
                    {#if item.middlename == ""}
                        <td>N/A</td>
                        {:else}
                        <td>{item.middlename}</td>
                    {/if}
                    <td>{item.email}</td>
                    <td>{item.contactnumber}</td>
                </tr>
            {/each}
        </table>
        <div style="margin: 20px;">
            <div id="printPdf">
                <button id="print">Print as PDF</button>
            </div>
        </div>
{/if}

<style>
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