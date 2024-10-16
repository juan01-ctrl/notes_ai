import { NextRequest }         from "next/server"
import { ZodError, ZodSchema } from "zod"

export const validateRequest = async <T, P>(
  req: NextRequest,
  params: P,
  schema: ZodSchema<T>
): Promise<T> => {
  try {
    const body = await req.json().catch(() => null)
        
    const query = Object.fromEntries(req.nextUrl.searchParams.entries())

    const objectToValidate = { params, body, query }


    Object.keys(objectToValidate).forEach((key) => {
      const value = objectToValidate[key as keyof typeof objectToValidate] || {};
     
      if (Object.values(value).length === 0) {
        delete objectToValidate[key as keyof typeof objectToValidate];
      }
    });
        
    const validatedData = schema.parse(objectToValidate)
        


    return  validatedData 
        
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.message)
    }

    throw new Error('Internal server error')
  }
}