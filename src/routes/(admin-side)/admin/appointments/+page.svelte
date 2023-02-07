<script>
    import { getDocs, query, collection } from "firebase/firestore"
    import { db } from "$lib/firebase.js"

    let appointments = null
    export let statusNP = "No payment";
    export let statusP = "Paid"

    async function getAppointments() {
        const snapshot = await getDocs(query(collection(db, "bookings")))
        appointments = snapshot.docs.map((item)=>{
            return {
                id:item.id,
                ...item.data()
            }
        })
    }
    getAppointments()
    // $:console.log(appointments)
</script>

<h1>appointments</h1>
{#if appointments === null}
    <h1>loading appointments</h1>
    {:else}
        <table cellspacing="3" bgcolor="#000000">
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
            {#each appointments as item}
                <tr bgcolor="#ffffff">
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
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
<!-- {#each appointments as item}
    <h1>{item}</h1>
{/each} -->