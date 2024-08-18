<template>
  <div>
    <h1>Consultorio Dental</h1>
    <MenuPrincipal />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import MenuPrincipal from "../components/MenuPrincipal.vue";

export default {
  name: "HomeView",
  components: {
    MenuPrincipal,
  },
};
</script>

<style scoped>
.content {
  margin-top: 20px;
  background-color: rgb(18, 23, 21);
}
</style>
