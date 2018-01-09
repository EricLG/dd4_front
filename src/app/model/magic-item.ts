import {Deserializable} from "./deserializable";

import { ItemLevels } from './item-levels';
import { ItemGroups } from './item-groups';
import { Source } from './source';

export class MagicItem implements Deserializable<MagicItem> {

  constructor(
    public name?: string,
    public description?: string,
    public alteration?: string,
    public property?: string,
    public power?: string,
    public critical?: string,
    public itemLevels?: ItemLevels[],
    public itemGroups?: ItemGroups[],
    public rarity?: string,
    public source?: Source
  ) { }

  level_min() {
    return Math.min(...(this.itemLevels.map(itemLevels => itemLevels.level)))
  }

  item_groups() {
    return this.itemGroups.map(ig => (' ' + ig.name))
  }

  deserialize(input: any): MagicItem {
    Object.assign(this, input);

    if (input.itemLevels) {
      this.itemLevels = input.itemLevels.map((inputItemLevels: ItemLevels) => new ItemLevels().deserialize(inputItemLevels));
    }
    if (input.itemGroups) {
      this.itemGroups = input.itemGroups.map((inputItemGroups: ItemGroups) => new ItemGroups().deserialize(inputItemGroups));
    }
    if (input.source) {
      this.source = new Source().deserialize(input.source);
    }

    return this;
  }
}
