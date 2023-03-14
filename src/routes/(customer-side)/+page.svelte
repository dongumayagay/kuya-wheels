<script>
    import ExampleComponent from "$lib/components/ExampleComponent.svelte"
    let show = false

    function toggle(){
        show = !show
    }
</script>

<div id="Form1">
	
	<div id="profileInfo">
		<h1 style="text-align: center;">WELCOME TO OUR OFFICIAL WEBSITE!</h1>
		<h2>
			Kuya Wheels Driving School offers driving education that you can count on!
		</h2>
		<h3 style="color: rgb(255, 220, 174);text-align: center;">
			Since the driving school's founding in 2020, top-notch education and instruction has always been delivered to its students. 
            Everyone goes through the proper process of learning what they need to know.
        </h3>
	</div>
</div>
<br>
<div id="midPanel">
	<div style="margin-left:10px;padding:10px;text-align:center;">
		<h1 style="margin-top: 0;">About Kuya Wheels Driving School</h1>
		<p>
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
	<div class="pageMap">
		<!-- svelte-ignore a11y-missing-attribute -->
		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.343416484211!2d121.0619151143176!3d14.349526887028402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d7fc4200f08d%3A0x7e5f6568ee2fb87a!2sKuya%20Wheels%20Driving%20School!5e0!3m2!1sen!2sph!4v1677343191569!5m2!1sen!2sph" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	</div>
</div>
<div style="display: flex; flex-direction: column;margin:20px;">
	<div>
		<h1 style="text-align: center;">What we do</h1>
	</div>
	<div id="whatwedoPanel">
		<div class="wPanel">
			<img src="/truck1.jpg" alt="truck">
			<h2>Education</h2>
			<h4>
				We orient clients of the Do's and Dont's of the road when it comes to driving, making sure they are 
				knowledgeable about the basic fundamentals of driving with instructions provided and practiced from
				the Land Transportation Office (LTO)
			</h4>
		</div>
		<div class="wPanel">
			<img src="/Truck2.jpg" alt="truck">
			<h2>Assessment</h2>
			<h4>
				Kuya Wheels Driving School seeks to provide clients the knowledge they need in order to be able to legally
				drive a vehicle, we give our assessment with honesty and fairness to identify if they are ready and capable
				to drive on their own
			</h4>
		</div>
	</div>
</div>
<br>
<div id="hero">
	
	<div id="blurHero">
		<div class="functionHero" style="margin-right: 15px;">
			<a href="/book">Book Now</a>
		</div>
		<div class="functionHero" style="margin-left: 15px;">
			<a href="/aboutus">Learn more About us</a>
		</div>
	</div>
</div>


<style>
    
    h2{
        text-align: center;
        color: rgb(255, 220, 174);
        font-size: 40px;
    }
	.wPanel{
		display: flex;
		flex-direction: column;

		border-radius: 10px;
		margin: 0 15px 20px 15px;
		
		text-align: center;
		width: 45%;
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
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	.wPanel img {
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
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
	#midPanel{
		display: flex;
		flex-direction:row;
		margin-top:70px;
		margin-bottom:50px;
	}
	#midPanel {
		font-size: 18px;
	}
	.pageMap {
		border-radius: 10px;
		margin-right:10px;
		
		/* box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-webkit-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75);
		-moz-box-shadow: -5px 7px 17px -3px rgba(0,0,0,0.75); */
	}
	.pageMap iframe {
		height: 100%;
		width:600px; 
		border:0;border-radius:10px;
	}
	#whatwedoPanel {
		display: flex; 
		flex-direction: row; 
		justify-content:center;
	}
    #Form1 {
		border-radius: 10px;
		
		background-image: url('/proof3.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		margin: 0;
	}
	#profileInfo{
        padding: 2px;
		color: whitesmoke;
		background-color: rgba(0,0,0,0.8);
		font-size: 20px;

		display: flex;
		flex-direction: column;
		padding: 20px;
	}

	#hero {
		background-image: url('/proof2.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		height: 200px;
	}
	#blurHero {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: rgba(0,0,0,0.9);
		height: 100%;
	}
	.functionHero {
		text-align: center;

		margin-left: auto;
		margin-right: auto;
		margin-top: auto;
		margin-bottom: auto;
	}
	a {
		color: whitesmoke;
		font-size: 30px;
		text-decoration: none;

		border: 3px solid whitesmoke;
		border-radius: 10px;

		padding: 10px;
	}
	.functionHero a:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	@media only screen and (max-width: 1200px){
		#whatwedoPanel {
			flex-direction: row;
		}
	}
	@media only screen and (min-width: 320px) and (max-width: 1150px)  {
		#profileInfo h1 {
			font-size: 20px
		}
		#profileInfo h2 {
			font-size: 15px
		}
		#profileInfo h3 {
			font-size: 15px
		}
		#midPanel{
			display: flex;
			flex-direction:column;
			margin-top: 20px;
			margin-bottom: 10px;
		}
		#midPanel h1 {
			font-size: 20px;
		}
		#midPanel p {
			font-size: 15px;
		}
		#officeHours {
			width: auto;
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
			font-size: 15px;
			color: whitesmoke;
		}
		#officeHours h2 {
			margin: 0 0 10px 0;
			font-size: 20px;
		}
		.pageMap {
			margin-right: 0;
			margin: 5px;
			padding: 10px;
			height: 250px;
		}
		.pageMap iframe {
			width: 100%; 
			border:0;
			border-radius:10px;
		}
		.wPanel {
			width: auto;
		}
		#whatwedoPanel {
			flex-direction: column;
		}
		#whatwedoPanel h2 {
			font-size: 20px;
		}
		#whatwedoPanel h4 {
			font-size: 15px;
		}
		#hero {
			height: 100px;
		}
		#blurHero {
			display: flex;
			flex-direction: row;
			justify-content: center;
			background-color: rgba(0,0,0,0.9);
			height: 100%;
		}
		a {
			font-size: 18px;
			text-decoration: none;

			border: 2px solid whitesmoke;
		}
	} 
</style>