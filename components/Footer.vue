<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <nuxt-link class="footer__logo u-center" :to="$cityLocalePath('index')">
          <svg-icon name="logo" />
        </nuxt-link>

        <nav class="footer__nav">
          <ul>
            <li v-for="link in $t('navLinks')" :key="link.to">
              <nuxt-link class="t-ttu" :to="$cityLocalePath(link.to)">{{
                link.text
              }}</nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="footer__info">
          <BaseButton
            classDark
            classPulse
            @click="$store.dispatch('dom/showBukza')"
            >{{ $t('orderTicket') }}</BaseButton
          >

          <div class="footer__contact">
            <a :href="`tel:${general.phoneNumber}`">
              {{ general.phoneText }}
            </a>
            <button @click="$store.dispatch('dom/toggleCallback')">
              {{ $t('orderCall') }}
            </button>
            <a :href="`mailto:${general.email}`">
              {{ general.email }}
            </a>
          </div>
        </div>

        <no-ssr>
          <div class="footer__award">
            <div
              id="TA_certificateOfExcellence944"
              class="TA_certificateOfExcellence"
            >
              <ul id="96WJlmyEl" class="TA_links WieT8XTRCCE4">
                <li id="8H3FlImwIp" class="ARoy9Qf2Cwq">
                  <a
                    target="_blank"
                    href="https://www.tripadvisor.ru/Attraction_Review-g298507-d14893132-Reviews-Peshekhod_Tour-St_Petersburg_Northwestern_District.html"
                    ><img
                      src="https://www.tripadvisor.ru/img/cdsi/img2/awards/v2/tchotel_2020_LL-14348-2.png"
                      alt="TripAdvisor"
                      class="widCOEImg"
                      id="CDSWIDCOELOGO"
                  /></a>
                </li>
              </ul>
            </div>

            <script
              async
              src="https://www.jscache.com/wejs?wtype=certificateOfExcellence&amp;uniq=944&amp;locationId=14893132&amp;lang=ru&amp;year=2020&amp;display_version=2"
              data-loadtrk
              onload="this.loadtrk=true"
            ></script>
          </div>
        </no-ssr>
      </div>

      <div class="footer__bottom">
        <div class="footer__copyright">
          <p>
            ©{{ new Date().getFullYear() }} {{ $t('footer.companyName') }}.
            <span>{{ $t('footer.reservedRights') }}</span>
          </p>

          <nuxt-link :to="$cityLocalePath('/info/policy')">{{
            $t('footer.policy')
          }}</nuxt-link>
          <button @click="$store.dispatch('dom/toggleCredits')">Credits</button>
        </div>

        <div class="footer__social">
          <SocialList :socialLinks="general.socialLinks" isWhite />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import SocialList from '~/components/SocialList'

export default {
  components: {
    SocialList
  },
  computed: {
    ...mapGetters({
      general: 'general/data'
    })
  }
}
</script>

<style lang="sass" scoped>
.footer
  background: $black
  color: #fff

.footer a
  +link(#fff)

// Inner
.footer__inner
  position: relative

  display: flex
  align-items: flex-start

  padding-top: 120px
  padding-bottom: 48px

  @media (max-width: $tab)
    padding-top: 64px
    padding-bottom: 142px
    flex-direction: column


// Award
.footer__award
  position: absolute
  bottom: 48px
  left: 0

  /deep/ #CDSWIDCOE
    margin: 0
    height: 80px
    width: auto

    img
      height: 100%
      object-fit: contain


// Logo
.footer__logo
  @media (max-width: $tab)
    margin-bottom: 48px

.footer__logo .i-logo
  color: #fff
  @media (min-width: $tab + 1)
    width: 137px
    height: 80px


// Nav
.footer__nav
  @media (max-width: $tab)
    margin-bottom: 48px

  @media (min-width: $tab + 1)
    margin-left: 40px

  @media (min-width: 1111px)
    margin-left: calc(#{mix(2)} - 137px)

.footer__nav li
  transition: opacity $trs
  &:hover
    opacity: 0.4

.footer__nav li:not(:last-child)
  margin-bottom: 8px

.footer__info
  @media (min-width: $tab + 1)
    display: flex
    flex-direction: column
    align-items: flex-end
    margin-left: auto

.footer__info .btn
  @media (max-width: $tab)
    display: none


// Contact
.footer__contact
  @media (min-width: $tab + 1)
    text-align: right
    display: flex
    flex-direction: column
    align-items: flex-end

    margin-top: 152px

.footer__contact a:first-child
  font-size: 16px
  letter-spacing: 0.04em

.footer__contact a:last-child,
.footer__contact button
  font-size: 12px

.footer__contact button
  display: block
  margin-bottom: 8px

  +mont(r)
  opacity: 0.4
  transition: $trs
  &:hover
    opacity: 1


// Bottom bar
.footer__bottom
  display: flex

  @media (min-width: $tab + 1)
    padding: 48px 0
    border-top: 1px solid rgba(#fff, 0.1)
    align-items: center

  @media (max-width: $tab)
    flex-direction: column-reverse


// Copyright bar
.footer__copyright
  +mont(r)

  display: flex
  align-items: center
  margin-left: -24px

  @media (max-width: $tab)
    margin-left: -16px
    padding: 24px 0
    border-top: 1px solid rgba(#fff, 0.1)

  @media (max-width: 360px)
    font-size: 12px
    margin-left: -8px

  p, a, button
    opacity: 0.4
    margin-left: 24px
    @media (max-width: $tab)
      margin-left: 16px
    
    @media (max-width: 360px)
      margin-left: 8px

  p span
    @media (max-width: $tab)
      display: none

  a, button
    transition: $trs
    &:hover
      opacity: 1


// Social
.footer__social
  @media (max-width: $tab)
    margin-bottom: 32px
    
  @media (min-width: $tab + 1)
    margin-left: auto

  .social
    @media (min-width: $tab + 1)
      margin-left: -24px
  
  .social li
    @media (min-width: $tab + 1)
      margin-left: 24px
      display: flex
      align-items: center
      justify-content: center

  .social a
    @media (max-width: $tab)
      width: 40px
      height: 40px
      border: 1px solid #fff

    @media (min-width: $tab + 1)
      border: 0
      width: auto
      height: auto
</style>
