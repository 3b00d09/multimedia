<script lang="ts">
    import "../../global.css"
    import Header from "$lib/components/Header.svelte";
    import Sidenav from "$lib/components/Sidenav.svelte";
    import RecentMessages  from "$lib/components/RecentMessages.svelte";
</script>

<main>
    <Sidenav/>
    <div class="main-container">
        <Header/>
        <div class="main-content">
            <slot/>
            <RecentMessages/>
        </div>
    </div>
</main>

<style>
    main{
        display: flex;
        justify-content: space-evenly;
        align-items: baseline;
        gap: 1rem;
        padding: 1rem;
    }

    .main-container{
        flex-basis: 80%;
    }

    .main-content{
        display: grid;
        margin-top: 1rem;
    }
</style>