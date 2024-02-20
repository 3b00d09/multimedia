<script lang="ts">
  let username = ''; 
  let lastName = ''; 
  let firstName = '';

  const handleSubmit = async () => {
    if (!username && !firstName && !lastName) {
      return alert("Please enter at least one field to update");
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, firstName, lastName }), 
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);

      username = '';
      firstName = '';
      lastName = '';
    } else {
   
      alert("Failed to update user information.");
    }
  }
</script>

<ul class="box-shadow">
  <li class="change-username">
    <form on:submit|preventDefault={handleSubmit} class="modal-search-form">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        bind:value={username}
        placeholder="Username"
      />

      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        bind:value={firstName}
        placeholder="First Name"
      />

      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        bind:value={lastName}
        placeholder="Last Name"
      />

      <button type="submit">Update Name</button>
    </form>
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



  button {
    color: white;
    padding: 10px 15px;
    width: 100%;
    margin-top: 1rem;
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
