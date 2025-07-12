import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"



export const GET = (req:NextRequest) => {
    return NextResponse.json({data:{message:'hello'}})
}





export async function POST(request: Request) {
  //const data = await request.json()

  // Process the data (in a real app, you would save to a database)
  //console.log('Received data:', data)
  const data = ((await headers()).get('Authorization'))
  return NextResponse.json(data)

}