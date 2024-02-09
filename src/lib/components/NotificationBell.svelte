<script lang="ts">
    let active = false;
</script>

<div class="container">
    <button on:click={()=>active = true}>
        <img src="/images/icons/notification-bell.png" alt="Notifications icon">
        <div class="notifications-container"></div>
    </button>

</div>

<style>
    img{
        width: 26px;
    }
    button{
        all: unset;
        cursor: pointer;
        position: relative;
    }

    .container{
        z-index: 100000;
        display: flex;
        flex-direction: column;
    }

    .notifications-container{
        width: 200px;
        height: 200px;
        background-color: red;
        position: absolute;
        
    }

</style>