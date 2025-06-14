import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: Request) {

    const { env } = getCloudflareContext();

    const bucket = env.NEXT_INC_R2_BUCKET_IMAGES;

    const ai = env.AI;
    const body = await request.formData();

    const files = body.getAll("files");

    let imageAnalysis = []
    for (let x = 0; x < files.length; x++) {

        const f = files[x] as File;
        const uuid = crypto.randomUUID();

        await bucket.put(uuid, f);

        const blob = await f.arrayBuffer();
        const inputs = {
            image: Array.from(new Uint8Array(blob)),
        }

        imageAnalysis.push({
            id: uuid,
            url: f.name,
            analysis: await ai.run("@cf/microsoft/resnet-50", inputs)
        })


    }

    return new Response(JSON.stringify(imageAnalysis), { headers: { "Content-Type": "application/json" }, status: 200 });

}