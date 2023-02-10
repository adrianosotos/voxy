<template>
  <div>
    <div class="table-header">
      <search-bar @onInputChange="onSearch"/>
    </div>
    <table>
      <caption>{{ title }}</caption>
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
            :data-label="column.title"
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
  @Prop() private title?: string;
  @Prop() private dataSource: ITableDataSource<Record<string, string | number>> | undefined = undefined;
  sortItems: unknown[] | undefined = undefined;
  sortData: { sort: string, key: string } | undefined = {sort: '', key: ''};
  searchTerm = '';
  
  get items() {
    return this.sortItemsByKey(
      this.sortData,
      this.filterDataSource(this.searchTerm)
    )
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
    if (!sortData) {
      return data;
    }

    return this.mapDataWithIndex(data)?.sort((a, b) => {
      const sortKey = sortData.sort === 'disabled' ? 'index' : sortData.key;
      const valueA = a[sortKey as keyof typeof data]
      const valueB = b[sortKey  as keyof typeof data]

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (sortData.sort === 'asc' || sortData.sort === 'disabled') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      } else {
        if (sortData.sort === 'asc' || sortData.sort === 'disabled') {
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

<style lang="scss">

.table-header {
  margin-left: auto;
  width: 30%;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  caption {
    font-size: 1.5em;
    margin: .5em 0 .75em;
  }

  tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: .35em;
  }

  th, td {
    padding: .625em;
    text-align: left;
  }

  th {
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
}

@media screen and (max-width: 600px) {
  .table-header {
    width: 100%;
  }

  table {
    border: 0;

    caption {
      font-size: 1.3em;
    }

    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: .625em;
    }

    td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: .8em;
      text-align: right;

      &::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>