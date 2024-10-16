import { Moon, Sun } from 'lucide-react'
import { useTheme }  from 'next-themes'

import { Button } from '@/components/ui/button'

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()


  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <Button variant="outline" className='rounded-full' size="icon" onClick={handleToggleTheme}>
      {theme === 'light' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  )
}

export default ThemeToggleButton
