<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1"
        >&copy; {{ new Date().getFullYear() }} Center d'appel Achref</span
      >
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="#" target="_blank">❤️ by passionate teams Dev Kairouan </a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
