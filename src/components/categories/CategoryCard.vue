<script lang="ts" setup>
import type { ICategoriesResponse } from '../../interface';
import { useCategoryStore } from '../../stores/category';
import { formatDate } from '../../helpers/format-date';

const categoryStore = useCategoryStore();

defineProps<{
    category: ICategoriesResponse
}>()
</script>

<template>
  <div class="category__card">
    <h3>Product Name: {{ category.name }}</h3>
    <p>Created At: {{ formatDate(category.created_at) }}</p>

    <div class="flex gap-4 items-center mt-4">
      <button
        @click="categoryStore.deleteCategory(`${category.id}`)"
        class="btn-delete"
      >
        Delete
      </button>
      <RouterLink
        :to="{ path: `/categories/edit/${ category.slug }` }"
        class="btn-primary text-center"
        >Edit</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>

.category__card {
    @apply bg-white p-5 rounded-md shadow-md shadow-primary-alt/20
    hover:shadow-xl hover:shadow-primary-alt/40 transition-all
}
</style>
