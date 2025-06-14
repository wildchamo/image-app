import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: Request) {

    const { env } = getCloudflareContext();

    const bucket = env.NEXT_INC_R2_BUCKET_IMAGES;

    const body = await request.formData();

    const files = body.getAll("files");

    for (let x = 0; x < files.length; x++) {

        const f = files[x] as File;
        const uuid = crypto.randomUUID();

        await bucket.put(uuid, f);

        return new Response("image uploaded", { headers: { "Content-Type": "application/json" }, status: 200 });
    }

}