<div class="form-container">
  <ul class="box-shadow">
    <li class="filter-group">
      <form method="POST" action="?/makePrivate">
        <button type="submit" class="submit-btn">Make Account Private</button>
      </form>
    </li>
    
    <li class="filter-group">
      <form method="POST" action="?/makePublic">
        <button type="submit" class="submit-btn">Make Account Public</button>
      </form>
    </li>
  </ul>
</div>
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

  .submit-btn {
    background-color: #6c5cd6;
    color: #ffffff;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 90%;
  }


</style>