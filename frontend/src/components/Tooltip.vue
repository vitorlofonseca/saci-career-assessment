<template>
  <div class="tooltip">
    <span class="tooltip-content">{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  visibility: hidden;
  width: max-content;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltip-content {
  visibility: visible;
  opacity: 1;
}
</style>
