<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo">
      <RegisterCitaView
        @on-register="onRegister($event)"
        :pacientes="pacientes"
        :dentistas="dentistas"
      />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <EditCitaView
        @on-update="onUpdate($event)"
        :item="itemToEdit"
        :pacientes="pacientes"
        :dentistas="dentistas"
      />
    </Modal>
    <h1>Lista de Citas</h1>
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
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Paciente</th>
          <th>Dentista</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ getPacienteNombre(item.pacienteId) }}</td>
          <td>{{ getDentistaNombre(item.dentistaId) }}</td>
          <td>{{ item.fecha }}</td>
          <td>{{ item.hora }}</td>
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
import Modal from "../../components/ModalForm.vue";
import RegisterCitaView from "./RegisterCitaView.vue";
import EditCitaView from "./EditCitaView.vue";
import axios from "axios";

export default {
  name: "CitaView",
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: "",
      itemList: [],
      pacientes: [],
      dentistas: [],
    };
  },
  components: {
    Modal,
    RegisterCitaView,
    EditCitaView,
  },
  methods: {
    getList() {
      axios
        .get(`http://localhost:4000/citas?q=${this.textToSearch}`)
        .then((response) => {
          this.itemList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPacientes() {
      axios
        .get("http://localhost:4000/pacientes")
        .then((response) => {
          this.pacientes = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getDentistas() {
      axios
        .get("http://localhost:4000/dentistas")
        .then((response) => {
          this.dentistas = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPacienteNombre(id) {
      const paciente = this.pacientes.find((p) => p.id === id);
      return paciente ? paciente.nombre : "Desconocido";
    },
    getDentistaNombre(id) {
      const dentista = this.dentistas.find((d) => d.id === id);
      return dentista ? dentista.nombre : "Desconocido";
    },
    edit(item) {
      this.itemToEdit = { ...item };
      this.showModalEdit = true;
    },
    eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        axios
          .delete(`http://localhost:4000/citas/${id}`)
          .then(() => {
            this.getList();
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
    },
    onUpdate() {
      this.getList();
      this.showModalEdit = false;
      this.itemToEdit = null;
    },
  },
  mounted() {
    this.getList();
    this.getPacientes();
    this.getDentistas();
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
