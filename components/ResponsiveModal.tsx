import { useMediaQuery } from "@/hooks/use-media-query"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import {
  Drawer, DrawerContent, DrawerHeader,
  DrawerTitle
} from "./ui/drawer"

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    children?: React.ReactNode
    Content: React.ReactNode
}

function ResponsiveModal({ open, setOpen, title, Content, children }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
      <DrawerContent className="sm:max-w-[425px] px-6 pb-6">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {Content}
      </DrawerContent>
    </Drawer>
  )
}


export default ResponsiveModal
