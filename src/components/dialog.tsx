'use client';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function EditDialog({
    name,
    parent
}:{
    name: string,
    parent: React.ReactNode,
  }
) {
    const[newName, setNewName]=useState(name || '')
  return (
    <Dialog>
      <DialogTrigger asChild>
        {parent}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              value={newName}
              id="name"
              defaultValue="n/a"
              className="col-span-3"
              onChange={(evt)=>setNewName(evt.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Accept</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
