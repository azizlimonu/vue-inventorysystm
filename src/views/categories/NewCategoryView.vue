<script lang="ts" setup>
import HeaderPage from '@/components/shared/HeaderPage.vue';
import NewCategoryForm from '@/components/categories/NewCategoryForm.vue';
</script>

<template>
  <HeaderPage
    pathname="categories"
    btn-title="Go Back"
    title="New Category"
    description="Create a new category for your business"
  />

  <NewCategoryForm />
</template>
