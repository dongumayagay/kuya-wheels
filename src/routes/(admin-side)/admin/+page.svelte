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

<h1>Welcome, Admin!</h1>

<button on:click={logout}>
    logout
</button>