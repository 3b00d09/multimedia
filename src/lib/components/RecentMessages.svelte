<script>
    import "../../global.css"
  import RecentMessage from "./RecentMessage.svelte";
</script>

<div class="recent-messages">
    <div class="recent-messages-header">
        <h2>Messages</h2>
        <img src="/images/icons/compose.png" alt="Recent Messages Icon" />
    </div>
    <ul>
        <li><RecentMessage/></li>
        <li>Recent Messages Item</li>
        <li>Recent Messages Item</li>
        <li>Recent Messages Item</li>
    </ul>
</div>


<style>

    .recent-messages{
        display: grid;
        align-items: baseline;
        padding: 1rem;
        box-shadow: 2px 0px 6px -5px rgba(226, 224, 224, 0.5) inset,
              0px 0px 5px 0px rgba(0, 0, 0, 0.5);
        width: fit-content;
        height:fit-content;
    }

    .recent-messages-header > h2{
        font-size: medium;
    }

    .recent-messages-header > img{
        width: 32px;
    }

    .recent-messages-header{
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .recent-messages> ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        text-align: center;
        justify-self: center;
        border-radius: 8px;
    }

</style>