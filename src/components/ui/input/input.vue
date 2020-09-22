<template>
  <div class="c-input">
    <input type="text" :placeholder="placeholder" v-model="innerValue" @focus="onFocus" @blur="onBlur" spellcheck="false" />
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    label: null,
    placeholder: null,
    focussed: {
      default: false,
    },
  },
  data() {
    return {
      localFocussed: false,
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(nv) {
        this.$emit('update:value', nv)
      },
    },
  },
  watch: {
    localFocussed(nv) {
      this.$emit('update:focussed', nv)
    },
  },
  methods: {
    onFocus(event) {
      event.target.select()
      this.localFocussed = true
    },
    onBlur(event) {
      this.$emit('blur', event)
      this.localFocussed = false
    },
  },
}
</script>

<style scoped></style>
