<script lang="ts">
    import "../../global.css"
</script>

<div class="auth-container">
    <div class="slot-container">
        <slot/>
    </div>
    <div class="auth-bg-container">
        <img class="auth-bg" src="/images/auth-bg-3.jpg" alt="man holding phone">
    </div>
    
</div>


<style>
    .auth-container{
        display: flex;
        height: 100vh;
        background-color: var(--secondary);
    }

    .slot-container{
        display: grid;
        flex-basis: 50%;
        align-self: center;
    }

    .auth-bg-container{
        flex-basis: 50%;
    }

    .auth-bg{
        height: 100%;
        width: 100%;
        object-fit: fill;
        opacity: 0.4;
    }
</style>