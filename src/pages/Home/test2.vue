<template>

  <div>
    <br>
  <br><br><br><br>
    <p>{{ copiedNumber }}</p>
    <button @click="copyNumbers();copy()">Copier Numero suivant</button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [27432182, 50123456, 29452147, 53123456, 55784149],
      currentIndex: 0,
      copiedNumber: null,
    };
  },
  methods: {
    copy() {
        let copiedNumbers = this.copiedNumber // Séparer les numéros par ligne
        
  
        navigator.clipboard.writeText(copiedNumbers) // Copier les numéros dans le presse-papier
      },
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
