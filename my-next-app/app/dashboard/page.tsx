import { getServerSession } from "next-auth";
export default async function Dashboard(){
    const session = await getServerSession();
    if(!session){
        return(
            <div>
            <p>ログインしてください</p>
        </div>
        );
    }
    return(
        <div>
        <h1>ようこそ、{session.user?.name}さん！</h1>
        <p>ここはログインした人だけ見れるページです</p>
    </div>
    )
}