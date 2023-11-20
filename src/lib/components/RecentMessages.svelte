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
        justify-self: center;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 2px 0px 6px -5px rgba(226, 224, 224, 0.5) inset,
              0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    }

</style>