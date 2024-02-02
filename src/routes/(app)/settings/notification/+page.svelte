<script>
  import "../../../../global.css"
  let notificationsEnabled = false;
</script>



<ul class="box-shadow">
  <li class="change-username">
    <form>
      <div class="notification-setting">
        <label for="notification-toggle">App Notification</label>
        <span class="toggle-label">{notificationsEnabled ? 'On' : 'Off'}</span>
        <div class="toggle-switch">
          <input
            type="checkbox"
            id="notification-toggle"
            bind:checked={notificationsEnabled}
          />
          <label for="notification-toggle" class="switch"></label>
        </div>
      </div>
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
    grid-template-columns: repeat(1, 18rem);
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
   position: absolute;
    padding: 1rem;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 34px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow:
      -2px -2px 6px -4px rgba(226, 224, 224, 0.5) inset,
      2px 2px 6px 4px rgba(0, 0, 0, 0.5) inset;
    border: none;
    color: inherit;
    font: inherit;
    transition: .4s;
    border-radius: 34px;
  }

  .switch:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 26px;
    left: 0.39rem;
    bottom: 2px;
    background-color: black;
    transition: .4s;
    border-radius: 40%;
  }

  input:checked + .switch {
    background-color:var(--action);
  }

  input:checked + .switch:before {
    transform: translateX(46px);
  }

  .toggle-label {
    margin-left: 70px;
    line-height: 34px;
    font-size: 16px;
    white-space: nowrap;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  ul li:nth-child(3) {
    align-self: end;
  }
  
  .notification-setting {
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
  }

</style>
