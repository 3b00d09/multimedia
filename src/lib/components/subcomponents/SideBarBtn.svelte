<script lang="ts">

    export let imgRoute:string;
    export let name:string;
    export let iconsContainer:HTMLUListElement;

    const setActiveIcon = (e:MouseEvent & { currentTarget: HTMLButtonElement; }) =>{
        iconsContainer.querySelectorAll("li").forEach((btn)=>{
            btn.classList.remove("active");
            
        })
        e.currentTarget.parentElement?.classList.add("active");
        
    }
</script>

<button on:click={setActiveIcon}>
    <img src={`/images/icons/${imgRoute}`} alt={`${name} Icon`}/>
    <p>{name}</p>
</button>


<style>
    button{
        padding: .45rem;
        border: none;
        color: inherit;
        text-align: center;
    }

    button > img{
        width: 100%;
    }
</style>