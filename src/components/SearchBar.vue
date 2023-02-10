<template>
  <input 
    type="text"
    v-model="input"
    placeholder="Search" 
    @input="onInputChange"
/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { debounce } from '../utils/utils'

@Component
export default class SearchBar extends Vue {
  input = '';

  created() {
    this.onInputChange = debounce(this.onInputChange, 200)
  }

  onInputChange() {
   this.$emit('onInputChange', this.input)
 } 
}
</script>

<style>

</style>