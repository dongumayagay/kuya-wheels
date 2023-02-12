<script>
    import { auth } from '$lib/firebase.js'
    import { signInWithEmailAndPassword } from 'firebase/auth'
    import { goto } from '$app/navigation'

    let email, password

    async function login() {
        console.log(email, password)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            goto("/admin")
        } catch (error) {
            console.log(error)
            alert("Something went wrong logging you in")
        }
    }
</script>

<main>
    <nav>
        <div id="titleBar">
            <img src="/KWDSicon.png" alt="Kuya Wheels Driving School Icon" id="logo">
            <p>Kuya Wheels Driving</p>
        </div>
    </nav>
    <nav id="loginHeader">
        <div class="link-container">
            <p>Admin Login</p>
        </div>
    </nav>
    <div id="loginForm">
        <form on:submit|preventDefault={login}>
            <div class="column"><label for="">Email: </label></div>
            <input type="email" bind:value={email} required>
            <div class="column"><label for="">Password: </label></div>
            <input type="password" bind:value={password} required>
            <button>Login</button>
        </form>
    </div>
</main>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');

    *{
        font-family: 'Oswald';
        font-weight: 400;
    }

    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        /* background-color: #ff8533; */
        background-color:  #ff944d;
        background-image: url("/proof4.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    #loginForm{
        background-color: rgba(0,0,0,0.8);
        border-radius: 10px;

        width: auto;
        margin-top: 100px;
        margin-bottom: 100px;
        margin-left: 35%;
        margin-right: 35%;
        padding: 70px;
    }
    form {
        display: flex;
        flex-direction: column;
        width: auto;
    }
    input{
        padding: 5px;
        width: auto;

        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5em;
    }
    label{
        color: whitesmoke;
        font-size: 1.5em;
    }
    button{
		/* width: 20%; */
        margin-top: 15px;
        height: 90%;
		padding: 10px;
		color: whitesmoke;
		background-color: #4CAF50;
		border: solid 0px black;
		border-radius: 4px;
	}
	button:hover {
		background-color: #36a83a;
	}

    nav{
        background-color: rgba(0,0,0,0.8);

        display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
        align-items: center;
		padding: 0;
    }
    .link-container{
		margin-right: 10px;
		display: flex;
		flex-direction: flex-end;
		font-size: 1em;
		/*font-family: fantasy; */
		/* margin-right: 1.5em; */
	}
    p{
        color: whitesmoke;
        font-size: 1.3em
    }
    #logo{
        width: 13%;
        height: 13%;
    }
    #titleBar{
        align-items: center;
        display: flex;

        font-size: 1.3em;
        margin: 0%;
    }
    #loginHeader{
        background-color: rgba(58, 58, 58);
		/* background-color: #cf332a; */
		display: flex;
		justify-content: center;
    }
</style>
