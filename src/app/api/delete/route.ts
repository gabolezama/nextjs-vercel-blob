import { del } from '@vercel/blob';

export const runtime = 'edge';

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const urlToDelete = searchParams.get('url');
      
        await del(urlToDelete || '');
      
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error(`Error attempting to delete: ${error}`);
        return new Response(null, { status: 400 });
    }
}