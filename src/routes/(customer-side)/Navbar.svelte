<nav>
	<div class="link-container">
		<a href="/">Home</a>
		<a href="/aboutus">About Us</a>
		<a href="/book">Booking</a>
	</div>
</nav>

<style>
	nav {
		background-color: rgba(58, 58, 58);
		/* background-color: #cf332a; */
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		padding: 10px;

	}
	.link-container{
		margin-right: 10px;
		display: flex;
		font-size: 20px
	}
	a{
		color: whitesmoke;
		margin-left: 15px;
		margin-right: 15px;
	}
	a:link {
		text-decoration: none;
	}
	a:hover{
		text-decoration: underline;
	}

	@media only screen and (min-width: 320px) and (max-width: 700px)  {
		nav {
			justify-content: center;
		}
		.link-container {
			flex-direction: row;
		}
		a {
			margin-left: 7px;
		margin-right: 7px;
		}
    }
</style>
