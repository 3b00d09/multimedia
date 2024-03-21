<script lang="ts">
  import { goto } from "$app/navigation";
  import Linebreak from "$lib/components/Linebreak.svelte";
  import { toastStore } from "$lib/helpers/stores.js";
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  
  export let form;

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

  $:{
    if(form){
      toastStore.set({
        active: true,
        status: form.success ? "success" : "error",
        message: form.message
      })
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ul class="box-shadow">
  <div class="buttons-container">
  <li class="change-password">
    <button on:click={toggleForm}>Change Password</button>
    {#if activeForm}
    <form method="POST" action="?/changePassword" in:slide={{ duration: 500, axis:'y', easing: quintOut}} out:slide={{ duration: 200, axis:'y', easing: quintOut}}>

      <input
        type=""
        id="password"
        name="password"
        placeholder="Current Password"
        required
      />
  
      <input
        type=""
        id="new-password"
        name="new-password"
        placeholder="New Password"
        required
      />
        <input
          type=""
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
  </div>
</ul>

<style>


  
  ul {
    list-style: none;
    display: grid;
    text-align: center;
    background: transparent;
    border-radius: 2px;
    padding: 1rem 1.75rem;
    height: 70vh;
    grid-template-columns: repeat(1, 16rem);
    grid-template-rows: repeat(4, auto) 1fr;
    width: fit-content;
    align-items: baseline;
  }

 

  .change-password button{
    background-color: var(--action);
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    transition: box-shadow 0.3s ease, transform 0.2s ease; 
  }
  .delete-account button {
    background-color: var(--action);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  }

  .change-password button:hover,
  .delete-account button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    transform: translateY(-2px); 
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
    transition: box-shadow 0.3s ease; 
  }

  input:focus {
    box-shadow: 
      -2px -2px 6px -4px rgba(226, 224, 224, 0.75) inset, 
      2px 2px 6px 4px rgba(0, 0, 0, 0.75) inset;
  }

  button {
    color: white;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease; 
    width: 9%;
    min-width: 250px; 
    margin-bottom:1rem ;
  }

  form{
    display: grid;
    
  }

  dialog::backdrop{
    backdrop-filter: blur(10px);
  }


  dialog{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    background-color: var(--background);
    color: var(--text-primary);
  
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
