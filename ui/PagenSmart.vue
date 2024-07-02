<template>
  <ul class="pagen">
    <li>
      <ButtonArrow
        :class="'arrow-btn arrow-btn-prev'"
        :disabled="isFirstPage"
        @click="prevPage"
      />
    </li>
    <li v-for="page in pages" :key="page">
      <button
        :class="['pagen-btn u-center', { active: page === currentPage }]"
        type="button"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </li>
    <li>
      <ButtonArrow
        :class="'arrow-btn'"
        :disabled="isLastPage"
        @click="nextPage"
      />
    </li>
  </ul>
</template>

<script>
import ButtonArrow from "~/ui/ButtonArrow";

export default {
  components: {
    ButtonArrow
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    itemsPerPage() {
      return 6;
    },
    totalItems() {
      return this.list.length;
    },
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pages() {
      const pagesToShow = 5;
      const pages = [];
      const currentPage = this.currentPage;

      let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      let endPage = Math.min(
        this.totalPages,
        currentPage + Math.floor(pagesToShow / 2)
      );

      if (endPage - startPage < pagesToShow - 1) {
        if (currentPage < Math.floor(pagesToShow / 2) + 1) {
          endPage = Math.min(startPage + pagesToShow - 1, this.totalPages);
        } else {
          startPage = Math.max(endPage - pagesToShow + 1, 1);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  methods: {
    prevPage() {
      if (!this.isFirstPage) {
        this.changePage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (!this.isLastPage) {
        this.changePage(this.currentPage + 1);
      }
    },
    changePage(page) {
      this.$emit("change", page);
    }
  }
};
</script>

<style lang="sass" scoped>
.pagen
  display: flex
  flex-wrap: wrap
  gap: 8px

  font-size: 18px

.pagen-btn
  width: 48px
  height: 48px

  transition: $trs
  +link($black)
  border-bottom: 1px solid rgba($black, 0.2)

  &:hover
    color: var(--acc-c)

  &.active
    +link(var(--acc-c))
    border-bottom: 1px solid var(--acc-c)

.arrow-btn
  width: 48px
  height: 48px

  &-prev /deep/ svg
    transform: scale(-1)
</style>
