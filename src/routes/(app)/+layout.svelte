<script lang="ts">
    import "../../global.css"
    import Header from "$lib/components/Header.svelte";
    import Sidenav from "$lib/components/Sidenav.svelte";
    import RecentMessages  from "$lib/components/RecentMessages.svelte";
  import Categories from "$lib/components/Categories.svelte";

</script>

<main>
   
    <Header/>
    <div>
        <Sidenav/>
        <div class="main-container">
            
            <div class="main-content">
                <Categories/>
                <slot/>
            </div>
        </div>
        <RecentMessages/>
    </div>
</main>

<style>

    main {
        position: relative;
        display: grid;
        gap: 1rem;
        margin-top: 1rem !important;
    }

    main > div{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: baseline;
        gap: 3rem;
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

    @media(max-width: 1440px){
        main{
            margin: 0 10rem;
        }
    }
    @media(max-width: 1024px){
        main{
            margin: 0 3rem;
        }
    }
</style>