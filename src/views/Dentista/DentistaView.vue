<template>
  <div>
    <ModalForm v-model:modelValue="showModalNuevo">
      <RegisterDentistaView @on-register="onRegister" />
    </ModalForm>
    <ModalForm v-model:modelValue="showModalEdit">
      <EditDentistaView @on-update="onUpdate" :item="itemToEdit" />
    </ModalForm>
    <h1>Lista de Dentistas</h1>
    <button @click="showModalNuevo = true" class="btn btn-primary">
      Nuevo
    </button>
    <button @click="buscar()" class="btn btn-light" style="float: right">
      Buscar
    </button>
    <input
      type="search"
      style="float: right"
      v-model="textToSearch"
      @search="buscar()"
    />
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Especialidad</th>
          <th>Teléfono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.especialidad }}</td>
          <td>{{ item.telefono }}</td>
          <td>
            <button
              @click="edit(item)"
              class="btn btn-dark"
              style="margin-right: 15px"
            >
              Editar
            </button>
            <button @click="eliminar(item.id)" class="btn btn-danger">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import axios from "axios";
import ModalForm from "../../components/ModalForm.vue";
import EditDentistaView from "./EditDentistaView.vue";
import RegisterDentistaView from "./RegisterDentistaView.vue";

export default {
  name: "PacienteView",
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: "",
      itemList: [],
    };
  },
  components: {
    ModalForm,
    EditDentistaView,
    RegisterDentistaView,
  },
  methods: {
    getList() {
      axios
        .get(`http://localhost:4000/dentistas?q=${this.textToSearch}`)
        .then((response) => {
          this.itemList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    edit(item) {
      this.itemToEdit = Object.assign({}, item);
      this.showModalEdit = true;
    },
    eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        axios
          .delete(`http://localhost:4000/dentistas/${id}`)
          .then(() => {
            this.getList();
            alert("Registro eliminado.");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    buscar() {
      this.getList();
    },
    onRegister() {
      this.getList();
      this.showModalNuevo = false;
      alert("Registro exitoso");
    },
    onUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
      alert("Edición exitosa");
    },
  },
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["doubleCount", "getBaseUrl"]),
    baseUrl() {
      return this.getBaseUrl;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4b400;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
</style>
