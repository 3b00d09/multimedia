<script lang="ts">
  let username:string = ''; 
  let lastName:string = ''; 
  let firstName:string = '';
  let bio: string = '';

  const handleSubmit = async () => {
    if (!username && !firstName && !lastName && !bio) {
      return alert("Please enter at least one field to update");
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, firstName, lastName, bio }), 
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);

      username = '';
      firstName = '';
      lastName = '';
      bio = '';
    } else {
      alert("Failed to update user information.");
    }
  }
</script>

  <form on:submit|preventDefault={handleSubmit} class="modal-search-form">
    <input
      type="text"
      id="username"
      bind:value={username}
      placeholder="Username..."
    />
    
    <input
      type="text"
      id="firstName"
      bind:value={firstName}
      placeholder="First Name..."
    />

    
    <input
      type="text"
      id="lastName"
      bind:value={lastName}
      placeholder="Last Name..."
    />

    <textarea bind:value={bio} placeholder="Bio..."></textarea>

    <button type="submit">Update Details</button>
  </form>

<style>
  form {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    padding: 1rem 1.75rem;
    height: 100%;
    gap: 2rem;
    box-shadow: -2px -2px 6px -4px rgba(226, 224, 224, 0.5), 2px 2px 6px 4px rgba(0, 0, 0, 0.5);
  }



  input {
    padding: 1rem;
    border-radius: 1rem;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    background-color: transparent;
    border: none;
    color: inherit;
    font: inherit;
    transition: border-radius 0.5s;
    font-size: 1rem;
  }

  textarea{
    resize: none;
    padding: 1rem;
    border-radius: 16px;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    background-color: transparent;
    border-color: var(--background);
    flex-grow: 1;
    color: var(--text-primary);
    font-family: 'Roboto';
    font-size: 1rem;
  }



  button {
    all: unset;
    text-align: center;
    color: white;
    padding: 0.6rem;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    background-color: var(--action);
  }

</style>
