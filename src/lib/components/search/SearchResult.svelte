<script lang="ts">
  import { page } from '$app/stores';
  import "../../../global.css";

  import SerachResBtn from './SerachResBtn.svelte';
  $: query = $page.params.query;
</script>

<ul>

  <a href={`/explore/search/${query}`}>
    <li class="icon-container"><SerachResBtn name={"Show All"} /></li>
  </a>

  <a href={`/explore/search/${query}/user`}>
    <li class="icon-container"><SerachResBtn name={"User"} /></li>
  </a>
 
  <a href={`/explore/search/${query}/post`}>
    <li class="icon-container"><SerachResBtn name={"Post"} /></li>
  </a>

</ul>

<style>
  ul {
    display: flex;
    text-align: center;
    border: none;
    justify-content: space-evenly;
    list-style: none;
    outline: none;
    text-decoration: none; 
    margin: 1rem 0;
  }

  a {
    text-decoration: none; 
    color: inherit; 
  }

  .icon-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    text-decoration: none; 
  }
</style>
