import { ref, watch } from 'vue'
import enUS from './locales/en-US'
import jaJP from './locales/ja-JP'
import koKR from './locales/ko-KR'
import zhCN from './locales/zh-CN'
import zhTW from './locales/zh-TW'

export type Locale = 'en-US' | 'zh-CN' | 'zh-TW' | 'ja-JP' | 'ko-KR'

const LOCALE_STORAGE_KEY = 'bd2-l2d-locale'

const messages = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'ja-JP': jaJP,
  'ko-KR': koKR,
} as const

export const availableLocales: Array<{ value: Locale; label: string }> = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文 (AI)' },
  { value: 'ja-JP', label: '日本語 (AI)' },
  { value: 'ko-KR', label: '한국어 (AI)' },
]

function isLocale(value: string | null): value is Locale {
  return value === 'en-US' || value === 'zh-CN' || value === 'zh-TW' || value === 'ja-JP' || value === 'ko-KR'
}

function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en-US'
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (isLocale(stored)) return stored
  const browserLocale = window.navigator.language.toLowerCase()
  if (browserLocale.startsWith('zh')) {
    if (browserLocale.includes('tw') || browserLocale.includes('hk') || browserLocale.includes('mo') || browserLocale.includes('hant')) {
      return 'zh-TW'
    }
    return 'zh-CN'
  }
  if (browserLocale.startsWith('ja')) return 'ja-JP'
  if (browserLocale.startsWith('ko')) return 'ko-KR'
  return 'en-US'
}

export const locale = ref<Locale>(getBrowserLocale())
applyDocumentLocale(locale.value)

function applyDocumentLocale(value: Locale) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.locale = value
}

watch(locale, value => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOCALE_STORAGE_KEY, value)
  applyDocumentLocale(value)
  const title = t('app.seo_title')
  const description = t('app.seo_description')
  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
}, { immediate: true })

function resolveMessage(root: unknown, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>((current, part) => {
    if (!current || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[part]
  }, root)
  return typeof value === 'string' ? value : undefined
}

export function setLocale(nextLocale: Locale) {
  locale.value = nextLocale
}

export function t(key: string, params?: Record<string, string | number>): string {
  const localized = resolveMessage(messages[locale.value], key) ?? resolveMessage(messages['en-US'], key) ?? key
  return localized.replace(/\{(\w+)\}/g, (_, paramName: string) => {
    const value = params?.[paramName]
    return value === undefined ? `{${paramName}}` : String(value)
  })
}
