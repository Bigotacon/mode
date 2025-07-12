import { db } from "@/db";
import { issues } from '@/db/schema'
import {eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from "next/server";
import { resourceUsage } from "process";

export const GET = async (
    req: NextRequest,
    { params }: {params: Promise<{ id: string}>}
) => {
    try{
    const {id} = await params
    const issue = await db.query.issues.findFirst({
        where: eq(issues.id, parseInt(id)),
    })
    return NextResponse.json({data: issue})
    //To get stuff things running in the background after then we van have an event. In vervel it allows us to use the commit
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error: 'not here'}, {status: 404})
    }
    }
}
