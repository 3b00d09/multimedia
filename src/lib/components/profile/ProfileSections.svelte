<script>
    import SectionBtn from "./SectionBtn.svelte";
    
</script>
<div class="content-container">
    <SectionBtn name="Posts"/>
    <SectionBtn name="Comments"/>
    <SectionBtn name="Likes"/>
</div>


<style>

.content-container{
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;
    margin-top: 1rem;
}
</style>
