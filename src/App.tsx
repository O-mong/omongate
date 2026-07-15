import { StoryProvider } from './context/StoryContext'
import { AppShell } from './components/layout/AppShell'

export function App() {
  return (
    <StoryProvider>
      <AppShell />
    </StoryProvider>
  )
}
