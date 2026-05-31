export type CharacterContent = {
  charName: string
  costumeName: string
}

export type CharacterContentMap = Record<string, Partial<CharacterContent>>
