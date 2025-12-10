<script setup lang="ts">
const { $trpc } = useNuxtApp();

// 1. Выполняем QUERY-запрос для получения данных
// .post.getPosts - это полностью типизированный путь!
// .useQuery() - это composable от trpc-nuxt, аналог useFetch/useAsyncData
const postsQuery = $trpc.post.getPosts.useQuery();

// 2. Выполняем MUTATION-запрос для изменения данных
const newPostTitle = ref('');
const addPostMutation = $trpc.post.addPost.useMutation();

const addPost = async () => {
  if (!newPostTitle.value) return;

  try {
    await addPostMutation.mutate({ title: newPostTitle.value });
    newPostTitle.value = '';
    await postsQuery.refresh();
  } catch (e) {
    console.error(e);
  }
};
</script>


<template>
  <div>
    <h1>Платформа для друзей</h1>

    <h2>Текущие сборы:</h2>
    <div v-if="postsQuery.pending.value">Загрузка...</div>
    <ul v-else-if="postsQuery.data.value">
      <li v-for="post in postsQuery.data.value" :key="post.id">
        {{ post.title }}
      </li>
    </ul>

    <hr>

    <h2>Добавить новый сбор:</h2>
     <form @submit.prevent="addPost">
    <input v-model="newPostTitle" type="text" placeholder="Название сбора" >
    <button type="submit" :disabled="addPostMutation.pending.value">
      {{ addPostMutation.pending.value ? 'Добавляем...' : 'Добавить' }}
    </button>
    <div v-if="addPostMutation.error.value">
      Ошибка: {{ addPostMutation.error.value.message }}
    </div>
  </form>
  </div>
</template>
