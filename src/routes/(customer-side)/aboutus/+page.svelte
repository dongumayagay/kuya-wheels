<script>
	// import ExampleComponent from '$lib/components/ExampleComponent.svelte';
</script>

<!-- Contact Page -->
<div id="profileForm">
	<div id="profilePicture">
		<img src="/proof1.jpg" alt="">
	</div>
	<div id="profileInfo">
		<h2>
			About Kuya Wheels Driving School and your Instructor
		</h2>
		<p style="margin: 20px;">
			The owner and driving instructor of Kuya Wheels Driving School is Joselito A. Balagbis, commonly referred to 
			by friends as "Kuya Joey". His career in the automotive industry started in 1994 when he became a Stencil Boy for 
			one of the branches of the Land Transportation Office of the Philippines and worked his way up to 
			finally become an Admin Officer for a private firm proponent under the LTO. Mr. Balagbis established Kuya Wheels driving 
			school in December 8, 2020 because of his desire to properly teach aspiring drivers the necessary information 
			they need before getting on the road.
		</p>
	</div>
</div>
<!-- <hr> -->
<div id="contactForm">
	<div id="contactInfo">
		<h3>CONNECT WITH US!</h3>
		<hr>
		<p>
			ADDRESS: <br>2nd Floor JRJ Building, 1455 A Brgy. Nueva, National HighWay, San Pedro, Laguna, Philippines
		</p>
		<p>
			CONTACTS: <br>+63 969 476 3734<br>+63 992 320 9710<br>+63 915 977 7958
		</p>
		<p>
			TELEPHONE: <br>(02) 877-73441
		</p>
		<p>
			EMAIL: <br>kuyawheelsmain@gmail.com
		</p>
		<p>
			FOLLOW US: <br> <a href="https://www.facebook.com/KuyaWheelsDrivingSchool" target="_blank" rel="noopener noreferrer"> <img src="/facebook.png" alt="Kuya Wheels Facebook" style="width:30px;"></a>
		</p>
	</div>
	
	<div id="aboutPanel">
		<div id="aboutCompany">
			<div id="aboutLogo">
				<div id="aLogos">
					<img src="/KWDSicon.png" alt="Kuya Wheels Driving School Icon" id="logo">
					<img src="/lto.png" alt="LTO logo" id="lto">
				</div>
				<h4>Our Certifications and Accreditations</h4>
			</div>
			<h5>
				Throughout the course of his career, Mr. Balagbis obtained his knowledge by taking the appropriate TESDA courses
				and passing every one of them with flying colors. His ever-expanding arsenal of National Certificates are proof of his 
				dedication to his craft. These are:
			</h5>
			<div id="accreds">
				<p>
					- NC II in DRIVING<br>- NC III in DRIVING (PASSENGER BUS/ STRAIGHT TRUCK)<br>
					- NC III in DRIVING (ARTICULATED VEHICLE)<br>
					- NC III in AUTOMOTIVE SERVICING<br>
					- NC II in AUTOMOTIVE SERVICING (CHASSIS REPAIR)<br>
					- NC II in AUTOMOTIVE SERVICING (ELECTRICAL REPAIR)<br>
					- NC II in AUTOMOTIVE SERVICING (ENGINE REPAIR)
				</p>
				<p>
					- NATIONAL TVET TRAINER CERTIFICATE Level I in DRIVING NC II<br>
					- NATIONAL TVET TRAINER CERTIFICATE Level I in DRIVING (PASSENGER BUS/STRAIGHT TRUCK) NC II<br>
					- NATIONAL TVET TRAINER CERTIFICATE Level I in AUTOMOTIVE SERVICING (CHASSIS REPAIR) NC II<br>
					- NATIONAL TVET TRAINER CERTIFICATE Level I in AUTOMOTIVE SERVICING (ENGINE REPAIR) NC II<br>
					- NATIONAL TVET TRAINER CERTIFICATE Level I in AUTOMOTIVE SERVICING (ENGINE REPAIR) NC II<br>
					- TRAINERS METHODOLOGY CERTIFICATE I
				</p>
			</div>
		</div>
		<div id="reminderMess">
			<h2>Learning to drive isn't only to know how to handle a vehicle, but also to keep yourself and those around you safe. DRIVE SAFELY!</h2>
		</div>
	</div>

</div>


<style>
	img{
		width: 450px;
		height: 95%;
	}
	#profileForm {
		display: flex;
		flex-direction: row;
	}
	#profileInfo, #profilePicture {
		padding: 20px;
		background-color: rgba(0,0,0,0.8);
	}
	#profileInfo{
		color: whitesmoke;
		font-size: 20px;

		/* border-top-right-radius: 8px;
		border-bottom-right-radius: 8px; */

		display: flex;
		flex-direction: column;
	}
	#profilePicture{
		padding: 0;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
	#profilePicture img{
		width: 100%;
		height: 100%;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
	#contactForm {
		/* border: 1px solid blue; */
		margin: 20px;
		margin-left: 15px;
		margin-right: 15px;
		display: flex;
		flex-direction: row;
	}
	#contactInfo, #aboutCompany{
		padding: 10px;
		background-color: rgba(0,0,0,0.8);
		border-radius: 8px;
		/* border: 1px solid yellow; */
	}
	#contactInfo{
		background-color:rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(0,0,0,0.3);
		border-radius: 5px;

		font-weight: 600;
		height: 100%;
	}
	#contactInfo p {
		padding-left: 20px;
		padding-right: 20px;
	}
	#aboutLogo {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		
	}
	#aLogos {
		display: flex;
		justify-content: space-between;
		padding-right: 40px;
	}
	#accreds {
		display: flex;
		justify-content:space-between;
		text-align:left;
	}
	#logo{
		width: 200px;
		height: 120px;
	}
	#lto {
		width: 120px;
		height: 120px;
	}
	h2{
		text-align: center;
	}
	h3{
		text-align: center;
	}
	h4{
		text-align: center;
		font-size: 30px;
	}
	h5{
		font-size: 20px;
	}
	hr {
		border: 1px solid rgba(20, 20, 20, 0.7);
		border-radius: 5px;
	}
	#aboutPanel{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 20px;
	}
	#aboutCompany{
		padding: 20px;
		text-align: center;
		color: white;
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
	#reminderMess{
		border: 4px dashed #ff944d;
		background-color: rgba(0,0,0,0.8);
		padding: 10px;

		color: whitesmoke;
		text-align: center;
	}

	@media only screen and (min-width: 801px) and (max-width: 1150px) {
		#profilePicture {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		#profilePicture img{
			width: 100%;
			height: 100%;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		#profileForm h2 {
			font-size: 20px;
		}
		#profileForm p {
			font-size: 15px;
		}
		#contactForm {
			/* border: 1px solid blue; */
			margin: 20px;
			margin-left: 15px;
			margin-right: 15px;
		}
		#accreds {
			flex-direction: column;
		}
		#reminderMess {
			font-size: 15px;
			border: 2.5px dashed #ff944d;
		}
	}
	@media only screen and (min-width: 320px) and (max-width: 800px) {
		#profileForm {
			display: flex;
			flex-direction: column;
		}
		#profilePicture {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		#profilePicture img{
			width: 100%;
			height: 100%;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		#profileForm h2 {
			font-size: 20px;
		}
		#profileForm p {
			font-size: 15px;
		}
		#contactInfo{
			border-radius: 5px;
			margin-bottom: 10px;

			font-weight: 600;
			height: 100%;
		}
		#contactInfo h3 {
			font-size: 15px;
		}
		#contactInfo p {
			font-size: 15px;
			padding-left: 10px;
			padding-right: 10px;
		}
		#contactForm {
			/* border: 1px solid blue; */
			margin: 20px;
			margin-left: 15px;
			margin-right: 15px;
			display: flex;
			flex-direction: column;
		}
		#contactForm h4 {
			font-size: 20px;
		}
		#aboutCompany {
			justify-content: flex-start;
		}
		#aboutPanel {
			margin-left: 0;
		}
		#aboutCompany h5 {
			font-size: 15px;
		}
		#aboutCompany p {
			font-size: 10px;
		}
		#aLogos {
			justify-content: space-between;
			padding-right: 15px;
		}
		#accreds {
			flex-direction: column;
		}
		#logo{
			width: 100px;
			height: 60px;
		}
		#lto {
			width: 60px;
			height: 60px;
		}
		#reminderMess {
			font-size: 10px;
			border: 2px dashed #ff944d;
		}
	}
</style>
