import { useIsMobile } from '../../hooks/useIsMobile'
import { DesktopShell } from './DesktopShell'
import { MobileShell } from './MobileShell'

/** Picks the shell that fits the viewport. Everything shell-specific lives
 *  in DesktopShell/MobileShell; this component only decides which one to
 *  mount. */
export function AppShell() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileShell /> : <DesktopShell />
}
