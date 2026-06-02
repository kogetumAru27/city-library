import { prisma } from "@/lib/prisma";
import BorrowButton from "@/components/BorrowButton";
export default async function Detail({params}:{params: Promise<{ id: string }> }){
   const {id} = await params
   const book = await prisma.book.findUnique({//どの本を借りるかそのための本の詳細
    where:{id}
   });
    if(!book) return <p>本が見つかりません</p>
    return(
        <div key={book.id}>
            <p>タイトル:{book.title}</p>
            <p>著者:{book.author}</p>
            <p>在庫:{book.stock}</p>
            <p>場所:{book.location}</p>
            <BorrowButton bookId={book.id} stock={book.stock}/>
        </div>
    )
}