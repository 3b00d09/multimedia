<script lang="ts">
    import "../../global.css"
    import Header from "$lib/components/header/Header.svelte";
    import Sidenav from "$lib/components/sidenav/Sidenav.svelte";
    import RecentMessages  from "$lib/components/RecentMessages.svelte";
    import Toast from "$lib/components/Toast.svelte";


  export let data;

</script>

    
    <main>
        <Header user={data.user} notifications={data.notifications}/>
        <Sidenav user={data.user?.username}/>
        <div class="main-container">
            <slot/>
        </div>
        <RecentMessages/>
    </main>


<Toast/>

<style>

    main{
        display: grid;
        grid-template-columns: 0.25fr 0.5fr 0.4fr;
        grid-column-gap: 2rem;
        height: 100vh;
        margin: 0 2rem;
    }

    .main-container{
        position: relative;
        display: grid;
        grid-template-columns: repeat(1, 100%);
        gap:1rem;
        overflow-y: scroll;
        scrollbar-width: none;
        height: 100%;
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