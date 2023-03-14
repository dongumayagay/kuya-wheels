<div id="header">
    <img src="/KWDSicon.png" alt="Kuya Wheels Driving School Icon" id="logo">
    <h1>Kuya Wheels Driving School</h1>
</div>

<style>
    #header {
        background-image: url("/testbg.PNG");
        background-repeat: no-repeat;
        background-size: cover;
        background-color: rgba(0,0, 0,0);
    
        display: flex;
        padding: 10px;
    }
    #logo{
        width: 20%;
    }
    h1{
        font-size: 48px;
        color: whitesmoke;
        -webkit-text-stroke: 0.3px black;
    }

    @media only screen and (max-width: 1150px){
        #header {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: auto;
        }
        #logo {
            width: 20%;
        }
        h1 {
            font-size: 30px;
            color: whitesmoke;
            -webkit-text-stroke: 0.3px black;
        }
    }
    @media only screen and (min-width: 320px) and (max-width: 700px)  {
		#header {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: auto;
        }
        #logo {
            width: 40%;
        }
        h1 {
            font-size: 25px;
        }
	} 
</style>