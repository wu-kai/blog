<template>
  <div class="menu">
    <ul>
      <li v-for="menu in list"
          :key="menu.value" v-text="menu.showName"
          @click="to(menu)">
      </li>
    </ul>
    <div class="fa fa-times close" @click="close()"></div>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  export default {
    name: 'NavigationMenu',
    computed:{
      ...mapState({
        list:state=>state.menuList
      })
    },
    methods:{
      to(menu){
        this.$router.push({path:menu.path});
        this.$store.commit('hideMenu');
      },
      close(){
        this.$store.commit('hideMenu');
      }
    }
  }
</script>

<style scoped>
  .menu{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(255, 255, 255, 0.5);
    z-index: 998;
  }
  li:hover{
    cursor: pointer;
    color: #fff;
    background: #42a5f5;
  }
  ul{
    width: 100%;
    max-width: 500px;
    margin: 150px auto 0;
    font-size: 26px;
  }
  li{
    line-height: 60px;
    text-align: center;
    color: #42a5f5;
  }
  .close{
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: 20px;
    cursor: pointer;
  }
</style>
