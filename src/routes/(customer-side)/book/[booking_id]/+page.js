import { db } from '$lib/firebase'
import { getDoc, doc } from 'firebase/firestore'
/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const docSnapshot = await getDoc(doc(db, "bookings", params.booking_id))
    const booking = {...docSnapshot.data(), id:docSnapshot.id}
    return {booking};
};