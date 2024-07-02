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

      <div class="contacts__container" ref="container">
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

        <FormCallback />
      </div>
    </section>

    <Instagram v-if="instagramData" :data="instagramData" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import page from "~/mixins/page";
import SocialList from "~/components/SocialList";
import Instagram from "~/components/Instagram";
import FormCallback from "~/components/FormCallback";

export default {
  mixins: [page],
  components: {
    SocialList,
    Instagram,
    FormCallback
  },
  head() {
    const { seo, contactsImage } = this.general;
    const { title, description } = seo.contacts;

    return {
      title,
      titleTemplate: null,
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: contactsImage.fields.file.url || ""
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description
        },
        {
          hid: "og:image",
          property: "og:image",
          content: contactsImage.fields.file.url || ""
        },
        {
          hid: "description",
          name: "description",
          content: description
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      general: "general/data",
      locale: "lang/locale"
    }),
    instagramData() {
      const { general } = this;

      const instagramImages = [...general.instagramImages].reverse();
      const images = [];

      images.push(instagramImages[0]);
      images.push({ sys: { id: new Date().getTime() } });

      instagramImages.slice(1).forEach(img => {
        images.push(img);
      });

      const data = {
        images: images.slice(0, 7),
        title: general.instagramTitle,
        text: general.instagramText,
        buttonUrl: general.instagramButtonUrl,
        buttonText: general.instagramButtonText
      };

      return data;
    },
    isFormSubmitted() {
      return false;
    },
    isFormValid() {
      return true;
    }
  },
  created() {
    this.$store.dispatch("dom/setHeaderTransparent", true);
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize(this));
  },
  beforeDestroy() {
    this.$store.dispatch("dom/setHeaderTransparent", false);
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      const wh = window.innerHeight;

      const header = document.querySelector(".header");
      const headerH = header.offsetHeight + 40;

      const { container } = this.$refs;
      const mt = wh - container.offsetHeight;

      container.style.setProperty(
        "--contacts-mt",
        `${Math.max(headerH, mt)}px`
      );
    }
  }
};
</script>

<style lang="sass" scoped>
.contacts
  position: relative
  display: flex
  flex-direction: column

  @media (min-width: $tab + 1)
    min-height: 100vh


// BG
.contacts__bg
  @media (min-width: $tab + 1)
    position: absolute
    height: 100vh

  @media (max-width: $tab)
    padding-bottom: 280px

  @media (max-width: $mob)
    padding-bottom: 73.6%


// BG Overlay
.contacts__bg::before
  content: ''
  z-index: 1
  position: absolute
  top: 0
  left: 0

  width: 100%
  height: 100%
  background: rgba($black, 0.3)


// Container
.contacts__container
  z-index: 1
  position: relative

  background: var(--sec-c)
  display: flex

  @media (min-width: $tab + 1)
    margin-top: var(--contacts-mt)
    margin-left: auto

  @media (max-width: $tab)
    flex-direction: column


// Callback form
.contacts__container .contacts-callback::before
  content: ''
  position: absolute
  top: $unit
  left: 0

  display: none
  width: 1px
  height: calc(100% - 176px)

  background: rgba($black, 0.1)

  @media (min-width: $tab + 1)
    display: block


// Info
.contacts__info
  display: flex
  flex-direction: column

  @media (min-width: $tab + 1)
    padding: $unit $unit 80px

  @media (min-width: $tab + 1) and (max-width: 1400px)
    min-width: column-spans(7)
    width: column-spans(7)

  @media (min-width: 1401px)
    min-width: mix(5)
    width: mix(5)

  @media (max-width: $tab)
    padding: 48px $unit 0


// Email, phone
.contacts__info-links
  line-height: 1

  @media (min-width: $tab + 1)
    margin-bottom: 47.407vh

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
    font-size: 20px

  @media (max-width: $tab)
    font-size: 24px
</style>
