<template>
  <nav>
    <ul>
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/pacientes">Pacientes</router-link></li>
      <li><router-link to="/dentistas">Dentistas</router-link></li>
      <li><router-link to="/citas">Citas</router-link></li>
      <li><router-link to="/tratamientos">Tratamientos</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "MenuPrincipal",
};
</script>

<style scoped>
nav {
  padding: 10px;
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #28383b;
  display: inline-block;
  padding: 1rem;
  border: 1.5px solid #000;
  border-radius: 1rem;
  margin: 10px;
}

a {
  text-decoration: none;
  color: #007bff;
}

a.router-link-active {
  font-weight: bold;
}
</style>
