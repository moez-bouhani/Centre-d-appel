<template>
  <div>
    <!-- <div v-if="this.$store.state.loggedIn == true">
      <logout></logout>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  name: "App",
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
@import "assets/scss/now-ui-kit";
@import "assets/cssaccueil/lib/bootstrap/css/bootstrap.min.css";

@import "assets/cssaccueil/lib/animate/animate.min.css";
@import "assets/cssaccueil/lib/font-awesome/css/font-awesome.min.css";
@import "assets/cssaccueil/lib/ionicons/css/ionicons.min.css";
@import "assets/cssaccueil/lib/magnific-popup/magnific-popup.css";

@import "assets/cssaccueil/style.css";
</style>
