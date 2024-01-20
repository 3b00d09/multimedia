<script lang="ts">
    import "../../global.css"
    import SideBarBtn from "./subcomponents/SideBarBtn.svelte";

    let iconsContainer:HTMLUListElement;

</script>

<ul class="box-shadow" bind:this={iconsContainer}>
    <a href="/" class="active"><li class="icon-container active"><SideBarBtn imgRoute={"home.png"} name={"Home"} iconsContainer={iconsContainer} /></li></a>
    <li class="icon-container"><SideBarBtn imgRoute={"search.png"} name={"Search"} iconsContainer={iconsContainer} /></li>
    <li class="icon-container"><SideBarBtn imgRoute={"inbox.png"} name={"Inbox"} iconsContainer={iconsContainer} /></li>
    <a href="/profile" class="active"><li class="icon-container active"><SideBarBtn imgRoute={"profile.png"} name={"Profile"} iconsContainer={iconsContainer} /></li></a>
    <li class="icon-container"><SideBarBtn imgRoute={"settings.png"} name={"Settings"} iconsContainer={iconsContainer} /></li>
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

        margin: 0 1.75rem;
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


    .icon-container{
        opacity: 0.3;
    }

    .active{
        opacity: 1;
        position: relative;
    }

    .active::before{
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom :0;
        background-color: var(--action);
        filter: drop-shadow(0px 0px 5px rgba(108, 92, 214, 0.50));
        width: 1px;
    }

</style>