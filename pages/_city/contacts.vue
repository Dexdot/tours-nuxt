<template>
  <main>
    <section class="contacts">
      <div class="contacts__bg img">
        <BaseImage
          class="img__i"
          v-if="general.contactsImage"
          :img="general.contactsImage"
          :alt="general.contactsImage.fields.title"
        ></BaseImage>
      </div>

      <div class="contacts__container">
        <div class="contacts__info">
          <div class="contacts__info-links">
            <a :href="general.phoneNumber"
              ><b>{{ general.phoneText }}</b></a
            >
            <a :href="`mailto:${general.email}`">{{ general.email }}</a>
          </div>
          <div class="contacts__info-social">
            <SocialList :socialLinks="general.socialLinks" />
          </div>
        </div>

        <div class="contacts__right">
          <div class="contacts__visual">
            <img src="~assets/svg/circle-waves.svg" alt="Icon" />
            <img src="~assets/svg/stamp.svg" alt="Icon" />
          </div>

          <form action="ajax/callback.php" class="contacts__form" novalidate>
            <BaseInput
              required
              type="text"
              :placeholder="$t('form.name')"
              :error-text="$t('form.nameError')"
            />
            <BaseInput
              required
              type="text"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              :placeholder="$t('form.email')"
              :error-text="$t('form.emailError')"
            />
            <BaseInput
              required
              isTextarea
              minlength="10"
              :placeholder="$t('form.message')"
              :error-text="$t('form.messageError')"
            />

            <BaseButton
              :showSuccess="isFormSubmitted && isFormValid"
              :showError="!isFormSubmitted && !isFormValid"
              type="submit"
            >
              <slot v-if="!isFormSubmitted && !isFormValid">{{
                $t('form.buttonError')
              }}</slot>
              <slot v-else>{{ $t('form.button') }}</slot>
            </BaseButton>
          </form>
        </div>
      </div>
    </section>

    <Instagram v-if="instagramData" :data="instagramData" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import page from '~/mixins/page'
import SocialList from '~/components/SocialList'
import Instagram from '~/components/Instagram'

export default {
  mixins: [page],
  components: {
    SocialList,
    Instagram
  },
  head() {
    const title = 'Контакты'

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
          content: title
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
          content: title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/favicon/projectName.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: title
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      general: 'general/data',
      locale: 'lang/locale'
    }),
    instagramData() {
      const { general } = this

      const instagramImages = [...general.instagramImages].reverse()
      const images = []

      images.push(instagramImages[0])
      images.push({ sys: { id: new Date().getTime() } })

      instagramImages.slice(1).forEach(img => {
        images.push(img)
      })

      const data = {
        images,
        title: general.instagramTitle,
        text: general.instagramText,
        buttonUrl: general.instagramButtonUrl,
        buttonText: general.instagramButtonText
      }

      return data
    },
    isFormSubmitted() {
      return false
    },
    isFormValid() {
      return true
    }
  }
}
</script>

<style lang="sass" scoped>
.contacts
  position: relative
  display: flex
  flex-direction: column

  @media (min-width: $tab + 1)
    min-height: 100vh

.contacts__bg
  @media (min-width: $tab + 1)
    position: absolute
    height: 100%

  @media (max-width: $tab)
    padding-bottom: 280px
    
  @media (max-width: $mob)
    padding-bottom: 73.6%

.contacts__bg::before
  content: ''
  z-index: 1
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%
  background: rgba($black, 0.3)

.contacts__container
  z-index: 1
  position: relative

  display: flex
  height: calc(100vh - var(--header-h) - 10.6vh)

  background: $beige-d

  @media (min-width: $tab + 1)
    margin-top: auto
    margin-left: auto
    width: unit-plus(column-spans(9))
    padding: $unit

  @media (min-width: $tab + 1) and (max-height: 960px)
    height: calc(100vh - var(--header-h) - 40px)

  @media (min-width: $tab + 1) and (max-width: 1500px) and (max-height: 960px)
    height: calc(100vh - var(--header-h))

  @media (max-width: $tab)
    flex-direction: column
    height: auto
    padding: 48px $unit 80px

.contacts__info
  display: flex
  flex-direction: column

  @media (min-width: $tab + 1)
    width: 50%

  @media (max-width: $tab)
    margin-bottom: 32px

.contacts__info-links
  line-height: 1
  @media (max-width: $tab)
    margin-bottom: 24px

.contacts__info-links a:first-child
  margin-bottom: 8px

.contacts__info-links a:last-child
  @media (max-width: $tab)
    font-size: 16px

.contacts__info-links a
  display: block
  font-size: 30px

  @media (max-height: 1440px)
    font-size: 24px

.contacts__info-social
  @media (min-width: $tab + 1)
    margin-top: auto

.contacts__right
  display: flex
  flex-direction: column

  @media (min-width: $tab + 1)
    width: 50%
    padding-left: $unit
    border-left: 1px solid rgba($black, 0.1)

.contacts__visual
  display: flex
  align-items: flex-start
  justify-content: space-between

  @media (max-width: $tab)
    margin-bottom: 16px
    padding-top: 32px
    border-top: 1px solid rgba($black, 0.1)

.contacts__visual img:first-child
  @media (min-width: $tab + 1) and(max-height: 960px)
    width: 120px

  @media (max-width: $tab)
    width: 108px
    margin-top: 16px

.contacts__visual img:last-child
  @media (min-width: $tab + 1) and (max-height: 960px)
    width: 104px

  @media (min-width: $tab + 1) and (max-width: 1500px) and (max-height: 960px)
    width: 64px

  @media (max-width: $tab)
    width: 101px

.contacts__form
  margin-top: auto

.contacts__form .input:not(:first-child)
  margin-top: 40px
  @media (max-width: $tab)
    margin-top: 32px

.contacts__form .btn
  min-width: 200px
  max-width: 100%
  margin-top: 40px

  @media (max-width: $tab)
    margin-top: 32px

  .btn__bg
    border-radius: 0
</style>
