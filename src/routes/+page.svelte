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
		<div id="Pictures">
			<img src="/proof2.jpg" alt="proof2" id="proof2">
			<img src="/proof3.jpg" alt="proof3" id="proof3">
			<img src="/proof4.jpg" alt="proof4" id="proof4">
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
    #proof2{
		width: 425px;
		height: 350px;
        border-radius: 10px;
	}
    #proof3{
		width: 425px;
		height: 350px;
        border-radius: 10px;
	}
	#proof4{
		width: 425px;
		height: 350px;
        border-radius: 10px;
	}
    #Form1 {
		border-radius: 10px;
		margin: 20px;
		display: flex;
		flex-direction: row;
	}
	#profileInfo, #Pictures {
		background-color: rgba(0,0,0,0.8);
	}
	#profileInfo{
        padding: 2px;
		color: whitesmoke;
		font-size: 1.2em;

		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;

		display: flex;
		flex-direction: column;
	}
	#Pictures{
        padding: 10px;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

</style>