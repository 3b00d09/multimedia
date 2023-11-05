<script>
    import "../../global.css"
</script>

<div class="side-nav">
    <ul>
        <li>Sidenav Item</li>
        <li>Sidenav Item</li>
        <li>Sidenav Item</li>
        <li>Sidenav Item</li>
    </ul>
</div>


<style>

    .side-nav{
        display: grid;
    }

    .side-nav > ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        text-align: center;
        background-color: var(--secondary);
        justify-self: center;
        border-radius: 8px;
        padding: 1rem;
    }

</style>