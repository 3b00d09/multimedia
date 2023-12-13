<script lang="ts">

    let btnContainer: HTMLDivElement;
    const setActive = (e:MouseEvent & { currentTarget: HTMLButtonElement; }) =>{
        btnContainer.querySelectorAll("button").forEach((btn)=>{
            btn.classList.remove("active")
        })

        e.currentTarget.classList.add("active")
    }
</script>

<div bind:this={btnContainer} class="categories-header">
    <button class="active" on:click={setActive}>For You</button>
    <button on:click={setActive}>Following</button>
</div>
<ul>
    <li>For You</li>
    <li>Following</li>
    <li>Action</li>
    <li>News</li>
</ul>


<style>

    .categories-header{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }
    
    ul{
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        list-style: none;
    }

    li{
        /* box-shadow: 2px 0px 6px -5px rgba(226, 224, 224, 0.5) inset,
              0px 0px 5px 0px rgba(0, 0, 0, 0.5);
        padding: 1rem;
        border-radius: 16px; */
        font-size: 1rem;

        padding: 0.75rem 1.15rem;
        border-radius: 10px;
        background: #131313;
        box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.50), -3px -3px 10px 0px rgba(255, 255, 255, 0.03);
        min-width: fit-content;
    }

    button{
        border: 0;
        color: var(--text-secondary);
        font-size: 1.2rem;
    }

    .active{
        position: relative;
        color:var(--text);
    }

    .active::before{
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        top: 10;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--action);
        filter: drop-shadow(0px 0px 5px rgba(108, 92, 214, 0.50));
    }
</style>