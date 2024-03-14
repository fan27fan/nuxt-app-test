<script setup>
const route = useRoute()
const commentsLoaded = ref(false)
const posts = ref()
const {data} = await useFetch('http://localhost:3000/posts', {
});
posts.value = data.value;
function giveTitle () {
  let title = posts.value[route.params.id - 1].title;
  return { title }
}
function giveSeoTitle () {
  let seo_title = posts.value[route.params.id - 1].seo_title;
  return { seo_title }
}
function giveDesc () {
  let desc = posts.value[route.params.id - 1].description;
  return { desc }
}
function giveKey () {
  let key = posts.value[route.params.id - 1].seo_keywords;
  return { key }
}
function giveSeoDesc () {
  let seoDesc = posts.value[route.params.id - 1].seo_description;
  return { seoDesc }
}
useHead({
  titleTemplate: () => {
    const pageTitle = ref('');
    pageTitle.value = giveSeoTitle().seo_title;
    return pageTitle
        ? `${giveSeoTitle().seo_title}`
        : `${giveSeoTitle().seo_title}`
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: giveDesc().desc },
    { name: 'keywords', content: giveKey().key},
    { property: 'og:title', content: giveTitle().title},
    { property: 'og:description', content: giveSeoDesc().seoDesc},
  ],
});
const commentsNew = ref()
const commentsForPost = ref([])
function getCommentsForPost() {
  commentsNew.value.forEach((comment) => {
    if (comment.postId === route.params.id) {
      commentsForPost.value.push(comment)
    }
  })
}
const { data: comments } = await useFetch('http://localhost:3000/comments', {
  server: false,
})
onMounted(async () => {
  setTimeout(() => {
    commentsNew.value = comments._value
    if ((commentsNew.value !== null)) {
      getCommentsForPost();
      if (commentsForPost.value.length === 0) {
        commentsForPost.value = [{
          id: '',
          text: 'no comments'
        }]
      }
    }
    commentsLoaded.value = true
  }, 200)
})
</script>

<template>
  <div class="post">
    <div class="post-body">
      <h1>{{ giveTitle().title}}</h1>
      <NuxtLink to="/"> <-- back home</NuxtLink>
      <p>{{giveDesc().desc}}</p>
    </div>
    <div class="post-comments">
      <p v-if="!commentsLoaded">Comments loading...</p>
      <div v-if="commentsLoaded" v-for="comment in commentsForPost" :key="comment.id">
        <p>{{comment.id}}</p>
        <p>{{comment.text}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>