<script lang="ts">
  import "../../global.css"
  import Linebreak from "./Linebreak.svelte";
  import Settingsbar from "./subcomponents/Settingsbar.svelte";

</script>

<ul class="box-shadow">
  <a href="/settings/usersetting">
    <li class="icon-container">
      <Settingsbar imgRoute={"usersetting.PNG"} name={"Account Setting"} description={"Manage profile, details profile picture, bio"} key={"usersetting"}/>
    </li> 
    <Linebreak/>
  </a>
</ul>

<style>

ul{
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


  ul li:nth-child(5){
    background-color: red;
      
  }
</style>