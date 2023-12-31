<script lang="ts">
    import "../../global.css"
    import Header from "$lib/components/Header.svelte";
    import Sidenav from "$lib/components/Sidenav.svelte";
    import RecentMessages  from "$lib/components/RecentMessages.svelte";
  import Categories from "$lib/components/Categories.svelte";

   let searchModal: HTMLDivElement;
  let initialSearchInput: HTMLInputElement;
  const toggleModalOff = () => {
        if (searchModal) {
            searchModal.style.display = "none";
        }
    };
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={toggleModalOff} bind:this={searchModal} class="modal"></div>
   
    <Header {searchModal} {initialSearchInput}/>
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

    :global(.blurred){
        filter: blur(3px);
    }
    
    .modal{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100vh;
        background-color: var(--background);
        opacity: 0.3;
        display: none;
    }

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