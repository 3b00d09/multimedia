<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Confetti from "svelte-confetti";
  import { quintOut } from "svelte/easing";
  import { fade, blur, fly } from "svelte/transition";

  let animate: boolean = false;

  type formData = {
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
  };

  let data: formData = {
    firstName: null,
    lastName: null,
    bio: null,
  };

  let message: { content: string; success: boolean | undefined } = {
    content: "",
    success: undefined,
  };

  const submitData = async () => {
    const req = await fetch("/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    
    const res = await req.json();

    if (res.success) {
      message.content = "Data updated successfully";
      message.success = true;
      setTimeout(() => {
        goto("/")
      }, 1500);
    } else {
      message.content = "Something went wrong. Please try again.";
      message.success = false;
    }
  };

  onMount(() => {
    animate = true;
  });
</script>

<div class="container">
  {#if animate}
    <div
      class="title"
      in:fly={{ duration: 2000, y: -300, opacity: 0, easing: quintOut }}
    >
      Welcome to Multimedia
    </div>

    <div
      class="title"
      in:fly={{
        delay: 2000,
        duration: 2000,
        y: 300,
        opacity: 0,
        easing: quintOut,
      }}
    >
      An AI-enhanced Social Media platform
    </div>

    <div style="display: flex; gap: 0.5rem;" class="title">
      <div
        in:fly={{
          delay: 4000,
          duration: 2000,
          x: -300,
          opacity: 0,
          easing: quintOut,
        }}
      >
        First, tell us
      </div>
      <div
        in:fly={{
          delay: 4000,
          duration: 2000,
          x: 300,
          opacity: 0,
          easing: quintOut,
        }}
      >
        more about yourself
      </div>
    </div>

    <div
      class="form"
      in:fly={{
        delay: 4000,
        duration: 2000,
        y: 300,
        opacity: 0,
        easing: quintOut,
      }}
    >
      <input type="text" bind:value={data.firstName} placeholder="First Name" />

      <input type="text" bind:value={data.lastName} placeholder="Last Name" />

      <textarea bind:value={data.bio} placeholder="About you.." />
      <div class="footer-btns">
        <button on:click={submitData}>Take me on a tour</button>
        <a href="/">Do this later</a>
      </div>
    </div>
  {/if}
</div>

<div style="justify-self: center;">
  {#if message.success}
    <Confetti />
  {:else if message.success === false}
    <p>Something went wrong, please try again later.</p>
  {/if}
</div>

<style>
  .container {
    display: grid;
    place-items: center;
    gap: 1rem;
  }

  .title {
    font-family: "Roboto Serif";
    font-size: 1.5rem;
  }
  input,
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

  .form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 75%;
    padding: 0.5rem;
  }

  button {
    background-color: var(--action);
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .footer-btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  a {
    all: unset;
    color: var(--text-secondary);
    cursor: pointer;
  }
</style>
