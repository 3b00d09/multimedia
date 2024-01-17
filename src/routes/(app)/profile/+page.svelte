<script lang="ts">
    export let data;
</script>


{#if data.user}
<div class="profile-container">
    <div class="pfp-container">
        <img src={data.user.profilePictureUrl} alt="profile">
    </div>
    <p>{`@${data.user.username}`}</p>
</div>

{/if}

<style>
    .profile-container{
        margin-top: 1rem;
        display: grid;
        gap: 1rem;
        width: 100%;
        text-align: center;
    }

    p{
        font-size: 1.25rem;
        color: #C3C0C0;
    }

    .pfp-container{
        display: grid;
        place-content: center;
    }    

    .pfp-container > img{
        width: 10rem;
        height: 10rem;
        object-fit: cover;
        border-radius: 50%;
    }
</style>