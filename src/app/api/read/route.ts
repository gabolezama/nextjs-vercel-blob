import { list } from "@vercel/blob";

export async function GET(request: Request){
    try {
      const response = await list()
      return Response.json(response);
    } catch (error) {
      console.log('Error on attempting get list', error);
    }
  }