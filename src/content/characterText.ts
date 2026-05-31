import { locale, type Locale } from '@/i18n'
import enUS from '@/content/locales/en-US.json'
import jaJP from '@/content/locales/ja-JP.json'
import koKR from '@/content/locales/ko-KR.json'
import zhCN from '@/content/locales/zh-CN.json'
import zhTW from '@/content/locales/zh-TW.json'
import type { CharacterContent } from '@/content/types'

function normalizeCharacterContentMap(
  content: Record<string, Partial<CharacterContent>>,
): Record<string, Partial<CharacterContent>> {
  return Object.fromEntries(
    Object.entries(content).map(([id, value]) => [id.replace(/^Char/i, ''), value]),
  )
}

const characterContentByLocale: Record<Locale, Record<string, Partial<CharacterContent>>> = {
  'en-US': normalizeCharacterContentMap(enUS),
  'zh-CN': normalizeCharacterContentMap(zhCN),
  'zh-TW': normalizeCharacterContentMap(zhTW),
  'ja-JP': normalizeCharacterContentMap(jaJP),
  'ko-KR': normalizeCharacterContentMap(koKR),
}

function mergeCharacterContent(
  id: string,
  currentLocale: Locale,
  fallback?: CharacterContent,
): CharacterContent | null {
  const base = characterContentByLocale['en-US'][id]
  const localized = characterContentByLocale[currentLocale][id]
  const merged = {
    charName: localized?.charName ?? base?.charName ?? fallback?.charName,
    costumeName: localized?.costumeName ?? base?.costumeName ?? fallback?.costumeName,
  }

  if (!merged.charName) return fallback ? fallback : null
  return merged as CharacterContent
}

export function getCharacterContent(
  id: string,
  currentLocale: Locale = locale.value,
  fallback?: CharacterContent,
): CharacterContent | null {
  return mergeCharacterContent(id, currentLocale, fallback)
}

export function getCharacterDisplayName(
  id: string,
  currentLocale: Locale = locale.value,
  fallback?: CharacterContent,
): string {
  const content = getCharacterContent(id, currentLocale, fallback)
  if (!content) return id
  if (!content.costumeName) return content.charName
  return `${content.charName}: ${content.costumeName}`
}

export function getCharacterSearchText(
  id: string,
  currentLocale: Locale = locale.value,
  fallback?: CharacterContent,
): string {
  const content = getCharacterContent(id, currentLocale, fallback)
  if (!content) return id.toLowerCase()
  return `${id} ${content.charName} ${content.costumeName ?? ''}`.toLowerCase()
}
