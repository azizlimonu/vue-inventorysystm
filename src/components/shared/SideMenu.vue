<script lang="ts" setup>
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
</script>

<template>
  <nav class="sidemenu flex flex-col">
    <div class="mb-10">
      <h1 class="text-xl">{{ authStore.user?.name }}</h1>
      <p>{{ authStore.user?.email }}</p>
    </div>

    <ul>
      <li>
        <RouterLink
          :to="{ name: 'profile' }"
          class="nav__menu--item"
          active-class="nav__link--active"
        >
          <i class="uil uil-apps"></i>
          Profile
        </RouterLink>
      </li>

      <li>
        <RouterLink
          :to="{ name: 'categories' }"
          class="nav__menu--item"
          active-class="nav__link--active"
        >
          <i class="uil uil-layer-group"></i>
          Categories
        </RouterLink>
      </li>

      <li>
        <RouterLink
          :to="{ name: 'products' }"
          class="nav__menu--item"
          active-class="nav__link--active"
        >
          <i class="uil uil-shopping-bag"></i>
          Products
        </RouterLink>
      </li>

      <li>
        <RouterLink
          :to="{ name: 'sales' }"
          class="nav__menu--item"
          active-class="nav__link--active"
        >
          <i class="uil uil-shopping-cart-alt"></i>
          Sales
        </RouterLink>
      </li>
    </ul>

    <div class="flex-1"></div>

    <div @click="authStore.logout()" class="nav__menu--item cursor-pointer">
      <i class="uil uil-signout"></i>
      Logout
    </div>
  </nav>
</template>
