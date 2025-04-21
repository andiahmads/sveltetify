<script lang="ts">
  import { Button, Card } from "$components";
  import type { PageData } from "./$types";

  export let data: PageData;

  let sections: {
    title: string;
    path: string;
    items: (
      | SpotifyApi.AlbumObjectSimplified
      | SpotifyApi.PlaylistObjectSimplified
    )[];
  }[] = [];

  $: {
    if (data.newRelease) {
      sections.push({
        title: "New Releases",
        path: "sections/new-releases",
        items: data.newRelease.albums.items,
      });
    }
    if (data.featurePlaylist) {
      sections.push({
        title: "Featured Playlists",
        path: "sections/featured-playlists",
        items: data.featurePlaylist.playlists.items,
      });
    }

    data.homeCategories.forEach((category, index) => {
      const categoryPlaylist = data.categoriesPlaylists[index];
      if (categoryPlaylist) {
        sections.push({
          title: category.name,
          path: `/category/${category.id}`,
          items: categoryPlaylist.playlists.items,
        });
      }
    });

    if (data.userPlaylist) {
      sections.push({
        title: "your playlists",
        path: "playlists",
        items: data.userPlaylist.items,
      });
    }
  }
  $: console.log(sections);
</script>

{#each sections as section}
  <section class="content-row">
    <div class="content-row-header">
      <div class="right">
        <h2 class="section-title">{section.title}</h2>
      </div>
      <div class="left">
        <Button element="a" href={section.path} variant="outline"
          >See All <span class="visually-hidden">{section.title}</span></Button
        >
      </div>
    </div>
    <div class="grid-items">
      {#each section.items as item}
        <div class="grid-item">
          <Card {item} />
        </div>
      {/each}
    </div>
  </section>
{/each}

<style lang="scss">
  .content-row {
    margin-bottom: 40px;
    .content-row-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .section-title {
        font-size: toRem(22);
        font-weight: 60;
        margin: 0;
      }
    }
  }
</style>
