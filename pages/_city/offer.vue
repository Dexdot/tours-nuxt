<template>
  <main class="container">
    <Policy v-if="hasContent" :content="content">
      <nav>
        <ul>
          <li>
            <nuxt-link class="t-ttu" :to="$cityLocalePath('/policy')">
              {{ $t('footer.policy') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="t-ttu" :to="$cityLocalePath('/offer')">
              <b>{{ $t('footer.offer') }}</b>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </Policy>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Policy from '~/components/Policy'

export default {
  components: {
    Policy
  },
  computed: {
    ...mapGetters({
      general: 'general/data'
    }),
    content() {
      return this.general.offerContent.content
    },
    hasContent() {
      return (
        this.general.offerContent &&
        this.general.offerContent.content &&
        this.general.offerContent.content.length > 0
      )
    }
  }
}
</script>
