import { PrismaClient } from "../app/generated/prisma/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.book.createMany({
        data: [
            { title: "星座の図鑑", author: "田中太郎", type: "SCIENCE", stock: 3, location: "東京図書館", latitude: 35.2946, longitude: 139.5765 },
            { title: "銀河鉄道の夜", author: "宮沢賢治", type: "NOVEL", stock: 2, location: "東京図書館", latitude: 35.2946, longitude: 139.5765 },
            { title: "日本の歴史", author: "山田花子", type: "HISTORY", stock: 5, location: "大阪図書館", latitude: 35.2946, longitude: 139.5765 },
            { title: "宇宙の謎", author: "佐藤次郎", type: "SCIENCE", stock: 1, location: "東京図書館", latitude: 35.2946, longitude: 139.5765 },
            { title: "ドラゴン漫画", author: "鈴木一郎", type: "MANGA", stock: 4, location: "大阪図書館", latitude: 35.2946, longitude: 139.5765 },
        ]
    });
    console.log("完了");
}

main();