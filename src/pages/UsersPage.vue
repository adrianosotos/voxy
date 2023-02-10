<template>
  <div v-if="dataSource" class="customer-table">
    <Table 
      :dataSource="dataSource"
      title="Customers"
    ></Table>
  </div>
</template>

<script lang="ts">
interface IUser {
  email: string;
  name: string;
  lastName: string;
  primaryGroup: string[];
  phoneNumber: string;
  hoursStudied: number;
}

import { Component, Vue } from 'vue-property-decorator'
import Axios from 'axios';

import Table, { ITableDataSource } from '../components/Table.vue'
import { environment } from '../environment'

@Component({
  components: {
    Table
  }
})
export default class UsersPage extends Vue {
  private dataSource: ITableDataSource<IUser> | null = null;
  private columnsConfig = [
      {
        key: 'email',
        title: 'Email'
      },
      {
        key: 'name',
        title: 'Name'
      },
      {
        key: 'lastName',
        title: 'Last Name'
      },
      {
        key: 'primaryGroup',
        title: 'Primary Group'
      },
      {
        key: 'phoneNumber',
        title: 'Phone'
      },
      {
        key: 'hoursStudied',
        title: 'Hours Studied',
        sort: true
      }
    ];

  mounted(): void {
    Axios.get(`${environment.server}/users`).then(({ data }) => {
      this.dataSource = {
        columns: this.columnsConfig,
        data
      }
    })
  }
}
</script>

<style lang="scss">
.customer-table {
  margin: 0 auto 300px auto;
  width: 90%;
}
</style>