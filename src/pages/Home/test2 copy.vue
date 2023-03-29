<template>

  <div>
    <br>
  <br><br><br><br>
    <p>{{ copiedNumber }}</p>
    <button @click="copyNumbers">Copier</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [1, 2, 3, 4, 5],
      currentIndex: 0,
      copiedNumber: null,
    };
  },
  methods: {
    
    copyNumbers() {
      if (this.currentIndex < this.numbers.length) {
        this.copiedNumber = this.numbers[this.currentIndex];
        this.currentIndex++;
      } else {
        this.copiedNumber = null;
      }
    },
  },
};
</script>
