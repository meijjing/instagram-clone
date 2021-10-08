<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
    bordered
    class="bg-white text-grey-10">
      <q-toolbar class="constrain">
        <q-btn
        to="camera"
        dense
        flat
        round
        icon="local_see"
        size="18px"
        class="large-screen-only" />

        <q-separator
        vertical
        inset
        spaced
        class="large-screen-only" />

        <q-toolbar-title class="text-grand-hotel text-bold">
          Instagram
        </q-toolbar-title>


        <q-btn
        to="/login"
        dense
        flat
        round
        icon="login"
        size="18px"
        class="large-screen-only" />

        <q-btn
        to="/"
        dense
        flat
        round
        icon="home"
        size="18px"
        class="large-screen-only" />
        
        
      </q-toolbar>
    </q-header>

    <q-footer
    bordered
    class="bg-white small-screen-only">
        <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent">
          <q-route-tab to="/" name="home" icon="home" label="Home" />
          <q-route-tab to="/camera" name="camera" icon="local_see" label="Camera" />
        </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'MainLayout',

  components: {
  }
})
</script>
<style scoped lang="scss">
  .q-toolbar {
    @media (min-width: $breakpoint-xs-max) {
      height: 70px;
    }
  }
  .q-toolbar__title {
    @media (max-width: $breakpoint-xs-max) {
      text-align: center;
    }

    font-size: 30px!important;

  }

.q-btn {

  @media (min-width: $breakpoint-sm-min) {
    display: inline-flex!important;
  }
}




</style>
