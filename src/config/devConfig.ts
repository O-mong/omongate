import confText from '../../omongate.conf?raw'
import { parseConf } from './parseConf'

const conf = parseConf(confText)

// Dev-only escape hatch (see omongate.conf): when true, a reset button appears in place of
// the profile name in the sidebar, letting a tester wipe the progress cookie and restart the
// story without hand-clearing cookies. Off by default; flipping it requires a rebuild.
export const DEV_MODE = conf.dev_mode === 'true'
