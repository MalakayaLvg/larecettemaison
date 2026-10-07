import * as migration_20261006_142335_initial from './20261006_142335_initial';
import * as migration_20261007_121131_episode_extracts_and_guest from './20261007_121131_episode_extracts_and_guest';

export const migrations = [
  {
    up: migration_20261006_142335_initial.up,
    down: migration_20261006_142335_initial.down,
    name: '20261006_142335_initial',
  },
  {
    up: migration_20261007_121131_episode_extracts_and_guest.up,
    down: migration_20261007_121131_episode_extracts_and_guest.down,
    name: '20261007_121131_episode_extracts_and_guest'
  },
];
