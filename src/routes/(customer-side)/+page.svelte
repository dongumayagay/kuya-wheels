<script>
    import ExampleComponent from "$lib/components/ExampleComponent.svelte"
    let show = false

    function toggle(){
        show = !show
    }
</script>

<h1>WELCOME TO OUR OFFICIAL WEBSITE!</h1>

<div id="Form1">
	
	<div id="profileInfo">
		<h2>
			Kuya Wheels Driving School offers driving education that you can count on!
		</h2>
		<h3 style="color: rgb(255, 220, 174);text-align: center;">
			Since the driving school's founding in 2020, top-notch education and instruction has always been delivered to its students. 
            Everyone goes through the proper process of learning what they need to know.
        </h3>
		<div style="display: flex; flex-direction:row;">
			<div id="Pictures">
				<img src="/proof2.jpg" alt="proof2" id="proof2">
			</div>
			<div id="Pictures">
				<img src="/proof3.jpg" alt="proof3" id="proof3">
			</div>
			<div id="Pictures">
				<img src="/proof4.jpg" alt="proof4" id="proof4">
			</div>
		</div>
	</div>
</div>
<br>
<div style="display: flex;flex-direction:row;">
	<div style="width:100%;margin-left:10px;padding:10px;text-align:center;">
		<h1 style="margin-top: 0;">About Kuya Wheels Driving School</h1>
		<p style="font-size: 18px;">
			Kuya Wheels is a driving school company that provides services to teach future drivers the fundamentals
			and basic knowledge about driving. For now, the company is focused on training drivers for Practical
			Driving Course 3(PDC3) which mainly consists of vehicles, or better known as trucks, that carry weight.
		</p>
		
		<div id="officeHours">
			<h2 style="margin-top: 10px;">Office Hours</h2>
			<div class="row">
				<div class="column">
					<h3>Monday</h3>
				</div>
				<div class="column">
					<h3>7:00 AM - 5:00 PM</h3>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<h3>Tuesday</h3>
				</div>
				<div class="column">
					<h3>7:00 AM - 5:00 PM</h3>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<h3>Wednesday</h3>
				</div>
				<div class="column">
					<h3>7:00 AM - 5:00 PM</h3>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<h3>Thursday</h3>
				</div>
				<div class="column">
					<h3>7:00 AM - 5:00 PM</h3>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<h3>Friday</h3>
				</div>
				<div class="column">
					<h3>7:00 AM - 5:00 PM</h3>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<h3>Saturday</h3>
				</div>
				<div class="column">
					<h3>7:00 AM - 5:00 PM</h3>
				</div>
			</div>
			<div class="row">
				<div class="column">
					<h3>Sunday</h3>
				</div>
				<div class="column">
					<h3>No Office</h3>
				</div>
			</div>
		</div>
	</div>
	<div class="pageMap" style="margin-right:10px;">
		<!-- svelte-ignore a11y-missing-attribute -->
		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.343416484211!2d121.0619151143176!3d14.349526887028402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d7fc4200f08d%3A0x7e5f6568ee2fb87a!2sKuya%20Wheels%20Driving%20School!5e0!3m2!1sen!2sph!4v1677343191569!5m2!1sen!2sph" width="600" height="450" style="border:0;border-radius:10px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	</div>
</div>
<div>
	<div>
		<h1>What we do</h1>
	</div>
	<div style="display: flex; flex-direction: row; justify-content:center;">
		<div class="wPanel">
			<img src="/truck1.jpg" alt="truck">
			<h2>Instruct</h2>
			<h4>
				We orient clients of the Do's and Dont's of the road when it comes to driving, making sure they are 
				knowledgeable about the basic fundamentals of driving with instructions provided and practiced from
				the Land Transportation Office (LTO)
			</h4>
		</div>
		<div class="wPanel">
			<img src="/Truck2.jpg" alt="truck">
			<h2>Teach</h2>
			<h4>
				We provide our clients with the driving course they have taken with utmost attention and effort for them
				to start learning how to handle the wheels and take on the road, and finally start driving their own 
				vehicle in the future
			</h4>
		</div>
		<div class="wPanel">
			<img src="/truck1.jpg" alt="truck">
			<h2>Assess</h2>
			<h4>
				Kuya Wheels Driving School seeks to provide clients the knowledge they need in order to be able to legally
				drive a vehicle, we give our assessment with honesty and fairness to identify if they are ready and capable
				to drive on their own
			</h4>
		</div>
	</div>
</div>



<style>
    
	h1{
		text-align: center;
	}
    h2{
        text-align: center;
        color: rgb(255, 220, 174);
        font-size: 2em;
    }
	.wPanel{
		display: flex;
		flex-direction: column;

		border: 1px solid rgb(66, 66, 66);
		border-radius: 5px;
		margin: 0 15px 20px 15px;
		
		text-align: center;

		width: 25%;
	}
	.wPanel h2{
		background-color: rgb(19, 19, 19);
		
		bottom: 0;
		width: auto;
		margin-top: 0;
		margin-bottom: 0;
	}
	.wPanel h4{
		background-color: rgba(0,0,0,0.8);
		margin: 0;
		padding: 10px;
		color: whitesmoke;
		font-weight: 300;
		font-size: 20px;
	}
	#officeHours {
		display: flex;
		flex-direction: column;

		width: 60%;
		margin-left: auto;
		margin-right: auto;
		padding:0;
		padding-bottom: 10px;

		background-color: rgba(0,0,0,0.8);
		border: 4px solid black;
		border-radius: 5px;
	}
	#officeHours h3 {
		margin: 0;
		color: whitesmoke;
	}
	.column {
		width: 100%;
	}
	.row {
		display: flex;
		flex-direction: row;
		text-align: center;

		padding: 0px;
	}
	.pageMap {
		border-radius: 10px;
		
		box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
	}
	.pageMap iframe {
		height: 100%;
	}
    #proof2{
		width: 100%;
		height: 100%;
        border-radius: 10px;
	}
    #proof3{
		width: 100%;
		height: 100%;;
        border-radius: 10px;
	}
	#proof4{
		width: 100%;
		height: 100%;
        border-radius: 10px;
	}
    #Form1 {
		border-radius: 10px;
		margin: 0;
	}
	#profileInfo{
        padding: 2px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		font-size: 1.2em;

		display: flex;
		flex-direction: column;
	}
	#Pictures{
		display: flex;
		width: 100%;
        padding: 2px;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
	#Pictures img{
		margin: 2px;
	}

</style>