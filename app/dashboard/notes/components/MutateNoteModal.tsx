import { DialogFooter } from "@/components/ui/dialog"
import { PropsWithChildren } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNoteSchema } from "@/app/api/notes/validation"
import { CreateNoteSchema, UpdateNoteSchema } from "@/app/api/notes/types"
import LoadingButton from "@/components/LodingButton"
import ResponsiveModal from "@/components/ResponsiveModal"

interface Props extends PropsWithChildren {
    submitHandler: (data: CreateNoteSchema['body']) => void
    isLoading?: boolean
    open: boolean
    setOpen: (open: boolean) => void
    defaultValues?: UpdateNoteSchema['body']
}

function MutateNoteModal({
    submitHandler, open, setOpen, isLoading, children, defaultValues
}: Props) {


    return (
        <div onClick={(e) => e.stopPropagation()} >
            <ResponsiveModal
                open={open}
                setOpen={setOpen}
                title={defaultValues ? 'Edit' : 'Create'}
                Content={<ModalContent defaultValues={defaultValues} submitHandler={submitHandler} isLoading={isLoading} />}
            >
                {children}
            </ResponsiveModal>
        </div>
    )
}

export default MutateNoteModal


export function ModalContent({ defaultValues, submitHandler, isLoading }: Omit<Props, 'open' | 'setOpen'>) {
    const form = useForm<CreateNoteSchema['body']>({
        resolver: zodResolver(createNoteSchema.shape.body),
        defaultValues: {
            title: defaultValues?.title || '',
            content: defaultValues?.content || ''
        }
    });

    return (
        <Form {...form} >
            <form className="flex flex-col gap-4 py-4" onSubmit={form.handleSubmit(submitHandler)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Write something brilliant..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea className="h-40" placeholder="Your thoughts go here..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <LoadingButton isLoading={isLoading} type="submit">Save changes</LoadingButton>
                </DialogFooter>
            </form>
        </Form>
    )
}