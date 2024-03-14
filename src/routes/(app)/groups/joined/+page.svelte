<script lang="ts">
    export let data;
  import JoinedGroup from '$lib/components/groups/JoinedGroup.svelte';
</script>


<div>

<div class="container">
      <h2>Joined Groups</h2>
    </div>

  </div>
  {#if data.joinedGroups.length === 0}
    <p style="color:var(--text-secondary)">No items found</p>
  {:else}
          
            <div class="groups-header">
              <p>Name</p>
              <p>Description</p>
              <p>Date</p>
              <p>Actions</p>
              </div>
            {#each data.joinedGroups as group}
              {#if group.groups}
                <JoinedGroup group={group.groups}/>
              {/if}
          {/each}
  {/if}
<style>

div{
    align-self: start;
    display: grid;
    gap: 1rem;
    padding: 0.25rem 0;
}

h2{
  font-size: 1.2rem;
}


.container{
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.groups-header{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  border-bottom: 1px solid var(--text-secondary);
  padding: 1rem 0.25rem;
}


.groups-header{
  color: var(--text-secondary);
}

.groups-header > p:nth-child(4), .groups-header > p:nth-child(3){
  text-align: center;
}
.groups-header > p:nth-child(3){
  text-align: center;
}

</style>