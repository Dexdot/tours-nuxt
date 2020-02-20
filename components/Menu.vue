<template>
  <transition name="menu">
    <section class="menu" v-show="active">
      <div class="menu__overlay"></div>

      <div class="menu__content">
        <nav class="menu__nav">
          <ul>
            <li class="menu__li">
              <nuxt-link class="menu__link" to="/"></nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
/* ENTER */
.menu-enter
  pointer-events: none

  .menu__li
    opacity: 0
    transform: translateY(24px)

  .menu__overlay
    transform: translateY(101%)


.menu-enter-to
  pointer-events: auto

  .menu__li
    opacity: 1
    transform: translateY(0px)

  .menu__overlay
    transform: translateY(0%)


.menu-enter-active
  transition: 1s ease-in-out

  .menu__overlay
    transition: 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)

@for $i from 1 through 6
  .menu-enter-active .menu__li:nth-child(#{$i})
    transition: 0.4s ease (#{$i*0.05s + 0.4s})


/* LEAVE */
.menu-leave
  pointer-events: auto

  .menu__li
    opacity: 1
    transform: translateY(0px)

  .menu__overlay
    transform: translateY(0%)

.menu-leave-to
  pointer-events: none

  .menu__li
    opacity: 0

  .menu__overlay
    transform: translateY(101%)

.menu-leave-active
  transition: 1s ease-in-out

  .menu__overlay
    transition: 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)

@for $i from 1 through 6
  .menu-leave-active .menu__li:nth-child(#{$i})
    transition: 0.4s ease (#{$i*0.05s})

.menu
  z-index: 3
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0

  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)



// Overlay
.menu__overlay
  background: #000

  position: absolute
  top: 0
  left: 0

  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

.menu__content
  z-index: 1
  position: absolute
  bottom: 40px
  right: var(--unit)

  text-align: right

.menu__nav
  display: flex
  flex-direction: column
  align-items: flex-end
  margin-bottom: 40px

// Hover
.menu__link
  transition: 0.25s ease

.menu__nav .menu__link:not(.nuxt-link-exact-active)
  opacity: 1

.menu__nav .menu__link.nuxt-link-exact-active
  opacity: 0.3

.menu__nav:hover
  .menu__link:not(.nuxt-link-exact-active),
  .menu__link.nuxt-link-exact-active
    opacity: 0.3

.menu__nav
  .menu__link:not(.nuxt-link-exact-active):hover,
  .menu__link.nuxt-link-exact-active:hover
    opacity: 1
</style>
