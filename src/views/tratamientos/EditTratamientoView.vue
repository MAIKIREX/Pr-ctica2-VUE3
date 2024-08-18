<template>
  <div>
    <h1>Editar Tratamiento</h1>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="citaId">Cita:</label>
        <select
          id="citaId"
          v-model="form.citaId"
          :class="{ 'is-invalid': errors.citaId }"
        >
          <option v-for="cita in citas" :key="cita.id" :value="cita.id">
            {{ getPacienteNombre(cita.pacienteId) }} con
            {{ getDentistaNombre(cita.dentistaId) }}
          </option>
        </select>
        <div v-if="errors.citaId" class="invalid-feedback">
          {{ errors.citaId }}
        </div>
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          v-model="form.descripcion"
          :class="{ 'is-invalid': errors.descripcion }"
          placeholder="Ingrese la descripción"
        />
        <div v-if="errors.descripcion" class="invalid-feedback">
          {{ errors.descripcion }}
        </div>
      </div>

      <div class="form-group">
        <label for="costo">Costo:</label>
        <input
          type="number"
          id="costo"
          v-model="form.costo"
          :class="{ 'is-invalid': errors.costo }"
          placeholder="Ingrese el costo"
        />
        <div v-if="errors.costo" class="invalid-feedback">
          {{ errors.costo }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditTratamientoView",
  props: ["item", "citas", "pacientes", "dentistas"],
  data() {
    return {
      form: { ...this.item },
      errors: {},
    };
  },
  methods: {
    getPacienteNombre(pacienteId) {
      const paciente = this.pacientes.find((p) => p.id === pacienteId);
      return paciente ? paciente.nombre : "Desconocido";
    },
    getDentistaNombre(dentistaId) {
      const dentista = this.dentistas.find((d) => d.id === dentistaId);
      return dentista ? dentista.nombre : "Desconocido";
    },
    validateForm() {
      this.errors = {};

      if (!this.form.citaId) {
        this.errors.citaId = "La cita es obligatoria.";
      }

      if (!this.form.descripcion) {
        this.errors.descripcion = "La descripción es obligatoria.";
      }

      if (!this.form.costo) {
        this.errors.costo = "El costo es obligatorio.";
      }

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.update();
      }
    },
    update() {
      axios
        .put(`http://localhost:4000/tratamientos/${this.form.id}`, this.form)
        .then(() => {
          this.$emit("on-update");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
