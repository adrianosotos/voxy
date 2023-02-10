<template>
  <font-awesome-icon 
    v-if="isUpArrow(sortState)"
    :style="{color: isActive()}"
    icon="fa-solid fa-arrow-up-wide-short"
    @click="onSortSelected()"
  />
  <font-awesome-icon 
    v-else
    :style="{color: isActive()}"
    icon="fa-solid fa-arrow-down-wide-short"
    @click="onSortSelected()"
  />
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class SortTable extends Vue {
  @Prop() columnKey!: string;
  @Prop() selectedKey = undefined;
  sortState = 'disabled';

  @Watch('selectedKey')
  handleDisable(selectedKey:string) {
    if (selectedKey !== this.columnKey) {
      this.sortState = 'disabled'
    }
  }


  onSortSelected() {
    const nextStateHashMap = {
      disabled: 'asc',
      asc: 'desc',
      desc: 'disabled'
    }

    const nextState = nextStateHashMap[this.sortState as keyof typeof nextStateHashMap]

    this.sortState = nextState

    this.$emit('sortSelected', {
      sort: this.sortState,
      key: this.columnKey
    })
  }

  isUpArrow(sortState: string) {
    return sortState === 'asc' || this.sortState === 'disabled';
  }


  isActive() {
    if(this.sortState !== 'disabled') {
      return 'red'
    }
  }
}

</script>
<style lang="scss">
</style>