import { NextRequest, NextResponse } from "next/server";

export const runMiddlewares = async <T> (
  middlewares: ((req: NextRequest) => Promise<unknown>)[],
  req: NextRequest
): Promise<T | NextResponse> => {
  try {
    const results = [];
    for (const middleware of middlewares) {
      const result = await middleware(req);
      results.push(result);
    }
    return results as T;
  }  catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};