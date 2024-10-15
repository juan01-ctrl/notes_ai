import { auth } from "@clerk/nextjs/server";
import NotesHeader from "./components/Header";
import NoteList from "./components/NoteList";



export default async function Notes() {
    const { userId } = auth()

    return (
        <div className="flex-1 flex flex-col">
            <NotesHeader />
            <NoteList userId={userId!} />
        </div >
    )
} 