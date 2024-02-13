<script lang="ts">
    import SectionBtn from "./SectionBtn.svelte";

    export let username:string;
    
</script>
<div class="content-container">
    <SectionBtn {username} name="Posts"/>
    <SectionBtn {username} name="Comments"/>
    <SectionBtn {username} name="Likes"/>
</div>



  

<style>

.content-container{
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;
    margin-top: 1rem;
}



</style>
