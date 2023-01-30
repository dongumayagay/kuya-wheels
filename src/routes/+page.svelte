<script>
    import ExampleComponent from "$lib/components/ExampleComponent.svelte"
    let show = false

    function toggle(){
        show = !show
    }
</script>

<h1>WELCOME TO OUR OFFICIAL WEBSITE!</h1>

<div id="Form1">
	<div id="Picture1">
		<img src="/proof2.jpg" alt="proof2" id="proof2">
        <img src="/proof3.jpg" alt="proof3" id="proof3">
	</div>
	<div id="profileInfo">
		<h2>
			Kuya Wheels Driving School offers driving education that you can count on!
		</h2>
		<h3>
			Since the driving school's founding in 2020, top-notch education and instruction has always been delivered to its students. 
            Everyone goes through the proper process of learning what they need to know.
        </h3>
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
		width: 450px;
		height: 350px;
        border-radius: 10px;
	}
    #proof3{
		width: 450px;
		height: 350px;
        border-radius: 10px;
	}
    #Form1 {
		border-radius: 10px;
		margin: 20px;
		display: flex;
		flex-direction: row;
	}
	#profileInfo, #Picture1 {
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
	#Picture1{
        padding: 10px;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

</style>