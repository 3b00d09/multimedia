<script lang="ts">
  let postPreference = "";
  import { tick } from "svelte";
  import { Confetti } from "svelte-confetti";
  import { enhance} from '$app/forms'
  export let form;

  let active = false;
  async function showConfetti() {
    active = false;
    await tick();
    active = true;
  }
</script>

<form method="POST" action="?/updatePreference" class="form-container" use:enhance>
  <ul class="box-shadow">
    <div class="filter-group">
      <label class="filter-option">
        <input
          type="radio"
          name="postPreference"
          value="all"
          bind:group={postPreference}
        />
        All
      </label>
      <label class="filter-option">
        <input
          type="radio"
          name="postPreference"
          value="textOnly"
          bind:group={postPreference}
        />
        Text Only
      </label>
      <label class="filter-option">
        <input
          type="radio"
          name="postPreference"
          value="mediaOnly"
          bind:group={postPreference}
        />
        Media Only
      </label>
    </div>
    <button on:click={showConfetti} type="submit" class="submit-btn"
      >Update Preference</button
    >
    {#if form?.success}
    <Confetti />
  {:else if form && !form.success}
  <p class="error-message">We couldn't update your preferences at this moment. Please try again.</p>
  {/if}
  </ul>
</form>

<style>
  ul {
    list-style: none;
    display: grid;
    text-align: center;
    background: transparent;
    border-radius: ´2px;
    padding: 1rem 1.75rem;
    height: 70vh;
    grid-template-columns: repeat(1, 16rem);
    grid-template-rows: repeat(4, auto) 1fr;
    justify-items: center;
    grid-auto-rows: min-content;
    gap: 1rem;
    justify-self: end;
    width: fit-content;
    align-items: baseline;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .filter-option {
    display: flex;
    align-items: center;
    background: #131313;
    color: #ffffff;
    box-shadow:
      5px 5px 10px 0px rgba(0, 0, 0, 0.5),
      -3px -3px 10px 0px rgba(255, 255, 255, 0.03);
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;
  }

  .filter-option:hover {
    transform: translateY(-2px);
  }

  .filter-option input[type="radio"] {
    accent-color: #6c5cd6;
    margin-right: 15px;
  }

  .submit-btn {
    background-color: #6c5cd6;
    color: #ffffff;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
  }

  .submit-btn:hover {
    background-color: #6c5cd6;
    transform: scale(1.05);
  }
  
</style>
