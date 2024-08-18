<template>
  <div>
    <h1>Registrar Cita</h1>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="pacienteId">Paciente:</label>
        <select
          id="pacienteId"
          v-model="form.pacienteId"
          :class="{ 'is-invalid': errors.pacienteId }"
        >
          <option
            v-for="paciente in pacientes"
            :key="paciente.id"
            :value="paciente.id"
          >
            {{ paciente.nombre }}
          </option>
        </select>
        <div v-if="errors.pacienteId" class="invalid-feedback">
          {{ errors.pacienteId }}
        </div>
      </div>

      <div class="form-group">
        <label for="dentistaId">Dentista:</label>
        <select
          id="dentistaId"
          v-model="form.dentistaId"
          :class="{ 'is-invalid': errors.dentistaId }"
        >
          <option
            v-for="dentista in dentistas"
            :key="dentista.id"
            :value="dentista.id"
          >
            {{ dentista.nombre }}
          </option>
        </select>
        <div v-if="errors.dentistaId" class="invalid-feedback">
          {{ errors.dentistaId }}
        </div>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          v-model="form.fecha"
          :class="{ 'is-invalid': errors.fecha }"
          placeholder="Ingrese la fecha"
        />
        <div v-if="errors.fecha" class="invalid-feedback">
          {{ errors.fecha }}
        </div>
      </div>

      <div class="form-group">
        <label for="hora">Hora:</label>
        <input
          type="time"
          id="hora"
          v-model="form.hora"
          :class="{ 'is-invalid': errors.hora }"
          placeholder="Ingrese la hora"
        />
        <div v-if="errors.hora" class="invalid-feedback">{{ errors.hora }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterCitaView",
  props: ["pacientes", "dentistas"],
  data() {
    return {
      form: {
        pacienteId: "",
        dentistaId: "",
        fecha: "",
        hora: "",
      },
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.pacienteId) {
        this.errors.pacienteId = "El ID del paciente es obligatorio.";
      }

      if (!this.form.dentistaId) {
        this.errors.dentistaId = "El ID del dentista es obligatorio.";
      }

      if (!this.form.fecha) {
        this.errors.fecha = "La fecha es obligatoria.";
      }

      if (!this.form.hora) {
        this.errors.hora = "La hora es obligatoria.";
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
        .post("http://localhost:4000/citas", this.form)
        .then(() => {
          this.$emit("on-register");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
