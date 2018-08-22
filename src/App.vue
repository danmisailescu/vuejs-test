<template>
  <div id="app">
     <TasksTable />
  </div>
</template>

<script>
import TasksTable from './components/TasksTable.vue'

export default {
  name: 'app',
  components: {
    TasksTable
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
