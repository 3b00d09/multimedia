<header>
    <div class="nav-search">
        <input type="text" placeholder="Search...">
    </div>
</header>


<style>
    header{
        display: flex;
        align-items: baseline;
        /** 33% because main page has grid 33-33-33 and the header should be as wide as the middle section of the grid*/
        width: 33%;
        justify-self: center;
    }

    .nav-search{
        width: 100%;
    }

    input{
        padding: 0.75rem;
        border-radius: 8px;
        font-size: 0.65rem;
        width: 100%;
        box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset, 2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
        background: transparent;
        border: none;
        outline: none;
        color: inherit;
        font: inherit;
    }
</style>