<template>
  <div>
    Tabela
    <search-bar @onInputChange="onSearch"/>
    <table>
      <thead>
        <tr>
          <th
            v-for="(column, index) in dataSource.columns"
            :key="index"
          >
            {{ column.title }}
           <sort-table
            v-if="column.sort"
            :columnKey="column.key"
            :selectedKey="sortData?.key"
            @sortSelected="onSortSelected"/>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in items"
          :key="key"
        >
          <td
            v-for="(column, indexColumn) in dataSource.columns"
            :key="indexColumn"
          >
            {{ item[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export interface ITableDataSource<T> {
  columns: {
    key: string;
    title: string;
  }[];
  data: T[];
}

import { Component, Prop, Vue } from 'vue-property-decorator'
import SortTable from './SortTable.vue'
import SearchBar from './SearchBar.vue'

@Component({
  components: {
    SortTable,
    SearchBar
  }
})
export default class Table extends Vue {
  @Prop() private dataSource: ITableDataSource<Record<string, string | number>> | undefined = undefined;
  sortItems: unknown[] | undefined = undefined;
  sortData: { sort: string, key: string } | undefined = {sort: '', key: ''};
  searchTerm = '';
  
  get items() {
    return this.sortItemsByKey(this.sortData, this.filterDataSource(this.searchTerm))
  }

  onSearch(term: string) {
    this.searchTerm = term;
  }

  filterDataSource(term: string) {
    return this.dataSource?.data.filter((item) => {
      return Object.values(item).some((value) => String(value).toLowerCase().includes(term.toLowerCase()))
    })
  }

  onSortSelected(sort: { sort: string, key: string }) {
    this.sortData = sort;
  }

  sortItemsByKey(sortData: { sort: string, key: string } | undefined, data: Record<string, string | number>[] | undefined) {
    if (!sortData || sortData.sort === 'disabled') {
      return data;
    }

    return this.mapDataWithIndex(data)?.sort((a, b) => {
      const sortKey = sortData.sort === 'disabled' ? 'index' : sortData.key;
      const valueA = a[sortKey as keyof typeof data]
      const valueB = b[sortKey  as keyof typeof data]

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (sortData.sort === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      } else {
        if (sortData.sort === 'asc') {
          return (valueA as string)?.localeCompare(valueB as string)
        } else {
          return (valueB as string)?.localeCompare(valueA as string)
        }
      }
    })
  }

  mapDataWithIndex(data: Record<string, unknown>[] | undefined) {
    return data?.map((item, index) => ({ ...item, index }))
  }
}

</script>

<style>

</style>