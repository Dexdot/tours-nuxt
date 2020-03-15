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
              {{ $t('footer.offer') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="t-ttu" :to="$cityLocalePath('/payment')">
              <b>{{ $t('footer.payment') }}</b>
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
      return this.general.paymentContent.content
    },
    hasContent() {
      return (
        this.general.paymentContent &&
        this.general.paymentContent.content &&
        this.general.paymentContent.content.length > 0
      )
    }
  }
}
</script>
