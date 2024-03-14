<script setup>
const {data: posts} = useFetch('http://localhost:3000/posts');

</script>

<template>
  <div>
    <h1>Home</h1>
    <h2>select post</h2>
    <div class="posts">
      <div class="select-post" v-for="post in posts" :key="post.id">
        <NuxtLink :to="'/posts/'+post.id">{{post.title}}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .posts {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;
    .select-post {
      min-width: 200px;
      padding: 15px 25px;
      border: 1px solid black;
      border-radius: 15px;
      cursor:  pointer;
    }
  }
</style>