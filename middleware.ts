// Copyright 2025 Josh
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { headers } from 'next/headers'

export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith('/api')){ //NextUrl is the next url we are going to 
        const authHeader = request.headers.get('Authorization')

        if(!authHeader){
            return NextResponse.json(
                { success: false, message: 'Authroization header is required'},
                { status: 401}
            )
        }

    }
    return NextResponse.next()

}

export const config = {
    matcher: ['/api/:path*']
}