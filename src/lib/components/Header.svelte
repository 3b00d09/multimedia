<header>
    <div class="nav-search">
        <input type="text" placeholder="Search">
        <button>New Post</button>
    </div>
    <div class="nav-icons">
        <ul>
            <li>Notifications</li>
            <li>Profile Picture</li>
            <li>Username</li>
        </ul>
    </div>
</header>


<style>
    header{
        display: flex;
        align-items: baseline;
        flex-basis: 85%;
    }

    .nav-icons > ul{
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .nav-search{
        display: flex;
        gap: 1rem;
        flex-basis: 70%;
    }

    .nav-icons{
        flex-basis: 30%;
    }

    input{
        flex-basis: 75%;
        padding: 1rem;
        border-radius: 8px;
    }

    button{
        color: inherit;
        flex-basis: 25%;
        /**dont ask*/
        font-size: .875rem;
    }
</style>