import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
export default async function UserPage(){
    const users = await prisma.user.findMany();
    // 1. データを追加する関数 (Server Action)
    async function addUser(formData:FormData){
        "use server";
        const name = formData.get("name") as string;
        const email = formData.get("mail") as string;
        await prisma.user.create({
            data:{name,email}
        });
        // 2. 画面を更新して、新しく入れたデータを表示させる
            revalidatePath("/users2");
    }
    return(
        <>
        <h1>ユーザー一覧</h1>
        <form action={addUser}>
            <input type="text" name="name"  placeholder="名前"/>
            <input type="text" name="mail" placeholder="メールアドレス" />
            <button type="submit">追加</button>
        </form>
        {users.map(user => (
        <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
        ))}

        </>
    )
}