<template>
    <div>
      <button @click="switchTheme('default')">Default Theme</button>
      <button @click="switchTheme('dark')">Dark Theme</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      switchTheme(theme) {
        console.log('Switching theme:', theme);
        if (theme === 'default') {
          document.documentElement.style.setProperty('--el-color-primary', '#409eff');
        } else if (theme === 'dark') {
          document.documentElement.style.setProperty('--el-color-primary', '#000000');
        }
      }
    }
  }
  </script>
  