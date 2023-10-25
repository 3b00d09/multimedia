<div class="container">
    <div class="header">
        <h1>Log in</h1>
        <p><a href="/register">New user? Register</a></p>
    </div>
    <form method="post" class="form">
        <label for="username">Username</label>
        <input required type="text" name="username" placeholder="anon64942495"/>
        <label for="password">Password</label>
        <input required type="password" name="password" placeholder="*********"/>
        <button type="submit">Log In</button>
        <div class="footer-links">
            <p><a href="/">Forgot Username</a></p>
            <p><a href="/">Reset Password</a></p>
        </div>
    </form>
</div>

<style>

.container {
    display: grid;
    place-items: center;
    height: 100%;
    border: 1px solid hsl(240, 3.7%, 15.9%);
    border-radius: 0.5rem;
    width: 50%;
    justify-self: center;
}

.header {
    place-self: start;
    padding: 2rem;
}


.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 75%;
    padding: 0.5rem;
}

.footer-links {
    display: flex;
    justify-content: space-around;
    gap: 0.5rem;
}

h1{
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: -0.025em;
}

input {
    padding: 1rem;
    border: 1px solid white;
    border-radius: 0.5rem;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
}

p {
    color: hsl(240, 5%, 64.9%);
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

a{
    color: inherit;
    text-decoration: inherit;
}

button {
    border-radius: 0.5rem;
    background-color: aliceblue;
    color: black;
    padding: 0.5rem;
    font-family: inherit;
    font-size: inherit;
}

</style>