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

<form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} required>
    <input type="password" bind:value={password} required>
    <button>login</button>
</form>
