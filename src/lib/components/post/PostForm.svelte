<script lang="ts">
  import { enhance } from "$app/forms";
  let videoInput: HTMLInputElement;
  let imageInput: HTMLInputElement;
  import { mainContainerStore } from "$lib/helpers/stores";

  const actionWhenInViewPort= (e:any) =>{
    const observer = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting) mainContainerStore.set({active: false})
      else mainContainerStore.set({active: true})
    })
    observer.observe(e)
  }
</script>

<form use:actionWhenInViewPort use:enhance method="POST" action="?/post" enctype="multipart/form-data">
  <i class="fa-solid fa-circle-user fa-2xl"></i>
  <div class="container">
    <textarea name="post-content" placeholder="How was your day?"></textarea>
    <input
      bind:this={videoInput}
      class="file-input"
      name="video"
      type="file"
      accept="video/mp4,video/x-m4v,video/*"
      hidden
    />
    <input
      bind:this={imageInput}
      class="file-input"
      name="pictureUrl"
      type="file"
      accept="image/png,image/jpeg"
      hidden
    />
    <div class="icons-container">
      <div class="post-icons">
        <button on:click={() => videoInput.click()}
          ><img
            src="/images/icons/upload-video.png"
            alt="Upload Video Icon"
          /></button
        >
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <button on:click={() => imageInput.click()}
          ><img
            src="/images/icons/upload-image.png"
            alt="Upload Image Icon"
          /></button
        >
      </div>
      <button class="submit-btn" type="submit">Post</button>
    </div>
  </div>
</form>

<style>
  form {
    display: flex;
    gap: 1rem;
    justify-self: center;
    margin-bottom: 1rem;
    align-items: baseline;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
  }

  button {
    border: 0;
    padding: 0;
  }
  button > img {
    width: 100%;
  }

  .submit-btn {
    /**dont ask*/
    font-size: 0.875rem;
    border: none;
    background-color: var(--action);
    padding: 1rem 2rem;
    color: inherit;
  }

  textarea {
    flex-grow: 1;
    padding: 1rem;
    border-radius: 1rem;
    flex-basis: 90%;
    height: auto;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    background-color: transparent;
    border: none;
    color: inherit;
    font: inherit;
    resize: none;
    transition: border-radius 0.5s;
  }

  textarea:focus {
    border-radius: 0;
    outline: none;
  }

  textarea:focus {
    border: none;
  }

  .icons-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-basis: 100%;
    align-items: center;
  }

  .post-icons {
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  button > img {
    width: 1.75rem;
  }

  i {
    color: var(--secondary);
  }
</style>