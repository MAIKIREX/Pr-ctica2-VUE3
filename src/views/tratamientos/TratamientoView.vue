<template>
  <div>
    <Modal v-model:modelValue="showModalNuevo">
      <RegisterTratamientoView
        @on-register="onRegister($event)"
        :citas="citas"
        :pacientes="pacientes"
        :dentistas="dentistas"
      />
    </Modal>
    <Modal v-model:modelValue="showModalEdit">
      <EditTratamientoView
        @on-update="onUpdate($event)"
        :item="itemToEdit"
        :citas="citas"
        :pacientes="pacientes"
        :dentistas="dentistas"
      />
    </Modal>
    <h1>Lista de Tratamientos</h1>
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
      @input="buscar()"
    />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Paciente</th>
          <th>Dentista</th>
          <th>Descripción</th>
          <th>Costo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemList" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ getPacienteNombre(item.citaId) }}</td>
          <td>{{ getDentistaNombre(item.citaId) }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.costo }}</td>
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
import RegisterTratamientoView from "./RegisterTratamientoView.vue";
import EditTratamientoView from "./EditTratamientoView.vue";
import axios from "axios";

export default {
  name: "TratamientoView",
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: "",
      itemList: [],
      citas: [],
      pacientes: [],
      dentistas: [],
    };
  },
  components: {
    Modal,
    RegisterTratamientoView,
    EditTratamientoView,
  },
  methods: {
    getList() {
      axios
        .get(`http://localhost:4000/tratamientos?q=${this.textToSearch}`)
        .then((response) => {
          this.itemList = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCitas() {
      axios
        .get("http://localhost:4000/citas")
        .then((response) => {
          this.citas = response.data;
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
    getPacienteNombre(citaId) {
      const cita = this.citas.find((c) => c.id === citaId);
      if (cita) {
        const paciente = this.pacientes.find((p) => p.id === cita.pacienteId);
        return paciente ? paciente.nombre : "Desconocido";
      }
      return "Desconocido";
    },
    getDentistaNombre(citaId) {
      const cita = this.citas.find((c) => c.id === citaId);
      if (cita) {
        const dentista = this.dentistas.find((d) => d.id === cita.dentistaId);
        return dentista ? dentista.nombre : "Desconocido";
      }
      return "Desconocido";
    },
    edit(item) {
      this.itemToEdit = { ...item };
      this.showModalEdit = true;
    },
    eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        axios
          .delete(`http://localhost:4000/tratamientos/${id}`)
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
    this.getCitas();
    this.getPacientes();
    this.getDentistas();
  },
};
</script>

<style scoped></style>
