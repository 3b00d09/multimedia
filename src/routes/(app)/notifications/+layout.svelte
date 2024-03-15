<script lang="ts">
    //export let data;

    import { page } from '$app/stores';
    let currentLocation: string = ""

    $:{
        let path = $page.url.pathname.split("/")
        path = path.filter((item)=>item.length>0)
        currentLocation = path[path.length - 1]
        currentLocation = currentLocation
    }
</script>

<div class="container">
    <h3>Notifications</h3>

    <div class="btns-container">
        <a href="/notifications"><button class:active={currentLocation === "notifications"}>All</button></a>
        <a href="/notifications/comments"><button class:active={currentLocation === "comments"}>Comments</button></a>
        <a href="/notifications/likes"><button class:active={currentLocation === "likes"}>Likes</button></a>
        <a href="/notifications/follows"><button class:active={currentLocation === "follows"}>Follows</button></a>
        <a href="/notifications/groups"><button class:active={currentLocation === "groups"}>Groups</button></a>
    </div>

    <slot/>
</div>

<style>
    a{
        all:unset;
        color: inherit;
    }
    .container{
        display: grid;
        gap: 1rem;
        place-content: start;
    }
    .btns-container{
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .active{
        background-color: var(--action);
    }
</style>