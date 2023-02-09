<script>
    import { auth } from '$lib/firebase.js'
    import { signOut } from 'firebase/auth'

    async function logout() {

        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
            alert("Something went wrong logging you out")
        }
    }
</script>


<button on:click={logout}>
    logout
</button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');

    button{
        font-family: 'Oswald';
        font-weight: 400;
        font-size: 30px;
        
        width: 150px;
    }
</style>