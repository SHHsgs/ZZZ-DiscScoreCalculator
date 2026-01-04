import { Buff } from "./buff";
import { Character } from "./character";
import { DiscEffect } from "./DiscEffect";
import { EngineEquipment } from "./engineEquipment";

export type SelectedItems = {
  selectedCharacter: Character;
  selectedCharacter2: Character;
  selectedCharacter3: Character;
  selectedEngineEquipment: EngineEquipment;
  selectedEngineEquipment2: EngineEquipment;
  selectedEngineEquipment3: EngineEquipment;
  selectedDiscFour1: DiscEffect;
  selectedDiscFour2: DiscEffect;
  selectedDiscFour3: DiscEffect;
  selectedDiscTwo1: DiscEffect;
  externalBuffs: Buff;
  baseDeffence: string;
}