<script lang="ts">
  import { goto } from "$app/navigation";
  import Linebreak from "$lib/components/Linebreak.svelte";
  let showPasswordChange = false;
  let showEmailChange = false;
  let showDeleteAccount = false;

  function toggleSection(section: "password" | "email" | "delete") {
    showPasswordChange = false;
    showEmailChange = false;
    showDeleteAccount = false;

    if (section === "password") {
      showPasswordChange = true;
    } else if (section === "email") {
      showEmailChange = true;
    } else if (section === "delete") {
      showDeleteAccount = true;
    }
  }


  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      return;
    }

    const response = await fetch('/api/users', {
      method: 'DELETE',
    });


    const result = await response.json();
    if (result.success) {
      alert('Your account has been successfully deleted.');
      goto('/login');
    } else {
      alert('There was an issue deleting your account.');
    }
  }
</script>

<ul class="box-shadow">
  <li class="change-password">
    <button on:click={() => toggleSection("password")}>Change Password</button>

    {#if showPasswordChange}
    <form method="POST" action="?/changePassword">

      <label for="current-password">Current Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Current Password"
        required
      />
  
      <label for="new-password">New Password</label>
      <input
        type="password"
        id="new-password"
        name="new-password"
        placeholder="New Password"
        required
      />
        <label for="repeat-new-password">Repeat New Password</label>
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
    <Linebreak />
    </li>


  <li class="change-email">
    <button on:click={() => toggleSection("email")}>Change Email</button>
    {#if showEmailChange}
      <p>email</p>
    {/if}
    <Linebreak />
  </li>

  <li class="delete-account">
    <button on:click={() => toggleSection("delete")}>Delete Account</button>
    {#if showDeleteAccount}
      <!-- Updated to call handleDeleteAccount function -->
      <button type="button" on:click={handleDeleteAccount}>Delete your account</button>
    {/if}
    <Linebreak />
  </li>
</ul>

<style>
  ul {
    list-style: none;
    display: grid;
    background: transparent;
    border-radius: 8px;
    padding: 1rem 1.75rem;
    height: 70vh;
    grid-template-columns: repeat(1, 16rem);
    grid-template-rows: repeat(4, auto) 1fr;

    grid-auto-rows: min-content;
    gap: 2rem;
    margin: 0 1.75rem;
    justify-self: end;
    width: fit-content;

    /** prevents the active::before from exploding*/
    align-items: baseline;
  }

  .change-password button,
  .change-email button,
  .delete-account button {
    margin-bottom: 0.5rem;
  }

  input {
    flex-grow: 2;
    padding: 1rem;
    border-radius: 1rem;
    flex-basis: 90%;
    height: auto;
    width: 100%;
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

  p {
    color: hsl(240, 5%, 64.9%);
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  button {
    color: white;
    padding: 10px 15px;
    width: 100%;
    margin-top:0.5rem;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  ul li:nth-child(3) {
    align-self: end;
  }
</style>
