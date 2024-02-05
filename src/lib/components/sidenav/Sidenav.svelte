<script lang="ts">
    import "../../../global.css"
    import SideBarBtn from "./SideBarBtn.svelte";

    export let user: string | undefined;

</script>

<ul class="box-shadow">
    <a href="/"><li class="icon-container"><SideBarBtn imgRoute={"home.png"} name={"Home"} /></li></a>
    <a href="/search"><li class="icon-container"><SideBarBtn imgRoute={"search.png"} name={"Search"} /></li></a>
    <li class="icon-container"><SideBarBtn imgRoute={"inbox.png"} name={"Inbox"} /></li>
    <a href={user ? `/users/${user}` : "/login"}><li class="icon-container"><SideBarBtn username={user} imgRoute={"profile.png"} name={"Profile"}/></li></a>
    <a href="/settings"><li class="icon-container"><SideBarBtn imgRoute={"settings.png"} name={"Settings"} /></li></a>
</ul>


<style>

    ul{
        list-style: none;
        display: grid;
        text-align: center;
        background: transparent;
        border-radius: 8px;
        padding: 1rem 1.75rem;
        height: 70vh;
        grid-template-columns: repeat(1, 3rem);
        grid-template-rows: repeat(4, auto) 1fr;
        justify-items: center;

        grid-auto-rows: min-content;
        gap: 2rem;

        justify-self: end;
        width: fit-content;

        /** prevents the active::before from exploding*/
        align-items: baseline;
    }

    ul a {
        text-decoration: none;
        color: inherit;
    }

    ul li:nth-child(5){
      
        align-self: end;
    }

</style>