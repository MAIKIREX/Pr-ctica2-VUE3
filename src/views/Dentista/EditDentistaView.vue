<template>
  <div>
    <h1>Editar Dentista</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          type="text"
          id="name"
          v-model="form.nombre"
          :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre"
        />
        <div v-if="errors.nombre" class="invalid-feedback">
          {{ errors.nombre }}
        </div>
      </div>

      <div class="form-group">
        <label for="especialidad">Especialidad:</label>
        <input
          id="especialidad"
          v-model="form.especialidad"
          :class="{ 'is-invalid': errors.especialidad }"
          placeholder="Ingrese la especialidad"
        />
        <div v-if="errors.especialidad" class="invalid-feedback">
          {{ errors.especialidad }}
        </div>
      </div>

      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          v-model="form.telefono"
          :class="{ 'is-invalid': errors.telefono }"
          placeholder="Ingrese el teléfono"
        />
        <div v-if="errors.telefono" class="invalid-feedback">
          {{ errors.telefono }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditPacienteView",
  props: ["item"],
  data() {
    return {
      form: {
        nombre: "",
        especialidad: "",
        telefono: "",
      },
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.nombre) {
        this.errors.nombre = "El nombre es obligatorio.";
      }

      if (!this.form.telefono) {
        this.errors.telefono = "El teléfono es obligatorio.";
      } else if (
        !/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(
          this.form.telefono
        )
      ) {
        this.errors.telefono = "El teléfono no es válido.";
      }

      if (!this.form.especialidad) {
        this.errors.especialidad = "La especialidad es obligatoria.";
      }

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },
    save() {
      axios
        .put(`http://localhost:4000/dentistas/${this.form.id}`, this.form)
        .then(() => {
          this.$emit("on-update");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  watch: {
    item: {
      handler(newVal) {
        this.form = { ...newVal };
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
