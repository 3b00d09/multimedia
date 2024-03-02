<script lang="ts">
  import { goto } from "$app/navigation";
  import Linebreak from "$lib/components/Linebreak.svelte";
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  
  let activeForm: boolean = false;
  let dialog: HTMLDialogElement;
  let deleteBtn:HTMLButtonElement

  const validateDelete:string = "delete"

  function toggleForm() {
    activeForm = !activeForm
  }

  function toggleDeleteModal(){
    dialog.open ? dialog.close() : dialog.showModal()
  }

  const validate = (e:Event &{currentTarget: EventTarget & HTMLInputElement}) =>{
      if(e.currentTarget.value === validateDelete) deleteBtn.disabled = false
      else deleteBtn.disabled = true
  }

  const handleDeleteAccount = async () => {

    const response = await fetch('/api/users', {
      method: 'DELETE',
    })

    const result = await response.json();
    if (result.success) {
      alert('Your account has been successfully deleted.');
      goto('/register');
    } else {
      alert('There was an issue deleting your account.');
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ul class="box-shadow">
  <li class="change-password">
    <button on:click={toggleForm}>Change Password</button>

    {#if activeForm}
    <form method="POST" action="?/changePassword" in:slide={{ duration: 500, axis:'y', easing: quintOut}} out:slide={{ duration: 500, axis:'y', easing: quintOut}}>

      <input
        type="password"
        id="password"
        name="password"
        placeholder="Current Password"
        required
      />
  
      <input
        type="password"
        id="new-password"
        name="new-password"
        placeholder="New Password"
        required
      />
        <input
          type="password"
          id="repeat-new-password"
          name="repeat-new-password"
          placeholder="Repeat New Password"
          required
        />
  
      <button type="submit">Update Password</button>
    </form>
  
    {/if}
    </li>

    <li class="delete-account">
      <button on:click={toggleDeleteModal}>Delete Account</button>
    </li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <dialog bind:this={dialog} on:click|self={toggleDeleteModal}>
      <div class="dialog">
        <i class="fa-solid fa-triangle-exclamation fa-2xl" style="color: #ba2c2c;"></i>
        <p>Are you sure you want to delete your account?</p>
        <p>All data will be erased <span style="color: #ba2c2c;">with no recovery.</span></p>
        <p>To confirm, type "delete" in the box below.</p>
        <input on:input={validate}>
        <button bind:this={deleteBtn} disabled on:click={handleDeleteAccount}>Delete</button>
      </div>
    </dialog>
</ul>
<style>
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    border-radius: 8px;
    padding: 1rem 1.75rem;
    gap: 1rem;
    height: 100%;
    width: max-content;
  }

  .change-password button,
  .delete-account button {
    background-color: var(--action); /* Slightly more polished look */
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
    transition: box-shadow 0.3s ease, transform 0.2s ease; /* Smooth interaction */
  }

  .change-password button:hover,
  .delete-account button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
    transform: translateY(-2px); /* Slight lift effect */
  }

  input {
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    box-shadow: 
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset, 
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    background-color: transparent;
    border: none;
    color: inherit;
    font: inherit;
    transition: box-shadow 0.3s ease; /* Enhanced transition for input */
  }

  input:focus {
    box-shadow: 
      -2px -2px 6px -4px rgba(226, 224, 224, 0.75) inset, 
      2px 2px 6px 4px rgba(0, 0, 0, 0.75) inset; /* More pronounced focus effect */
  }

  button {
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transition */
    width: 100%;
  }

  form{
    display: grid;
    gap: 1rem;
  }

  dialog::backdrop{
    backdrop-filter: blur(10px);
  }

  dialog{
    position: fixed; /* Use fixed positioning */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the dialog */
    background-color: var(--background);
    color: var(--text-primary);
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid transparent;
    box-shadow: -2px -2px 6px -4px rgba(0, 0, 0, 0.5), 2px 2px 6px 4px rgba(0, 0, 0, 0.5);

  }

  .dialog >  button{
    width: fit-content;
    padding: 0.5rem;
    justify-self: center;
  }
  
  .dialog > button:disabled{
    background-color: gray;
  }

  .dialog{
    display: grid;
    gap: 1rem;
  }

  .dialog > i{
    justify-self: center;
    margin: 1rem 0;
  }

  
</style>
