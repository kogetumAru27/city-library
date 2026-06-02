import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddBookForm from "@/components/AddBookForm";
import DeleteButton from "@/components/DeleteButton";
import EditBookForm from "@/components/EditBookForm";
export default async function AdminBookPage(){
    const session = await getServerSession(authOptions);
   if(!session || session.user.role !== "ADMIN") redirect("/");
    const books = await prisma.book.findMany();
    return(
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">本の管理</h1>
            <p>{session?.user?.role}</p>
            <AddBookForm/>
            {books.map(book => (
                <div key={book.id} className="bg-white shadow-md rounded-lg px-4 py-2 mb-2 text-black">
                    <p className="font-bold">{book.title}</p>
                    <p className="text-gray-500">{book.author}</p>
                    <p>在庫:{book.stock}</p>
                    <p>{book.location}</p>
                    <DeleteButton bookId={book.id}/>
                    <EditBookForm book={book}/>
                </div>
            ))}
        </div>
    )
}