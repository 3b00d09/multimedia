<script lang="ts">
  import "../../../global.css";
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
   </a>
    <Linebreak />

  <a href="/settings/usersetting">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"usersetting.PNG"}
        name={"Account Setting"}
        description={"Manage profile, details profile picture, bio"}
        key={"usersetting"}
      />
    </li>
    </a
  ><Linebreak />

  <a href="/settings/security">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"Privacypolicy.PNG"}
        name={"Privacy & Security"}
        description={"Manage visibility, block lists, two-factor authentication"}
        key={"security"}
      />
    </li>
    </a
  ><Linebreak />

  <a href="/settings/preferences">
    <li class="icon-container">
      <Settingsbar
        imgRoute={"preferences.png"}
        name={"Preferences"}
        description={"Adjust feed preferences."}
        key={"preferences"}
      />
    </li>
    </a
  >

</ul>

<style>
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    background: transparent;
    border-radius: 8px;
    padding: 1rem 1.75rem;
    height: 70vh;
    width: fit-content;
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
</style>
