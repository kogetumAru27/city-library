import { prisma } from "@/lib/prisma";
import { Bookfilter } from "@/components/BookFilter";
export default async function BooksPage(){
    const books = await prisma.book.findMany()
    return(
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">本の一覧</h1>
            <Bookfilter books={books} />
        </div>
    )
}