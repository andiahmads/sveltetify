<script>
  import { browser } from "$app/environment";
  import { Navigation } from "$components";
</script>

<div class="content">
  <div class="left">
    {#if browser}
      <Navigation desktop={false} />
    {/if}
  </div>
  <div class="right">right</div>
</div>

<style lang="scss">
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // height: 100vh;
    // background-color: var(--bg-color);
  }
</style>
