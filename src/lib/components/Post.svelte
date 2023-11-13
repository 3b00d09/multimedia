<script>
  import { enhance } from "$app/forms";

</script>
<form use:enhance method="POST">
    <input name="post-content" type="text" placeholder="How was your day?">
    <button type="submit">Post</button>
</form>

<style>
    form{
        margin-bottom: 1rem;
    }
    button{
        color: white;
    }

    input{
        width: 50%;
        padding: 1rem;
        border-radius: 1rem;
    }
</style>