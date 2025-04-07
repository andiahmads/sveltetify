<script lang="ts">
  import { Button } from "$components";
  import logo from "$assets/logo.png";
  import cover from "$assets/cover.png";
</script>

<div class="wrapper">
  <div class="content">
    <img src={logo} class="logo" alt="Spotify" />
    <h1>EGP 0.00 for 3 monts of premium</h1>
    <p>
      Enjoy ad-free music listening, offline playback, and more. cancel anytime
    </p>
    <div class="button">
      <Button
        element="a"
        variant="outline"
        href="https://www.spotify.com/"
        target="_blank"
        rel="noopener noreferrer">Sign Up</Button
      >
      <Button element="a" href="/api/auth/login">Login</Button>
    </div>
  </div>
  <div class="cover">
    <img src={cover} class="cover" alt="cover album" />
  </div>
</div>

<style lang="scss">
  @use "@unsass/breakpoint";
  :global(body) {
    background-image: linear-gradient(
      230deg,
      var(--side-color),
      var(--bg-color)
    );
    height: 100vh;
  }
  .wrapper {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 80px auto 0;
    align-items: center;
    flex-direction: column;
    @include breakpoint.up("md") {
      flex-direction: row;
    }
  }
  .cover {
    flex: 1;
    margin-top: 40px;
    @include breakpoint.up("md") {
      margin-top: 0;
      margin-left: 20px;
    }
    img {
      max-width: 100%;
    }
  }
  .content {
    flex: 1.8;
    h1 {
      font-size: toRem(40);
    }
    p {
      font-size: toRem(20);
    }
    :global(.button) {
      margin-top: 40px;
      padding: 10px 20px;
      text-transform: uppercase;
    }
    .logo {
      width: 170px;
      max-width: 100%;
      margin-bottom: 30px;
    }
  }
</style>
