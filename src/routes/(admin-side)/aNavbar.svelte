<script>
	import { signOut } from "firebase/auth";
	import { auth } from "$lib/firebase"

	async function logout() {
		const choice = confirm("Are you sure you want to Log out?")
		console.log(choice)

		if (choice) {
			await signOut(auth)
		}
	}
</script>

<nav>
    <div id="titleBar">
        <img src="/KWDSicon.png" alt="Kuya Wheels Driving School Icon" id="logo">
        <p>Kuya Wheels Driving</p>
    </div>
</nav>
<nav id="adminTools">
	<div class="link-container">
		<a href="/admin">Dashboard</a>
		<a href="/admin">Payments</a>
		<a href="/admin/appointments">Appointments</a>
		<button on:click={logout}>Logout</button>
	</div>
</nav>
<style>
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
		font-size: 1.3em;
		/*font-family: fantasy; */
		/* margin-right: 1.5em; */
	}
	.link-container a{
		margin-left: 15px;
		margin-right: 15px;
	}
    p{
        color: whitesmoke;
        font-size: 1.5em
    }
	a{
		color: whitesmoke;
	}
	a:link {
		text-decoration: none;
	}
	a:hover{
		text-decoration: underline;
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
    #adminTools{
        background-color: rgba(58, 58, 58);
		/* background-color: #cf332a; */
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0.5em;
    }
</style>