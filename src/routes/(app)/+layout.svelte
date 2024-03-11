<script lang="ts">
    import "../../global.css"
    import Header from "$lib/components/Header.svelte";
    import Sidenav from "$lib/components/sidenav/Sidenav.svelte";
    import RecentMessages  from "$lib/components/RecentMessages.svelte";
    import Toast from "$lib/components/Toast.svelte";
  import type { SvelteComponent } from "svelte";


  export let data;

</script>

<main>
    
    <div>
        <Header user={data.user} notifications={data.notifications}/>
        <Sidenav user={data.user?.username}/>
        <div class="main-container">
            <slot/>
        </div>
        <RecentMessages/>
    </div>

</main>

<Toast/>

<style>


    main {
        position: relative;
        display: grid;
        gap: 1rem;
        margin: 0 2rem;
    }

    main > div{
        display: grid;
        grid-template-columns: 0.25fr 0.5fr 0.4fr;
        grid-column-gap: 2rem;
    }

    .main-container{
        display: grid;
        grid-template-columns: repeat(1, 100%);
        gap:1rem;
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