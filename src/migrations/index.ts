import * as migration_20260527_202303 from './20260527_202303';
import * as migration_20260527_203823 from './20260527_203823';
import * as migration_20260527_204729 from './20260527_204729';
import * as migration_20260527_205225 from './20260527_205225';
import * as migration_20260527_205507 from './20260527_205507';
import * as migration_20260527_205655 from './20260527_205655';

export const migrations = [
  {
    up: migration_20260527_202303.up,
    down: migration_20260527_202303.down,
    name: '20260527_202303',
  },
  {
    up: migration_20260527_203823.up,
    down: migration_20260527_203823.down,
    name: '20260527_203823',
  },
  {
    up: migration_20260527_204729.up,
    down: migration_20260527_204729.down,
    name: '20260527_204729',
  },
  {
    up: migration_20260527_205225.up,
    down: migration_20260527_205225.down,
    name: '20260527_205225',
  },
  {
    up: migration_20260527_205507.up,
    down: migration_20260527_205507.down,
    name: '20260527_205507',
  },
  {
    up: migration_20260527_205655.up,
    down: migration_20260527_205655.down,
    name: '20260527_205655'
  },
];
