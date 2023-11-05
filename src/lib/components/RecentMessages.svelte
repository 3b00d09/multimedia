<script>
    import "../../global.css"
</script>

<div class="recent-messages">
    <ul>
        <li>Recent Messages Item</li>
        <li>Recent Messages Item</li>
        <li>Recent Messages Item</li>
        <li>Recent Messages Item</li>
    </ul>
</div>


<style>

    .recent-messages{
        display: grid;
        justify-self: flex-end;
    }

    .recent-messages> ul{
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