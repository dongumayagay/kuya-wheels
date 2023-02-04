<nav>
    <div id="titleBar">
        <img src="/KWDSicon.png" alt="Kuya Wheels Driving School Icon" id="logo">
        <p>Kuya Wheels Driving</p>
    </div>
</nav>
<nav id="adminTools">
	<div class="link-container">
		<a href="/admin">| Dashboard </a>
		<a href="/admin">| Accounts </a>
		<a href="/admin">| Appointments </a>
        <a href="/admin">| Logout |</a>
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
    p{
        color: whitesmoke;
        font-size: 1.5em
    }
	a{
		color: whitesmoke;
		margin-left: 10px;
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