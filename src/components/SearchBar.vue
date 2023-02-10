<template>
  <div class="search-wrapper">
    <span class="search-wrapper__search-icon">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </span>
    <input 
      type="text"
      v-model="input"
      placeholder="Search" 
      @input="onInputChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { debounce } from '../utils/utils'

@Component({
   components: {
    FontAwesomeIcon
  }
}
)
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

<style lang="scss">

.search-wrapper {
   position: relative;

  .search-wrapper__search-icon {
    position: absolute;
    left: 15px;
    top: 20px;
    color: gray;
  }
  
  input {
    width: 100%; 
    padding: 12px 40px; 
    margin: 8px 0; 
    display: inline-block; 
    border: 1px solid #ccc; 
    box-sizing: border-box;
  }
}
</style>