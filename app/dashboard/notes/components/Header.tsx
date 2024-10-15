import CreateNoteAction from "./CreateNoteAction";

export default function NotesHeader() {

    return (
        <div className="w-full flex items-center justify-between mt-6">
            <h1>My notes</h1>
            <CreateNoteAction />
        </div >
    )
}