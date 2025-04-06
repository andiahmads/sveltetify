<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<input />
<select>
  <option>Option</option>
</select>
<button>Button</button>

<style lang="scss">
  @use "@unsass/breakpoint";
  h1 {
    color: red;
    font-size: toRem(50);
    @include breakpoint.up("md") {
      color: green;
    }
    @include breakpoint.up("lg") {
      color: blue;
    }
  }
</style>
