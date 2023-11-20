<script lang="ts">
    import "../../global.css"
    import Header from "$lib/components/Header.svelte";
    import Sidenav from "$lib/components/Sidenav.svelte";
    import RecentMessages  from "$lib/components/RecentMessages.svelte";
  import Categories from "$lib/components/Categories.svelte";
</script>

<main>
    <Sidenav/>
    <div class="main-container">
        <Header/>
        <div class="main-content">
            <Categories/>
            <slot/>
        </div>
    </div>
    <RecentMessages/>
</main>

<style>
    main{
        display: flex;
        justify-content: space-evenly;
        align-items: baseline;
        gap: 3rem;
        margin: 0 6.5rem;
        margin-top: 1rem;
        min-height: 100vh;
    }

    .main-container{
        display: grid;
        justify-items: center;
        gap:1rem;
    }

    .main-content{
        display: grid;
        align-items: center;
        gap: 1rem;
        grid-template-columns: repeat(1, 100%);
    }
</style>