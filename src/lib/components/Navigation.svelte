<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import logo from "$assets/logo.png";
  import { Home, Search, ListMusic } from "lucide-svelte";
  import { page } from "$app/stores";

  export let desktop: boolean;
  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    [key: string]: any; // Untuk props tambahan
  }

  const menuItems: {
    path: string;
    label: string;
    icon: typeof SvelteComponent<IconProps>;
  }[] = [
    {
      path: "/",
      label: "Home",
      icon: Home,
    },

    {
      path: "/search",
      label: "Search",
      icon: Search,
    },
    {
      path: "/playlist",
      label: "Playlist",
      icon: ListMusic,
    },
  ];
</script>

<div class="nav-content" class:desktop class:mobile={!desktop}>
  <nav aria-label="Main">
    <div class="nva-content-inner">
      <img src={logo} class="logo" alt="spotify" width="100px" />
      <ul>
        {#each menuItems as item}
          <li class:active={item.path === $page.url.pathname}>
            <a href={item.path}>
              <svelte:component
                this={item.icon}
                focusable="false"
                aria-hidden="true"
                color="var(--text-color)"
                size={26}
                strokeWidth={2}
              />
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</div>
