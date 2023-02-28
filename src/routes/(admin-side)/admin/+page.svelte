<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, getCountFromServer } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
	import { onDestroy } from "svelte";
    import { jsPDF } from 'jspdf'
    import DayButton from './DayButton.svelte';

    let date =  new Date();
    let dd = String(date.getDate()).padStart(2, '0'); 
    // let ddt = String(date.getDate() + 1).padStart(2, '0'); 
    let mm = String(date.getMonth() + 1).padStart(2, '0'); 
    let yyyy = date.getFullYear(); 
    let newDate = yyyy + "-" + mm + "-" +dd;
    let todayBtn = "<"
    let tomorrowBtn = ">"

    let d = new Date() // month is 0-based in the Date constructor
    d.setDate(d.getDate() + 1)

    let tomDate = d.toLocaleDateString('fr-CA')
    // tomorrow.toISOString().slice(0, 10);
    // tomorrow.toLocaleDateString('fr-CA');

    let appointmentQuery = query(collection(db, "bookings"), where("date", "==", newDate))
    let appointmentTomQuery = query(collection(db, "bookings"), where("date", "==", tomDate))
    let listOfBooking = []
    let listOfTomorrowBooking = []
    let appointments = null
    let bookingCount = ""
    let todayBookingCount = ""
    let paidBookingCount 
    let tomorrowBookingCount = ""
    let paidTomorrowBookingCount
    let dday = "today"

    export let statusNP = "No payment";
    export let statusP = "Paid"
	
	const daysOfTheWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	let currentYear = date.getFullYear();
	let currentMonth = date.getMonth() + 1;
	$: daysInCurrentMonth = getHowManyDaysInAMonth(currentYear, currentMonth);
	$: dayOfTheWeekOfTheFirstDayOfTheMonth = getDayOfTheWeekOfTheFirstDayOfTheMonth(
		currentYear,
		currentMonth
	);
	$: console.log(currentMonth);
	const previousMonth = () => {
		currentMonth -= 1;
		if (currentMonth < 1) {
			currentMonth = 12;
			currentYear -= 1;
		}
	};
	const nextMonth = () => {
		currentMonth += 1;
		if (currentMonth > 12) {
			currentMonth = 1;
			currentYear += 1;
		}
	};
	const getHowManyDaysInAMonth = (year, month) => new Date(year, month, 0).getDate();
	const getDayOfTheWeekOfTheFirstDayOfTheMonth = (year, month) =>
		new Date(year, month - 1, 1).getDay();
    async function switchDay() {
        if (dday == "today") {
            dday = "tomorrow"
            return
        }
        if (dday == "tomorrow") {
            dday = "today"
            return
        }
    }

    async function getBookingcount() {
        const countQuery = query(collection(db, "bookings"))
        const countSnapshot = await getCountFromServer(countQuery)
        bookingCount = countSnapshot.data().count
    }
    async function getCurrentBookingcount() {
        const countQuery = query(collection(db, "bookings"), where("date", "==", newDate))
        const countSnapshot = await getCountFromServer(countQuery)
        todayBookingCount = countSnapshot.data().count
    }
    async function getPaidBookingcount() {
        const countQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", "==", true), where("date", "==", newDate))
        const countSnapshot = await getCountFromServer(countQuery)
        paidBookingCount = countSnapshot.data().count
    }

    async function getTomorrowBookingcount() {
        const countQuery = query(collection(db, "bookings"), where("date", "==", tomDate))
        const countSnapshot = await getCountFromServer(countQuery)
        tomorrowBookingCount = countSnapshot.data().count
    }
    async function getPaidTomorrowBookingcount() {
        const countQuery = query(collection(db, "bookings"), where("isDownpaymentPaid", "==", true), where("date", "==", tomDate))
        const countSnapshot = await getCountFromServer(countQuery)
        paidTomorrowBookingCount = countSnapshot.data().count
    }

    async function getAppointments() {
        const unsubscribe = onSnapshot(appointmentQuery, (querySnapshot) => {
            listOfBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()}))
        })
        onDestroy(() => unsubscribe())
    }

    async function getTomorrowAppointments() {
        const unsubscribe = onSnapshot(appointmentTomQuery, (querySnapshot) => {
            listOfTomorrowBooking = querySnapshot.docs.map((item) => ({id:item.id, ...item.data()}))
        })
        onDestroy(() => unsubscribe())
    }
    async function createReportToday(){

        const pdf = new jsPDF()
        const reportQuery =  query(collection(db, "bookings"), where("date", "==", newDate))
        const reportSnapshot = await getDocs(reportQuery)
        let text = ""
        reportSnapshot.forEach(bookings => {
            text += `ID: ${bookings.id}\n`
            text += `Last Name: ${bookings.data().lastnameDisplay}\n`
            text += `First Name: ${bookings.data().firstnameDisplay}\n`
            text += `Middle Name: ${bookings.data().middlename}\n`
            text += `Payment Satus: ${bookings.data().isDownpaymentPaid}\n`
            text += `Course: ${bookings.data().course}\n\n`
        })

        pdf.text(text, 10, 18)
        pdf.save("test.pdf")
    }
    async function createReportTomorrow(){

        const pdf = new jsPDF()
        const reportQuery =  query(collection(db, "bookings"), where("date", "==", tomDate))
        const reportSnapshot = await getDocs(reportQuery)
        let text = ""
        reportSnapshot.forEach(bookings => {
            text += `ID: ${bookings.id}\n`
            text += `Last Name: ${bookings.data().lastnameDisplay}\n`
            text += `First Name: ${bookings.data().firstnameDisplay}\n`
            text += `Middle Name: ${bookings.data().middlename}\n`
            text += `Payment Satus: ${bookings.data().isDownpaymentPaid}\n`
            text += `Course: ${bookings.data().course}\n\n`
        })

        pdf.text(text, 10, 18)
        pdf.save("test.pdf")

        pdf.table()
    }

    getTomorrowBookingcount()
    getPaidTomorrowBookingcount()
    $: getTomorrowAppointments(appointmentTomQuery)

    getCurrentBookingcount()

    getPaidBookingcount()
    getBookingcount()
    $: getAppointments(appointmentQuery)
    // console.log(getAppointments())
</script>



<h1>Welcome, Admin!</h1>
<hr>
<div style="display:flex;flex-direction: row;justify-content:flex-start; margin-top:20px;margin-left:30px;">
    <label for="" class="categoryLabel">Bookings for Course: </label>
    <select class="categorySelect">
        <option value="Practical Driving Course 3">Practical Driving Course 3</option>
    </select> 
</div>
{#if dday == "tomorrow"}
<div id="panel">
    <div class="panelDisplay">
        <h2>Appointment Date</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{tomDate}</p>
    </div>
    <div class="panelDisplay">
        <h2>Booked clients</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{tomorrowBookingCount}</p>
    </div>
    <div class="panelDisplay">
        <h2>Paid clients</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{paidTomorrowBookingCount}</p>
    </div>
    <div class="panelDisplay">
        <h2>Total number of Bookings</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{bookingCount}</p>
    </div>
</div>
{:else}
<div id="panel">
    <div class="panelDisplay">
        <h2>Appointment Date</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{newDate}</p>
    </div>
    <div class="panelDisplay">
        <h2>Booked clients</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{todayBookingCount}</p>
    </div>
    <div class="panelDisplay">
        <h2>Paid clients</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{paidBookingCount}</p>
    </div>
    <div class="panelDisplay">
        <h2>Total number of Bookings</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{bookingCount}</p>
    </div>
</div>
{/if}
<hr>
{#if dday == "tomorrow"}
<div style="display: flex; flex-direction: row; padding-top:10px; margin:1px;">
    <div style="width:100%;padding: 0px 20px 0px 20px;">
        <div style="display: flex; justify-content: space-between;">
            <h1 style="margin-top: 0;margin-bottom:20px;margin-left:10px;">Appointments for Tomorrow</h1>
            <button class="arrowBtn" on:click={switchDay}>{todayBtn}</button>
        </div>
        {#if listOfTomorrowBooking === null}
        <h1>loading appointments</h1>
            {:else}
                {#if tomorrowBookingCount === 0}
                <h1>There is Currently no Booking scheduled for this day</h1>
                {:else}
                <table id="appointmentTableToday">
                    <tr id="fieldname">
                    <th>ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Payment Status</th>
                    <th>Course</th>
                    </tr>
                    {#each listOfTomorrowBooking as item}
                        <tr id="fields">
                            <td>{item.id}</td>
                            <td>{item.lastnameDisplay}</td>
                            <td>{item.firstnameDisplay}</td>
                            {#if item.middlename == ""}
                                <td>N/A</td>
                                {:else}
                                <td>{item.middlename}</td>
                            {/if}
                            {#if item.isDownpaymentPaid === false}
                                <td style="background-color: red;">{statusNP}</td>
                            {/if}
                            {#if item.isDownpaymentPaid !== false}
                            <td style="background-color: green;">{statusP}</td>
                            {/if}
                            <td>{item.course}</td>
                        </tr>
                    {/each}
                </table>
                <div style="margin: 20px 20px 20px 10px;">
                    <div id="printPdf">
                        <button id="print" on:click={createReportTomorrow}>Print as PDF</button>
                    </div>
                </div>
                {/if}
                
        {/if}
    </div>
    <!-- legend placement -->
</div>
{:else}
<div style="display: flex; flex-direction: row; padding-top:10px; margin:1px;">
    <div style="width:100%;padding: 0px 20px 0px 20px;">
        <div style="display: flex; justify-content: space-between;">
            <h1 style="margin-top: 0;margin-bottom:20px;margin-left:10px;">Appointments for Today</h1>
            <button class="arrowBtn" on:click={switchDay}>{tomorrowBtn}</button>
        </div>
        {#if listOfBooking === null}
        <h1>loading appointments</h1>
            {:else}
                {#if todayBookingCount === 0}
                <h1>There is Currently no Booking scheduled for this day</h1>
                {:else}
                <table id="appointmentTableToday">
                    <tr id="fieldname">
                    <th>ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Payment Status</th>
                    <th>Course</th>
                    </tr>
                    {#each listOfBooking as item}
                        <tr id="fields">
                            <td>{item.id}</td>
                            <td>{item.lastnameDisplay}</td>
                            <td>{item.firstnameDisplay}</td>
                            {#if item.middlename == ""}
                                <td>N/A</td>
                                {:else}
                                <td>{item.middlename}</td>
                            {/if}
                            {#if item.isDownpaymentPaid === false}
                                <td style="background-color: red;">{statusNP}</td>
                            {/if}
                            {#if item.isDownpaymentPaid !== false}
                            <td style="background-color: green;">{statusP}</td>
                            {/if}
                            <td>{item.course}</td>
                        </tr>
                    {/each}
                </table>
                <div style="margin: 20px 20px 20px 10px;">
                    <div id="printPdf">
                        <button id="print" on:click={createReportToday}>Print as PDF</button>
                    </div>
                </div>
                {/if}
                
        {/if}
    </div>
    <!-- legend placement -->
</div>
{/if}
<hr>
<div id="calendarBase">
	<div id="calendar">
		<section>
			<div class="navBase">
				<div class="navStart">
					<button on:click={previousMonth} class="calBtn">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>
					</button>
				</div>
				<div class="navCenter">
					<h1 class="text-xl normal-case">{monthNames[currentMonth - 1]} {currentYear}</h1>
				</div>
				<div class="navEnd">
					<button on:click={nextMonth} class="calBtn">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
					</button>
				</div>
			</div>
			<main class="daysCal">
                <div style="display: flex;flex-direction:row;">
                    {#each daysOfTheWeek as day}
                        <button class="weekdays" disabled>
                            {day}
                        </button>
                    {/each}
                </div>
				<div style="display: flex;flex-direction:row;flex-wrap:wrap;">
                    {#each { length: dayOfTheWeekOfTheFirstDayOfTheMonth } as _}
                        <button class="dayDisable" />
                    {/each}
                    {#each { length: daysInCurrentMonth } as _, i}
                        <DayButton dayNumber={i + 1} month={currentMonth} year={currentYear} />
                    {/each}
                </div>
			</main>
		</section>
	</div>

    <div style="display: flex; flex-direction: column;width:25%;">
        <h1 style="text-align: center;margin:20px 0 20px 0;">Calendar</h1>
        <div class="legendPanel">
            <h2>Legend</h2>
            <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
            <div style="display: flex; flex-direction: column;">
                <div class="legends">
                    <span style='background:white;'></span>
                    <p>Available</p>
                </div>
                <div class="legends">
                    <span style='background:green;'></span>
                    <p>Fully Booked</p>
                </div>
                <p>(Fully booked if there are 10 or more paid clients)</p>
            </div>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css?family=Lato');

    hr{
        border: 1px solid rgba(20, 20, 20, 0.7);
		border-radius: 5px;

        width: 98%;
    }
    p{
        font-size: 20px;
        margin-left: 10px;
    }
    h1{
        margin-left: 20px;
    }
    h2{
        margin-left: 10px;
        margin-bottom: 0;
    }
    select{
        width: 150px;
    }
    #calendarBase {
        display: flex;
        margin: 20px;
    }
    #calendar {
        width: 100%;
        font-family: "lato", sans-serif;
        font-weight: 400;
    }
    .navBase{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 98%;
        background: #2b2b2b;
        color: whitesmoke;
    }
    .weekdays{
        font-family: "lato", sans-serif;
        font-weight: 400;
        font-size: 20px;
        background-color: #999;
        color: black;
        width: 14%;
        padding: 20px 5px 20px 5px;
    }
    .dayDisable {
        width: 14%;
		padding: 30px 5px 30px 5px;
    }
    .daysCal {
        display: flex;
        flex-direction: column;
    }
    .calBtn {
        background: #2b2b2b;
        border: 0px;
        color: whitesmoke;

        width: 50px;
        height: 100%;
    }
    .calBtn:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
    }
    .categoryLabel {
        background-color: #2b2b2b;
        color: whitesmoke;

        font-size: 18px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;

        padding: 5px;
    }
    .categorySelect {
        border: rgba(0,0,0,0.46);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;

        width: auto;
        height: 40px;
        padding: 10px;
        box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.46);
        -webkit-box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.46);
        -moz-box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.46);
    }
    #panel{
        display: flex;
        flex-direction: row;

        margin-left: 20px;
        margin-right: 20px;
    }
    .panelDisplay{
        display: flex;
        justify-content: center;
        flex-direction: column;

		width: 100%;
		padding: 10px;
        margin: 5px;
        margin-top: 20px;
        margin-bottom: 20px;
		
		border-radius: 10px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
    }
    .legendPanel{
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;

        padding: 10px;
        border-radius: 10px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
    }
    .legends{
        display: flex; 
        flex-direction: row;
        align-items: center;
        margin-left: 40px;
    }
    span {
        height: 16px;
        width: 30px;
        margin-right: 5px;
        margin-left: 0;
        border: 1px solid #999;
    }
    .arrowBtn{
        font-family: 'Oswald';
        font-weight: 400;
        font-size: 25px;

        background-color: #ff9318;
        color: whitesmoke;
        border-radius: 10px;
        border: 1px solid rgb(255, 194, 115);

        height: 60%;
        margin: 10px 5px 5px 5px;
        padding: 0px 15px 5px 15px;
    }
    .arrowBtn:hover{
        background-color: #f0850b;
        cursor: pointer;
    }
    #print{
        font-family: 'Oswald';
        font-weight: 400;
        font-size: 30px;
        color: whitesmoke;

        background-color: rgb(143, 0, 0);
        border: 1px solid rgb(54, 26, 26);
        border-radius: 5px;
    }
	#print:hover {
		background-color: #c70000;
	}

    #appointmentTableToday{
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        display: table;

        border-spacing: 0;

        width: 100%;
        margin-right: 30px;
    }
    #fieldname{
        /* font-family: 'Helvetica Neue', Helvetica, Arial; */
        font-family: "lato", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 40px;
        color: whitesmoke;
        background: #2b2b2b;

        letter-spacing: 0.03em;
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