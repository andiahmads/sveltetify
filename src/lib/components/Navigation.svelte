<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import logo from "$assets/logo.png";
  import { Home, Search, ListMusic, Menu, X } from "lucide-svelte";
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";
  import { tick } from "svelte";
  import { beforeNavigate } from "$app/navigation";
  import { IconButton } from "$components";

  export let desktop: boolean;
  let isMobileMenuOpen = false;

  $: isOpen = desktop || isMobileMenuOpen;

  let openMenuButton: IconButton;
  let closeMenuButton: IconButton;
  let lastFocusableElement: HTMLAnchorElement;

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
  const openMenu = async () => {
    isMobileMenuOpen = true;
    await tick(); // Tunggu hingga DOM diperbarui
    closeMenuButton.getButton().focus();
  };

  const closeMenu = async () => {
    isMobileMenuOpen = false;
    await tick();
    openMenuButton.getButton().focus();
  };

  const moveFocusToButton = (e: KeyboardEvent) => {
    if (desktop) return;
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    }
  };

  const moveFocusToTop = (e: KeyboardEvent) => {
    if (desktop) return;
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      closeMenuButton.getButton().focus();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  };

  beforeNavigate(() => {
    isMobileMenuOpen = false;
  });
</script>

<svelte:head>
  {#if !desktop && isMobileMenuOpen}
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>
<div class="nav-content" class:desktop class:mobile={!desktop}>
  {#if !desktop && isMobileMenuOpen}
    <div
      class="overlay"
      on:keyup={handleEscape}
      on:click={closeMenu}
      transition:fade={{ duration: 200 }}
    />
  {/if}
  <nav aria-label="Main">
    {#if !desktop}
      <IconButton
        icon={Menu}
        label="open menu"
        bind:this={openMenuButton}
        on:click={openMenu}
        aria-expanded={isOpen}
        class="menu-button"
      />
    {/if}
    <div
      class="nav-content-inner"
      class:is-hidden={!isOpen}
      style:visibility={isOpen ? "visible" : "hidden"}
      on:keyup={handleEscape}
    >
      {#if !desktop}
        <IconButton
          icon={X}
          label="close menu"
          bind:this={closeMenuButton}
          on:click={closeMenu}
          aria-expanded={isOpen}
          class="close-menu-button"
        />
      {/if}

      <img src={logo} class="logo" alt="spotify" />
      <ul>
        {#each menuItems as item, index}
          {@const iconProps = {
            focusable: "false",
            "aria-hidden": true,
            color: "var(--text-color)",
            size: 26,
            strokeWidth: 2,
          }}
          <li class:active={item.path === $page.url.pathname}>
            {#if menuItems.length === index + 1}
              <a
                bind:this={lastFocusableElement}
                href={item.path}
                on:keydown={moveFocusToTop}
              >
                <svelte:component this={item.icon} {...iconProps} />
                {item.label}
              </a>
            {:else}
              <a href={item.path}>
                <svelte:component this={item.icon} {...iconProps} />
                {item.label}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</div>

<style lang="scss">
  @use "@unsass/breakpoint";
  .nav-content {
    .overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: var(--sidebar-color);
      opacity: 0.75;
      z-index: 100;
      @include breakpoint.up("md") {
        display: none;
      }
    }
    .logo {
      max-width: 100%;
      width: 130px;
    }
    .nav-content-inner {
      padding: 20px;
      min-width: var(--sidebar-width);
      background-color: var(--sidebar-color);
      height: 100vh;
      overflow: auto;
      display: none;
      :global(html.no-js) & {
        @include breakpoint.down("md") {
          display: block;
          height: auto;
        }
      }
      ul {
        padding: 0;
        margin: 20px 0 0;
        list-style: none;
        li {
          &.active {
            a {
              opacity: 1;
            }
          }
          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--text-color);
            font-size: toRem(14);
            font-weight: 500;
            padding: 5px;
            margin: 10px 0;
            opacity: 0.7;
            transition: opacity 0.2s;
            &:hover,
            &:focus {
              opacity: 1;
            }
            :global(svg) {
              margin-right: 12px;
            }
          }
        }
      }
    }
    &.desktop {
      position: sticky;
      top: 0;
      .nav-content-inner {
        @include breakpoint.up("md") {
          display: block;
        }
      }
    }
    &.mobile .nav-content-inner {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      transition:
        transform 200ms,
        opacity 200ms;
      &.is-hidden {
        transition:
          transform 200ms,
          opacity 200ms,
          visibility 200ms;
        transform: translateX(-100%);
        opacity: 0;
      }
      @include breakpoint.down("md") {
        display: block;
      }
    }
    :global(.menu-button) {
      @include breakpoint.up("md") {
        display: none;
      }
    }
    :global(.close-menu-button) {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
</style>
