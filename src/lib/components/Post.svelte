<script>
  import { enhance } from "$app/forms";

</script>
<form use:enhance method="POST">
    <i class="fa-solid fa-circle-user fa-2xl"></i>
    <textarea name="post-content" placeholder="How was your day?"></textarea>
    <div class="icons-container">
        <div class="post-icons">
            <i class="fa-regular fa-image fa-2xl"></i>
            <i class="fa-regular fa-square-caret-right fa-2xl"></i>
        </div>
        <button type="submit">Post</button>
    </div>
</form>

<style>
    form{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-self: center;
        margin-bottom: 1rem;
        align-items: baseline;
    }
    button{
        color: inherit;
        border-radius: 16px;
        /**dont ask*/
        font-size: .875rem;
    }

    textarea{
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
        gap: 1rem;
        align-items: center;
    }

    i{
        color: var(--secondary);
    }
</style>