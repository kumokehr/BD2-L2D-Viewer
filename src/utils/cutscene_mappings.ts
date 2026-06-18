export type CutsceneAnim = string | { name: string; offset?: number; source?: string; skin?: string; hold?: boolean; loop?: boolean }
export type CutsceneComposite = (CutsceneAnim | CutsceneAnim[])[]
export type CutsceneCompositeDefinition = {
  name?: string
  composite?: CutsceneComposite
  animations?: CutsceneComposite
}
export type CutsceneCompositeEntry = CutsceneComposite | CutsceneCompositeDefinition | CutsceneCompositeDefinition[]

const cutsceneComposites: Record<string, CutsceneCompositeEntry> = {
  "067803": [
    {
      name: "cut_A_all",
      composite: [[
        "cut_A_B_Arm",
        "cut_A",
        { name: "cut_A_B", source: "cutscene/glow/cutscene_char067803_1" },
        { name: "cut_A_F", source: "cutscene/glow/cutscene_char067803_1" }
      ]]
    },
    {
      name: "cut_B_all",
      composite: [[
        "cut_B_Ponytail",
        "cut_B_Body",
        "cut_B_Head",
        { name: "cut_B_B", source: "cutscene/glow/cutscene_char067803_1" },
        { name: "cut_B_Body", source: "cutscene/glow/cutscene_char067803_1" },
        { name: "cut_B_Head", source: "cutscene/glow/cutscene_char067803_1" }
      ]]
    }
  ],
  "004091": [
    {
      name: "A_cut_all",
      composite: [[
        "A_cut",
        "A_cut_hair",
      ]]
    },
    {
      name: "A_cut_all_tera",
      composite: [[
        "A_cut",
        "A_cut_hair",
        { name: "A_cut_tera_head", source: "cutscene/tera/cutscene_char004091_1" },
        { name: "A_cut_tera", source: "cutscene/tera/cutscene_char004091_1" },
      ]]
    },
    {
      name: "B_cut_all",
      composite: [[
        "B_cut_bg_back",
        "B_cut",
        "B_cut_bg_front",
      ]]
    }
  ],
  "067491": [
    {
      "name": "A_cut_all",
      "composite": [[
        "A_cut",
        "A_cut_w1",
        "A_cut_w2",
      ]]
    },
    {
      "name": "B_cut_all",
      "composite": [[
        { name: "panties_black", hold: true},
        { name: "panties_white", hold: true},
        "B_cut",
      ]]
    }
  ],
  "004301": [
    {
      name: "B_cut_all",
      composite: [[
        "B_cut_Belt",
        "B_cut",
      ]]
    },
    {
      name: "loop_2_all",
      composite: [[
        "loop_2_Belt",
        "loop_2",
      ]]
    }
  ],
  "067104": [
    {
      name: "cut_A_all",
      composite: [[
        "cut_A_front_body",
        "cut_A",
        "cut_A_front_arm",
        { name: "cut_A_curtain", loop: true },
      ]]
    },
    {
      name: "loop_1_all",
      composite: [[
        "loop_1_front_body",
        "loop_1",
        "loop_1_front_arm",
        { name: "cut_A_curtain", loop: true },
      ]]
    },
        {
      name: "cut_A_no_curtain",
      composite: [[
        "cut_A_front_body",
        "cut_A",
        "cut_A_front_arm",
      ]]
    },
    {
      name: "loop_1_no_curtain",
      composite: [[
        "loop_1_front_body",
        "loop_1",
        "loop_1_front_arm",
      ]]
    }
  ]
}

export default cutsceneComposites
