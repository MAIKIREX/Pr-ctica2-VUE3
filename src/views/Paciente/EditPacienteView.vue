<template>
  <div>
    <h1>Editar Paciente</h1>
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

      <div class="form-group">
        <label for="address">Dirección:</label>
        <textarea
          id="address"
          v-model="form.direccion"
          :class="{ 'is-invalid': errors.direccion }"
          placeholder="Ingrese la dirección"
        ></textarea>
        <div v-if="errors.direccion" class="invalid-feedback">
          {{ errors.direccion }}
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
        telefono: "",
        direccion: "",
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

      if (!this.form.direccion) {
        this.errors.direccion = "La dirección es obligatoria.";
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
        .put(`http://localhost:4000/pacientes/${this.form.id}`, this.form)
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
