<script>
import Tours from '~/pages/_city/tours'

export default {
  extends: Tours,
  head() {
    const { seo, contactsImage } = this.general
    const key = `tours/${this.$route.params.filter}`
    const title = seo[key] ? seo[key].title : seo.tours.title
    const description = seo[key] ? seo[key].description : seo.tours.description

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
  }
}
</script>