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
  head() {
    const { title, description } = this.general.seo.payment

    return {
      title,
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: '/favicon/projectName.png'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/favicon/projectName.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        }
      ]
    }
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
