import {NextResponse} from 'next/server';
import {loads3intoPinecone} from '../../../lib/pinecone';

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const {file_key, file_name} = body;      
        console.log(file_key, file_name); 
        await loads3intoPinecone(file_key); 
        return NextResponse.json(
            { message: 'File data received successfully' },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
        
    }
}