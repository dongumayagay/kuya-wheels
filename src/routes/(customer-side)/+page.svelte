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
		<h3>
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
    h3{
        color: rgb(255, 220, 174);
        text-align: center;
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