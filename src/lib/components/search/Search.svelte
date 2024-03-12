<script lang="ts">
  import "../../../global.css";
  import SearchBtn from "./SearchBtn.svelte";

</script>

<ul>

  <a href="/explore"
    ><li class="icon-container"><SearchBtn name={"Show All"} /></li></a
  >

  <a href="/explore/user"
    ><li class="icon-container"><SearchBtn name={"User"} /></li></a
  >
  <a href="/explore/post"
    ><li class="icon-container"><SearchBtn name={"Post"} /></li></a
  >

</ul>

<style>
  ul {
    display: flex;
    text-align: center;
    border: none;
    justify-content: space-evenly;
    margin-bottom: 0.75rem;
    margin-top: 0.75rem;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  a {
    text-decoration: none; 
    color: inherit; 
  }
</style>
