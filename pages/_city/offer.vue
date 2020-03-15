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
          <li>
            <nuxt-link class="t-ttu" :to="$cityLocalePath('/payment')">{{
              $t('footer.payment')
            }}</nuxt-link>
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
    const { seo, contactsImage } = this.general
    const { title, description } = seo.offer

    return {
      title,
      titleTemplate: null,
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
          content: contactsImage.fields.file.url || ''
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
          content: contactsImage.fields.file.url || ''
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
