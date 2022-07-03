<template>
  <div class="loading-wrapper" v-if="isActive">
    <div :class="'loading-popup'">
      <div class="h-100 m-5 align-items-center text-center m-0">
        <div class="row">
          <div class="col align-items-center">
            <img class="icon" :src="require('@/assets/kastelo.jpg')" />

            <div class="text-left d-inline-block">
              <h2 class="popup-title">{{ title }}</h2>
              <span class="message">{{ message }}</span>
            </div>
          </div>
        </div>

        <button class="btn-confirm" @click="clicked()">
          {{ confirmationButton }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingPopup",
  props: {
    active: Boolean,
    title: String,
    message: String,
    confirmationButton: String,
  },
  methods: {
    clicked() {
      this.$emit("update:active", false);
      this.$emit("confirm");
    },
  },
  computed: {
    isActive() {
      return this.active;
    },
  },
};
</script>

<style scoped>
.loading-wrapper {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.loading-popup {
  width: 60%;
  min-width: 320px;
  max-width: 500px;
  height: 350px;
  background: #ffffff;
  border-radius: 20px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #264076;
}

.loader {
  width: 50px;
  height: 50px;
}

.btn-confirm {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0px 0px 20px 20px;
  padding: 15px;
  width: 100%;
  border: none;
  background: #171717;
  color: #f5f5f5;
  font-weight: 400;
  font-size: 22px;
}

.popup-title {
  color: #171717;
  margin-bottom: 0px;
  font-size: 2.3rem;
  margin-bottom: 3vh;
}

.icon {
  width: 5rem;
  margin: 10px 10px;
}

.message {
  color: #171717;
  font-weight: lighter;
  font-size: 1.5rem;
}

.popup-danger .hint {
  color: #333;
  font-weight: bold;
  font-size: 16px;
}
</style>