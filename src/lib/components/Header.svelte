<script>
  import { Navigation } from "$components";
</script>

<div class="content">
  <div class="left">
    <Navigation desktop={false} />
  </div>
  <div class="right">right</div>
</div>

<style lang="scss">
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 100vh;
    // background-color: var(--bg-color);
  }
</style>
