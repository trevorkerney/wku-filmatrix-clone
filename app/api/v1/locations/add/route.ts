import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, successWithMessage, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createLocationSchema } from "~/lib/z"

export const POST = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse();

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  })
  if (!requester) {
    return unexpectedError();
  }

  if (requester.role === 3)
    return forbiddenResponse();

  const body = await req.json();
  let parsedBody: any;
  try {
    parsedBody = createLocationSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  const existing = await prisma.location.findUnique({
    where: {
      locationName: parsedBody.locationName
    }
  })
  if (existing)
    return requestConflict("A location with this name already exists");

  try {
    return successWithMessage(
      await prisma.location.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError();
  }
}) as any
