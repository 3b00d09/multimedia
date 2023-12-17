<script>
  import { enhance } from "$app/forms";

</script>
<form use:enhance method="POST" action="?/post">
    <i class="fa-solid fa-circle-user fa-2xl"></i>
    <div class="container">
        <textarea name="post-content" placeholder="How was your day?"></textarea>
        <div class="icons-container">
            <div class="post-icons">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <button><img src="/images/icons/upload-image.png" alt="Upload Image Icon"></button>
                <button><img src="/images/icons/upload-video.png" alt="Upload Video Icon"></button>
                <button><img src="/images/icons/upload-gif.png" alt="Upload GIF Icon"></button>
            </div>
            <button class="submit-btn" type="submit">Post</button>
        </div>
    </div>
</form>

<style>
    form{
        display: flex;
        gap: 1rem;
        justify-self: center;
        margin-bottom: 1rem;
        align-items: baseline;
    }

    .container{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 1rem;
    }

    button{
        border: 0;
        padding: 0;
    }

    button > img{
        width: 100%;
    }

    .submit-btn{
        /**dont ask*/
        font-size: .875rem;
        border: none;
        background-color: var(--action);
        padding: 1rem 2rem;
        color: inherit;
    }

    textarea{
        flex-grow: 1;
        padding: 1rem;
        border-radius: 1rem;
        flex-basis: 90%;
        height: auto;
        box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset, 2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
        background-color: transparent;
        border: none;
        color: inherit;
        font: inherit;
        resize: none;
        transition: border-radius 0.5s;
    }

    textarea:focus{
        border-radius: 0;
        outline: none;
    }


    textarea:focus{
        border: none;
    }

    .icons-container{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-basis: 100%;
        align-items: center;
    }

    .post-icons{
        display: flex;
        align-items: baseline;
        gap: 1rem;
    }

    button > img{
        width: 1.75rem;
    }

    i{
        color: var(--secondary);
    }
</style>