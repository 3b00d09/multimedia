<script lang="ts">
  import "../../global.css";
  import Linebreak from "../Linebreak.svelte";
  import Settingsbar from "./Settingsbar.svelte";
</script>

<ul class="box-shadow">
  <a href="/settings/profilesetting">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"Edit.PNG"}
        name={"Profile Settings"}
        description={"Manage profile, details profile picture, bio"}
        key={"profilesetting"}
      />
    </li>
    <Linebreak /></a
  >

  <a href="/settings/usersetting">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"usersetting.PNG"}
        name={"Account Setting"}
        description={"Manage profile, details profile picture, bio"}
        key={"usersetting"}
      />
    </li>
    <Linebreak /></a
  >

  <a href="/settings/security">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"Privacypolicy.PNG"}
        name={"Privacy & Security"}
        description={"Manage visibility, block lists, two-factor authentication"}
        key={"security"}
      />
    </li>
    <Linebreak /></a
  >

  <a href="/settings/notification">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"notification-bell.png"}
        name={"Notifications"}
        description={"Adjust push, email, and in-app notifications"}
        key={"notification"}
      />
    </li>
    <Linebreak /></a
  >

  <a href="/settings/message">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"Message.PNG"}
        name={"Chat & Messaging"}
        description={"Set preferences for message notifications, read receipts"}
        key={"message"}
      />
    </li>
    <Linebreak /></a
  >
</ul>

<style>
  ul {
    list-style: none;
    display: grid;
    text-align: center;
    background: transparent;
    border-radius: 8px;
    padding: 1rem 1.75rem;
    height: 70vh;
    grid-template-columns: repeat(1, 16rem);
    grid-template-rows: repeat(4, auto) 1fr;
    justify-items: center;

    grid-auto-rows: min-content;
    gap: 2rem;

    margin: 0 1.75rem;
    justify-self: end;
    width: fit-content;

    /** prevents the active::before from exploding*/
    align-items: baseline;
  }

  ul a {
    text-decoration: none;
    color: inherit;
  }

  ul li {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  ul li:nth-child(5) {
    align-self: end;
  }
</style>
