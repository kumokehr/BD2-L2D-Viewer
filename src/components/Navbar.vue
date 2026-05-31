<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <nav class="flex items-center justify-between bg-black text-white p-4">
      <div class="text-xl md:text-3xl font-bold">{{ t('app.title') }}</div>
      <div class="hidden md:flex items-center gap-4">
        <button class="cursor-pointer" @click="showUploadModal = true" :title="t('nav.upload_spine')">
          <PlusIcon class="w-5 h-5 md:w-7 md:h-7" />
        </button>
        <button
          class="cursor-pointer"
          @click="openBackgroundModal(false)"
          :aria-label="t('nav.upload_background')"
          :title="t('nav.upload_background')"
        >
          <BgUploadIcon class="w-5 h-5 md:w-7 md:h-7" />
        </button>
        <button
          v-if="hasCustomBackground"
          class="cursor-pointer opacity-70 hover:opacity-100 transition"
          @click="resetBackground"
          :aria-label="t('nav.reset_background')"
          :title="t('nav.reset_background')"
        >
          <BgResetIcon class="w-5 h-5 md:w-7 md:h-7" />
        </button>
        <a
          href="https://ko-fi.com/jelosus1"
          target="_blank"
          rel="noopener"
          class="relative"
          :title="t('nav.support_kofi')"
        >
          <KoFiIcon class="w-5 h-5 md:w-7 md:h-7" />
          <div
            v-if="showKofiTooltip"
            :class="[
              'absolute top-full z-10 mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-xs rounded px-2 py-1 shadow transition-opacity duration-500',
              kofiTooltipHidden ? 'opacity-0' : 'opacity-100'
            ]"
          >
            {{ t('nav.support_prompt') }}
            <span class="absolute left-1/2 -top-2 -translate-x-1/2 border-4 border-transparent border-b-white"></span>
          </div>
        </a>
        <a
          href="https://www.patreon.com/cw/jelosus1"
          target="_blank"
          rel="noopener"
          :title="t('nav.support_patreon')"
        >
          <PatreonIcon class="w-5 h-5 md:w-7 md:h-7" />
        </a>
        <button class="cursor-pointer" @click="showChangelog = true" :title="t('nav.changelog')">
          <ChangelogIcon class="w-5 h-5 md:w-7 md:h-7" />
        </button>
        <a href="https://github.com/Jelosus2/BD2-L2D-Viewer" target="_blank" :title="t('nav.github')">
          <GithubIcon class="w-5 h-5 md:w-7 md:h-7" />
        </a>
        <div ref="languageMenu" class="relative">
          <button
            class="cursor-pointer"
            @click="showLanguageMenu = !showLanguageMenu"
            :title="t('nav.language')"
            :aria-label="t('nav.language')"
          >
            <LanguageIcon class="w-5 h-5 md:w-7 md:h-7" />
          </button>
          <div
            v-if="showLanguageMenu"
            class="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-md border border-gray-700 bg-gray-900 shadow-lg shadow-black/40 z-20"
          >
            <button
              v-for="option in availableLocales"
              :key="option.value"
              type="button"
              class="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-200 hover:bg-gray-800"
              @click="setLanguage(option.value)"
            >
              <span>{{ option.label }}</span>
              <span v-if="locale === option.value" class="text-indigo-400">✓</span>
            </button>
          </div>
        </div>
      </div>
      <button
        class="md:hidden cursor-pointer"
        @click="openMobileMenu()"
        :aria-label="t('nav.menu')"
      >
        <MenuIcon class="w-5 h-5" />
      </button>
    </nav>

    <div
      v-if="mobileMenuOpen"
      ref="mobileMenu"
      tabindex="-1"
      class="fixed inset-0 z-50 md:hidden bg-black bg-opacity-50"
    >
      <button
        class="absolute top-2 right-4 text-xl"
        @click="closeMobileMenu"
        :aria-label="t('common.close')"
      >
        ✕
      </button>
      <div
        class="bg-black text-white w-60 p-4 flex flex-col gap-4 h-full"
      >
        <button
          class="flex items-center gap-2"
          @click="() => { showUploadModal = true; closeMobileMenu(); }"
        >
          <PlusIcon class="w-5 h-5" />
          <span>{{ t('nav.upload_spine') }}</span>
        </button>
        <button
          class="flex items-center gap-2"
          @click="openBackgroundModal(true)"
        >
          <BgUploadIcon class="w-5 h-5" />
          <span>{{ t('nav.upload_background') }}</span>
        </button>
        <button
          v-if="hasCustomBackground"
          class="flex items-center gap-2"
          @click="() => { resetBackground(); closeMobileMenu(); }"
        >
          <BgResetIcon class="w-5 h-5 opacity-60" />
          <span>{{ t('nav.reset_background') }}</span>
        </button>
        <button
          class="flex items-center gap-2"
          @click="() => { showChangelog = true; closeMobileMenu(); }"
        >
          <ChangelogIcon class="w-5 h-5" />
          <span>{{ t('nav.changelog') }}</span>
        </button>
        <a
          href="https://github.com/Jelosus2/BD2-L2D-Viewer"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2"
          @click="closeMobileMenu"
        >
          <GithubIcon class="w-5 h-5" />
          <span>{{ t('nav.github') }}</span>
        </a>
        <a
          href="https://ko-fi.com/jelosus1"
          target="_blank"
          rel="noopener"
          class="relative flex items-center gap-2"
          @click="closeMobileMenu"
        >
          <KoFiIcon class="w-5 h-5" />
          <span>Ko-fi</span>
          <span
            v-if="showMobileKofiTip"
            :class="[
            'ml-2 text-xs bg-red-600 text-white rounded px-2 py-0.5 transition-opacity duration-500',
              mobileKofiTipHidden ? 'opacity-0' : 'opacity-100'
            ]"
            >{{ t('nav.support_short') }}</span
          >
        </a>
        <a
          href="https://www.patreon.com/cw/jelosus1"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2"
          @click="closeMobileMenu"
        >
          <PatreonIcon class="w-5 h-5" />
          <span>{{ t('nav.support_patreon') }}</span>
        </a>
        <div class="pt-2 border-t border-gray-700">
          <div class="text-sm text-gray-300 mb-2">{{ t('nav.language') }}</div>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="option in availableLocales"
              :key="option.value"
              type="button"
              class="rounded border px-3 py-2 text-left text-sm transition-colors"
              :class="locale === option.value ? 'border-indigo-500 bg-indigo-600/20 text-white' : 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'"
              @click="setLanguage(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <UploadSpineModal v-if="showUploadModal" @close="showUploadModal = false" />
    <ChangelogModal v-if="showChangelog" @close="showChangelog = false" />
    <UploadBackgroundModal
      v-if="showBackgroundModal"
      :show-reset="hasCustomBackground"
      @close="showBackgroundModal = false"
      @upload-bg="handleBackgroundUpload"
      @reset-bg="handleBackgroundReset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { availableLocales, locale, setLocale, t } from '@/i18n'
import ChangelogModal from '@/components/ChangelogModal.vue'
import UploadSpineModal from '@/components/UploadSpineModal.vue'
import UploadBackgroundModal from '@/components/UploadBackgroundModal.vue'

import GithubIcon from '@/components/icons/GithubIcon.vue'
import ChangelogIcon from '@/components/icons/ChangelogIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import KoFiIcon from '@/components/icons/KoFiIcon.vue'
import PatreonIcon from '@/components/icons/PatreonIcon.vue'
import BgUploadIcon from '@/components/icons/BgUploadIcon.vue'
import BgResetIcon from '@/components/icons/BgResetIcon.vue'
import LanguageIcon from '@/components/icons/LanguageIcon.vue'

const props = defineProps<{ hasCustomBackground?: boolean }>()
const hasCustomBackground = computed(() => !!props.hasCustomBackground)

const showChangelog = ref(false)
const showUploadModal = ref(false)
const showBackgroundModal = ref(false)
const showKofiTooltip = ref(false)
const kofiTooltipHidden = ref(false)
const mobileMenuOpen = ref(false)
const mobileMenu = ref<HTMLElement | null>(null)
const showMobileKofiTip = ref(false)
const mobileKofiTipHidden = ref(false)
const showLanguageMenu = ref(false)
const languageMenu = ref<HTMLElement | null>(null)
let closeMenuAfterBgUpload = false

let mobileTipTimer: number | undefined
let mobileTipHideTimer: number | undefined

const emit = defineEmits<{
  (e: 'mobile-menu', open: boolean): void
  (e: 'upload-bg', dataUrl: string | null): void
  (e: 'overlay-active', active: boolean): void
}>()

function setLanguage(value: (typeof availableLocales)[number]['value']) {
  setLocale(value)
  showLanguageMenu.value = false
}

function handleDocumentClick(event: MouseEvent) {
  if (!showLanguageMenu.value) return
  const target = event.target as Node
  if (languageMenu.value?.contains(target)) return
  showLanguageMenu.value = false
}

const openMobileMenu = () => {
  mobileMenuOpen.value = true
  emit('mobile-menu', true)
  if (!localStorage.getItem('kofiPromptSeen') && !mobileTipTimer) {
    showMobileKofiTip.value = true
    mobileTipTimer = window.setTimeout(() => {
      mobileKofiTipHidden.value = true
      mobileTipHideTimer = window.setTimeout(() => {
        showMobileKofiTip.value = false
        localStorage.setItem('kofiPromptSeen', '1')
      }, 500)
    }, 5000)
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  emit('mobile-menu', false)
  if (mobileTipTimer) {
    clearTimeout(mobileTipTimer)
    mobileTipTimer = undefined
  }
  if (mobileTipHideTimer) {
    clearTimeout(mobileTipHideTimer)
    mobileTipHideTimer = undefined
  }
  mobileKofiTipHidden.value = false
  showMobileKofiTip.value = false
}

const openBackgroundModal = (fromMobile: boolean) => {
  closeMenuAfterBgUpload = fromMobile
  if (fromMobile && mobileMenuOpen.value) {
    closeMobileMenu()
  }
  showBackgroundModal.value = true
}

const resetBackground = () => {
  closeMenuAfterBgUpload = false
  emit('upload-bg', null)
  showBackgroundModal.value = false
  if (mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

const handleBackgroundUpload = (dataUrl: string | null) => {
  if (dataUrl) {
    emit('upload-bg', dataUrl)
  }
  if (closeMenuAfterBgUpload && mobileMenuOpen.value) {
    closeMobileMenu()
  }
  closeMenuAfterBgUpload = false
  showBackgroundModal.value = false
}

const handleBackgroundReset = () => {
  closeMenuAfterBgUpload = false
  emit('upload-bg', null)
  showBackgroundModal.value = false
}

watch(
  [showChangelog, showUploadModal, showBackgroundModal],
  () => {
    const active = showChangelog.value || showUploadModal.value || showBackgroundModal.value
    emit('overlay-active', active)
  },
  { immediate: true },
)

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  if (!localStorage.getItem('kofiPromptSeen') && !window.matchMedia('(max-width: 767px)').matches) {
    showKofiTooltip.value = true
    setTimeout(() => {
      kofiTooltipHidden.value = true
      setTimeout(() => {
        showKofiTooltip.value = false
        localStorage.setItem('kofiPromptSeen', '1')
      }, 500)
    }, 5000)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>


