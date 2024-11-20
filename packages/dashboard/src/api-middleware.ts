import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { type Configuration, configuration } from './configuration';

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Origin': configuration.origin.allowedList.join(','),
};

const verifyJwt = (token: string, config: Configuration = configuration) => {
  const verifier = CognitoJwtVerifier.create({
    tokenUse: 'access',
    userPoolId: config.aws.cognito.userPoolId,
    clientId: config.aws.cognito.userPoolClientId,
  });

  return verifier.verify(token);
};

export const jwtParse = async (request: NextRequest, response: NextResponse) => {
  try {
    if (!request.headers.get('authorization')) {
      return response;
    }

    const token = request.headers.get('authorization')?.split(' ')[1];
    request.headers.set('user', JSON.stringify(await verifyJwt(token!)));
    return response;
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 401 });
  }
};

export const handleApiRequest = async (request: NextRequest) => {
  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    return NextResponse.json({}, { headers: corsOptions });
  }

  // Handle simple requests
  const response = NextResponse.next();

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return jwtParse(request, response);
};
