import * as migration_20261006_142335_initial from './20261006_142335_initial';
import * as migration_20261007_121131_episode_extracts_and_guest from './20261007_121131_episode_extracts_and_guest';
import * as migration_20261007_122642_articles from './20261007_122642_articles';
import * as migration_20261007_123730_experience_details from './20261007_123730_experience_details';
import * as migration_20261008_073316_stripe_booking from './20261008_073316_stripe_booking';

export const migrations = [
  {
    up: migration_20261006_142335_initial.up,
    down: migration_20261006_142335_initial.down,
    name: '20261006_142335_initial',
  },
  {
    up: migration_20261007_121131_episode_extracts_and_guest.up,
    down: migration_20261007_121131_episode_extracts_and_guest.down,
    name: '20261007_121131_episode_extracts_and_guest',
  },
  {
    up: migration_20261007_122642_articles.up,
    down: migration_20261007_122642_articles.down,
    name: '20261007_122642_articles',
  },
  {
    up: migration_20261007_123730_experience_details.up,
    down: migration_20261007_123730_experience_details.down,
    name: '20261007_123730_experience_details',
  },
  {
    up: migration_20261008_073316_stripe_booking.up,
    down: migration_20261008_073316_stripe_booking.down,
    name: '20261008_073316_stripe_booking'
  },
];
