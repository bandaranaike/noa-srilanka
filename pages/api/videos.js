import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export default (req, res) => {
    async function main() {
        const allVideos = await prisma.videos.findMany().catch(e => {
            console.log(e, 555555)
        })
        console.log(allVideos)
        res.json(allVideos)
    }

    main().catch(e => {
        throw e
    }).finally(async () => {
        await prisma.$disconnect()
    });

}