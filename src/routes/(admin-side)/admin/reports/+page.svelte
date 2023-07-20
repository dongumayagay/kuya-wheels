<script>
    import { getDocs, query, collection, serverTimestamp, onSnapshot, QuerySnapshot, doc, where, getCountFromServer, Timestamp } from "firebase/firestore"
    import { db } from "$lib/firebase.js"
	import { onDestroy, onMount } from "svelte";

    let today = new Date()
    let appointmentss = [];
    let appointmentsToday 
    let appointmentsThisMonth
    let appointmentsThisWeek 
    let paymentToday 
    let paymentThisMonth
    let paymentThisWeek 
    let salesToday = 0
    let salesThisMonth = 0
    let salesThisWeek = 0
    let totalSales = 0

    onMount(async ()=>{
        const today = Timestamp.now();
        let todayDate = new Date()
        let todayMillis = new Date().valueOf();
        let daySpan = todayMillis - 86400000;
        console.log(todayDate)

        const sundayMillis = new Date(todayDate.setDate(todayDate.getDate() - todayDate.getDay())).valueOf();
        const saturdayMillis = new Date(todayDate.setDate(todayDate.getDate() - todayDate.getDay() + 6)).valueOf();

        const currentYear = new Date('01/01/' + today.toDate().getFullYear());
        const getAppointments = onSnapshot(collection(db, "bookings"), (querySnapshot)=>{
            appointmentss = querySnapshot.docs.map((doc)=>({
                ...doc.data(), 
                appointmentId: doc.id
            }))
            // console.log(appointmentss)
            appointmentsToday = appointmentss.filter(appointment => {
                return new Date(appointment.date).valueOf() > daySpan && new Date(appointment.date).getDate() === new Date().getDate()
            })
            // console.log(appointmentsToday)

            appointmentsThisWeek = appointmentss.filter(appointment => {
                return new Date(appointment.date).valueOf() >= sundayMillis && new Date(appointment.date).valueOf() <= saturdayMillis
            })
            // console.log(appointmentsThisWeek)

            appointmentsThisMonth = appointmentss.filter(appointment => {
                return new Date(appointment.date).getMonth() == todayDate.getMonth()
            })
            // console.log(appointmentsThisMonth)

            paymentToday = appointmentsToday.filter(appointment=> appointment.isDownpaymentPaid)
            // console.log(paymentToday)

            paymentThisWeek = appointmentsThisWeek.filter(appointment=> appointment.isDownpaymentPaid)
            // console.log(paymentThisWeek)

            paymentThisMonth = appointmentsThisMonth.filter(appointment=> appointment.isDownpaymentPaid)
            // console.log(paymentThisMonth)

            paymentToday.map((sales)=> {
                salesToday += sales.amount
            }) 
            paymentThisWeek.map((sales)=> {
                salesThisWeek += sales.amount
            })
            paymentThisMonth.map((sales)=> {
                salesThisMonth += sales.amount
            })
            appointmentss.map((appointment)=> {
                if (appointment.isDownpaymentPaid) {
                    totalSales += appointment.amount
                } 
            })

        })
    })
</script>

<h1>Appointment Reports</h1>
<hr>
<div id="panel">
    <div class="panelDisplay">
        <h2>Appointments Today</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{appointmentsToday?.length}</p>
    </div>
    <div class="panelDisplay">
        <h2>Appointments This Week</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{appointmentsThisWeek?.length}</p>
    </div>
    <div class="panelDisplay">
        <h2>Appointment This Month</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{appointmentsThisMonth?.length}</p>
    </div>
</div>
<h1>Payment Reports</h1>
<hr>
<div id="panel">
    <div class="panelDisplay">
        <h2>Payments Today</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{paymentToday?.length}</p>
    </div>
    <div class="panelDisplay">
        <h2>Payments This Week</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{paymentThisWeek?.length}</p>
    </div>
    <div class="panelDisplay">
        <h2>Payments This Month</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>{paymentThisMonth?.length}</p>
    </div>
</div>
<h1>Down Payment Sales Reports</h1>
<hr>
<div id="panel">
    <div class="panelDisplay">
        <h2>Sales Today</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>P{salesToday}</p>
    </div>
    <div class="panelDisplay">
        <h2>Sales This Week</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>P{salesThisWeek}</p>
    </div>
    <div class="panelDisplay">
        <h2>Sales This Month</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>P{salesThisMonth}</p>
    </div>
    <div class="panelDisplay">
        <h2>Total Sales</h2>
        <hr style="border: 1px solid rgba(207, 207, 207, 0.7);">
        <p>P{totalSales}</p>
    </div>
</div>
<div id="buttonPos">
    <div id="printPdf">
        <button id="print">Print as PDF</button>
    </div>
</div>

<style>
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
        margin-top: 50px;
        text-align: center;
    }
    h2{
        margin-left: 10px;
        margin-bottom: 0;
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

    #buttonPos{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 40px;
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
</style>