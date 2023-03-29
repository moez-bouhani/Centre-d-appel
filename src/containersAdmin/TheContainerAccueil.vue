<template>
  <div>
    <NavAccueil />
    <router-view></router-view>
 <!--    <footercontact /> -->
    <TheFooter />
  </div>
</template>

<script>
import NavAccueil from "../components/NavAccueil";
/* import footercontact from "../components/footercontact"; */
import TheFooter from "./TheFooter";

export default {
  name: "TheContainerAccueil",
  components: {
    NavAccueil,
 /*    footercontact, */
    TheFooter
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
