<template>
    <q-page padding class="constrain-more">

        <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        >
        <q-input
            filled
            type="text"
            v-model="this.email"
            label="Email *"
        />

        <q-input
            filled
            type="password"
            v-model="this.u_pwd"
            label="Password *"
        />

        <div class="flex justify-center text-white">
            <q-btn label="Submit" type="submit" size="lg" class="bg-black q-mx-xs" />
            <q-btn label="Reset" type="reset" size="lg" class="bg-indigo-10 q-mx-xs" />
        </div>
        </q-form>

    </q-page>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            u_pwd: '',
        }
    }

}
</script>

<style>

</style>