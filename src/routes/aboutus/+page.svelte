<script>
	// import ExampleComponent from '$lib/components/ExampleComponent.svelte';
</script>

<!-- Contact Page -->
<div id="profileForm">
	<div id="profilePicture">
		<img src="/KWDSicon.png" alt="">
	</div>
	<div id="profileInfo">
		<h2>
			Lorem ipsum dolor sit amet consectetur adipisicing elit
		</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem totam adipisci qui odio labore voluptatem est neque veniam vel facere quasi magnam perferendis natus obcaecati ex asperiores maiores, soluta nesciunt. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae quas magni modi voluptatibus placeat iusto sed pariatur repudiandae autem maiores rem earum nobis, assumenda cumque. Ipsa omnis sequi dolores quam.
		</p>
	</div>
</div>
<!-- <hr> -->
<div id="contactForm">
	<div id="contactInfo">
		<h3>Want to connect with us?</h3>
		<hr>
		<p>
			ADDRESS: <br>2nd Floor Harmony Village Mall Left Side Entrance Olympia Street, San Pedro, Laguna
		</p>
		<p>
			CONTACTS: <br>+63 969 476 3734 | +63 992 320 9710 | +63 915 977 7958
		</p>
		<p>
			TELEPHONE: <br>(02) 877-73441
		</p>
		<p>
			EMAIL: <br>kuyawheelsmain@gmail.com
		</p>
		<p>
			FOLLOW US: <br> <a href="https://www.facebook.com/KuyaWheelsDrivingSchool">https://www.facebook.com/KuyaWheelsDrivingSchool/</a>
		</p>
	</div>
	<div id="aboutPanel">
		<div id="aboutCompany">
			<h3>About Kuya wheels driving school</h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi rem voluptatem quae aut sequi? Esse ad cumque similique porro, adipisci minus natus officiis quam? Aspernatur qui quasi repellat corrupti itaque. lor
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eaque cupiditate accusantium nihil dolore itaque culpa tenetur quo neque, non minima quos mollitia, in veritatis veniam a temporibus, facilis nulla!
			</p>
		</div>
		<div id="reminderMess">
			<h2>Learning to drive isn't only to know how to handle a car, but also to keep yourself and those around you safe. DRIVE SAFELY!</h2>
		</div>
	</div>
	
</div>


<style>
	img{
		width: 450px;
		height: 95%;
	}
	#profileForm {
		border-radius: 10px;
		margin: 20px;
		display: flex;
		flex-direction: row;
	}
	#profileInfo, #profilePicture {
		padding: 10px;
		background-color: rgba(0,0,0,0.8);
	}
	#profileInfo{
		color: whitesmoke;
		font-size: 1.2em;

		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;

		display: flex;
		flex-direction: column;
	}
	#profilePicture{
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
	#contactForm {
		/* border: 1px solid blue; */
		margin: 20px;
		margin-left: 90px;
		margin-right: 90px;
		display: flex;
		flex-direction: row;
	}
	#contactInfo, #aboutCompany{
		padding: 10px;
		/* border: 1px solid yellow; */
	}
	#contactInfo{
		background-color:rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(0,0,0,0.3);
		border-radius: 5px;

		font-weight: 600;
	}
	#contactInfo p {
		padding-left: 20px;
		padding-right: 20px;
	}
	h3{
		text-align: center;
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
	}
	#reminderMess{
		border: 4px dashed #ff944d;
		background-color: rgba(0,0,0,0.8);
		padding: 10px;

		color: whitesmoke;
		text-align: center;
	}
</style>
