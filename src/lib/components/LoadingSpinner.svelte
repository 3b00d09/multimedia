<script lang="ts">
  export let centered: boolean = false;
</script>
<div class="loading" class:centered={centered}></div>

<style>
  .loading {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }

  .centered{
    justify-self: center;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
