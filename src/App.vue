<template>
  <div id="app">

    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
html,
body {
  margin: 0 auto;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 0px;
}
a {
  text-decoration: none;
}
</style>

