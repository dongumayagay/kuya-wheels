import { db } from '$lib/firebase'
import { updateDoc, doc, getDoc, addDoc, collection } from 'firebase/firestore'

/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const docSnapshot = await getDoc(doc(db, "bookings", params.booking_id))
    let booking = {...docSnapshot.data(), id:docSnapshot.id}
    const referenceNumber = booking.paymentReferrencenumber

    if (referenceNumber !== "" && booking.isDownpaymentPaid === false){
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: 'Basic c2tfdGVzdF84cGozc3RFRlkydHhDenFTUnduSzJmelg6'
                }
            };
            const response = await fetch('https://api.paymongo.com/v1/links?reference_number='+referenceNumber, options)
            const paymentLink = (await response.json()).data[0]
            console.log(paymentLink)

            if (paymentLink.attributes.status === "paid"){
                await updateDoc(doc(db, "bookings", params.booking_id), {
                    isDownpaymentPaid:true,
                    payMethod:paymentLink.attributes.payments[0].data.attributes.source.type,
                    datePaid: new Date(paymentLink.attributes.payments[0].data.attributes.paid_at * 1000).toLocaleString(),
                    amount: paymentLink.attributes.amount * 0.01
                })

                await addDoc(collection(db, "payments"), paymentLink)
            }
    }
    return {booking};
};