<script>
	import { db } from '$lib/firebase'
    import { updateDoc, doc, getDoc } from 'firebase/firestore'

    /** @type {import('./$types').PageData} */
    export let data;

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
    const response = await fetch('https://api.paymongo.com/v1/links', options)
    const paymentLink = (await response.json()).data
    console.log(paymentLink)
    const docRef = doc(db, "bookings", data.booking.id)
    await updateDoc(docRef, {paymentReferrencenumber:paymentLink.attributes.reference_number})
    const docSnapshot = await getDoc(docRef)
    data.booking = {...docSnapshot.data(), id:docSnapshot.id}
    open(paymentLink.attributes.checkout_url)




    }

</script>

<pre>
    {JSON.stringify(data.booking, null, 2)}
    {data.booking.firstname}
</pre>

{#if data.booking.isDownpaymentPaid === false && data.booking.paymentReferrencenumber === ""}
    <button on:click={gotoPayment}>Go to Down Payment</button>
    
{/if}
{#if data.booking.isDownpaymentPaid === false && data.booking.paymentReferrencenumber !== ""}
    <h1>
        Reload to see update to payment status
    </h1>
    or
    <button on:click={gotoPayment}>Generate payment link again</button>
{/if}
{#if data.booking.isDownpaymentPaid === true}
    <p>You're paid and expected to come at this date {data.booking.date}</p>
{/if}
