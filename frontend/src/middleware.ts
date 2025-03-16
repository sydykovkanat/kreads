import { NextRequest, NextResponse } from 'next/server';

import { PUBLIC_URL } from '@/config/url.config';

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken')?.value;

	if (refreshToken === undefined) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/'],
};
