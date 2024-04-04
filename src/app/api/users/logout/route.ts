import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest, response: NextResponse) {
    try {

     const response =   NextResponse.json({
            message:"Logout Successfully",
            success:true
        });
    response.cookies.set("token","",{
        httpOnly:true,
        expires: new Date(0)
    })
    return response
    } catch (error:any) {
        NextResponse.json(
            {
              error: error.message,
            },
            {
              status: 500,
            }
          );
    }
}