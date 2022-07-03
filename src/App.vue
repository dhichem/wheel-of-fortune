<template>
  <div id="app">
    <FortuneWheel />
  </div>
</template>

<script>
import FortuneWheel from "./views/FortuneWheel.vue";

export default {
  name: "App",
  components: {
    FortuneWheel,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
