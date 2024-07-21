<template>
  <div
    :class="[
      className,
      'select-text-multiple',
      { 'select-text-multiple-error': error },
      { 'select-text-multiple-open': isOpen }
    ]"
  >
    <button type="button" @click="toggleOpen">
      {{
        selected.length
          ? list
              .filter(v => selected.includes(v.value))
              .map(v => v.label)
              .join(", ")
          : placeholder
      }}
      <svg-icon name="chevron" />
    </button>
    <ul>
      <li v-for="v in list" :key="v.value" :value="v.value">
        <button
          type="button"
          :class="{ active: selected.includes(v.value) }"
          @click="onValueClick(v.value)"
        >
          {{ v.label }}
        </button>
      </li>

      <template v-if="links && links.length > 0">
        <li v-for="link in links" :key="link.href" :value="link.href">
          <a @click="toggleOpen" :href="link.href" target="_blank">
            {{ link.label }}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    links: {
      type: Array,
      required: false
    },
    selected: {
      type: Array,
      required: true
    },
    className: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({ isOpen: false, touched: false }),
  mounted() {
    document.addEventListener("click", this.onDocumentClick.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onDocumentClick);
  },
  methods: {
    onDocumentClick(e) {
      if (!this.className) return;
      const parent = e.target.closest(`.${this.className}`);
      if (!parent) {
        this.isOpen = false;
      }
    },
    toggleOpen() {
      this.touched = true;
      this.isOpen = !this.isOpen;
    },
    onValueClick(v) {
      this.isOpen = false;
      this.touched = true;
      this.$emit("change", v);
    }
  }
};
</script>
