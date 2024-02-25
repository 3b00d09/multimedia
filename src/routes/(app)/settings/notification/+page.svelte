<script>
  let postPreference = "";
</script>

<form method="POST" action="?/updatePreference" class="form-container">
  <div class="radio-group">
    <label class="radio-option">
      <input
        type="radio"
        name="postPreference"
        value="all"
        bind:group={postPreference}
      />
      All
    </label>
    <label class="radio-option">
      <input
        type="radio"
        name="postPreference"
        value="textOnly"
        bind:group={postPreference}
      />
      Text Only
    </label>
    <label class="radio-option">
      <input
        type="radio"
        name="postPreference"
        value="mediaOnly"
        bind:group={postPreference}
      />
      Media Only
    </label>
  </div>
  <button type="submit" class="submit-btn">Update Preference</button>
</form>

<style>
  .form-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 25px;
    background: #292d3e;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
  }

  .radio-option {
    display: flex;
    align-items: center;
    background-color: #434758;
    color: #ffffff;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;
  }

  .radio-option:hover {
    transform: translateY(-2px);
  }

  .radio-option input[type="radio"] {
    accent-color: #6200ea;
    margin-right: 15px;
  }

  .submit-btn {
    background-color: #6200ea;
    color: #ffffff;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  .submit-btn:hover {
    background-color: #7f22ff;
    transform: scale(1.05);
  }
</style>
