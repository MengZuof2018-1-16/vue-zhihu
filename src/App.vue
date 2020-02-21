<template>
  <div id="app">
    <!-- <transition :name="transitionName" mode="out-in">
      <keep-alive include="index">
        <router-view></router-view>
      </keep-alive>
    </transition>-->
    <keep-alive include="index">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        //向左滑入
        this.transitionName = "slide-left";
      } else {
        //向右滑入
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style lang="scss">
html {
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s;
}
.slide-left-enter {
  transform: translateX(100%);
  /* opacity: 0; */
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s;
}
.slide-right-enter {
  transform: translateX(-100%);
  /* opacity: 0; */
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
