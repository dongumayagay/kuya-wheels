<script>
	import { getCountFromServer, collection, query, where } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { getContext } from 'svelte';
	export let dayNumber;
	export let month;
	export let year;
	$: dateString = new Date(`${year}-${month}-${dayNumber}`).toLocaleDateString('fr-CA');
	
    let bookCount
	let isThereEvent = false;
	async function checkIfExistingEvent(dateString) {
		const querySnapshot = await getCountFromServer(
			query(collection(db, 'bookings'), where('date', '==', dateString), where("isDownpaymentPaid", "==", true))
		);
        bookCount = querySnapshot.data().count
        if (bookCount >= 10) {
            isThereEvent = true
        }
	}
	
	$: checkIfExistingEvent(dateString);
</script>

{#if isThereEvent === true && bookCount >= 10}
	<button style="background-color: green;" class="dayBtn">{dayNumber}</button>
	{:else}
	<button class="dayBtn">{dayNumber}</button>
{/if}

<style>
	.dayBtn {
		width: 14%;
		padding: 30px 10px 30px 10px;
	}
</style>
<!-- <button style="width: 13.6;"
	class:bg-green-500={isThereEvent}
>
	{dayNumber}
</button> -->